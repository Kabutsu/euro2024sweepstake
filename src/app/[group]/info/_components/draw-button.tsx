'use client';

import { generateDraw } from '../_actions/draw-action';

type Props = {
  groupId: string;
};

const DrawButton = ({ groupId }: Props) => {
  const handleDraw = async () => {
    await generateDraw(groupId);
  };

  return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white hover:bg-[#1963E0] bg-[#347dfa] transition-colors duration-[250ms]"
      onClick={handleDraw}
    >
      Run the Draw!
    </button>
  );
};

export default DrawButton;
