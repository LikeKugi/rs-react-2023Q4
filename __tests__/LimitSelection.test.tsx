import { afterEach, describe, it, expect } from '@jest/globals';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import LimitSelection from '@/components/ui/LimitSelection/LimitSelection';

describe('LimitSelection tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(<LimitSelection />, { wrapper: MemoryRouterProvider });
    expect(screen.queryByText(/artworks/i)).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(5);
  });

  it.each(Array.from({ length: 5 }, (_, i) => i))(
    'should work select',
    async function (i) {
      await mockRouter.push('/');
      render(<LimitSelection />, { wrapper: MemoryRouterProvider });
      expect(screen.queryByRole('combobox')).toBeInTheDocument();
      const optionsArray: HTMLOptionElement[] = screen.queryAllByRole('option');
      expect(optionsArray).toHaveLength(5);
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: optionsArray[i].value },
      });
      expect(mockRouter.asPath).toEqual(`/?limit=${i * 4 + 4}`);
    },
  );
});
