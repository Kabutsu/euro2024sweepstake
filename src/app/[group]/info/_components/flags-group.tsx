import Image from 'next/image';

import { type Draws } from '~/server/api/root';

type Props = {
  draws: Draws;
  size: 'sm' | 'lg';
};

const getSize = (size: Pick<Props, 'size'>['size']) => {
  switch (size) {
    case 'sm':
      return 6;
    case 'lg':
      return 10;
  }
};

export default function FlagsGroup({ draws, size }: Props) {
  const s = getSize(size);

  return draws.map((draw, i) => (
    <Image
      key={i}
      src={`/images/flags/${draw.country.name.toLocaleLowerCase()}-flag-square-icon-128.png`}
      alt={draw.country.name}
      width={size === 'sm' ? 24 : 40}
      height={size === 'sm' ? 24 : 40}
      className={`rounded-full w-${s} h-${s} shadow-md hover:scale-110 transition-transform duration-300 ${draw.country.isEliminated ? 'opacity-40' : ''}`}
    />
  ));
}
