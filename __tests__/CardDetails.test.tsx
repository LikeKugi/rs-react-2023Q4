import { describe, vi, beforeEach, it, expect } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Card from '../src/components/Card/Card';
import { singleResponse } from './CardDetails.test-mocks';
import { RouterConstants } from '../src/routes/RouterConstants';
import ModalPage from '../src/pages/ModalPage/ModalPage';
import ArtworkDetails from '../src/components/ArtworkDetails/ArtworkDetails';
import '@testing-library/jest-dom';

const SimpleLayout = () => {
  return (
    <div>
      <h1>Simple layout</h1>
      <Card content={singleResponse.data} />
      <Outlet />
    </div>
  );
};

describe('Card and Details tests', () => {
  const fetchData = createFetchMock(vi);
  fetchData.enableMocks();

  beforeEach(() => {
    fetchData.doMock();
  });

  it('should render layout', function () {
    render(
      <BrowserRouter>
        <Routes>
          <Route path={RouterConstants.INDEX} element={<SimpleLayout />}>
            <Route path={RouterConstants.ARTWORKS} element={<ModalPage />}>
              <Route
                path={RouterConstants.ARTWORK_ID}
                element={<ArtworkDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>,
    );
    expect(screen.queryByText(/Kurt/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should open details page and trigger request', async function () {
    fetchData.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(singleResponse)), 100),
        ),
    );
    render(
      <BrowserRouter>
        <Routes>
          <Route path={RouterConstants.INDEX} element={<SimpleLayout />}>
            <Route path={RouterConstants.ARTWORKS} element={<ModalPage />}>
              <Route
                path={RouterConstants.ARTWORK_ID}
                element={<ArtworkDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>,
    );
    expect(screen.queryByText(/Switzerland/i)).toBeNull();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    expect(await screen.findByText(/Switzerland/i)).toBeInTheDocument();
    expect(fetchData).toHaveBeenCalled();
  });
});
