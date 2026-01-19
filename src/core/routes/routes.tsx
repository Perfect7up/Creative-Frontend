import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import MainLayout from '../components/layout/main-layout';
import DashboardLayout from '~/modules/dashboard/components/layout/dashboard-layout';
import Home from '~/modules/landing/routes/home/home';
import { RegisterPage } from '~/modules/acount/routes/register/register';
import DashboardHome from '~/modules/dashboard/dashboard';

const LoadingFallback = () => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
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
            <Route path="/account/register" element={<RegisterPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
          </Route>

          <Route
            path="*"
            element={<div style={{ padding: 50, textAlign: 'center' }}>404 Not Found</div>}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
