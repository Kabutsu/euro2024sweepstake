'use client';

import { useQuery } from '@tanstack/react-query';

import {
  type MessagesType,
  getMessages,
} from '../_actions';

type Props = {
  initialData: MessagesType;
  groupId: string;
};

const MessagesArea = ({ initialData, groupId }: Props) => {
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
      {data.map((message) => (
        <div key={message.id} className="flex items-center space-x-2">
          <p className="font-semibold">{message.createdBy.name}</p>
          <p className="text-sm">{message.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesArea;
