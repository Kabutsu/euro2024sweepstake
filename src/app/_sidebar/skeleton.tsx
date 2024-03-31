import SkeletonBar from '~/app/_components/skeleton-bar';

import Layout from './layout';

import LoadingGroups from './_components/loading-groups';
import SearchArea from './_components/search-area';
import Scroller from './_components/scroller';

export default function Skeleton() {
  return (
    <Layout>
      <SearchArea>
        <SkeletonBar rounded="full" />
      </SearchArea>

      <Scroller>
        <LoadingGroups />
      </Scroller>
    </Layout>
  );
};
