import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ToursPage from './ToursPage';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';

describe('ToursPage', () => {
  it('Renders text', () => {
    renderWithProviders(<ToursPage />);
    expect(screen.getByText(/Add new tour/i)).toBeInTheDocument();
  });
  test('renders FormSubmitMessage', async () => {
    renderWithProviders(<ToursPage />);
    expect(screen.queryByText(/The data has been saved/i)).toBeNull();
    await userEvent.click(screen.getByText(/Submit/i));
    screen.findByText(/The data has been saved/i);
  });
});
