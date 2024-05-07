'use client';

import { type Users } from '~/server/api/root';

import UserCard from '../user-card/user-card';
import { useGroupDraws } from '../../_queries';

type Props = {
  users: Users;
  groupId: string;
};

const UsersArea = ({ users, groupId }: Props) => {
  const { draws, refreshData } = useGroupDraws(groupId);

  return (
    <div className="flex flex-col w-full sm:px-4 py-3 gap-6">
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          groupId={groupId}
          user={user}
          initialData={draws}
          refreshData={refreshData}
          index={index}
          totalUsers={users.length}
        />
      ))}
    </div>
  );
};

export default UsersArea;
