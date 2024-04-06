import { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';

import { api } from '~/lib/trpc/server';

import { getServerAuthSession } from '~/server/auth';

import SkeletonBar from '~/app/_components/skeleton-bar';
import TopBar from '~/app/_components/top-bar';

import Header from './_components/header';
import LoadingSpinner from '../_components/loading-spinner';

import JoinGroup from './_join';

export default async function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    permanentRedirect('/');
  }

  const isInGroup = await api.group.checkUser({ groupId, userId: session.user.id });

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Suspense fallback={<TopBar title={<SkeletonBar />} />}>
        <Header groupId={groupId} />
      </Suspense>
      <div className="flex flex-1 flex-col w-full h-0">
        <Suspense fallback={<LoadingSpinner />}>
          {!isInGroup && (
            <JoinGroup groupId={groupId} userId={session.user.id} />
          )}
          {children}
        </Suspense>
      </div>
    </div>
  );
};
