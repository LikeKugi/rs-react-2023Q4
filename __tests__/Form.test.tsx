import { afterEach, describe, expect, it, jest } from '@jest/globals';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Form from '@/components/ui/Form/Form';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Form tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render component', function () {
    jest.mock('next/router', () => jest.requireActual('next-router-mock'));
    mockRouter.push(`/?limit=8&page=1`);
    render(<Form />, { wrapper: MemoryRouterProvider });
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should work reset', async function () {
    jest.mock('next/router', () => jest.requireActual('next-router-mock'));
    await mockRouter.push(`/?limit=8&page=1&q=monet`);
    render(<Form />, { wrapper: MemoryRouterProvider });
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/?limit=8&page=1',
        pathname: '/',
        query: { limit: '8', page: '1' },
      });
    });
  });
  it('should work submit', async function () {
    jest.mock('next/router', () => jest.requireActual('next-router-mock'));
    await mockRouter.push(`/?limit=8&page=1`);
    render(<Form />, { wrapper: MemoryRouterProvider });
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'monet' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/?limit=8&page=1&q=monet',
        pathname: '/',
        query: { limit: '8', page: '1', q: 'monet' },
      });
    });
  });
});
