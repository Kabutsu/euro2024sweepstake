import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Suspense } from 'react';

import { TRPCReactProvider } from "~/trpc/react";

import Sidebar from './_sidebar';
import SidebarSkeleton from './_sidebar/skeleton';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <main className="flex flex-row">
            <div className="w-80">
              <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
              </Suspense>
            </div>
            <div className="flex-1">
              {children}
            </div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
