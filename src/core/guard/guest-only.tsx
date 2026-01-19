import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/modules/account/hook/use-auth';

const GuestOnly: React.FC = () => {
  const { isAuthenticated } = useAuth();

  console.log('GuestOnly - isAuthenticated:', isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestOnly;
