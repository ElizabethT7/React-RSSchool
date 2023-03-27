import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('Renders text', () => {
    render(<App />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
