import { Suspense } from 'react';

import { api } from '~/lib/trpc/server';

import LoadingSpinner from '~/app/_components/loading-spinner';

import { checkMembershipAndRedirect } from '../_actions';

import ChannelWrapper from '../_components/channel-wrapper';

import UsersArea from './_components/users-area';
import DrawButton from './_components/draw-button';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  await checkMembershipAndRedirect(groupId);

  const usersPromise = api.user.getMembersOfGroup({ groupId });
  const hasDrawPromise = api.draw.checkGroupDraw({ groupId });

  const [users, hasDraw] = await Promise.all([usersPromise, hasDrawPromise]);
  
  return (
    <ChannelWrapper channelName={groupId}>
      <div className="flex flex-col flex-1 items-start p-8 gap-3 overflow-y-scroll">
        {!hasDraw && (
          <DrawButton groupId={groupId} />
        )}
        <h1 className="font-bold text-2xl pt-3">Group members</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <UsersArea users={users} groupId={groupId} />
        </Suspense>
      </div>
    </ChannelWrapper>
  );
};
