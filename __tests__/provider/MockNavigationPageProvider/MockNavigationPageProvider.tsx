import { createContext, FC, PropsWithChildren, useState } from 'react';

const INITIAL_PAGE = 1;

interface IMockNavigationPageContext {
  page: number;
  setPage: (arg?: number, total?: number) => void;
}

const MockNavigationPageContext = createContext<IMockNavigationPageContext>({
  page: 0,
  setPage: () => {},
});
export const MockNavigationPageProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const handleChangePage = (i?: number, total?: number) => {
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
  };
  return (
    <MockNavigationPageContext.Provider
      value={{ page, setPage: handleChangePage }}
    >
      {children}
    </MockNavigationPageContext.Provider>
  );
};
