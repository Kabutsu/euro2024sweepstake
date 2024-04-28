'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type ObjectValues, getKeyByValue } from '~/types';

import { CircleInfoIcon, CommentsIcon } from '~/app/_components/icons';

const Paths = {
  Chat: 'chat',
  Info: 'info',
} as const;

type Props = {
  path: ObjectValues<typeof Paths>;
};

const getComponent = (path: Props['path']) => {
  switch (path) {
    case Paths.Chat:
      return CommentsIcon;
    case Paths.Info:
      return CircleInfoIcon;
  }
};

const HeaderLink = ({ path }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes(path);
  const Component = getComponent(path);

  return (
    <Link href={path} className={`sm:min-w-16 sm:p-1 text-center rounded-lg transition-colors duration-300 sm:hover:bg-gray-200 ${isActive ? 'sm:bg-gray-100' : ''}`}>
      <Component className="sm:hidden h-8 w-8 px-1 hover:fill-[#1963E0] fill-[#347dfa] transition-colors duration-200" />
      <p className="hidden sm:inline">{getKeyByValue(Paths, path)}</p>
    </Link>
  );
};

export default HeaderLink;
