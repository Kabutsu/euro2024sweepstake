const InputField = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Type a message"
        className="w-full h-10 p-2 pl-4 border-0 bg-gray-100 rounded-full"
      />
    </div>
  );
};

export default InputField;