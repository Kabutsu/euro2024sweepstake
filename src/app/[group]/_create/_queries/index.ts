'use client';

import { useRouter } from "next/navigation";

import { api } from "~/lib/trpc/react";
import { useModal } from "~/lib/zustand";

export const useCreateGroup = ({
  onSuccess = undefined,
}: {
  onSuccess?: () => void;
}) => {
  const router = useRouter();
  const utils = api.useUtils();
  const { close } = useModal();

  const { mutate: createGroup, isPending } = api.group.create.useMutation({
    onSuccess: async (res) => {
      router.push(`/${res.id}/chat`);
      await utils.group.search.cancel();
      await utils.group.search.invalidate();
      onSuccess?.();
      close();
    },
  });

  return { createGroup, isPending };
};
