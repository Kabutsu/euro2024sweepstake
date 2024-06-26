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

  search: protectedProcedure
    .input(z.object({ searchTerm: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findMany({
        where: { name: { contains: input.searchTerm ?? '', mode: 'insensitive' } },
        include: { posts: { take: 1, orderBy: { createdAt: "desc" }, } },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findUnique({
        where: { id: input.id },
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

  checkUser: protectedProcedure
    .input(z.object({ groupId: z.string().min(1), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.group.findFirst({
        where: {
          id: input.groupId,
          users: { some: { id: input.userId } },
        },
      });
    }),

  join: protectedProcedure
    .input(z.object({ groupId: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.group.update({
        where: { id: input.groupId },
        data: {
          users: { connect: [{ id: input.userId }] },
        },
      });
    }),
});
