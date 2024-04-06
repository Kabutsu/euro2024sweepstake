'use client';

import { Fragment, useEffect } from 'react';

import { useModal } from '~/lib/zustand';

import JoinGroupForm from './_components/join-group-form';

type Props = {
  groupId: string;
  userId: string;
};

const JoinGroup = ({ groupId, userId }: Props) => {
  const { open } = useModal();

  useEffect(() => {
    open(<JoinGroupForm groupId={groupId} userId={userId} />);
  }, [open, groupId, userId]);

  return <Fragment />;
};

export default JoinGroup;
