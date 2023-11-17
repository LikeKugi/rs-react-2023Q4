import { afterEach, describe, expect } from 'vitest';
import { datalist } from '@/components/CardList/CardList.test-mocks';
import { cleanup, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardList from '@/components/CardList/CardList';
import { renderWithProviders } from '@/__tests__/utils';

describe('<CardList /> component tests', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([5, 10, 15])('should render correct number of cards', function (i) {
    renderWithProviders(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>,
      {
        preloadedState: {
          artworks: {
            artworks: Array.from({ length: i }, (_, idx) => ({
              ...datalist[0],
              id: idx,
            })),
          },
        },
      },
    );
    expect(screen.getAllByRole('link').length).toBe(i);
  });
});
