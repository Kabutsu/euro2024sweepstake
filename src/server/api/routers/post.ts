import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), postedIn: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          postedIn: { connect: { id: input.postedIn } },
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ groupId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { groupId: input.groupId },
        orderBy: { createdAt: "desc" },
        include: { createdBy: true },
      });
    }),

  getLatest: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).nullish(),
      cursor: z.number().nullish(),
      groupId: z.string().min(1),
    }))
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 25;
      const { cursor } = input;

      const items = await ctx.db.post.findMany({
        where: { groupId: input.groupId },
        orderBy: { createdAt: "desc" },
        include: { createdBy: true },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        nextCursor = items.pop()!.id;
      }

      return {
        items,
        nextCursor,
      };
    })
});
