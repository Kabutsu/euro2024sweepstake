import Image from 'next/image';

import { type Users } from '~/server/api/root';

type User = Users[number];

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex flex-row rounded-lg shadow-md bg-gray-50 w-full sm:w-[60%]">
      <Image
        src={user.image ?? "/images/icons/user-solid.svg"}
        alt={user.name ?? user.id}
        width={250}
        height={250}
        className="rounded-full w-24 h-24 p-4"
      />
      <div className="flex flex-col flex-1 p-4 pl-0 sm:pl-4 truncate">
        <h2 className="text-xl font-semibold truncate">{user.name}</h2>
        <p className="text-lg font-normal truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
