import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { setupStore } from '@/__tests__/utils/setupStore.utils';

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
