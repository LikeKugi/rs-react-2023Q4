import { createContext } from 'react';

interface INavigationProviderContext {
  page: number | null;
  setPage: (arg?: number, total?: number) => void;
  limit: number;
  setLimit: (arg?: number) => void;
  query: string;
  setQuery: (arg?: string) => void;
}

export const NavigationProviderContext =
  createContext<INavigationProviderContext>({
    limit: 8,
    setLimit: () => {},
    page: null,
    setPage: () => {},
    query: '',
    setQuery: () => {},
  });
