/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const drawRouter = createTRPCRouter({
  getDraw: protectedProcedure
    .input(z.object({ userId: z.string().min(1), groupId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.draw.findMany({
        where: { userId: input.userId, groupId: input.groupId },
        include: { country: true },
      });
    }),

  createDraw: protectedProcedure
    .input(z.object({ userId: z.string().min(1), groupId: z.string().min(1), countryId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.draw.create({
        data: {
          group: { connect: { id: input.groupId } },
          user: { connect: { id: input.userId } },
          country: { connect: { id: input.countryId } },
        },
      });
    }),
});