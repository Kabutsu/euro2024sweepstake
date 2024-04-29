'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useChannel } from 'ably/react';

import { messageTypes } from '~/lib/ably/shared';

import { type Users, type Group, type Draws } from '~/server/api/root';

import { useDraws } from '../_queries';

import FlagsGroup from './flags-group';

type User = Users[number];

type Props = {
  user: User;
  group: Group | null;
  index: number;
  wait: number;
};

const ANIMATION_DELAY = 2000;

const UserCard = ({ user, group, index, wait }: Props) => {
  const { draws, update } = useDraws({ groupId: group?.id ?? "", userId: user.id });
  const [revealDelay, setRevealDelay] = useState<number | null>(null);
  const animationWaitMs = useMemo(() => wait * ANIMATION_DELAY, [wait]);

  useChannel(group?.id ?? "", (message) => {
    if (message.name === messageTypes.DRAW_GENERATED) {
      setRevealDelay((index + 1) * ANIMATION_DELAY);
      update((message.data as unknown as Draws).filter((draw) => draw.userId === user.id));
    }
  });

  return (
    <div className="flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1600px]:w-[70%] sm:hover:scale-105 transition-transform duration-300">
      <Image
        src={user.image ?? "/images/user-solid.svg"}
        alt={user.name ?? user.id}
        width={250}
        height={250}
        className="rounded-full w-24 h-24 p-4"
      />
      <div className={`flex flex-col flex-1 sm:flex-initial max-w-56 ${draws.length ? 'sm:w-[30%]' : 'sm:w-auto'} sm:max-w-none p-4 pl-0 sm:pl-4 relative`}>
        <h2 className="text-xl font-semibold truncate">{user.name}</h2>
        <p className="hidden sm:block text-lg font-normal truncate">{user.email}</p>
        <div className="sm:hidden flex flex-row items-center flex-wrap gap-x-2 gap-y-3 pt-1">
          <FlagsGroup draws={draws} size="sm" startRevealAt={revealDelay} waitRevealFor={animationWaitMs} />
        </div>
      </div>
      <div className="hidden sm:flex flex-row items-center flex-wrap flex-1 gap-5 p-4">
        <FlagsGroup draws={draws} size="lg" startRevealAt={revealDelay} waitRevealFor={animationWaitMs} />
      </div>
    </div>
  );
};

export default UserCard;
