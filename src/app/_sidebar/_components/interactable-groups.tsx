'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { type api } from '~/trpc/server';

import { searchGroups } from '../_actions';

import SearchBar from './searchbar';
import Scroller from './scroller';
import NavItem from './nav-item';
import LoadingGroups from './loading-groups';

type GroupsType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>;

type Props = {
  initialData: GroupsType;
};

const InteractableGroups = ({ initialData }: Props) => {
  const [search, setSearch] = useState('');

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['groups', search.toLowerCase()],
    queryFn: () => searchGroups(search),
    initialData,
  });

  return (
    <>
      <div className="pb-3 px-4">
        <SearchBar onChange={setSearch} />
      </div>
      {isLoading || isFetching ? (
        <LoadingGroups />
      ) : (
        <Scroller>
          {data.map((group) => (
            <NavItem key={group.id} group={group} />
          ))}
        </Scroller>
      )}
    </>
  );
};

export default InteractableGroups;
