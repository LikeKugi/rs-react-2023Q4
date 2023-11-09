import { afterEach, describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import * as useNavigationHook from '@/provider/NavigationProvider/NavigationProvider.hooks';
import * as useArtworksHook from '@/provider/ArtworksProvider/ArtworksProvider.hooks';
import { BrowserRouter } from 'react-router-dom';
import * as RouterFunctions from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';

describe('<Pagination /> component tests', () => {
  const useSpyNavigation = vi.spyOn(useNavigationHook, 'useNavigationProvider');
  const useSpyArtworks = vi.spyOn(useArtworksHook, 'useArtworksProvider');
  const useSpyRouter = vi.spyOn(RouterFunctions, 'useSearchParams');

  afterEach(() => {
    useSpyNavigation.mockClear();
    useSpyArtworks.mockClear();
  });

  it('should render component', function () {
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });
    useSpyArtworks.mockReturnValue({
      totalPages: 50,
      artworks: [],
      setArtworks: vi.fn(),
      setTotalPages: vi.fn(),
    });
    const mockedSetterUrl = vi.fn();
    useSpyRouter.mockReturnValue([
      new URLSearchParams({ page: '5' }),
      mockedSetterUrl,
    ]);
    render(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>,
    );
    expect(screen.queryByText(/50/)).toBeInTheDocument();
  });

  it.each([0, 1, 2, 3])(
    'should trigger setURLParams function by click',
    (i) => {
      useSpyNavigation.mockReturnValue({
        query: '',
        setQuery: vi.fn(),
        page: 5,
        setPage: vi.fn(),
        limit: 12,
        setLimit: vi.fn(),
        loading: false,
        setLoading: vi.fn(),
      });
      useSpyArtworks.mockReturnValue({
        totalPages: 15,
        artworks: [],
        setArtworks: vi.fn(),
        setTotalPages: vi.fn(),
      });
      const mockedSetterUrl = vi.fn();
      useSpyRouter.mockReturnValue([
        new URLSearchParams({ page: '5' }),
        mockedSetterUrl,
      ]);
      render(
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>,
      );
      fireEvent.click(screen.getAllByRole('button')[i]);
      expect(mockedSetterUrl).toHaveBeenCalled();
    },
  );
});
