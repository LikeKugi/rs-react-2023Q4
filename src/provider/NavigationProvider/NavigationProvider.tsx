import { FC, JSX, PropsWithChildren, useCallback, useState } from 'react';
import { NavigationProviderContext } from '@/provider/NavigationProvider/NavigationProvider.context';

const INITIAL_LIMIT = 8;
const INITIAL_PAGE = 1;
const INITIAL_QUERY = '';

const NavigationProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [query, setQuery] = useState<string>(INITIAL_QUERY);
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const [page, setPage] = useState<number | null>(null);

  const handleChangePage = useCallback((i?: number, total?: number) => {
    if (!i) {
      setPage(INITIAL_PAGE);
      return;
    }
    if (!total) {
      setPage(i);
      return;
    }
    if (i < 1 || i > total) {
      return;
    }
    setPage(i);
  }, []);

  const handleChangeLimit = useCallback((i?: number) => {
    if (!i) {
      setLimit(INITIAL_LIMIT);
      return;
    }
    if (i < 0 || i % 4) return;
    setLimit(i);
    setPage(1);
  }, []);

  const handleChangeQuery = useCallback((query?: string) => {
    if (!query) {
      setQuery(INITIAL_QUERY);
      return;
    }
    setQuery(query);
  }, []);

  return (
    <NavigationProviderContext.Provider
      value={{
        page,
        setPage: handleChangePage,
        limit,
        setLimit: handleChangeLimit,
        query,
        setQuery: handleChangeQuery,
      }}
    >
      {children}
    </NavigationProviderContext.Provider>
  );
};
export default NavigationProvider;
