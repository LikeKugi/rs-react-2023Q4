import { afterEach, describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from '@/components/Form/Form';
import * as useNavigationHook from '@/provider/NavigationProvider/NavigationProvider.hooks';
import * as storageFunction from '@/services/localStorageServices';

describe('<Form /> component tests', () => {
  const useSpyNavigation = vi.spyOn(useNavigationHook, 'useNavigationProvider');
  const spyGetStorage = vi.spyOn(storageFunction, 'getDataFromStorage');
  const spySetStorage = vi.spyOn(storageFunction, 'setDataToLocalStorage');

  afterEach(() => {
    useSpyNavigation.mockClear();
  });

  it('should render component', function () {
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });
    render(<Form />);
    expect(screen.getByText(/query/i)).toBeInTheDocument();
  });

  it('should retrieve data from local storage', function () {
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });
    render(<Form />);
    expect(spyGetStorage).toReturnWith({ query: '' });
  });

  it('should save data to local storage', function () {
    useSpyNavigation.mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });
    render(<Form />);
    fireEvent.click(screen.getByText('Search'));
    expect(spySetStorage).toHaveBeenCalledOnce();
  });

  it('should reset data when clicked reset button', function () {
    useSpyNavigation.mockReturnValue({
      query: 'monet',
      setQuery: vi.fn(),
      page: 1,
      setPage: vi.fn(),
      limit: 12,
      setLimit: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });
    render(<Form />);
    fireEvent.click(screen.getByText('Reset'));
    expect(spySetStorage).toHaveBeenCalledWith({ query: '' });
  });
});
