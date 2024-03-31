import Image from 'next/image';
import Link from 'next/link';

import { api } from '~/trpc/server';

import TopBar from '~/app/_components/top-bar';

export default async function Header({ groupId }: { groupId: string }) {
  const group = await api.group.getById({ id: groupId });

  return (
    <TopBar title={group?.name}>
      <nav className="flex flex-row gap-6 font-light text-base">
        <Link href="chat" className="sm:min-w-16 text-center">
          <Image src="/images/comments-solid.svg" alt="draw" width={0} height={0} className="sm:hidden h-8 w-8 px-1" />
          <p className="hidden sm:inline">Chat</p>
        </Link>
        <Link href="draw" className="sm:min-w-16 text-center">
          <Image src="/images/circle-info-solid.svg" alt="draw" width={0} height={0} className="sm:hidden h-8 w-8 px-1" />
          <p className="hidden sm:inline">Draw</p>
        </Link>
      </nav>
    </TopBar>
  );
};
