'use client'

import { useModal } from '~/lib/zustand';
 
const CancelButton = () => {
  const { close } = useModal();
 
  return (
    <button type="reset" onClick={close} className="w-[40%] p-2 bg-gray-100 text-gray-950 hover:bg-gray-200 rounded-lg">
      Cancel
    </button>
  );
};

export default CancelButton;
