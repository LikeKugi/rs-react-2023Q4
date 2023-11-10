import { afterEach, describe, expect, vi } from 'vitest';
import * as useArtworksHook from '@/provider/ArtworksProvider/ArtworksProvider.hooks';
import { datalist } from '@/components/CardList/CardList.test-mocks';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardList from '@/components/CardList/CardList';

describe('<CardList /> component tests', () => {
  const useSpyArtworks = vi.spyOn(useArtworksHook, 'useArtworksProvider');

  afterEach(() => {
    cleanup();
    useSpyArtworks.mockClear();
  });

  it.each([5, 10, 15])('should render correct number of cards', function (i) {
    useSpyArtworks.mockReturnValue({
      totalPages: 50,
      artworks: Array.from({ length: i }, (_, idx) => ({
        ...datalist[0],
        id: idx,
      })),
      setArtworks: vi.fn(),
      setTotalPages: vi.fn(),
    });
    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>,
    );
    expect(screen.getAllByRole('link').length).toBe(i);
  });
});
