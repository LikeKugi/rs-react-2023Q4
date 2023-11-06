import { useContext } from 'react';
import { NavigationProviderContext } from '@/provider/NavigationProvider/NavigationProvider.context';

export const useNavigationProvider = () =>
  useContext(NavigationProviderContext);
