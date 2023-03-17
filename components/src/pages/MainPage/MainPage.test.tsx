import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
//import data from '../../assets/data';
//import Card from '../../components/Card/Card';

import MainPage from './MainPage';

describe('MainPage', () => {
  it('Renders text', () => {
    render(<MainPage />);
    expect(screen.getByText(/Search Bar & Cards/i)).toBeInTheDocument();
  });
  /*it('Renders all cards', () => {
    render(<MainPage data-testid="card" />);

    expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
  });*/
});
