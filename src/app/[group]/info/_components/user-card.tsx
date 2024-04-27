'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import { type Users } from '~/server/api/root';

import { CircleChevronDownIcon } from '~/app/_components/icons';

type User = Users[number];

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    node.addEventListener('click', () => {
      const mediaQuery = window.matchMedia('(min-width: 640px)');
      console.log(mediaQuery);
      if(mediaQuery.matches) {
        toggleExpanded();
      }
    });
  }, [toggleExpanded]);

  return (
    <div className="flex flex-col flex-1">
      <div ref={containerRef} className="flex flex-row rounded-lg shadow-md bg-gray-50 cursor-pointer w-full sm:w-[60%] sm:hover:scale-105 transition-transform duration-300">
        <Image
          src={user.image ?? "/images/icons/user-solid.svg"}
          alt={user.name ?? user.id}
          width={250}
          height={250}
          className="rounded-full w-24 h-24 p-4"
        />
        <div className="flex flex-col flex-1 p-4 pl-0 sm:pl-4 truncate">
          <h2 className="text-xl font-semibold truncate">{user.name}</h2>
          <p className="hidden sm:block text-lg font-normal truncate">{user.email}</p>
          <button onClick={toggleExpanded} className="sm:hidden w-6 h-6 mt-1">
            <CircleChevronDownIcon className="sm:hidden w-full h-full fill-[#1963E0]" />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-row rounded-lg shadow-md bg-gray-50 cursor-pointer w-[80%] sm:w-[40%]">
          <p className="text-lg font-normal">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
