'use client';

import { useState } from 'react';

import { useGroups } from '../_queries';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useGroups({ searchTerm });

  return (
    <input
      type="text"
      placeholder="Search groups"
      className="w-full h-full p-2 pl-4 border-0 text-gray-800 bg-gray-100 rounded-full"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
