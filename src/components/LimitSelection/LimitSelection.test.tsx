import { afterEach, describe, expect, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import LimitSelection from '@/components/LimitSelection/LimitSelection';
import { renderWithProviders } from '@/__tests__/utils';
import * as storeHooks from '@/store/hooks';
import { setLimit } from '@/store/navigationSlice/navigationSlice';

describe('<LimitSelection /> component tests', () => {
  const spyAppDispatch = vi.spyOn(storeHooks, 'useAppDispatch');

  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    renderWithProviders(<LimitSelection />);
    expect(screen.getByText(/artworks/i)).toBeInTheDocument();
  });

  it('should work select', function () {
    const mockedSetterLimit = vi.fn();
    spyAppDispatch.mockReturnValue(mockedSetterLimit);
    renderWithProviders(<LimitSelection />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 16 } });
    expect(mockedSetterLimit).toBeCalledWith(setLimit(16));
  });
});
