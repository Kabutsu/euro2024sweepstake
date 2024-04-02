'use client';

import {
  type GroupsType,
} from "../_actions";

import { api } from "~/lib/trpc/react";

export const useGroups = ({
  searchTerm = "",
  initialData = undefined,
}: {
  searchTerm?: string;
  initialData?: GroupsType;
}) => {
  const { data, isLoading, isFetching } = api.group.search.useQuery({ searchTerm }, { initialData });
  
  return { data, isLoading: isLoading || isFetching };
};