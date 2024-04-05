'use client';

import { useChannel } from 'ably/react';

import { messageTypes } from '~/lib/ably/shared';
import { useLatestMessages } from '~/lib/zustand';

import LoadingSpinner from '~/app/_components/loading-spinner';

import { type MessagesType } from '../_actions';
import { useMessages } from '../_queries';

import MessageBubble from './message-bubble';

type Props = {
  initialData: MessagesType;
  groupId: string;
  userId: string;
};

const MessagesArea = ({ groupId, userId, initialData }: Props) => {
  const { sendingMessages, isLoading } = useMessages({ groupId, initialData });
  const { addPreHeader } = useLatestMessages();

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.NEW_MESSAGE) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      addPreHeader(groupId, message.data.name);
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return sendingMessages?.map(({ id, name: message, createdBy, isSending }) => (
    <MessageBubble key={id} message={message ?? ''} isSender={createdBy?.id === userId} isSending={isSending} />
  ));
};

export default MessagesArea;
