'use client';

import { useQuery, useMutation } from '@tanstack/react-query';

import {
  type MessagesType,
  getMessages,
  createMessage,
} from '../_actions';

export function usePosts({
  groupId,
  initialData = undefined,
}: {
  groupId: string;
  initialData?: MessagesType;
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['posts', groupId],
    queryFn: () => getMessages(groupId),
    initialData,
  });

  const { mutate } = useMutation({
    mutationFn: (message: string) => createMessage(message, groupId),
    onSuccess: () => refetch(),
  });

  return { data, isLoading, createPost: mutate };
};
