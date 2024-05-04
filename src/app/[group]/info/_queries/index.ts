'use client';

import { useState } from "react";
import { useChannel } from "ably/react";
import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/trpc/react";
import { messageTypes } from "~/lib/ably/shared";

import { type Draws } from "~/server/api/root";

import { generateDraw } from "../_actions/draw-action";
import { useModal } from "~/lib/zustand";

type FreshDraw = Awaited<ReturnType<typeof generateDraw>>[number];

const bySeedAsc = (a: FreshDraw, b: FreshDraw) => b.country!.seed - a.country!.seed;

export const useGenerateDraw = (groupId: string) => {
  const channel = useChannel(groupId);
  const { close } = useModal();

  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationKey: ['generateDraw', groupId],
    mutationFn: () => generateDraw(groupId),
    onSuccess: (draw) => channel.publish({
      name: messageTypes.DRAW_GENERATED,
      data: draw.sort(bySeedAsc),
    }),
    onSettled: () => close(),
  });

  return { isLoading: isPending, isSuccess, isError, generate: () => mutate() };
};

export type AnimationDelay = {
  startRevealAt: number;
  timeBetweenReveals: number;
};

const ANIMATION_DELAY = 2000;

export const useDraws = ({
  groupId,
  userId,
  index,
  totalUsers,
}: {
  groupId: string,
  userId: string,
  index: number,
  totalUsers: number,
}) => {
  const [data, { refetch }] = api.draw.getDraw.useSuspenseQuery(
    { groupId, userId },
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: Infinity,
    }
  );

  const [override, setOverride] = useState<Draws>(data);
  const [delay, setDelay] = useState<AnimationDelay | null>(null);

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.DRAW_GENERATED) {
      setDelay({
        startRevealAt: (index + 1) * ANIMATION_DELAY,
        timeBetweenReveals: totalUsers * ANIMATION_DELAY,
      });
      setOverride((message.data as Draws).filter((draw) => draw.userId === userId));
      void refetch();
    }
  });

  return { draws: override, timeout: delay };
};
