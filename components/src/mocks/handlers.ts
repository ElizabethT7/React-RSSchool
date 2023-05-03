import { rest } from 'msw';

const url = `https://rickandmortyapi.com/api/character/21`;

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 21,
          name: 'Aqua Morty',
          status: 'unknown',
          species: 'Humanoid',
          type: 'Fish-Person',
          gender: 'Male',
          origin: {
            name: 'unknown',
            url: '',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/10',
            'https://rickandmortyapi.com/api/episode/22',
          ],
          url: 'https://rickandmortyapi.com/api/character/21',
          created: '2017-11-04T22:39:48.055Z',
        },
      ])
    );
  }),
];
