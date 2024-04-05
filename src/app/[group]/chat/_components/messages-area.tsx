'use client';

import { useChannel } from 'ably/react';

import { messageTypes } from '~/lib/ably/shared';

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
  const { messages, isLoading, refresh } = useMessages({ groupId, initialData });

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.NEW_MESSAGE) {
      void refresh();
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return messages?.map(({ id, name: message, createdBy }) => (
    <MessageBubble
      key={id}
      message={message}
      isSender={createdBy.id === userId || createdBy.id === 'pending'}
      isSending={createdBy.id === 'pending'}
    />
  ));
};

export default MessagesArea;
