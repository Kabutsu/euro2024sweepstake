'use server';

import { api } from "~/lib/trpc/server";

export type MessagesType = NonNullable<
  Awaited<ReturnType<typeof api.post.getAll>>
>;

export async function getMessages(groupId: string): Promise<MessagesType> {
  return await api.post.getAll({ groupId });
};
