'use client';

import { useRouter } from 'next/navigation';

import { useJoinGroup } from '../_queries';

type Props = {
  groupId: string;
  userId: string;
};

const SubmitButton = ({ groupId, userId }: Props) => {
  const router = useRouter();

  const { joinGroup, isJoining } = useJoinGroup({
    onJoin: () => {
      router.refresh();
    },
  });

  return (
    <button
      type="submit"
      disabled={isJoining}
      onClick={() => joinGroup({ groupId, userId })}
      className="rounded-full bg-[#347dfa] hover:bg-[#1963E0] px-3 py-1 sm:px-4 sm:py-3 text-white text-xl sm:text-2xl h-14 sm:h-auto font-semibold no-underline transition shadow-md sm:shadow-none"
    >
      Yes Please!
    </button>
  );
};

export default SubmitButton;
