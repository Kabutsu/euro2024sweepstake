'use client';

import { type Draws, type Users } from '~/server/api/root';

import UserCard from '../user-card/user-card';
import { useGroupDraws } from '../../_queries';

type Props = {
  users: Users;
  groupId: string;
};

const byWinChance = (draws: Draws) => (a: Users[number], b: Users[number]) => {
  const aDraw = draws.filter((draw) => draw.userId === a.id && !draw.country.isEliminated);
  const bDraw = draws.filter((draw) => draw.userId === b.id && !draw.country.isEliminated);

  if (!(aDraw.length || bDraw.length)) {
    return (a.name ?? '').localeCompare(b.name ?? '');
  }

  if (aDraw.length !== bDraw.length) {
    return bDraw.length - aDraw.length;
  }

  return Math.min(
    ...aDraw.map((draw) => draw.country.seed)
  ) - Math.min(
    ...bDraw.map((draw) => draw.country.seed)
  );
};

const UsersArea = ({ users, groupId }: Props) => {
  const { draws, refreshData } = useGroupDraws(groupId);

  return (
    <div className="flex flex-col w-full sm:px-4 py-3 gap-6">
      {users.sort(byWinChance(draws)).map((user, index) => (
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
