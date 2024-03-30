import Image from 'next/image';
import Link from 'next/link';
import TopBar from '../_components/top-bar';
import { Suspense } from 'react';

export default function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  console.log('GroupId:', groupId);
  const title = 'Group Name';
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <TopBar title={title}>
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
      <div className="flex flex-1 w-full">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
