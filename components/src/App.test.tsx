import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from './App';
import { renderWithProviders } from './utils/test-utils';

describe('App', () => {
  it('Renders text', () => {
    renderWithProviders(<App />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Search Bar & Cards');
  });
});
