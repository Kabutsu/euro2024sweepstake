import {
  type Users,
  type Countries,
} from '~/server/api/root';
import { type DrawInput } from '~/server/api/routers/draw';

function abbaLoop<T>(arr: Array<T>, callback: (item: T | undefined) => boolean){
  let forward = true;
  let index = 0;

  while (!!arr.at(index) && callback(arr.at(index))) {
    if (forward) {
      // Going from first index to last
      if (index === arr.length - 1) {
        forward = false;
      } else {
        index++;
      }
    } else {
      // Going from last index to first
      if (index === 0) {
        forward = true;
      } else {
        index--;
      }
    }
  }
}

function shuffle<T>(arr: Array<T>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }

  return arr;
};

export const drawTeams = (users: Users, countries: Countries, groupId: string): DrawInput => {
  if (!users.length) {
    throw new Error('Error - users was empty');
  } else if (!countries.length) {
    throw new Error('Error - countries was empty');
  }

  const usersCopy = [...users];
  const countriesCopy = [...countries];

  const [pot1, pot2, pot3, pot4] = [1, 2, 3, 4].map((potSeed) => shuffle(countriesCopy.filter((country) => country.potSeed === potSeed)));

  const draw: DrawInput = [];

  abbaLoop(usersCopy, (user) => {
    function drawCountry(pot: Countries | undefined) {
      if (!pot) {
        throw new Error('Error - pot was null');
      } else if (!pot.length) {
        throw new Error('Error - pot was empty');
      }

      const randomIndex = Math.floor(Math.random() * pot.length);
      const country = pot.splice(randomIndex, 1)[0];

      if (!country) {
        throw new Error('Error - country was null');
      }

      draw.push({ userId: user?.id ?? '', groupId, countryId: country.id });
    };

    switch (true) {
      case !!pot1?.length:
        drawCountry(pot1);
        return true;
      case !!pot2?.length:
        drawCountry(pot2);
        return true;
      case !!pot3?.length:
        drawCountry(pot3);
        return true;
      case !!pot4?.length:
        drawCountry(pot4);
        return true;
      default:
        return false;
    }
  });

  return draw;
};
