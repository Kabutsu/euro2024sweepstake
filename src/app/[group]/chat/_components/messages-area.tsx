'use client';

import { useQuery } from '@tanstack/react-query';

import {
  type MessagesType,
  getMessages,
} from '../_actions';

import MessageBubble from './message-bubble';

type Props = {
  initialData: MessagesType;
  groupId: string;
  userId: string;
};

const MessagesArea = ({ initialData, groupId, userId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['messages', groupId],
    queryFn: () => getMessages(groupId),
    initialData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col flex-1 p-4 overflow-y-auto">
      {data.map(({ id, name: message, createdBy }) => (
        <MessageBubble key={id} message={message} isSender={createdBy.id === userId} />
      ))}
    </div>
  );
};

export default MessagesArea;
