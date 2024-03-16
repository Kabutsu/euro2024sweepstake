"use client";

import { startBackgroundJob } from "@/app/actions";

export function PostStash() {
  async function handleClick() {
    await startBackgroundJob();
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
    >
      Start Background Job
    </button>
  );
};
