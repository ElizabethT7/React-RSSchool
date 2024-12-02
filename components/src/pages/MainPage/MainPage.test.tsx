import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MainPage from './MainPage';

describe('MainPage', () => {
  it('Renders text', () => {
    render(<MainPage />);
    expect(screen.getByText(/Search Bar & Cards/i)).toBeInTheDocument();
  });
});
