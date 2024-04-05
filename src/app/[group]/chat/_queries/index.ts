'use client';

import { useOptimistic } from 'react';
import { useChannel } from 'ably/react';

import { type MessagesType } from '../_actions';

import { api } from '~/lib/trpc/react';
import { messageTypes } from '~/lib/ably/shared';

type SendingMessage = Partial<Pick<MessagesType[number], 'name' | 'id' | 'createdBy'> & { isSending: boolean }>;

export const useMessages = ({
  groupId,
  initialData = undefined,
}: {
  groupId: string;
  initialData?: MessagesType;
}) => {
  const { channel } = useChannel(groupId);

  const { data: messages, isLoading, refetch } = api.post.getAll.useQuery({ groupId }, { initialData });

  const [sendingMessages, triggerMessage] = useOptimistic(
    messages,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (state: Array<SendingMessage> | undefined, newMessage: SendingMessage | undefined) => {
      const sending = { ...newMessage, isSending: true };
      console.log(sending);
      return [sending, ...(state ?? [])];
    });

  const { mutate: sendMessage } = api.post.create.useMutation({
    onSuccess: (message) => channel.publish({
      name: messageTypes.NEW_MESSAGE,
      data: message,
    }).then(() => refetch()),
  });

  return { messages, sendingMessages, isLoading, sendMessage, triggerMessage };
};
