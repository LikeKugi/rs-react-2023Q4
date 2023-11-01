import AppRouter from '@/routes/AppRouter';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ThrowErrorButton from '@/components/ThrowErrorButton/ThrowErrorButton';

const App = () => {
  return (
    <ErrorBoundary>
      <AppRouter />
      <ThrowErrorButton />
    </ErrorBoundary>
  );
};

export default App;
