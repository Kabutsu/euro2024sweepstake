'use client';

import { useSidebar, useModal } from '~/lib/zustand';
import { PlusIcon } from '~/app/_components/icons';
import CreateGroup from '~/app/[group]/_create';

const CreateItem = () => {
  const { toggle } = useSidebar();
  const { open } = useModal();

  const onClick = () => {
    open(<CreateGroup />);
    toggle();
  };

  return (
    <button onClick={onClick} className="h-full w-auto content-center pr-3 transition-colors">
      <PlusIcon className="w-8 h-8 fill-[#1963E0] hover:fill-[#347dfa]" />
    </button>
  );
};

export default CreateItem;
