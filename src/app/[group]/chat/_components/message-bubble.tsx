import Image from 'next/image';

import { type Users } from '~/server/api/root';

type Props = {
  message: string;
  createdAt: Date;
  sender: Users[number];
  isSender: boolean;
  isSending?: boolean;
};

const MessageBubble = ({
  message,
  createdAt,
  sender: { name: senderName, image: avatar },
  isSender,
  isSending = false
}: Props) => {
  return (
    <div className={`flex flex-row items-end gap-1 sm:gap-2 my-1 ${isSender ? "" : "mr-auto"}`}>
      <Image
        src={avatar ?? "/images/user-solid.svg"}
        alt="User avatar"
        width={100}
        height={100}
        className={`rounded-full w-8 h-8 ${isSender ? "hidden" : ""}`}
      />
      <div
        className={`flex flex-col items-start px-4 py-2 w-max max-w-64 sm:max-w-xs md:max-w-md mx-2 rounded-lg ${
          isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
        } ${
          isSending ? "opacity-70" : ""
        }`}
      >
        {!isSender ? (
          <div className="flex flex-row items-center gap-1 text-gray-500 text-xs">
            <p className="font-semibold truncate">
              {senderName}
            </p>
            <p>
              {createdAt.toLocaleDateString('en-GB')}
            </p>
          </div>
        ) : null}
        <p className="text-wrap truncate">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
