import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type JWT } from "next-auth/jwt";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsPovider from 'next-auth/providers/credentials';

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
    accessToken: unknown;
  }
}

async function refreshAccessToken(token: JWT) {
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

  await db.session.create({
    data: {
      userId: token.id as string,
      expires: new Date(exp),
      sessionToken: crypto.randomUUID(),
    },
    include: { user: true },
  });

  return {
    ...token,
    exp,
    iat: Math.floor(Date.now() / 1000),
  };
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 24 * 60 * 60, // 60 days
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  callbacks: {
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token ? token.id : user.id,
        email: token ? token.email : user.email,
      },
    }),

    jwt: ({ token, user }) => {
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
  
        if (Math.floor(Date.now() / 1000) >= (token.exp as number)) {
          return refreshAccessToken(token);
        }
      } catch (err) {
        console.error("Error during JWT callback:", err);
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    // FacebookProvider({
    //   clientId: env.FACEBOOK_CLIENT_ID,
    //   clientSecret: env.FACEBOOK_CLIENT_SECRET,
    // }),
    CredentialsPovider({
      name: 'Email',
      credentials: {
        username: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        try {
          const username = credentials?.username?.trim();
  
          if (!username) {
            console.error("No email provided for Email Login");
            return null;
          }
  
          const user = await db.user.findFirst({
            where: {
              email: {
                equals: username,
                mode: 'insensitive',
              },
            },
          });
  
          if (!user) {
            console.error(`User with email "${username}" not found`);
            return null;
          }
  
          return user;
        } catch (err) {
          console.error("Error during Email Login:", err);
          return null;
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
