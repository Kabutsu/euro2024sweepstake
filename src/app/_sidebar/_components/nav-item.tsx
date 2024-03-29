'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { api } from '~/trpc/server';

type PostType = NonNullable<
  Awaited<ReturnType<typeof api.post.getAll>>
>[number];

const NavItem = ({ post }: { post: PostType }) => {
  const pathname = usePathname();

  const groupId = new RegExp(`/${post.id.toString()}/`);
  const isActive = groupId.test(pathname);

  return (
    <Link href={`/${post.id}/chat`} className={`flex flex-col items-left justify-between w-full p-3 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}>
      <p className="font-semibold text-base truncate">
        {post.name}
      </p>
      <p className="font-light text-sm truncate">
        {post.createdAt.toLocaleString()}
      </p>
    </Link>
  );
};

export default NavItem;