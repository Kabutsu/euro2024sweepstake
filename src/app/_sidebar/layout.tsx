export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-full overflow-hidden">
      {children}
    </div>
  );
};
