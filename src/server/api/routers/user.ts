import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });

      await ctx.db.account.create({
        data: {
          userId: user.id,
          type: "email",
          provider: "email",
          providerAccountId: user.email ?? user.id,
        },
      });

      return user;
    }),

  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getMembersOfGroup: protectedProcedure
    .input(z.object({ groupId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          groups: { some: { id: input.groupId } },
        },
      });
    }),
});
