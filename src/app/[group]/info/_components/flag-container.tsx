'use client';

import { useState, useEffect, useMemo } from 'react';

type Props = {
  size: 'sm' | 'lg';
  timeout: number;
  children: React.ReactNode;
};

const getSize = (size: Props['size']) => {
  switch (size) {
    case 'sm':
      return 6;
    case 'lg':
      return 10;
  }
};

const FlagContainer = ({ size, timeout, children }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  const s = useMemo(() => getSize(size), [size]);

  return (
    <div className={`has-tooltip w-${s} h-${s} relative transition-opacity duration-[1500ms] ${(isLoaded || timeout < 0) ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

export default FlagContainer;
