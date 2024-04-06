import Link from 'next/link';

import { api } from '~/lib/trpc/server';

import TopBar from '~/app/_components/top-bar';
import { CircleInfoIcon, CommentsIcon } from '~/app/_components/icons';

export default async function Header({ groupId }: { groupId: string }) {
  const group = await api.group.getById({ id: groupId });

  return (
    <TopBar title={group?.name}>
      <nav className="flex flex-row gap-6 font-light text-base">
        <Link href="chat" className="sm:min-w-16 sm:p-1 text-center rounded-lg hover:bg-gray-100">
          <CommentsIcon className="sm:hidden h-8 w-8 px-1 fill-[#347dfa]" />
          <p className="hidden sm:inline">Chat</p>
        </Link>
        <Link href="info" className="sm:min-w-16 sm:p-1 text-center rounded-lg hover:bg-gray-100">
          <CircleInfoIcon className="sm:hidden h-8 w-8 px-1 fill-[#347dfa]" />
          <p className="hidden sm:inline">Info</p>
        </Link>
      </nav>
    </TopBar>
  );
};
