type Props = {
  message: string;
  isSender: boolean;
  isSending?: boolean;
};

const MessageBubble = ({ message, isSender, isSending = false }: Props) => {
  return (
    <div
      className={`flex flex-col px-4 py-2 w-max max-w-64 sm:max-w-xs md:max-w-md mx-2 my-1 rounded-lg ${
        isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
      } ${isSending ? " opacity-50" : ""}`}
    >
      <p className="text-wrap truncate">
        {message}
      </p>
    </div>
  );
};

export default MessageBubble;
