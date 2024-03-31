import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { api } from '~/trpc/server';

import TopBar from '../_components/top-bar';

export default async function Layout({ children, params: { group: id } }: { children: React.ReactNode, params: { group: string } }) {
  const group = await api.group.getById({ id });
  
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Suspense fallback={<GroupName name="Loading..." />}>
        <GroupName name={group?.name} />
      </Suspense>
      <div className="flex flex-col w-full h-dvh">
        <Suspense fallback={<div>Loading base layout...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

const GroupName = ({ name }: { name: string | undefined }) => {
  return (
    <TopBar title={name}>
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
