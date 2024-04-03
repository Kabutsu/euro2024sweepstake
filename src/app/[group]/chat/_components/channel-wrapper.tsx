'use client';

import { ChannelProvider } from 'ably/react';

type Props = {
  channelName: string;
  children: React.ReactNode;
}

const ChannelWrapper = ({ channelName, children }: Props) => {

  return (
    <ChannelProvider channelName={channelName}>
      {children}
    </ChannelProvider>
  );
};

export default ChannelWrapper;
