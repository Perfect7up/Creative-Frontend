import { useState } from 'react';
import { Result, Button } from 'antd';
import { RegisterForm } from '../../components/register/register-form';

export const RegisterPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (isSubmitted) {
    return (
      <div style={{ padding: '50px' }}>
        <Result
          status="info"
          title="Check your email"
          subTitle="We sent a verification link to your email address. Please click the link to activate your account."
          extra={[<Button key="resend">Didn't get the email? Resend</Button>]}
        />
      </div>
    );
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
      <RegisterForm onSuccess={() => setIsSubmitted(true)} />
    </main>
  );
};

export default RegisterPage;
