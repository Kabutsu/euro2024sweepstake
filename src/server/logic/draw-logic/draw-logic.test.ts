import { drawTeams } from '.';

describe('drawTeams function', () => {
  const users = [
    { id: '1', name: 'Slaw', email: 'user1@example.com', emailVerified: null, image: null },
    { id: '2', name: 'Jop', email: 'user2@example.com', emailVerified: null, image: null },
    { id: '3', name: 'Moody', email: 'user3@example.com', emailVerified: null, image: null },
    { id: '4', name: 'Cudds', email: 'user4@example.com', emailVerified: null, image: null },
    { id: '5', name: 'Lucas', email: 'user5@example.com', emailVerified: null, image: null },
    { id: '6', name: 'Harree', email: 'user6@example.com', emailVerified: null, image: null },
    { id: '7', name: 'AP', email: 'user7@example.com', emailVerified: null, image: null },
    { id: '8', name: 'Smob', email: 'user8@example.com', emailVerified: null, image: null },
  ];

  const countries = [
    { id: '7', name: 'Netherlands', pot: 1, seed: 7, potSeed: 1, isEliminated: false },
    { id: '16', name: 'Senegal', pot: 1, seed: 16, potSeed: 2, isEliminated: false },
    { id: '29', name: 'Ecuador', pot: 1, seed: 29, potSeed: 3, isEliminated: false },
    { id: '30', name: 'Qatar', pot: 1, seed: 30, potSeed: 4, isEliminated: false },
    
    { id: '5', name: 'England', pot: 2, seed: 5, potSeed: 1, isEliminated: false },
    { id: '15', name: 'USA', pot: 2, seed: 15, potSeed: 2, isEliminated: false },
    { id: '17', name: 'Wales', pot: 2, seed: 17, potSeed: 3, isEliminated: false },
    { id: '18', name: 'Iran', pot: 2, seed: 18, potSeed: 4, isEliminated: false },
    
    { id: '3', name: 'Argentina', pot: 3, seed: 3, potSeed: 1, isEliminated: false },
    { id: '12', name: 'Mexico', pot: 3, seed: 12, potSeed: 2, isEliminated: false },
    { id: '22', name: 'Poland', pot: 3, seed: 22, potSeed: 3, isEliminated: false },
    { id: '31', name: 'Saudi Arabia', pot: 3, seed: 31, potSeed: 4, isEliminated: false },
    
    { id: '4', name: 'France', pot: 4, seed: 4, potSeed: 1, isEliminated: false },
    { id: '9', name: 'Denmark', pot: 4, seed: 9, potSeed: 2, isEliminated: false },
    { id: '24', name: 'Tunisia', pot: 4, seed: 24, potSeed: 3, isEliminated: false },
    { id: '26', name: 'Australia', pot: 4, seed: 26, potSeed: 4, isEliminated: false },
    
    { id: '6', name: 'Spain', pot: 5, seed: 6, potSeed: 1, isEliminated: false },
    { id: '10', name: 'Germany', pot: 5, seed: 10, potSeed: 2, isEliminated: false },
    { id: '21', name: 'Japan', pot: 5, seed: 21, potSeed: 3, isEliminated: false },
    { id: '25', name: 'Costa Rica', pot: 5, seed: 25, potSeed: 4, isEliminated: false },
    
    { id: '2', name: 'Belgium', pot: 6, seed: 2, potSeed: 1, isEliminated: false },
    { id: '11', name: 'Croatia', pot: 6, seed: 11, potSeed: 2, isEliminated: false },
    { id: '20', name: 'Morocco', pot: 6, seed: 20, potSeed: 3, isEliminated: false },
    { id: '27', name: 'Canada', pot: 6, seed: 27, potSeed: 4, isEliminated: false },
    
    { id: '1', name: 'Brazil', pot: 7, seed: 1, potSeed: 1, isEliminated: false },
    { id: '14', name: 'Switzerland', pot: 7, seed: 14, potSeed: 2, isEliminated: false },
    { id: '19', name: 'Serbia', pot: 7, seed: 19, potSeed: 3, isEliminated: false },
    { id: '28', name: 'Cameroon', pot: 7, seed: 28, potSeed: 4, isEliminated: false },
    
    { id: '8', name: 'Portugal', pot: 8, seed: 8, potSeed: 1, isEliminated: false },
    { id: '13', name: 'Uruguay', pot: 8, seed: 13, potSeed: 2, isEliminated: false },
    { id: '23', name: 'South Korea', pot: 8, seed: 23, potSeed: 3, isEliminated: false },
    { id: '32', name: 'Ghana', pot: 8, seed: 32, potSeed: 4, isEliminated: false },
  ];

  it('should return a draw with correct structure', () => {
    const groupId = 'test-group';

    const draw = drawTeams(users, countries, groupId);

    // Check if every user has been assigned exactly 4 countries
    expect(draw.every((drawEntry) => drawEntry.userId && drawEntry.groupId && drawEntry.countryId)).toBe(true);

    // Check if every user has been assigned one country from each pot
    const pots = [1, 2, 3, 4];
    draw.forEach((drawEntry) => {
      const userCountries = draw.filter((entry) => entry.userId === drawEntry.userId);
      const userPots = userCountries.map((entry) => {
        const country = countries.find((c) => c.id === entry.countryId);
        return country ? country.potSeed : undefined;
      });
      expect(userPots.sort()).toEqual(pots);
    });

    // Check if all assigned countries are unique
    const countryIds = draw.map((entry) => entry.countryId);
    expect(new Set(countryIds).size).toBe(countryIds.length);
  });

  it('should throw an error if users or countries arrays are empty', () => {
    const groupId = 'test-group';
    expect(() => drawTeams([], countries, groupId)).toThrow();
    expect(() => drawTeams(users, [], groupId)).toThrow();
  });

  it('should throw an error if any pot has fewer countries than the number of users', () => {
    const invalidCountries = [
      { id: '1', name: 'Country 1', pot: 1, seed: 1, potSeed: 1, isEliminated: false },
      { id: '2', name: 'Country 2', pot: 2, seed: 2, potSeed: 2, isEliminated: false },
      { id: '3', name: 'Country 3', pot: 3, seed: 3, potSeed: 3, isEliminated: false },
      // Pot 4 is missing
    ];
    const groupId = 'test-group';
    expect(() => drawTeams(users, invalidCountries, groupId)).toThrow();
  });
});
