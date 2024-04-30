'use client';

import Image from 'next/image';

import { type Users, type Group } from '~/server/api/root';

import { useDraws } from '../_queries';

import FlagsGroup from './flags-group';

type Props = {
  user: Users[number];
  group: Group | null;
  index: number;
  totalUsers: number;
};

const UserCard = ({ user, group, index, totalUsers }: Props) => {
  const { draws, timeout } = useDraws({
    groupId: group?.id ?? '',
    userId: user.id,
    index,
    totalUsers,
  });

  return (
    <div className="flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1640px]:w-[70%] sm:hover:scale-105 transition-transform duration-300">
      <Image
        src={user.image ?? "/images/user-solid.svg"}
        alt={user.name ?? user.id}
        width={250}
        height={250}
        className="rounded-full w-24 h-24 p-4"
      />
      <div className={`relative flex flex-col flex-1 sm:flex-initial p-4 pl-0 sm:pl-4 max-w-56 sm:max-w-none sm:w-${draws.length ? '[30%]' : 'auto'}`}>
        <h2 className={`text-xl font-semibold ${draws.length ? 'truncate' : 'text-wrap'} sm:truncate`}>
          {user.name}
        </h2>
        <p className="hidden sm:block text-lg font-normal truncate">
          {user.email}
        </p>
        <div className={`sm:hidden ${draws.length ? 'flex' : 'hidden'} flex-row items-center flex-wrap gap-x-2 gap-y-3 pt-1`}>
          <FlagsGroup draws={draws} size="sm" timeout={timeout} />
        </div>
      </div>
      <div className="hidden sm:flex flex-row items-center flex-wrap flex-1 gap-5 p-4">
        <FlagsGroup draws={draws} size="lg" timeout={timeout} />
      </div>
    </div>
  );
};

export default UserCard;
