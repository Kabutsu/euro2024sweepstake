import Image from 'next/image';

type Props = {
  message: string;
  isSender: boolean;
  avatar: string | null;
  isSending?: boolean;
};

const MessageBubble = ({ message, isSender, avatar, isSending = false }: Props) => {
  return (
    <div className={`flex flex-row items-end gap-2 my-1 ${isSender ? "" : "mr-auto"}`}>
      <Image
        src={avatar ?? "/images/icons/user-solid.svg"}
        alt="User avatar"
        width={100}
        height={100}
        className={`rounded-full w-8 h-8 ${isSender ? "hidden" : ""}`}
      />
      <div
        className={`flex flex-col px-4 py-2 w-max max-w-64 sm:max-w-xs md:max-w-md mx-2 rounded-lg ${
          isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
        } ${
          isSending ? "opacity-70" : ""
        }`}
      >
        <p className="text-wrap truncate">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
