'use client';

import { useState } from 'react';

import { type GroupsType } from '../_actions';

import { useGroups } from '../_queries';

import NavItem from './nav-item';
import LoadingGroups from './loading-groups';
import Scroller from './scroller';
import SearchArea from './search-area';

type Props = {
  initialData: GroupsType;
};

const InteractableGroups = ({ initialData }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGroups({ searchTerm, initialData });

  return (
    <>
      <SearchArea>
        <input
          type="text"
          placeholder="Search groups"
          className="w-full h-full p-2 pl-4 text-gray-700  bg-gray-100 border-0 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchArea>

      <Scroller>
        {isLoading ? (
          <LoadingGroups />
        ) : (
          data?.map((group) => (
            <NavItem key={group.id} group={group} />
          ))
        )}
      </Scroller>
    </>);
};

export default InteractableGroups;
