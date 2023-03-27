import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import Form from './Form';
import { FormFieldsProps } from './types';

const FormFields = {
  title: 'Tour',
  startDate: '2023-03-26',
  description: 'Group',
  destinations: 'Bangkok',
  age: '18 to 39 year olds',
  price: '1,350',
  discountPercentage: 20,
  discountPrice: '1,080',
  save: 270,
  pricePerDay: 77,
  tourLength: 14,
  image: 'https://cdn.tourradar.com/s3/tour/645x430/67027_5dfb47423685e.jpg',
};

let cards: FormFieldsProps[] = [FormFields];

const onsubmit = (data: FormFieldsProps) => (cards = [...cards, data]);

describe('Form', () => {
  it('Renders text', () => {
    render(<Form onSubmit={onsubmit} />);
    expect(screen.getByLabelText(/Tour name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tour name/i)).not.toBeRequired();
    expect(screen.getByLabelText(/Tour name/i)).toBeEmptyDOMElement();
  });
  it('Renders errors text', async () => {
    render(<Form onSubmit={onsubmit} />);
    expect(screen.queryByText(/Travel style should be checked/i)).toBeNull();
    await userEvent.click(screen.getByText(/Submit/i));
    screen.findByText(/Travel style should be checked/i);
  });
  it('Renders errors text', async () => {
    render(<Form onSubmit={onsubmit} />);
    expect(screen.queryByText(/Discount should be at least 0/i)).toBeNull();
    await userEvent.click(screen.getByText(/Submit/i));
    screen.findByText(/Discount should be at least 0/i);
  });
  it('Renders text input', async () => {
    render(<Form onSubmit={onsubmit} />);
    userEvent.type(screen.getByTestId('name'), 'Tour');
    expect(screen.findByText('Tour'));
  });
  it('Renders number input', async () => {
    render(<Form onSubmit={onsubmit} />);
    userEvent.type(screen.getByTestId('number'), '5');
    expect(screen.findByText('5'));
  });
});

describe('events', () => {
  it('Checkbox click'),
    async () => {
      const handleChange = vi.fn;
      const container = render(<input type="checkbox" onChange={handleChange} />);

      const checkbox = container.findByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(await checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(checkbox).toBeChecked();
    };
  it('Input to be focus'),
    () => {
      const { getByTestId } = render(<input type="text" data-testid="name" />);
      const input = getByTestId('name');
      expect(input).not.toHaveFocus();
      input.focus();
      expect(input).toHaveFocus;
    };
});
