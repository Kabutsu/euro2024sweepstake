import SkeletonBar from '~/app/_components/skeleton-bar';

export default function LoadingCard() {
  return (
    <div className="flex flex-row rounded-lg shadow-md bg-gray-50 w-full min-[1600px]:w-[70%] h-24 animate-pulse">
      <div className="rounded-full w-16 h-16 m-4 bg-gray-300" />
      <div className="flex flex-col flex-1 sm:flex-initial h-16 sm:w-[30%] p-4 pt-6 pl-0 sm:pl-4 relative">
        <SkeletonBar />
      </div>
    </div>
  );
}
