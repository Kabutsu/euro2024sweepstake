'use client'

import { useModal } from '~/lib/zustand';

type Props = {
  text: string;
  disabled?: boolean;
  sideEffect?: () => void;
};
 
const CancelButton = ({ text, disabled = false, sideEffect }: Props) => {
  const { close } = useModal();
 
  return (
    <button
      type="reset"
      onClick={() => {
        close();
        sideEffect && sideEffect();
      }}
      disabled={disabled}
      className="w-[40%] p-2 bg-gray-100 text-gray-950 hover:bg-gray-200 rounded-lg"
    >
      {text}
    </button>
  );
};

export default CancelButton;
