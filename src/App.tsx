import AppRouter from '@/routes/AppRouter';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import NavigationProvider from '@/provider/NavigationProvider/NavigationProvider';
import ArtworksProvider from '@/provider/ArtworksProvider/ArtworksProvider';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ArtworksProvider>
          <NavigationProvider>
            <AppRouter />
          </NavigationProvider>
        </ArtworksProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
