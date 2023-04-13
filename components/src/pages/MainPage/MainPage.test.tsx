import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainPage from './MainPage';

describe('MainPage', () => {
  it('Renders text', () => {
    render(<MainPage />);
    expect(screen.getByText(/Search Bar & Cards/i)).toBeInTheDocument();
  });
  it('Renders card from api', async () => {
    await render(<MainPage />);
    expect(screen.queryByText(/Rick Sanchez/i)).toBeNull();
    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();
  });
});
