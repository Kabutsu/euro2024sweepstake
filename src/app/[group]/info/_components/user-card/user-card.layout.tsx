import { type PropsWithChildren } from "react";

type Props = {
  isInteractable?: boolean;
};

const UserCardLayout = ({ children, isInteractable = false }: PropsWithChildren<Props>) => (
  <div className={`flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1640px]:w-[70%] transition-transform duration-300 ${isInteractable ? ' sm:hover:scale-105' : 'h-24 animate-pulse'}`}>
    {children}
  </div>
);

export default UserCardLayout;
