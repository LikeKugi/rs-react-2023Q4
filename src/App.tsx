import AppRouter from '@/routes/AppRouter';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
