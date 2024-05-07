import Image from 'next/image';

import { type Draws } from '~/server/api/root';

import { type AnimationDelay } from '../../_queries';

import FlagContainer from './flag-container';

type Props = {
  draws: Draws;
  size: 'sm' | 'lg';
  timeout: AnimationDelay | null;
};

export default function FlagsGroup({ draws, size, timeout }: Props) {
  return draws.map((draw, i) => (
    <FlagContainer
      key={i}
      size={size}
      timeout={timeout
        ? timeout.startRevealAt + (timeout.timeBetweenReveals * i)
        : -1
      }
    >
      <span className={`tooltip w-max rounded-lg p-1 ${draw.country.isEliminated ? 'bg-[#b1ccfa]' : 'bg-[#347dfa]'} font-normal sm:font-semibold text-white text-[0.5rem] sm:text-xs text-center -mt-6 sm:-mt-8 left-[50%] translate-x-[-50%]`}>
        {draw.country.name}
      </span>
      <Image
        src={`/images/flags/${draw.country.name.toLocaleLowerCase().replaceAll(/\s/g, '-')}-flag-square-icon-128.png`}
        alt={draw.country.name}
        width={size === 'sm' ? 40 : 128}
        height={size === 'sm' ? 40 : 128}
        className={`rounded-full w-full h-full shadow-md hover:scale-110 transition-transform duration-300 ${draw.country.isEliminated ? 'opacity-40' : ''}`}
      />
    </FlagContainer>
  ));
}
