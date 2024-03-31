import { Suspense } from 'react';

import SkeletonBar from '~/app/_components/skeleton-bar';
import TopBar from '~/app/_components/top-bar';

import Header from './_components/header';
import LoadingSpinner from '../_components/loading-spinner';

export default function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Suspense fallback={<TopBar title={<SkeletonBar />} />}>
        <Header groupId={groupId} />
      </Suspense>
      <div className="flex flex-col w-full h-dvh">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};
