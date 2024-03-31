'use server';

import { api } from "~/trpc/server";

export type GroupsType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>;

export async function getGroups(): Promise<GroupsType> {
  return await api.group.getAll();
};
