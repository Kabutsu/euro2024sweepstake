'use server';

import { api } from "~/lib/trpc/server";

export type MessagesType = NonNullable<
  Awaited<ReturnType<typeof api.post.getAll>>
>;

export type SendingType = NonNullable<
  Awaited<Parameters<typeof api.post.create>>
>;

export async function getMessages(groupId: string): Promise<MessagesType> {
  return await api.post.getAll({ groupId });
};
