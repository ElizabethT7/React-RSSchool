import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('Renders text', () => {
    render(<AboutPage />);
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
