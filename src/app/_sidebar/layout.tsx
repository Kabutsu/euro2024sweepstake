export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden border-x border-l-0 border-gray-200">
      {children}
    </div>
  );
};
