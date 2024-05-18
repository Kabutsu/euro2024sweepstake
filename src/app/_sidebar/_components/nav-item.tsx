'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useChannel } from 'ably/react';

import { type api } from '~/lib/trpc/server';
import { useSidebar } from '~/lib/zustand';
import { messageTypes } from '~/lib/ably/shared';

import { usePreHeader } from '../_queries';

type GroupType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>[number];

const NavItem = ({ group }: { group: GroupType }) => {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  const groupId = new RegExp(`/${group.id}/`);
  const isActive = groupId.test(pathname);

  const { data: session } = useSession();
  const { message, refetch } = usePreHeader({ groupId: group.id, userId: session?.user.id ?? "" });

  useChannel(group.id, (message) => {
    if (message.name === messageTypes.NEW_MESSAGE) {
      void refetch();
    }
  });

  return (
    <Link href={`/${group.id}/chat`} className={`flex flex-col items-left justify-between w-full p-3 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`} onClick={toggle}>
      <p className="font-semibold text-base truncate">
        {group.name}
      </p>
      <p className="font-light text-sm truncate">
        {message}
      </p>
    </Link>
  );
};

export default NavItem;