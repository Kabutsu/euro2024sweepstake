import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { groupRouter } from "~/server/api/routers/group";
import { userRouter } from "~/server/api/routers/user";
import { drawRouter } from "~/server/api/routers/draw";

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

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
