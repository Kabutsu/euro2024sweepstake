import { getMessages } from './_actions';

import MessagesArea from './_components/messages-area';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  const posts = await getMessages(groupId);

  return (
    <div className="flex-1 overflow-y-scroll">
      <MessagesArea initialData={posts} groupId={groupId} />
    </div>
  );
};
