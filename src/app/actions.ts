"use server";

import { client, getBaseUrl } from "@/server/api/upstash";

export async function startBackgroundJob() {
  try {
    const response = await client.publishJSON({
      "url": getBaseUrl() + "/long-task",
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
