import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom';

import MainLayout from '../components/layout/main-layout';
import DashboardLayout from '~/modules/dashboard/components/layout/dashboard-layout';

import Home from '~/modules/landing/routes/home/home';
import LoginPage from '~/modules/account/routes/login/login';
import { RegisterPage } from '~/modules/account/routes/register/register';
import ForgotPasswordPage from '~/modules/account/routes/forgot-password/forgot-password';
import ResetPasswordPage from '~/modules/account/routes/reset-password/reset-password';
import VerifyEmailPage from '~/modules/account/routes/verify-email/verify-emai';
import DashboardHome from '~/modules/dashboard/dashboard';
import RequireAuth from '../guard/require-auth';
import GuestOnly from '../guard/guest-only';

const Root = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Home /> },

          {
            element: <GuestOnly />,
            children: [
              { path: '/account/login', element: <LoginPage /> },
              { path: '/account/register', element: <RegisterPage /> },
              { path: '/account/forgot-password', element: <ForgotPasswordPage /> },
            ],
          },
        ],
      },

      { path: '/account/verify-email', element: <VerifyEmailPage /> },
      { path: '/account/reset-password', element: <ResetPasswordPage /> },

      {
        element: <RequireAuth />,
        children: [
          {
            element: <DashboardLayout />,
            children: [{ path: '/dashboard', element: <DashboardHome /> }],
          },
        ],
      },

      {
        path: '*',
        element: (
          <div className="flex h-screen items-center justify-center bg-(--auth-bg) text-(--text-main) font-bold! text-2xl!">
            404 | Page Not Found
          </div>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
