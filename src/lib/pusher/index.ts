import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

import { env } from '~/env';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.PUSHER_APP_CLUSTER as string,
  useTLS: true,
});

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export const messageTypes = {
  NEW_MESSAGE: 'new-message',
} as const;
