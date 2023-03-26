import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ToursPage from './ToursPage';

describe('AboutPage', () => {
  it('Renders text', () => {
    render(<ToursPage />);
    expect(screen.getByText(/Add new tour/i)).toBeInTheDocument();
  });
});
