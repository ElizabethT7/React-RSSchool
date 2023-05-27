import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ViewToursPage from './ViewToursPage';

describe('ViewToursPage', () => {
  it('Renders text', () => {
    render(<ViewToursPage />);
    expect(screen.getByText(/Search Bar & Cards/i)).toBeInTheDocument();
  });
});
