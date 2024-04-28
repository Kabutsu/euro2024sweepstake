import { Suspense } from 'react';

import { api } from '~/lib/trpc/server';
import { type Users } from '~/server/api/root';

import UserCard from './user-card';
import LoadingCard from './loading-card';

type Props = {
  users: Users;
  groupId: string;
};

export default async function UsersArea ({ users, groupId }: Props) {
  const group = await api.group.getById({ id: groupId });

  return (
    <div className="flex flex-col w-full sm:px-4 py-3 gap-6">
      {users.map((user, index) => (
        <Suspense key={index} fallback={<LoadingCard />}>
          <UserCard key={user.id} user={user} group={group} />
        </Suspense>
      ))}
    </div>
  );
};
