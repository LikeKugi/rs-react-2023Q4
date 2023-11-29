import { describe, expect } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { singleResponse } from '@/components/ArtworkDetails/ArtworkDetails.test-mocks';
import { screen } from '@testing-library/react';
import ArtworkDetails from '@/components/ArtworkDetails/ArtworkDetails';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '@/__tests__/utils';

describe('<ArtworkDetails /> tests', () => {
  const fetchData = createFetchMock(vi);
  fetchData.enableMocks();

  beforeEach(() => {
    fetchData.doMock();
  });

  it('should render component', async function () {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(singleResponse)), 100),
        ),
    );
    renderWithProviders(
      <BrowserRouter>
        <ArtworkDetails />
      </BrowserRouter>,
    );
    expect(await screen.findByText(/Melusine/i)).toBeInTheDocument();
    expect(await screen.findByRole('img')).toBeInTheDocument();
    expect(await screen.findByText(/born/i)).toBeInTheDocument();
    expect(await screen.findByText(/1943/)).toBeInTheDocument();
  });

  it('should render loader when fetching data', async function () {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(singleResponse)), 100),
        ),
    );
    renderWithProviders(
      <BrowserRouter>
        <ArtworkDetails />
      </BrowserRouter>,
    );
    expect(await screen.findByRole('loader')).toBeInTheDocument();
  });
});
