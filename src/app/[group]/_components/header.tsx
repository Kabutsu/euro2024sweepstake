import { api } from '~/lib/trpc/server';

import TopBar from '~/app/_components/top-bar';
import HeaderLink from './header-link';

export default async function Header({ groupId }: { groupId: string }) {
  const group = await api.group.getById({ id: groupId });

  return (
    <TopBar title={group?.name}>
      <nav className="flex flex-row gap-6 font-light text-base">
        <HeaderLink path="chat" />
        <HeaderLink path="info" />
      </nav>
    </TopBar>
  );
};
