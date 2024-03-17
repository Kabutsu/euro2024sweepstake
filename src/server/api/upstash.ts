import { Client } from '@upstash/qstash';

export function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const client = new Client({
  token: process.env.UPSTASH_TOKEN!,
});
