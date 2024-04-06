'use client';

import Image from 'next/image';

import { useSidebar } from '~/lib/zustand';

const SidebarMenu = () => {
  const { toggle } = useSidebar();

  return (
    <button onClick={toggle} className="w-auto h-auto sm:hidden">
      <Image src="/images/bars-solid.svg" alt="menu" width={0} height={0} className="h-6 w-6" />
    </button>
  );
};

export default SidebarMenu;