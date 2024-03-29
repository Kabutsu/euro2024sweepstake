import { api } from "~/trpc/server";
import Layout from './layout';
import Scroller from './_components/scroller';

export default async function Sidebar() {
  const allPosts = await api.post.getAll();

  return (
    <Layout>
      <h1>Sidebar</h1>
      <Scroller>
        {allPosts.map((post) => (
          <p key={post.id}>
            {post.name}
          </p>
        ))}
      </Scroller>
    </Layout>
  );
};
