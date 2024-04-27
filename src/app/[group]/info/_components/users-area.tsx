import { api } from '~/lib/trpc/server';
import { type Users } from '~/server/api/root';

import UserCard from './user-card';

type Props = {
  users: Users;
  groupId: string;
};

export default async function UsersArea ({ users, groupId }: Props) {
  const group = await api.group.getById({ id: groupId });

  return (
    <div className="w-full sm:px-4 py-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} group={group} />
      ))}
    </div>
  );
};
