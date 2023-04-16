import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ViewToursPage from './ViewToursPage';
import { renderWithProviders } from '../../utils/test-utils';

describe('ViewToursPage', () => {
  it('Renders text', () => {
    renderWithProviders(<ViewToursPage />);
    expect(screen.getByText(/Search Bar & Cards/i)).toBeInTheDocument();
  });
});
