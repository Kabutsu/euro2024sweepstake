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
});
