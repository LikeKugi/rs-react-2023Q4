import { afterEach, describe, expect } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import LimitSelection from '@/components/LimitSelection/LimitSelection';
import { renderWithProviders } from '@/__tests__/utils';

describe('<LimitSelection /> component tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    renderWithProviders(<LimitSelection />);
    expect(screen.getByText(/artworks/i)).toBeInTheDocument();
  });

  it('should work select', function () {
    renderWithProviders(<LimitSelection />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 8 } });
  });
});
