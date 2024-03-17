import { type NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

async function handle(_req: NextRequest) {
  console.log("Request received");

  // for (let i = 0; i < 10; i++) {
  //   await fetch("https://euro2024test.requestcatcher.com/test", {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   await new Promise(resolve => setTimeout(resolve, 500));
  // }

  return NextResponse.json({ success: true, message: "Hello, World!" });
};

export const POST = verifySignatureAppRouter(handle);
