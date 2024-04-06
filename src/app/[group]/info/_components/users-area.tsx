import { type Users } from '~/server/api/root';
import UserCard from './user-card';

type Props = {
  users: Users;
};

const UsersArea = ({ users }: Props) => {
  return (
    <div className="w-full sm:px-4 py-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersArea;
