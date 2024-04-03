'use client';

import { useEffect } from 'react';

import { pusherClient } from '~/lib/pusher/react';
import { messageTypes } from '~/lib/pusher/shared';
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
    console.log('Subscribing to group', groupId);
    pusherClient.subscribe(`group-${groupId}`).bind(messageTypes.NEW_MESSAGE, (data: Record<string, string | number>) => {
      console.log('Received new message', data);
      addPreHeader(groupId, data.text as string);
      refresh().catch(console.error);
    });

    return () => {
      console.log('Unsubscribing from group', groupId);
      pusherClient.unsubscribe(`group-${groupId}`);
    };
  }, [addPreHeader, groupId, refresh]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return messages?.map(({ id, name: message, createdBy }) => (
    <MessageBubble key={id} message={message} isSender={createdBy.id === userId} />
  ));
};

export default MessagesArea;
