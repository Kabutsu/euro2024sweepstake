import { Client } from '@upstash/qstash';

export function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://deveuro2024sweepstake.vercel.app";
};

export const client = new Client({
  token: process.env.UPSTASH_TOKEN!,
});
