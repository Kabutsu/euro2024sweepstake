'use client';

type Props = {
  groupId: string;
};

const DrawButton = ({ groupId }: Props) => {
  return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white hover:bg-[#1963E0] bg-[#347dfa] transition-colors duration-[250ms]"
      onClick={() => alert('Not implemented yet')}
    >
      Run the Draw!
    </button>
  );
};

export default DrawButton;
