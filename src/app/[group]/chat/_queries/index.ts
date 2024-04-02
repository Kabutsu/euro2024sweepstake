'use client';

import { type MessagesType } from '../_actions';

import { api } from '~/lib/trpc/react';

export const useMessages = ({
  groupId,
  initialData = undefined,
}: {
  groupId: string;
  initialData?: MessagesType;
}) => {
  const { data: messages, isLoading, refetch } = api.post.getAll.useQuery({ groupId }, { initialData });

  const { mutate: sendMessage } = api.post.create.useMutation();

  return { messages, isLoading, sendMessage, refresh: refetch };
};
