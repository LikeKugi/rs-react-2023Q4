import {
  FC,
  JSX,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { NavigationProviderContext } from '@/provider/NavigationProvider/NavigationProvider.context';
import { IQueryObject } from '@/types/appTypes';
import { getDataFromStorage } from '@/services/localStorageServices';

const INITIAL_LIMIT = 8;
const INITIAL_PAGE = 1;
const INITIAL_QUERY = '';

const NavigationProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [query, setQuery] = useState<string>(INITIAL_QUERY);
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    setQuery(queryObject.query);
    setLoading(true);
  }, []);

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
    setLoading(true);
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
    setLoading(true);
  }, []);

  const handleChangeQuery = useCallback((query?: string) => {
    if (!query) {
      setQuery(INITIAL_QUERY);
      return;
    }
    setQuery(query);
  }, []);

  const handleLoading = useCallback((status?: boolean) => {
    if (!status) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  return (
    <NavigationProviderContext.Provider
      value={{
        page,
        setPage: handleChangePage,
        limit,
        setLimit: handleChangeLimit,
        loading,
        query,
        setQuery: handleChangeQuery,
        setLoading: handleLoading,
      }}
    >
      {children}
    </NavigationProviderContext.Provider>
  );
};
export default NavigationProvider;
