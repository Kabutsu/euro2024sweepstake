/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const singleDrawInput = z.object({ userId: z.string().min(1), groupId: z.string().min(1), countryId: z.string().min(1) });
const createDrawInput = z.array(singleDrawInput);

export const drawRouter = createTRPCRouter({
  getDraw: protectedProcedure
    .input(z.object({ userId: z.string().min(1), groupId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.draw.findMany({
        where: { userId: input.userId, groupId: input.groupId },
        include: { country: true },
      });
    }),

  checkGroupDraw: protectedProcedure
    .input(z.object({ groupId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const draw = await ctx.db.draw.findFirst({
        where: { groupId: input.groupId },
      });

      return !!draw;
    }),

  createDraw: protectedProcedure
    .input(createDrawInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.draw.createMany({
        data: input.map((draw) => ({
          userId: draw.userId,
          groupId: draw.groupId,
          countryId: draw.countryId,
        })),
      });
    }),
});

export type DrawInput = z.infer<typeof createDrawInput>;