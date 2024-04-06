'use client';

import { useChannel } from 'ably/react';

import { api } from '~/lib/trpc/react';
import { messageTypes } from '~/lib/ably/shared';
import { useLatestMessages } from '~/lib/zustand';

const DEFAULT_PENDING_MSG = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdById: 'pending',
  createdBy: {
    id: 'pending',
    name: null,
    email: null,
    emailVerified: null,
    image: null
  },
};

const PAGE_SIZE = 25;

export const useInfiniteMessages = ({
  groupId,
}: {
  groupId: string;
}) => {
  const utils = api.useUtils();
  const { channel } = useChannel(groupId);
  const { addPreHeader } = useLatestMessages();

  const { data: messages, isLoading, refetch: refresh, fetchNextPage, hasNextPage, isFetchingNextPage } = api.post.getLatest.useInfiniteQuery({
    groupId,
    limit: PAGE_SIZE,
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { mutate: sendMessage } = api.post.create.useMutation({
    onMutate: async (message) => {
      await utils.post.getLatest.cancel();
      
      const prevData = utils.post.getLatest.getInfiniteData();

      utils.post.getLatest.setInfiniteData({ groupId, limit: PAGE_SIZE, cursor: prevData?.pages.at(0)?.nextCursor }, (old) => ({
        pageParams: old?.pageParams ?? [],
        pages: [
          {
            nextCursor: old?.pages.at(0)?.nextCursor ?? undefined,
            items: [
              {
                groupId,
                ...DEFAULT_PENDING_MSG,
                ...message,
                id: Date.now(),
              },
              ...(old?.pages.at(0)?.items ?? [])
            ]
          },
          ...(old?.pages.slice(1) ?? [])
        ]
      }));

      return { prevData };
    },
    onError: (_, __, ctx) => {
      utils.post.getLatest.setInfiniteData({ groupId }, ctx?.prevData);
    },
    onSuccess: (message) => {
      if (message) {
        addPreHeader(groupId, message.name);
        void channel.publish({
          name: messageTypes.NEW_MESSAGE,
          data: message,
        })
      }
    },
  });

  return { messages, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, sendMessage, refresh };
};
