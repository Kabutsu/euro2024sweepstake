export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden sm:flex flex-col w-80 h-dvh overflow-hidden border-x border-l-0 border-gray-200">
      {children}
    </div>
  );
};
