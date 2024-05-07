import SkeletonBar from '~/app/_components/skeleton-bar';

import Layout from './user-card.layout';

export default function LoadingCard() {
  return (
    <Layout>
      <div className="rounded-full w-16 h-16 m-4 bg-gray-300" />
      <div className="flex flex-col flex-1 sm:flex-initial h-16 sm:w-[30%] p-4 pt-6 pl-0 sm:pl-4 relative">
        <SkeletonBar />
      </div>
    </Layout>
  );
}
