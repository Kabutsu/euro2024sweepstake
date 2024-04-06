'use client';

import { useRouter } from 'next/navigation';

import { useModal } from '~/lib/zustand';

import CancelButton from '~/app/_components/cancel-button';
import SubmitButton from '~/app/_components/submit-button';

import { useJoinGroup } from '../_queries';

type Props = {
  groupId: string;
  userId: string;
};

const JoinGroup = ({ groupId, userId }: Props) => {
  const { close } = useModal();
  const router = useRouter();

  const { group, joinGroup, isJoining } = useJoinGroup({
    groupId,
    onJoin: () => {
      close();
      router.refresh();
    },
  });

  const formAction = (_: FormData) => {
    joinGroup({ groupId, userId });
  };

  return (
    <form action={formAction} className="flex flex-col gap-3 items-center justify-center text-center">
      <h1 className="text-xl font-bold text-wrap">You are not part of &quot;{group?.name}&quot;</h1>
      <p className="text-lg font-normal text-wrap">Would you like to join?</p>
      <div className="flex flex-row justify-between w-full mt-2">
        <CancelButton text="No thanks" sideEffect={() => router.back()} />
        <SubmitButton text="Yes Please!" disabled={isJoining} />
      </div>
    </form>
  );
};

export default JoinGroup;
