'use client';

import { useChannel } from 'ably/react';

import { messageTypes } from '~/lib/ably/shared';

import LoadingSpinner from '~/app/_components/loading-spinner';

import { type MessagesType } from '../_actions';
import { useInfiniteMessages } from '../_queries';

import MessageBubble from './message-bubble';
import { Fragment, useEffect } from 'react';

type Props = {
  initialData: MessagesType;
  groupId: string;
  userId: string;
};

const MessagesArea = ({ groupId, userId }: Props) => {
  const { messages, isLoading, hasNextPage, refresh } = useInfiniteMessages({ groupId });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.NEW_MESSAGE) {
      void refresh();
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {messages?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.items?.map(({ id, name: message, createdBy }) => (
            <MessageBubble
              key={id}
              message={message}
              isSender={createdBy.id === userId || createdBy.id === 'pending'}
              isSending={createdBy.id === 'pending'}
            />
          ))}
        </Fragment>
      ))}
      {hasNextPage && <LoadingSpinner />}
    </>
  );
};

export default MessagesArea;
