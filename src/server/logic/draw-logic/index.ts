import {
  type Users,
  type Countries,
} from '~/server/api/root';
import { type DrawInput } from '~/server/api/routers/draw';

const shuffle = <T>(arr: Array<T>) => {
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

  usersCopy.forEach(({ id: userId }) => {
    const userDraw: DrawInput = [];

    const drawCountry = (pot: Countries | undefined) => {
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

      userDraw.push({ userId, groupId, countryId: country.id });
    };

    drawCountry(pot1);
    drawCountry(pot2);
    drawCountry(pot3);
    drawCountry(pot4);

    draw.push(...userDraw);
  });

  return draw;
};
