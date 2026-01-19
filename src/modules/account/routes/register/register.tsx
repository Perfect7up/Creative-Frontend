import { useState } from 'react';
import { Result, Button, Typography, Breadcrumb } from 'antd';
import { RegisterForm } from '../../components/register/register-form';
import { HomeOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const RegisterPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="modern-form-container max-w-xl w-full p-8 md:p-12 rounded-4xl shadow-2xl text-center">
          <Result
            status="info"
            title={
              <span className="text-(--text-main)! font-black! tracking-tight!">
                Check your email
              </span>
            }
            subTitle={
              <span className="text-(--text-muted)! text-base!">
                We sent a verification link to your email address. Please click the link to activate
                your account.
              </span>
            }
            extra={[
              <Button
                key="resend"
                className="h-12! px-8! rounded-xl! font-bold! text-(--text-main)! border-(--nav-border)! hover:border-primary!"
              >
                Didn't get the email? Resend
              </Button>,
              <Button
                key="home"
                type="primary"
                href="/"
                className="btn-get-started h-12! px-8! rounded-xl! font-bold!"
              >
                Back to Home
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* 1. Breadcrumbs */}
      <div className="max-w-md w-full mb-6">
        <Breadcrumb
          items={[
            { href: '/', title: <HomeOutlined className="text-(--text-muted)!" /> },
            {
              title: (
                <span className="text-(--text-muted)! flex items-center gap-1">
                  <UserAddOutlined className="text-(--text-muted)!" /> Account
                </span>
              ),
            },
            { title: <span className="text-(--text-main)! font-bold!">Register</span> },
          ]}
        />
      </div>

      {/* 2. Main Container */}
      <div className="modern-form-container max-w-md w-full p-8 md:p-10 rounded-4xl shadow-2xl">
        <div className="text-center mb-10!">
          <Title level={2} className="text-(--text-main)! m-0! font-black! tracking-tight!">
            Create Account
          </Title>
          <Text className="text-(--text-muted)! text-base! mt-2! block!">
            Join DevFlow and start building your future
          </Text>
        </div>

        <RegisterForm onSuccess={() => setIsSubmitted(true)} />

        <div className="text-center mt-8!">
          <Text className="text-(--text-muted)!">Already have an account? </Text>
          <Link
            to="/account/login"
            className="text-primary! font-bold! hover:underline! transition-all!"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
