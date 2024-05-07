import UsersAreaLayout from "./users-area.layout";

import SkeletonCard from '../user-card/skeleton';

const UsersAreaLoading = () => (
  <UsersAreaLayout>
    {Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </UsersAreaLayout>
);

export default UsersAreaLoading;
