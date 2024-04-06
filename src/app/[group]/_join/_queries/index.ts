'use client';

import { api } from "~/lib/trpc/react";

export const useJoinGroup = ({
  groupId,
  onJoin,
}: {
  groupId: string;
  onJoin: () => void;
}) => {
  const [ group ] = api.group.getById.useSuspenseQuery({ id: groupId });

  const { mutate: joinGroup, isPending: isJoining } = api.group.join.useMutation({
    onSuccess: onJoin,
  });

  return { group, joinGroup, isJoining };
};
