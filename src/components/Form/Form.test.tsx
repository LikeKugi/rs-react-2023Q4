import { afterEach, describe, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Form from '@/components/Form/Form';
import * as useNavigationHook from '@/provider/NavigationProvider/NavigationProvider.hooks';
import * as storageFunction from '@/services/localStorageServices';
import { renderWithProviders } from '@/__tests__/utils';

describe('<Form /> component tests', () => {
  const useSpyNavigation = vi.spyOn(useNavigationHook, 'useNavigationProvider');
  const spySetStorage = vi.spyOn(storageFunction, 'setDataToLocalStorage');

  afterEach(() => {
    useSpyNavigation.mockClear();
  });

  it('should render component', function () {
    renderWithProviders(<Form />);
    expect(screen.getByText(/query/i)).toBeInTheDocument();
  });

  it('should save data to local storage', function () {
    renderWithProviders(<Form />);
    fireEvent.click(screen.getByText('Search'));
    expect(spySetStorage).toHaveBeenCalledOnce();
  });

  it('should reset data when clicked reset button', async function () {
    renderWithProviders(<Form />);
    fireEvent.click(screen.getByText('Reset'));
    expect(spySetStorage).toHaveBeenCalledWith({ query: '' });
  });
});
