import { checkMembershipAndRedirect } from '../_actions';

import ChannelWrapper from '../_components/channel-wrapper';
import MessagesArea from './_components/messages-area';
import InputField from './_components/input-field';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  const session = await checkMembershipAndRedirect(groupId);

  return (
    <ChannelWrapper channelName={groupId}>
      <div className="flex flex-1 flex-col-reverse items-end p-4 overflow-y-scroll">
        <MessagesArea groupId={groupId} userId={session?.user.id ?? ''} />
      </div>
      <div className="p-4">
        <InputField groupId={groupId} />
      </div>
    </ChannelWrapper>
  );
};
