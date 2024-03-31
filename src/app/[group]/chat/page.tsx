import { getServerAuthSession } from '~/server/auth';

import { getMessages } from './_actions';

import MessagesArea from './_components/messages-area';
import InputField from './_components/input-field';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  const session = await getServerAuthSession();
  const posts = await getMessages(groupId);

  return (
    <>
      <div className="flex-1 overflow-y-scroll">
        <MessagesArea initialData={posts} groupId={groupId} userId={session?.user.id ?? ''} />
      </div>
      <div className="p-4">
        <InputField groupId={groupId} />
      </div>
    </>
  );
};
