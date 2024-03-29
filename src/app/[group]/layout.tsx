import Link from 'next/link';

export default function Layout({ children, params: { group: groupId } }: { children: React.ReactNode, params: { group: string } }) {
  console.log('GroupId:', groupId);
  
  return (
    <>
      <div>
        <p>Group Name</p>
        <nav>
          <Link href="draw">Draw</Link>
          <Link href="chat">Chat</Link>
        </nav>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}
