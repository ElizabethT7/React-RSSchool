import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ToursPage from './ToursPage';
import userEvent from '@testing-library/user-event';

describe('ToursPage', () => {
  it('Renders text', () => {
    render(<ToursPage />);
    expect(screen.getByText(/Add new tour/i)).toBeInTheDocument();
  });
  test('renders FormSubmitMessage', async () => {
    render(<ToursPage />);
    expect(screen.queryByText(/The data has been saved/i)).toBeNull();
    await userEvent.click(screen.getByText(/Submit/i));
    screen.findByText(/The data has been saved/i);
  });
});
