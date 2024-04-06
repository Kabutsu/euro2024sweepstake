import { api } from '~/lib/trpc/server';

import { checkMembershipAndRedirect } from '../_actions';

import ChannelWrapper from '../_components/channel-wrapper';
import UsersArea from './_components/users-area';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  await checkMembershipAndRedirect(groupId);

  const users = await api.user.getMembersOfGroup({ groupId });
  
  return (
    <ChannelWrapper channelName={groupId}>
      <div className="flex flex-col flex-1 items-start p-8 overflow-y-scroll">
        <h1>Draw</h1>
        <p>Here you will see the sweepstake draw</p>
        <UsersArea users={users} />
      </div>
    </ChannelWrapper>
  );
};
