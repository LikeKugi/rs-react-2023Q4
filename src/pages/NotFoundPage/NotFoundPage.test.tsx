import { afterEach, describe, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';
import { MockNavigationPageProvider } from '~/__tests__/provider/MockNavigationPageProvider/MockNavigationPageProvider';

describe('<NotFoundPage /> tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(
      <MockNavigationPageProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </MockNavigationPageProvider>,
    );

    expect(true).toBeTruthy();
  });

  it('should not be empty', function () {
    render(
      <MockNavigationPageProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </MockNavigationPageProvider>,
    );

    const headerElement = screen.queryByText('The information not found');
    expect(headerElement).not.toBeNull();
  });

  it('should contain link', function () {
    render(
      <MockNavigationPageProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </MockNavigationPageProvider>,
    );

    const linkElement = screen.getByRole('link');
    linkElement.focus();
    expect(linkElement).toHaveFocus();
  });
  it('should change page', function () {
    const MockPage = () => {
      const { page } = useNavigationProvider();
      return <div>page: {page}</div>;
    };

    render(
      <MockNavigationPageProvider>
        <BrowserRouter>
          <MockPage />
          <NotFoundPage />
        </BrowserRouter>
      </MockNavigationPageProvider>,
    );

    const pageEl = screen.queryByText(/page:/i);
    expect(pageEl).toBeInTheDocument();
    const linkElement = screen.getByRole('link');

    fireEvent.click(linkElement);
    expect(pageEl!.textContent).toBe('page: 1');
  });

  it('should render NotFoundPage when route is invalid', async function () {
    render(
      <MockNavigationPageProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={'/'}
              element={
                <>
                  <Link to={'/dfe'}>Error</Link>
                  <Link to={'/test'}>Test</Link>
                </>
              }
            />
            <Route path={'/test'} element={<>Test</>} />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </MockNavigationPageProvider>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/error/i));
    expect(
      await screen.findByText('The information not found'),
    ).toBeInTheDocument();
  });
});
