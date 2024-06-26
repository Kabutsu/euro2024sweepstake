import { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';

import { getServerAuthSession } from '~/server/auth';

import SkeletonBar from '~/app/_components/skeleton-bar';
import TopBar from '~/app/_components/top-bar';

import Header from './_components/header';
import LoadingSpinner from '../_components/loading-spinner';

export default async function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    permanentRedirect('/');
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Suspense fallback={<TopBar title={<SkeletonBar />} />}>
        <Header groupId={groupId} />
      </Suspense>
      <div className="relative flex flex-1 flex-col w-full h-0">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};
