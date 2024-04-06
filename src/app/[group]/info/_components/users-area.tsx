import { type Users } from '~/server/api/root';
import UserCard from './user-card';

type Props = {
  users: Users;
};

const UsersArea = ({ users }: Props) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersArea;
