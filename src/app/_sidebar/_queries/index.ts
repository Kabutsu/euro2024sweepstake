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

export const usePreHeader = ({ groupId, userId }: { groupId: string, userId: string }) => {
  const [user, { refetch: recheckUser }] = api.group.checkUser.useSuspenseQuery({ groupId, userId });

  const [data, { refetch: fetchLatest }] = api.post.getPreHeader.useSuspenseQuery({ groupId });

  return {
    message: user ? data : "You are not a member of this group",
    refetch: user ? fetchLatest : () => recheckUser().then(({ data }) => {
      if (data) {
        void fetchLatest();
      }
    }),
  };
};
