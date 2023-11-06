import AppRouter from '@/routes/AppRouter';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ThrowErrorButton from '@/components/ThrowErrorButton/ThrowErrorButton';
import NavigationProvider from '@/provider/NavigationProvider/NavigationProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppRouter />
        <ThrowErrorButton />
      </NavigationProvider>
    </ErrorBoundary>
  );
};

export default App;
