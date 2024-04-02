'use client';

import { useEffect } from 'react';

import { messageTypes, pusherClient } from '~/lib/pusher';
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
  const { messages, isLoading, refresh } = useMessages({ groupId, initialData });
  const { addPreHeader } = useLatestMessages();

  useEffect(() => {
    pusherClient.subscribe(`group-${groupId}`).bind(messageTypes.NEW_MESSAGE, (data: Record<string, string | number>) => {
      addPreHeader(groupId, data.text as string);
      refresh();
    });

    return () => {
      pusherClient.unsubscribe(`group-${groupId}`);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return messages?.map(({ id, name: message, createdBy }) => (
    <MessageBubble key={id} message={message} isSender={createdBy.id === userId} />
  ));
};

export default MessagesArea;
