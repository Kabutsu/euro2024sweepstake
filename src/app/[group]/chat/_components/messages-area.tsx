'use client';

import LoadingSpinner from '~/app/_components/loading-spinner';
import { type MessagesType } from '../_actions';
import { useMessages } from '../_queries';

import MessageBubble from './message-bubble';

type Props = {
  initialData: MessagesType;
  groupId: string;
  userId: string;
};

const MessagesArea = ({ groupId, userId, initialData }: Props) => {
  const { messages, isLoading } = useMessages({ groupId, initialData });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col p-4 h-0">
      {messages?.map(({ id, name: message, createdBy }) => (
        <MessageBubble key={id} message={message} isSender={createdBy.id === userId} />
      ))}
    </div>
  );
};

export default MessagesArea;
