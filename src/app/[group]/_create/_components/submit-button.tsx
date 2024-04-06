type Props = {
  disabled?: boolean;
};
 
const SubmitButton = ({ disabled = false }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-[40%] p-2 bg-blue-500 hover:enabled:bg-blue-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-default"
    >
      Create!
    </button>
  );
};

export default SubmitButton;
