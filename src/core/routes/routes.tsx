import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import MainLayout from '../components/layout/main-layout';
import DashboardLayout from '~/modules/dashboard/components/layout/dashboard-layout';
import Home from '~/modules/landing/routes/home/home';
import { RegisterPage } from '~/modules/acount/routes/register/register';
import DashboardHome from '~/modules/dashboard/dashboard';
import VerifyEmailPage from '~/modules/acount/routes/verify-email/verify-emai';
import LoginPage from '~/modules/acount/routes/login/login';
import ForgotPasswordPage from '~/modules/acount/routes/forgot-password/forgot-password';
import ResetPasswordPage from '~/modules/acount/routes/reset-password/reset-password';

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
          </Route>
          <Route path="/account/register" element={<RegisterPage />} />
          <Route path="/account/verify-email" element={<VerifyEmailPage />} />
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account/reset-password" element={<ResetPasswordPage />} />

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
