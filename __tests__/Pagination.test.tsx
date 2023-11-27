import { afterEach, describe, expect, it } from '@jest/globals';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Pagination from '@/components/ui/Pagination/Pagination';

describe('Pagination tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(<Pagination totalPages={10} />, { wrapper: MemoryRouterProvider });
    expect(screen.queryByText(/10/)).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(4);
  });
  it.each(Array.from({ length: 4 }, (_, i) => i))(
    'should work changing pages',
    async function (i) {
      await mockRouter.push('/?page=2');
      render(<Pagination totalPages={3} />, { wrapper: MemoryRouterProvider });
      fireEvent.click(screen.queryAllByRole('button')[i]);
      expect(mockRouter.asPath).toEqual(`/?page=${i < 2 ? 1 : 3}`);
    },
  );
});
