import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  it('Renders modal', () => {
    const setModalActive = vi.fn;
    const { unmount } = render(
      <Modal active={true} setActive={setModalActive}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    unmount();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });
});
