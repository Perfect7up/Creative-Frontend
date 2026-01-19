import { RegisterForm } from '../../components/register/register-form';

export const RegisterPage = () => {
  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
      <p className="text-gray-500 mb-6">Join our creative hideout today.</p>

      <RegisterForm />

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600">
          Login
        </a>
      </p>
    </main>
  );
};
