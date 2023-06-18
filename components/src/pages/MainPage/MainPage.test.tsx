import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainPage from './MainPage';

import { renderWithProviders } from '../../utils/test-utils';
import { CharacterState } from '../../state/reducers/characterSlice';

describe('MainPage', () => {
  it('Renders text', () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByText(/Find a companion for your journey/i)).toBeInTheDocument();
  });
  it('Renders card from api', async () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(screen.queryByText(/Aqua/i)).toBeNull();
    it('Card preloaded state to render', () => {
      const initialCharacters: CharacterState = {
        characters: [
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
        ],
        isLoading: false,
        error: '',
      };
      const { getByText } = renderWithProviders(<MainPage />, {
        preloadedState: {
          characterReducer: initialCharacters,
        },
      });
      expect(getByText);
      expect(screen.findByText(/Aqua/i)).toBeInTheDocument();
    });
  });
});
