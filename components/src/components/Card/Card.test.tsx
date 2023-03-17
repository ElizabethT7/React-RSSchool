import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card from './Card';

const card = {
  id: 1,
  title: 'Thailand Island Hopper',
  description: 'Active Adventure, Beach, Private, Group, Fully Guided, Explorer',
  destinations: 'Bangkok, Surat Thani, Khao Sok National Park, Ko Pha Ngan, Koh Tao, Ao Nang',
  age: '18 to 39 year olds',
  price: '1,350',
  discountPercentage: 20,
  discountPrice: '1,080',
  save: 270,
  rating: 4.5,
  pricePerDay: 77,
  TourLength: 14,
  image: 'https://cdn.tourradar.com/s3/tour/645x430/67027_5dfb47423685e.jpg',
};

describe('Card', () => {
  it('Should show title', () => {
    render(<Card card={card} />);
    expect(screen.getByText(/Thailand Island Hopper/i)).toBeInTheDocument();
  });
  it('Renders card alt text', () => {
    render(<Card card={card} />);
    expect(screen.getByAltText('product image')).toBeInTheDocument();
  });
  it('Renders all cards', () => {
    render(<Card card={card} data-testid="card" />);

    expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
  });
});
