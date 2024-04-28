'use client';

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { generateDraw } from "../_actions/draw-action";

export const useGenerateDraw = (groupId: string) => {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['generateDraw', groupId],
    mutationFn: () => generateDraw(groupId),
    onSuccess: () => router.refresh(),
  });

  return { isLoading: isPending || isSuccess, generate: () => mutate() };
};
