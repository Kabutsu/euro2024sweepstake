'use client';

import { useState } from 'react';

import { useCreateGroup } from './_queries';

import CancelButton from '~/app/_components/cancel-button';
import SubmitButton from '~/app/_components/submit-button';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');

  const { createGroup, isPending } = useCreateGroup({
    onSuccess: () => setGroupName(''),
  });

  const formAction = (_: FormData) => {
    if (!groupName.length) return;

    createGroup({ name: groupName });
  };

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <h1 className="text-center text-xl font-bold">Create a Group</h1>
      <input
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        disabled={isPending}
        className="w-full h-9 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <div className="flex flex-row justify-between mt-2">
        <CancelButton text="Cancel" />
        <SubmitButton text="Create!" disabled={isPending || !groupName.length} />
      </div>
    </form>
  );
};

export default CreateGroup;
