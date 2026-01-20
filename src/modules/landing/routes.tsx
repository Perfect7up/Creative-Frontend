import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home';
const LandingRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="*"
      element={
        <div className="flex h-screen items-center justify-center bg-(--auth-bg) text-(--text-main) font-bold! text-2xl!">
          404 | Page Not Found (Landing)
        </div>
      }
    />
  </Routes>
);

export default LandingRouter;
