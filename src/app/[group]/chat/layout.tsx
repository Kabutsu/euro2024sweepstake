import { Suspense } from 'react';

import InputField from './_components/input-field';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-auto flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
      <div className="p-4">
        <InputField />
      </div>
    </div>
  );
};