'use client';

import { Fragment, useCallback } from 'react';
import { useChannel } from 'ably/react';

import { messageTypes } from '~/lib/ably/shared';

import LoadingSpinner from '~/app/_components/loading-spinner';

import { useInfiniteMessages } from '../_queries';

import MessageBubble from './message-bubble';

type Props = {
  groupId: string;
  userId: string;
};

const MessagesArea = ({ groupId, userId }: Props) => {
  const { messages, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, refresh } = useInfiniteMessages({ groupId });

  const loaderRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        void fetchNextPage();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [fetchNextPage]);

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
              avatar={createdBy.image}
              isSender={createdBy.id === userId || createdBy.id === 'pending'}
              isSending={createdBy.id === 'pending'}
            />
          ))}
        </Fragment>
      ))}
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loaderRef} className="flex items-center justify-center w-full h-20">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default MessagesArea;
