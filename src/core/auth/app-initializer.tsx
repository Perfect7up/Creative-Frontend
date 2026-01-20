import { useEffect, useState } from 'react';
import { useAuth } from '~/modules/account/hook/use-auth';

interface Props {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<Props> = ({ children }) => {
  const { initializeAuth } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      try {
        await initializeAuth();
      } catch (err) {
        console.error('Auth initialization failed', err);
      } finally {
        setReady(true);
      }
    };

    boot();
  }, [initializeAuth]);

  useEffect(() => {
    const logout = () => {
      window.location.href = '/account/login';
    };

    window.addEventListener('force-logout', logout);

    return () => {
      window.removeEventListener('force-logout', logout);
    };
  }, []);

  if (!ready) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
};
