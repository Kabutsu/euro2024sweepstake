import Link from 'next/link';

export default function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  console.log('GroupId:', groupId);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-row justify-between w-full h-16 p-4 pr-8 shadow-md">
        <h1 className="font-semibold text-base">
          Group Name
        </h1>
        <nav className="flex flex-row gap-6 font-light text-base">
          <Link href="draw" className="min-w-16 text-center">Draw</Link>
          <Link href="chat" className="min-w-16 text-center">Chat</Link>
        </nav>
      </div>
      <div className="flex flex-1">
        {children}
      </div>
    </div>
  );
}
