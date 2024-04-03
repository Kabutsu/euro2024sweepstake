import 'server-only';

import PusherServer from 'pusher';

const opts: PusherServer.Options = {
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.PUSHER_APP_CLUSTER!,
  useTLS: true,
};

export const pusherServer = () => new PusherServer(opts);
