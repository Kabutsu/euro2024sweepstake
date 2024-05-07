import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure
} from '~/server/api/trpc';

export const countryRouter = createTRPCRouter({
  getAllCountries: protectedProcedure.query(({ ctx }) => {
    return ctx.db.country.findMany();
  }),

  getCountryById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.country.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
