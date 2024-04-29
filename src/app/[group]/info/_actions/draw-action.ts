'use server';

import { api } from '~/lib/trpc/server';

import { drawTeams } from '~/server/logic/draw-logic';

export async function generateDraw(groupId: string) {
  const users = await api.user.getMembersOfGroup({ groupId });
  const countries = await api.country.getAllCountries();

  const draw = drawTeams(users, countries, groupId);

  await api.draw.createDraw(draw);

  return draw.map((d) => ({
    ...d,
    country: countries.find((c) => c.id === d.countryId),
  }));
}
