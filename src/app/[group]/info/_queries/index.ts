'use client';

import { useEffect, useState } from "react";
import { useChannel } from "ably/react";
import { useMutation } from "@tanstack/react-query";

import { api } from "~/lib/trpc/react";
import { messageTypes } from "~/lib/ably/shared";

import { type Draws } from "~/server/api/root";

import { generateDraw } from "../_actions/draw-action";

type FreshDraw = Awaited<ReturnType<typeof generateDraw>>[number];

const bySeedAsc = (a: FreshDraw, b: FreshDraw) => b.country!.seed - a.country!.seed;

export const useGenerateDraw = (groupId: string) => {
  const channel = useChannel(groupId);

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['generateDraw', groupId],
    mutationFn: () => generateDraw(groupId),
    onSuccess: (draw) => channel.publish({
      name: messageTypes.DRAW_GENERATED,
      data: draw.sort(bySeedAsc),
    }),
  });

  return { isLoading: isPending, isSuccess, generate: () => mutate() };
};

export const useDraws = ({ groupId, userId }: { groupId: string, userId: string }) => {
  const [data, { refetch }] = api.draw.getDraw.useSuspenseQuery(
    { groupId, userId },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: Infinity,
    }
  );
  
  const [override, setOverride] = useState<Draws>(data);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(override)) {
      void refetch();
    }

    return () => {
      setOverride(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, refetch]);

  return { draws: override, update: setOverride };
};
