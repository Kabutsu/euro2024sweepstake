import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';

import { api } from '~/lib/trpc/server';

import { checkMembershipAndRedirect } from '../_actions';

import ChannelWrapper from '../_components/channel-wrapper';

import UsersArea from './_components/users-area/users-area';
import DrawButton from './_components/draw/draw-button';
import UsersAreaLoading from './_components/users-area/skeleton';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  await checkMembershipAndRedirect(groupId);

  const users = await api.user.getMembersOfGroup({ groupId });

  noStore();
  const hasDraw = await api.draw.checkGroupDraw({ groupId });
  
  return (
    <ChannelWrapper channelName={groupId}>
      <div className="flex flex-col flex-1 items-start p-8 gap-3 overflow-y-scroll">
        {!hasDraw && (
          <DrawButton groupId={groupId} />
        )}
        <h1 className="font-bold text-2xl pt-3">Group members</h1>
        <Suspense fallback={<UsersAreaLoading />}>
          <UsersArea users={users} groupId={groupId} />
        </Suspense>
      </div>
    </ChannelWrapper>
  );
};
