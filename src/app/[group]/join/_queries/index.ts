'use client';

import { api } from "~/lib/trpc/react";

export const useJoinGroup = ({
  onJoin,
}: {
  onJoin: () => void;
}) => {
  const { mutate: joinGroup, isPending: isJoining } = api.group.join.useMutation({
    onSuccess: () => onJoin(),
  });

  return { joinGroup, isJoining };
};
