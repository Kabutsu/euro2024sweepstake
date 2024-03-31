'use client';

import { useState } from 'react';

import { usePosts } from '../_queries';

type Props = {
  groupId: string;
};

const InputField = ({ groupId }: Props) => {
  const { isLoading, createPost } = usePosts({ groupId });
  const [message, setMessage] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost(message);
        setMessage('');
      }}
      className="flex items-center justify-center"
    >
      <input
        type="text"
        placeholder={isLoading ? message : 'Type a message'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-10 p-2 pl-4 border-0 bg-gray-100 rounded-full"
        disabled={isLoading}
      />
    </form>
  );
};

export default InputField;