import Image from 'next/image';
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

import TopBar from './_components/top-bar';

const selectAGroup = (
  <>
    <span className="inline sm:hidden">Hit <Image src="/images/bars-solid.svg" alt="menu" width={0} height={0} className="w-6 h-6 pb-1 inline"/> to select a group</span>
    <span className="hidden sm:inline">Select a group</span>
  </>
);

const signInButton = (
  <Link
    href="/api/auth/signin"
    className="rounded-full bg-black/10 px-3 py-1 sm:px-4 sm:py-3 mr-1 sm:mr-2 text-xl sm:text-2xl font-semibold no-underline transition hover:bg-black/20"
  >
    Sign in
  </Link>
);

const topBarTitle = (
  <span className="inline">Euro <span className="text-[#1963E0]">2024</span> Sweepstake</span>
);

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-b from-[rgb(249,250,252)] to-[rgb(242,243,246)] text-gray-950">
      {session && (
        <TopBar title={topBarTitle} hideOnDesktop>
          <Link href="/api/auth/signout">
            <Image src="/images/user-solid.svg" alt="logout" width={0} height={0} className="h-7 w-7 cursor-pointer" />
          </Link>
        </TopBar>
      )}

      <div className="container flex flex-col items-center justify-center gap-12 md:gap-24 px-4 pb-16 pt-10 sm:pt-20 ">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-[5rem] text-center">
          Euro <span className="text-[#1963E0]">2024</span> Sweepstake
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-32 text-center sm:text-left">
          <div className="flex max-w-64 flex-col gap-4 p4">
            <h3 className="text-3xl font-bold">Get Involved</h3>
            <div className="text-xl">
              Setup, join and manage your own sweepstake with friends and family.
            </div>
          </div>
          <div className="flex max-w-64 flex-col gap-4 p4">
            <h3 className="text-3xl font-bold">Stay Connected</h3>
            <div className="text-xl">
              Live chat for each sweepstake group so that you never miss a moment.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center sm:text-left">
          <p className="text-2xl px-10 sm:px-0">
            {session ? selectAGroup : signInButton} and get started.
          </p>
        </div>
      </div>
      {session && (
        <Link
          href="/api/auth/signout"
          className="hidden sm:block absolute top-6 right-8 rounded-full bg-black/10 px-4 py-2 font-semibold no-underline transition hover:bg-black/20"
        >
          Sign out
        </Link>
      )}
    </div>
  );
};
