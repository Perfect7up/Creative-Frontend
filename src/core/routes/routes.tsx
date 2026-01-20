import { Routes, Route } from 'react-router-dom';
import MainLayout from '~/core/components/layout/main-layout';

import AuthRouter from '~/modules/account/routes';
import LandingRouter from '~/modules/landing/routes';
import DashboardRouter from '~/modules/dashboard/routes';
import NotFoundPage from '../components/common/not-found-page';

const AppRouter = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<LandingRouter />} />
    </Route>
    <Route path="/account/*" element={<AuthRouter />} />
    <Route path="/dashboard/*" element={<DashboardRouter />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
