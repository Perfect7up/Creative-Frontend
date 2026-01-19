import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/modules/account/hook/use-auth';

const RequireAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log('🛡️ RequireAuth check:', {
    isAuthenticated,
    path: location.pathname,
  });

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/account/login" replace state={{ from: location }} />;
  }

  console.log('Authenticated, rendering protected route');
  return <Outlet />;
};
export default RequireAuth;
