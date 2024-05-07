import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { groupRouter } from "~/server/api/routers/group";
import { userRouter } from "~/server/api/routers/user";
import { drawRouter } from "~/server/api/routers/draw";
import { countryRouter } from "~/server/api/routers/country";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  group: groupRouter,
  user: userRouter,
  draw: drawRouter,
  country: countryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type Posts = NonNullable<
  Awaited<ReturnType<typeof postRouter.getAll>>
>;

export type Groups = NonNullable<
  Awaited<ReturnType<typeof groupRouter.getAll>>
>;

export type Group = NonNullable<
  Awaited<ReturnType<typeof groupRouter.getById>>
>;

export type Users = NonNullable<
  Awaited<ReturnType<typeof userRouter.getAllUsers>>
>;

export type Draws = NonNullable<
  Awaited<ReturnType<typeof drawRouter.getDraw>>
>;

export type Countries = NonNullable<
  Awaited<ReturnType<typeof countryRouter.getAllCountries>>
>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
