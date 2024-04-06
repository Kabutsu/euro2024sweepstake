'use client';

import { useCallback, useState } from 'react';

import { useInfiniteMessages } from '../_queries';

type Props = {
  groupId: string;
};

const InputField = ({ groupId }: Props) => {
  const { isLoading, sendMessage } = useInfiniteMessages({ groupId });
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(() => {
    if (!message.trim()) return;
    
    sendMessage({ name: message, postedIn: groupId });
    setMessage('');
  }, [sendMessage, message, groupId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-center justify-center"
    >
      <input
        type="text"
        placeholder={isLoading ? message : 'Type a message'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-10 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
        disabled={isLoading}
      />
    </form>
  );
};

export default InputField;