"use server";

import { Client } from '@upstash/qstash';

const client = new Client({
  token: process.env.UPSTASH_TOKEN!,
});

export async function startBackgroundJob() {
  await client.publishJSON({
    url: "https://euro2024test.requestcatcher.com/test",
    body: {
      "hello": "world"
    }
  })
};
