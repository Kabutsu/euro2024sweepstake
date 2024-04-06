import Ably from 'ably';
import { headers } from 'next/headers';

const handler = async (_: Request) => {
  const headersList = headers();
  const referer = headersList.get('referer');

  const clientId = referer ? new URL(referer).hostname : 'localhost';

  const client = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
    clientId,
  });

  const tokenRequestData = await client.auth.createTokenRequest({ clientId, timestamp: Date.now() });

  return Response.json(tokenRequestData);
};

export { handler as GET, handler as POST };
