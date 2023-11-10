import { describe, expect } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { singleResponse } from '@/components/ArtworkDetails/ArtworkDetails.test-mocks';
import { render, screen } from '@testing-library/react';
import ArtworkDetails from '@/components/ArtworkDetails/ArtworkDetails';
import { BrowserRouter } from 'react-router-dom';

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
    render(
      <BrowserRouter>
        <ArtworkDetails />
      </BrowserRouter>,
    );
    expect(await screen.findByText(/Melusine/i)).toBeInTheDocument();
  });

  it('should render loader when fetching data', async function () {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(singleResponse)), 100),
        ),
    );
    render(
      <BrowserRouter>
        <ArtworkDetails />
      </BrowserRouter>,
    );
    expect(await screen.findByRole('loader')).toBeInTheDocument();
  });
});
