import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const MainLayout = () => {
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
