import { permanentRedirect } from 'next/navigation';

import { api } from '~/lib/trpc/server';

import { getServerAuthSession } from '~/server/auth';

import CancelButton from './_components/cancel-button';
import SubmitButton from './_components/submit-button';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    permanentRedirect('/');
  }
  
  const isInGroup = await api.group.checkUser({ groupId, userId: session.user.id });

  if (isInGroup) {
    permanentRedirect(`/${groupId}/chat`);
  }

  const group = await api.group.getById({ id: groupId });

  return (
    <div className="absolute -top-20 sm:-top-16 right-0 left-0 bottom-0 flex flex-col flex-1 items-center sm:justify-center gap-12 px-4 md:px-12 lg:px-24 pt-10 sm:pt-0 bg-gradient-to-b from-[rgb(249,250,252)] to-[rgb(242,243,246)] text-gray-950">
      <h1 className="text-3xl font-extrabold md:text-5xl md:leading-normal text-center">
        You are not part of <span className="inline italic">{group?.name}</span>
      </h1>
      <p className="text-2xl md:text-4xl font-semibold text-center">
        Would you like to join?
      </p>
      <div className="flex flex-col-reverse sm:flex-row justify-between w-[50%] sm:w-[80%] lg:w-[60%] gap-8 sm:gap-0">
        <CancelButton />
        <SubmitButton groupId={groupId} userId={session?.user.id ?? ''} />
      </div>
    </div>
  );
};
