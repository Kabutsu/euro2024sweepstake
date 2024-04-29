'use client';

import { useGenerateDraw } from '../_queries';

type Props = {
  groupId: string;
};

const DrawButton = ({ groupId }: Props) => {
  const { isLoading, isSuccess, generate } = useGenerateDraw(groupId);

  if (isSuccess) return null;

  if (isLoading) return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white bg-gray-200 cursor-not-allowed"
      disabled
    >
      Generating...
    </button>
  );

  return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white hover:bg-[#1963E0] bg-[#347dfa] transition-colors duration-[250ms]"
      onClick={generate}
    >
      Run the Draw!
    </button>
  );
};

export default DrawButton;
