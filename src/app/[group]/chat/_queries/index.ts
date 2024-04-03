'use client';

import { useChannel } from 'ably/react';
import { type MessagesType } from '../_actions';

import { api } from '~/lib/trpc/react';
import { messageTypes } from '~/lib/ably/shared';

export const useMessages = ({
  groupId,
  initialData = undefined,
}: {
  groupId: string;
  initialData?: MessagesType;
}) => {
  const { channel } = useChannel(groupId);

  const { data: messages, isLoading, refetch } = api.post.getAll.useQuery({ groupId }, { initialData });

  const { mutate: sendMessage } = api.post.create.useMutation({
    onSuccess: (message) => channel.publish({
      name: messageTypes.NEW_MESSAGE,
      data: message,
    }),
  });

  return { messages, isLoading, sendMessage, refresh: refetch };
};
