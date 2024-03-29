import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  console.log('GroupId:', groupId);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-row justify-between w-full h-auto sm:h-16 p-4 pr-8 shadow-md">
        <div className="flex flex-row items-center gap-4">
          <Image src="/images/bars-solid.svg" alt="menu" width={0} height={0} className="h-6 w-6 cursor-pointer sm:hidden" />
          <h1 className="font-semibold text-xl sm:text-base truncate">
            Group Name
          </h1>
        </div>
        <nav className="flex flex-row gap-6 font-light text-base">
          <Link href="chat" className="sm:min-w-16 text-center">
            <Image src="/images/comments-solid.svg" alt="draw" width={0} height={0} className="sm:hidden h-7 w-7 px-1" />
            <p className="hidden sm:inline">Chat</p>
          </Link>
          <Link href="draw" className="sm:min-w-16 text-center">
            <Image src="/images/circle-info-solid.svg" alt="draw" width={0} height={0} className="sm:hidden h-7 w-7 px-1" />
            <p className="hidden sm:inline">Draw</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-1">
        {children}
      </div>
    </div>
  );
}
