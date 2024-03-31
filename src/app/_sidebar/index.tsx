import { api } from "~/trpc/server";
import { getServerAuthSession } from '~/server/auth';

import Layout from './layout';

import InteractableGroups from './_components/interactable-groups';

export default async function Sidebar() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  const allGroups = await api.group.getAll();

  return (
    <Layout>
      <InteractableGroups initialData={allGroups} />
    </Layout>
  );
};
