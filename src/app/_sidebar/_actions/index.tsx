'use server';

import { api } from "~/trpc/server";

type GroupsType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>;

export async function getGroups(): Promise<GroupsType> {
  return await api.group.getAll();
};

type SearchType = NonNullable<
  Awaited<ReturnType<typeof api.group.search>>
>;

export async function searchGroups(query: string): Promise<SearchType> {
  return await api.group.search({ query });
};
