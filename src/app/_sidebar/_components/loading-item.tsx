import SkeletonBar from '~/app/_components/skeleton-bar';

export default function LoadingItem() {
  return (
    <div className="flex flex-col items-left justify-between w-full p-3 gap-2">
      <div className="w-[80%] h-6">
        <SkeletonBar />
      </div>
      <div className="w-[60%] h-5">
        <SkeletonBar />
      </div>
    </div>
  )
}