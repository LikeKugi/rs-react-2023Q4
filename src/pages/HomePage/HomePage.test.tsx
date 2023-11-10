import { beforeEach, describe, expect, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import * as useNavigationHook from '@/provider/NavigationProvider/NavigationProvider.hooks';
import * as useArtworksHook from '@/provider/ArtworksProvider/ArtworksProvider.hooks';

describe('<HomePage /> tests', () => {
  const useSpyNavigation = vi.spyOn(useNavigationHook, 'useNavigationProvider');
  const useSpyArtworks = vi.spyOn(useArtworksHook, 'useArtworksProvider');
  const fetchArtworks = createFetchMock(vi);
  fetchArtworks.enableMocks();

  beforeEach(() => {
    useSpyNavigation.mockClear();
    useSpyArtworks.mockClear();
    fetchArtworks.doMock();
  });

  it('should render layout', async function () {
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
    });
    useSpyArtworks.mockReturnValue({
      totalPages: 50,
      artworks: [],
      setArtworks: vi.fn(),
      setTotalPages: vi.fn(),
    });
    fetchArtworks.mockResponseOnce(
      () =>
        new Promise((_, reject) => setTimeout(() => reject('No data'), 100)),
    );
    render(
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
        </Routes>
      </BrowserRouter>,
    );
    const result = await screen.findByText(/found/i);
    expect(result).toBeInTheDocument();
  });
});
