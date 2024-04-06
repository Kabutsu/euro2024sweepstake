import Image from 'next/image';

import { type Users } from '~/server/api/root';

type User = Users[number];

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <Image
        src={user.image ?? "/images/icons/user-solid.svg"}
        alt={user.name ?? user.id}
        width={250}
        height={250}
        className="rounded-full w-16 h-16"
      />
    </div>
  );
};

export default UserCard;
