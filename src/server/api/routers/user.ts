import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
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
