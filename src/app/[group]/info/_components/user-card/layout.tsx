type Props = {
  interactable?: boolean;
  children: React.ReactNode;
};

const UserCardLayout = ({ children, interactable = false }: Props) => (
  <div className={`flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1640px]:w-[70%] transition-transform duration-300 ${interactable ? ' sm:hover:scale-105' : 'h-24 animate-pulse'}`}>
    {children}
  </div>
);

export default UserCardLayout;
