import 'server-only';

import { permanentRedirect } from 'next/navigation';

import { api } from '~/lib/trpc/server';

import { getServerAuthSession } from '~/server/auth';

export async function checkMembershipAndRedirect(groupId: string) {
  const session = await getServerAuthSession();

  if (!session) {
    permanentRedirect('/');
  }

  const isInGroup = await api.group.checkUser({ groupId, userId: session.user.id });

  if (!isInGroup) {
    permanentRedirect(`join`);
  }

  return session;
}
