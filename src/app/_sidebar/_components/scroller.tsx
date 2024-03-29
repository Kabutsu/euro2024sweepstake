export default function Scroller({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 p-2 pl-3 pt-0 overflow-y-scroll">
      {children}
    </div>
  );
};
