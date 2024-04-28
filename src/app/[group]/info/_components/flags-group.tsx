import Image from 'next/image';

import { type Draws } from '~/server/api/root';

type Props = {
  draws: Draws;
  size: 'sm' | 'lg';
};

const getSize = (size: Props['size']) => {
  switch (size) {
    case 'sm':
      return 6;
    case 'lg':
      return 10;
  }
};

const byElimination = (a: Draws[number], b: Draws[number]) => {
  if (a.country.isEliminated && !b.country.isEliminated) return 1;
  if (!a.country.isEliminated && b.country.isEliminated) return -1;
  return a.country.seed - b.country.seed;
};

export default function FlagsGroup({ draws, size }: Props) {
  const s = getSize(size);

  return draws.sort(byElimination).map((draw, i) => (
    <div key={i} className={`has-tooltip w-${s} h-${s} relative`}>
      <span className={`tooltip w-max rounded-lg p-1 ${draw.country.isEliminated ? 'bg-[#b1ccfa]' : 'bg-[#347dfa]'} font-normal sm:font-semibold text-white text-[0.5rem] sm:text-xs text-center -mt-6 sm:-mt-8 left-[50%] translate-x-[-50%]`}>
        {draw.country.name}
      </span>
      <Image
        src={`/images/flags/${draw.country.name.toLocaleLowerCase().replaceAll(/\s/g, '-')}-flag-square-icon-128.png`}
        alt={draw.country.name}
        width={size === 'sm' ? 24 : 40}
        height={size === 'sm' ? 24 : 40}
        className={`rounded-full w-full h-full shadow-md hover:scale-110 transition-transform duration-300 ${draw.country.isEliminated ? 'opacity-40' : ''}`}
      />
    </div>
  ));
}
