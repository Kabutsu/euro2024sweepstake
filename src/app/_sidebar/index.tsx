import { getServerAuthSession } from '~/server/auth';

import { getGroups } from './_actions';

import Layout from './layout';

import InteractableGroups from './_components/interactable-groups';

export default async function Sidebar() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  const allGroups = await getGroups();

  return (
    <Layout>
      <InteractableGroups initialData={allGroups} />
    </Layout>
  );
};
