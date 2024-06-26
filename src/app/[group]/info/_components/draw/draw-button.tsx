'use client';

import { useState } from 'react';
import { useChannel } from 'ably/react';

import { useGenerateDraw } from '../../_queries';
import { messageTypes } from '~/lib/ably/shared';
import { useGroupUserFetching, useModal } from '~/lib/zustand';
import DrawGroup from './draw-group';

type Props = {
  groupId: string;
};

const DrawButton = ({ groupId }: Props) => {
  const { generate, isLoading, isSuccess, isError } = useGenerateDraw(groupId);
  const { open } = useModal();
  const { isLoading: waiting } = useGroupUserFetching();

  const openModal = () => open(
    <DrawGroup 
      onSubmit={generate}
      isLoading={isLoading}
    />
  );

  const [isHidden, setIsHidden] = useState(isSuccess);

  useChannel(groupId, (message) => {
    if (message.name === messageTypes.DRAW_GENERATED) {
      setIsHidden(true);
    }
  });

  if (isError) return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white hover:bg-[#1963E0] bg-[#347dfa] transition-colors duration-[250ms]"
      onClick={openModal}
    >
      Failed. Retry?
    </button>
  );

  if (isHidden || isSuccess) return null;

  if (isLoading) return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white bg-gray-200 cursor-not-allowed"
      disabled
    >
      Generating...
    </button>
  );

  const disabled = waiting[groupId] == null || waiting[groupId];

  return (
    <button
      className="w-auto py-2 px-3 rounded-md shadow-md font-bold text-xl text-white hover:enabled:bg-[#1963E0] bg-[#347dfa] disabled:opacity-40 transition-colors duration-[250ms]"
      onClick={openModal}
      disabled={disabled}
    >
      Run the Draw!
    </button>
  );
};

export default DrawButton;
