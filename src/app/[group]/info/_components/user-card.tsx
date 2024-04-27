/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import { api } from '~/lib/trpc/server';

import { type Users, type Group } from '~/server/api/root';

type User = Users[number];

type Props = {
  user: User;
  group: Group | null;
};

export default async function UserCard({ user, group }: Props) {
  const draws = await api.draw.getDraw({ userId: user.id, groupId: group?.id ?? "" });

  return (
    <div className="flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1600px]:w-[70%] sm:hover:scale-105 transition-transform duration-300">
      <Image
        src={user.image ?? "/images/user-solid.svg"}
        alt={user.name ?? user.id}
        width={250}
        height={250}
        className="rounded-full w-24 h-24 p-4"
      />
      <div className="flex flex-col flex-1 sm:flex-initial sm:w-[30%] p-4 pl-0 sm:pl-4 truncate">
        <h2 className="text-xl font-semibold truncate">{user.name}</h2>
        <p className="hidden sm:block text-lg font-normal truncate">{user.email}</p>
        <div className="sm:hidden flex flex-row items-center flex-wrap gap-2 pt-1">
          {draws.map((draw, i) => (
            <Image
              key={i}
              src={`/images/flags/${draw.country.name}-flag-square-icon-128.png`}
              alt="Flag"
              width={128}
              height={128}
              className="rounded-full w-6 h-6 shadow-md"
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:flex flex-row items-center flex-wrap flex-1 gap-4 p-4">
        {draws.map((draw, i) => (
          <Image
            key={i}
            src={`/images/flags/${draw.country.name}-flag-square-icon-128.png`}
            alt="Flag"
            width={128}
            height={128}
            className="rounded-full w-10 h-10 shadow-md"
          />
        ))}
      </div>
    </div>
  );
};
