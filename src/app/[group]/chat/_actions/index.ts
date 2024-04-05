'use server';

import { api } from "~/lib/trpc/server";

export type MessagesType = NonNullable<
  Awaited<ReturnType<typeof api.post.getAll>>
>;

export async function getMessages(groupId: string): Promise<MessagesType> {
  return await api.post.getAll({ groupId });
};

export type InfiniteMessages = NonNullable<
  Awaited<ReturnType<typeof api.post.getLatest>>
>;

export async function getInfiniteMessages({
  groupId,
  cursor,
  limit,
}: {
  groupId: string;
  cursor?: number;
  limit?: number;
}): Promise<InfiniteMessages> {
  return await api.post.getLatest({ groupId, cursor, limit });
};
