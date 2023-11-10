import { afterEach, describe, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import * as useNavigationHook from '@/provider/NavigationProvider/NavigationProvider.hooks';

describe('<NotFoundPage /> tests', () => {
  const useSpyNavigation = vi.spyOn(useNavigationHook, 'useNavigationProvider');
  afterEach(() => {
    useSpyNavigation.mockClear();
    cleanup();
  });

  it('should render component', function () {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    expect(true).toBeTruthy();
  });

  it('should not be empty', function () {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const headerElement = screen.queryByText('The information not found');
    expect(headerElement).not.toBeNull();
  });

  it('should contain link', function () {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const linkElement = screen.getByRole('link');
    linkElement.focus();
    expect(linkElement).toHaveFocus();
  });
  it('should change page', async function () {
    const mockHandleChangePage = vi.fn();
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 5,
      setPage: mockHandleChangePage,
      limit: 12,
      setLimit: vi.fn(),
    });

    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    fireEvent.click(linkElement);
    expect(mockHandleChangePage).toHaveBeenCalledOnce();
    expect(mockHandleChangePage).toBeCalledWith(1);
  });

  it('should render NotFoundPage when route is invalid', async function () {
    render(
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
      </BrowserRouter>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/error/i));
    expect(
      await screen.findByText('The information not found'),
    ).toBeInTheDocument();
  });
});
