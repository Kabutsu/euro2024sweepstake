'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type api } from '~/lib/trpc/server';

import { useSidebar, useLatestMessages } from '~/lib/zustand';

type GroupType = NonNullable<
  Awaited<ReturnType<typeof api.group.getAll>>
>[number];

const NavItem = ({ group }: { group: GroupType }) => {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  const groupId = new RegExp(`/${group.id}/`);
  const isActive = groupId.test(pathname);

  const { preHeaders } = useLatestMessages();

  return (
    <Link href={`/${group.id}/chat`} className={`flex flex-col items-left justify-between w-full p-3 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`} onClick={toggle}>
      <p className="font-semibold text-base truncate">
        {group.name}
      </p>
      <p className="font-light text-sm truncate">
        {preHeaders[group.id] ?? group.posts.at(0)?.name ?? "No messages yet"}
      </p>
    </Link>
  );
};

export default NavItem;