import { Routes, Route } from 'react-router-dom';
import RequireAuth from '~/core/guard/require-auth';
import DashboardHome from './routes/dashboard';
import DashboardLayout from './components/layout/dashboard-layout';
import NotFoundPage from '~/core/components/common/not-found-page';

const DashboardRouter = () => (
  <Routes>
    <Route element={<RequireAuth />}>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardHome />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default DashboardRouter;
