'use server';

import { api } from "~/lib/trpc/server";

export type GroupsType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>;

export async function getGroups(): Promise<GroupsType> {
  return await api.group.getAll();
};
