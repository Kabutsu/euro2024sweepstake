'use client';

import Link from 'next/link';

import { useSidebar } from '~/lib/zustand';
import { PlusIcon } from '~/app/_components/icons';

const CreateItem = () => {
  const { toggle } = useSidebar();

  return (
    <Link href="/create" className="h-full w-auto content-center pr-3 transition-colors" onClick={toggle}>
      <PlusIcon className="w-8 h-8 fill-[#1963E0] hover:fill-[#347dfa]" />
    </Link>
  );
};

export default CreateItem;
