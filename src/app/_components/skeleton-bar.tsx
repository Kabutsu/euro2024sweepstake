export default function SkeletonBar({ rounded = 'lg' }: { rounded: 'full' | 'lg' | 'none' }) {
  return (
    <div className={`w-full h-full animate-pulse bg-gray-200 rounded-${rounded}`} />
  );
};
