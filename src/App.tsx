import { Suspense, useEffect } from 'react';
import AppRouter from './core/routes/routes';

const App = () => {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add('using-mouse');
    };
    const handleKeyDown = () => {
      document.body.classList.remove('using-mouse');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Suspense
      fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}
    >
      <AppRouter />
    </Suspense>
  );
};

export default App;
