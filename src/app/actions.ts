"use server";

import { client, getBaseUrl } from "@/server/api/upstash";

export async function startBackgroundJob() {
  try {
    const url = getBaseUrl() + "/api/upstash/long-task";
    console.log(url);
    const response = await client.publishJSON({
      url,
      body: {
        "hello": "world",
      },
    });

    return response.messageId;
  } catch (error) {
    console.error("Failed to start background job", error);
    return null;
  }
};
