import AppRouter from '@/routes/AppRouter';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import NavigationProvider from '@/provider/NavigationProvider/NavigationProvider';
import ArtworksProvider from '@/provider/ArtworksProvider/ArtworksProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <ArtworksProvider>
        <NavigationProvider>
          <AppRouter />
        </NavigationProvider>
      </ArtworksProvider>
    </ErrorBoundary>
  );
};

export default App;
