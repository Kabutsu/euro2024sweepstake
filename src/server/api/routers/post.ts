import { z } from "zod";
import { messageTypes, pusherServer } from "~/lib/pusher";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), postedIn: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post = ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          postedIn: { connect: { id: input.postedIn } },
        },
      });

      const { id, name: text, createdById } = await post;

      void pusherServer.trigger(
        `group-${input.postedIn}`,
        messageTypes.NEW_MESSAGE,
        { id, text, createdById },
      );

      return post;
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
