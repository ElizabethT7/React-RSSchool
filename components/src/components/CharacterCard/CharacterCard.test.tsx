import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CharacterCard from './CharacterCard';

const character = {
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
};

describe('Card', () => {
  it('Should show gender', () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });
  it('Renders all cards', () => {
    render(<CharacterCard character={character} data-testid="character" />);

    expect(screen.getAllByTestId('character').length).toBeGreaterThan(0);
  });
});
