type Props = {
  children: React.ReactNode;
};

export const UsersAreaLayout = ({ children }: Props) => (
  <div className="flex flex-col w-full sm:px-4 py-3 gap-6">
    {children}
  </div>
);

export default UsersAreaLayout;
