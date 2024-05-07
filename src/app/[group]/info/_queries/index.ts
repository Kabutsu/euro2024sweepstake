'use client';

import { useState, useEffect } from "react";
import { useChannel } from "ably/react";
import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/trpc/react";
import { messageTypes } from "~/lib/ably/shared";

import { type Draws } from "~/server/api/root";

import { generateDraw } from "../_actions/draw-action";
import { useGroupUserFetching, useModal } from "~/lib/zustand";

type FreshDraw = Awaited<ReturnType<typeof generateDraw>>[number];

const bySeedAsc = (a: FreshDraw, b: FreshDraw) => b.country!.seed - a.country!.seed;

export const useGenerateDraw = (groupId: string) => {
  const channel = useChannel(groupId);
  const { close } = useModal();

  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationKey: ['generateDraw', groupId],
    mutationFn: () => generateDraw(groupId),
    onMutate: () => close(),
    onSuccess: (draw) => channel.publish({
      name: messageTypes.DRAW_GENERATED,
      data: draw.sort(bySeedAsc),
    }),
  });

  return { isLoading: isPending, isSuccess, isError, generate: () => mutate() };
};

export const useGroupDraws = (groupId: string) => {
  const [data, { refetch }] = api.draw.getGroupDraw.useSuspenseQuery(
    { groupId },
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: Infinity,
    }
  );

  const { setIsUserGroupFetching } = useGroupUserFetching();

  useEffect(() => {
    setIsUserGroupFetching(groupId, false);
  }, [groupId, setIsUserGroupFetching]);

  return { draws: data, refreshData: () => void refetch() };
};

export type AnimationDelay = {
  startRevealAt: number;
  timeBetweenReveals: number;
};

const ANIMATION_DELAY = 2000;

type UserDrawsArgs = {
  groupId: string;
  userId: string;
  initialData: Draws;
  refreshData: () => undefined;
  index: number;
  totalUsers: number;
};

type UserDrawsVal = {
  draws: Draws;
  timeout: AnimationDelay | null;
}

export const useUserDraws: (args: UserDrawsArgs) => UserDrawsVal = ({
  groupId,
  userId,
  initialData,
  refreshData,
  index,
  totalUsers,
}: UserDrawsArgs) => {
  const [override, setOverride] = useState<Draws>(initialData.filter((draw) => draw.userId === userId));

  const [delay, setDelay] = useState<AnimationDelay | null>(null);

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.DRAW_GENERATED) {
      setDelay({
        startRevealAt: (index + 1) * ANIMATION_DELAY,
        timeBetweenReveals: totalUsers * ANIMATION_DELAY,
      });
      setOverride((message.data as Draws).filter((draw) => draw.userId === userId));
      refreshData();
    }
  });

  return { draws: override, timeout: delay };
};
