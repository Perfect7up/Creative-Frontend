import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
