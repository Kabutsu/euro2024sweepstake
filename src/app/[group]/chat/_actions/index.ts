'use server';

import { api } from "~/trpc/server";

export type MessagesType = NonNullable<
  Awaited<ReturnType<typeof api.post.getAll>>
>;

export async function getMessages(groupId: string): Promise<MessagesType> {
  return await api.post.getAll({ groupId });
};

export async function createMessage(
  name: string,
  postedIn: string
): Promise<void> {
  await api.post.create({ name, postedIn });
};
