import { api } from "~/trpc/server";
import Layout from './layout';
import Scroller from './_components/scroller';
import SearchBar from './_components/searchbar';
import NavItem from './_components/nav-item';

// Server component.
// Fetches all groups on load.
// Passes all groups to the Scroller component.
// Scroller is a client component which uses React Query to search for groups.
export default async function Sidebar() {
  const allPosts = await api.post.getAll();

  return (
    <Layout>
      <h1 className="h-16 font-bold p-3 text-2xl">
        Groups
      </h1>
      <div className="pb-3 px-4">
        <SearchBar />
      </div>
      <Scroller>
        {allPosts.map((post) => (
          <NavItem key={post.id} post={post} />
        ))}
      </Scroller>
    </Layout>
  );
};
