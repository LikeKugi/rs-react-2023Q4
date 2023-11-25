import { afterEach, describe, expect, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';
import { renderWithProviders } from '@/__tests__/utils';
import * as storeHooks from '@/store/hooks';

describe('<Pagination /> component tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/0/)).toBeInTheDocument();
  });

  it.each([0, 1, 2, 3])('should change page by click', (i) => {
    const spyAppDispatch = vi.spyOn(storeHooks, 'useAppDispatch');
    const mockedSetterUrl = vi.fn();
    spyAppDispatch.mockReturnValue(mockedSetterUrl);

    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>,
      {
        preloadedState: {
          navigation: {
            query: '',
            page: 5,
            limit: 8,
            totalPages: 50,
          },
        },
      },
    );

    fireEvent.click(screen.getAllByRole('button')[i]);
    expect(mockedSetterUrl).toHaveBeenCalled();
    afterEach(() => {
      mockedSetterUrl.mockClear();
    });
  });

  it('should render component if page is null', function () {
    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>,
    );
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});
