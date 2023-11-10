import { afterEach, describe, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LimitSelection from '@/components/LimitSelection/LimitSelection';

describe('<LimitSelection /> component tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(<LimitSelection limit={4} setLimit={vi.fn} />);
    expect(screen.getByText(/artworks/i)).toBeInTheDocument();
  });

  it('should work select', function () {
    const selectFunction = vi.fn();
    render(<LimitSelection limit={4} setLimit={selectFunction} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 8 } });
    expect(selectFunction).toHaveBeenCalled();
  });
});
