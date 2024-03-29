export default function Scroller({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 overflow-y-scroll">
      {children}
    </div>
  );
};
