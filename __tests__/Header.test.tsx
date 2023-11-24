import { afterEach, describe, expect, it } from '@jest/globals';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Header from '@/components/ui/Header/Header';

describe('Header tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render component', function () {
    render(<Header />, { wrapper: MemoryRouterProvider });
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/school/i)).toBeInTheDocument();
  });
  it('should work link', async function () {
    await mockRouter.push('/?page=5');
    render(<Header />, { wrapper: MemoryRouterProvider });
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    expect(mockRouter.asPath).toEqual('/?page=1&limit=8');
  });
});
