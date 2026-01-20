import { Routes, Route } from 'react-router-dom';
import GuestOnly from '~/core/guard/guest-only';
import LoginPage from './routes/login/login';
import RegisterPage from './routes/register/register';
import ForgotPasswordPage from './routes/forgot-password/forgot-password';
import VerifyEmailPage from './routes/verify-email/verify-emai';
import ResetPasswordPage from './routes/reset-password/reset-password';

const AuthRouter = () => (
  <Routes>
    <Route element={<GuestOnly />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Route>

    <Route path="verify-email" element={<VerifyEmailPage />} />
    <Route path="reset-password" element={<ResetPasswordPage />} />

    <Route
      path="*"
      element={
        <div className="flex h-screen items-center justify-center bg-(--auth-bg) text-(--text-main) font-bold! text-2xl!">
          404 | Account Page Not Found
        </div>
      }
    />
  </Routes>
);

export default AuthRouter;
