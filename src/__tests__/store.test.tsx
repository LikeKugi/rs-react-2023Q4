import { describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import * as storageData from '@/services/localStorageServices';
import { renderWithProviders } from '@/__tests__/utils';
import { getDataFromStorage } from '@/services/localStorageServices';
import { useAppSelector } from '@/store/hooks';
import { selectNavigationQuery } from '@/store/navigationSlice/navigationSlice';

describe('get data from local storage test', () => {
  const spyGetStorage = vi.spyOn(storageData, 'getDataFromStorage');

  it('should get data from local storage', function () {
    spyGetStorage.mockReturnValue({ query: 'monet' });
    const query = (getDataFromStorage({ query: '' }) as { query: string })
      .query;
    const Heading = () => {
      const query = useAppSelector(selectNavigationQuery);
      return <h1>{query}</h1>;
    };
    renderWithProviders(<Heading />, {
      preloadedState: {
        navigation: {
          limit: 8,
          query,
          page: 0,
          totalPages: 0,
        },
      },
    });
    expect(screen.queryByText(/monet/i)).toBeInTheDocument();
  });
});
