'use client';

import { useChannel } from 'ably/react';
import {
  type MessagesType,
} from '../_actions';

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
    limit: 25,
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { mutate: sendMessage } = api.post.create.useMutation({
    onMutate: async (message) => {
      await utils.post.getLatest.cancel();

      const prevData = utils.post.getLatest.getData();

      utils.post.getLatest.setData({ groupId }, (old) => ({
        nextCursor: old?.nextCursor,
        items: [
          {
            groupId,
            ...DEFAULT_PENDING_MSG,
            ...message,
            id: Date.now(),
          },
          ...(old?.items ?? []),
        ]
      }));

      return { prevData };
    },
    onError: (_, __, ctx) => {
      utils.post.getAll.setData({ groupId }, ctx?.prevData?.items ?? []);
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

export const useMessages = ({
  groupId,
  initialData = undefined,
}: {
  groupId: string;
  initialData?: MessagesType;
}) => {
  const utils = api.useUtils();
  const { channel } = useChannel(groupId);
  const { addPreHeader } = useLatestMessages();

  const { data: messages, isLoading, refetch: refresh } = api.post.getAll.useQuery({ groupId }, { initialData });

  const { mutate: sendMessage } = api.post.create.useMutation({
    onMutate: async (message) => {
      await utils.post.getAll.cancel();

      const prevData = utils.post.getAll.getData();

      utils.post.getAll.setData({ groupId }, (old) => [
        {
          groupId,
          ...DEFAULT_PENDING_MSG,
          ...message,
          id: Date.now(),
        },
        ...(old ?? [])
      ] as MessagesType);

      return { prevData };
    },
    onError: (_, __, ctx) => {
      utils.post.getAll.setData({ groupId }, ctx?.prevData);
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

  return { messages, isLoading, sendMessage, refresh };
};
