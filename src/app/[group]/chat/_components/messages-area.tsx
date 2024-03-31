'use client';

import { type MessagesType } from '../_actions';
import { usePosts } from '../_queries';

import MessageBubble from './message-bubble';

type Props = {
  initialData: MessagesType;
  groupId: string;
  userId: string;
};

const MessagesArea = ({ initialData, groupId, userId }: Props) => {
  const { data, isLoading } = usePosts({ groupId, initialData });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col flex-1 p-4 overflow-y-auto">
      {data?.map(({ id, name: message, createdBy }) => (
        <MessageBubble key={id} message={message} isSender={createdBy.id === userId} />
      ))}
    </div>
  );
};

export default MessagesArea;
