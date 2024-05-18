'use client';

import { useRouter } from 'next/navigation';

const CancelButton = () => {
  const router = useRouter();

  return (
    <button
      type="reset"
      onClick={() => router.back()}
      className="rounded-full bg-gray-200 hover:bg-gray-300 px-3 py-1 sm:px-4 sm:py-3 text-xl sm:text-2xl h-14 sm:h-auto font-semibold no-underline transition shadow-md sm:shadow-none"
    >
      No thanks
    </button>
  );
};

export default CancelButton;
