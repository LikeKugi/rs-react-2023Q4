import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { renderWithProviders } from '@/__tests__/utils';

describe('<NotFoundPage /> tests', () => {
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

  it('should render NotFoundPage when route is invalid', async function () {
    renderWithProviders(
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
