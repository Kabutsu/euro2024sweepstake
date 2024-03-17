import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

export async function POST(request: Request) {
  const data: Record<string, any> = await request.json();

  for (let i = 0; i < 10; i++) {
    await fetch("https://euro2024test.requestcatcher.com/test", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  }


  return Response.json({ success: true });
};
