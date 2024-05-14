"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';

import { type AppRouter } from "~/server/api/root";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

const createAblyClient = () => new Ably.Realtime({
  authUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/ably`,
  recover: (lastConnectionDetails, shouldRecover) => {
    if (lastConnectionDetails.location === document.location.href) {
      shouldRecover(true);
    } else {
      shouldRecover(false);
    }
  }
});

let ablyClientSingleton: Ably.Realtime | undefined = undefined;
const getAblyClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new Ably client
    return createAblyClient();
  }
  // Browser: use singleton pattern to keep the same ably client
  return (ablyClientSingleton ??= createAblyClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const ablyClient = getAblyClient();

  useEffect(() => {
    return () => {
      ablyClient?.connection?.off();

      if (ablyClient?.connection?.state === 'connected') {
        ablyClient?.connection?.close();
      }
    };
  }, [ablyClient]);

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <NextAuthProvider>
          <AblyProvider client={ablyClient}>
            {props.children}
          </AblyProvider>
        </NextAuthProvider>
      </api.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
