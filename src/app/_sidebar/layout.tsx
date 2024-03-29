'use client';

import { useSidebar } from '~/zustand';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { isOpen } = useSidebar();

  return (
    <div className={`absolute sm:relative z-10 bg-white top-0 bottom-0 ${isOpen ? "" : "-translate-x-full sm:translate-x-0"} transition sm:transition-none ease-in-out delay-75 duration-300 flex flex-col w-screen sm:w-80 h-dvh overflow-hidden border-x border-l-0 border-gray-200`}>
      {children}
    </div>
  );
};

export default Layout;
