import { afterEach, describe, it, expect } from '@jest/globals';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import NotFoundPage from '@/pages/404';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

describe('Not Found Page tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(<NotFoundPage />, { wrapper: MemoryRouterProvider });
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/information/i)).toBeInTheDocument();
  });
  it('should work link', async function () {
    await mockRouter.push('/?page=5');
    render(<NotFoundPage />, { wrapper: MemoryRouterProvider });
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    expect(mockRouter.asPath).toEqual('/?page=1');
  });
});
