'use client';

import { useRef, useState } from 'react';

import { useMessages } from '../_queries';

type Props = {
  groupId: string;
};

const InputField = ({ groupId }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoading, sendMessage, triggerMessage } = useMessages({ groupId });

  const formAction = (formData: FormData) => {
    const message = formData.get('message')?.toString() ?? '';
    triggerMessage({ name: message });
    sendMessage({ name: message, postedIn: groupId });
    formRef.current?.reset();
  };

  return (
    <form
      action={formAction}
      ref={formRef}
      className="flex items-center justify-center"
    >
      <input
        type="text"
        placeholder="Type a message"
        name="message"
        className="w-full h-10 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
        disabled={isLoading}
      />
    </form>
  );
};

export default InputField;