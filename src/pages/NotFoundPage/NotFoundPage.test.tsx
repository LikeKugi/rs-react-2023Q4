import { afterEach, describe, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import NavigationProvider from '@/provider/NavigationProvider/NavigationProvider';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';

describe('<NotFoundPage /> tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    render(
      <NavigationProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </NavigationProvider>,
    );

    expect(true).toBeTruthy();
  });

  it('should not be empty', function () {
    render(
      <NavigationProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </NavigationProvider>,
    );

    const headerElement = screen.queryByText('The information not found');
    expect(headerElement).not.toBeNull();
  });

  it('should contain link', function () {
    render(
      <NavigationProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </NavigationProvider>,
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
      <NavigationProvider>
        <BrowserRouter>
          <MockPage />
          <NotFoundPage />
        </BrowserRouter>
      </NavigationProvider>,
    );

    const pageEl = screen.queryByText(/page:/i);
    expect(pageEl).toBeInTheDocument();
    const linkElement = screen.getByRole('link');

    fireEvent.click(linkElement);
    expect(pageEl!.textContent).toBe('page: 1');
  });
});
