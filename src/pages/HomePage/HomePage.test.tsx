import { beforeEach, describe, expect, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import { renderWithProviders } from '@/__tests__/utils';

describe('<HomePage /> tests', () => {
  const fetchArtworks = createFetchMock(vi);
  fetchArtworks.enableMocks();

  beforeEach(() => {
    fetchArtworks.doMock();
  });

  it('should render empty layout when no artworks found', async function () {
    fetchArtworks.mockResponseOnce(
      () =>
        new Promise((_, reject) => setTimeout(() => reject('No data'), 100)),
    );
    renderWithProviders(
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
