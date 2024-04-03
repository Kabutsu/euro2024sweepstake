import { z } from "zod";

import { pusherServer } from "~/lib/pusher/server";
import { messageTypes } from "~/lib/pusher/shared";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), postedIn: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("Creating post", input);
      const post = ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          postedIn: { connect: { id: input.postedIn } },
        },
      });

      console.log('Created post, awaiting');

      const { id, name: text, createdById } = await post;

      console.log('Awaited post, triggering pusher event');

      pusherServer.trigger(
        `group-${input.postedIn}`,
        messageTypes.NEW_MESSAGE,
        { id, text, createdById },
      ).then(() => console.log('Pusher event triggered'))
      .catch(console.error);

      console.log('Pusher event triggered, returning post', post);
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
