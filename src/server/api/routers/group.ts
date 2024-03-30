import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.group.findMany({
      include: { posts: { take: 1, orderBy: { createdAt: "desc" }, } },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.group.create({
        data: {
          name: input.name,
          users: { connect: [{ id: ctx.session.user.id }] }
        },
      });
    }),
});
