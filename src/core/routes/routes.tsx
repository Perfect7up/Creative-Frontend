import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from '../../modules/landing/routes/home/home';
import MainLayout from '../components/layout/main-layout';

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-white dark:bg-[#000513]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00d1ff] border-t-transparent"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
