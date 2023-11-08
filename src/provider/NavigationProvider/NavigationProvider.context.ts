import { createContext } from 'react';

interface INavigationProviderContext {
  page: number;
  setPage: (arg?: number, total?: number) => void;
  limit: number;
  setLimit: (arg?: number) => void;
  query: string;
  setQuery: (arg?: string) => void;
  loading: boolean;
  setLoading: (arg?: boolean) => void;
}

export const NavigationProviderContext =
  createContext<INavigationProviderContext>({
    limit: 8,
    setLimit: () => {},
    page: 1,
    setPage: () => {},
    query: '',
    setQuery: () => {},
    loading: false,
    setLoading: () => {},
  });
