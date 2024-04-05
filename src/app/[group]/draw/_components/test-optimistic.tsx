'use client';

import { useRef, useState, useOptimistic } from 'react';
import MessageBubble from '../../chat/_components/message-bubble';

type Message = {
  text: string;
  isSending?: boolean;
};

const TestOptimistic = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: typeof messages, newMessage: typeof messages[number]) => {
      return [...state, { ...newMessage, isSending: true }];
    }
  );

  async function sendMessage(message: FormData) {
    const text = message.get('message')?.toString() ?? '';
    addOptimisticMessage({ text });
    formRef.current?.reset();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setMessages((state) => [...state, { text }]);
  }

  return (
    <>
      {optimisticMessages.map(({ text, isSending }, index) => (
        <MessageBubble key={index} message={text} isSending={isSending} isSender />
      ))}
      <form
        action={sendMessage}
        ref={formRef}
        className="flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="Type a message"
          name="message"
          className="w-full h-10 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </form>
    </>
  );
};

export default TestOptimistic;
