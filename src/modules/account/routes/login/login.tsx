import React from 'react';
import { Typography, Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/login/login-form';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full mb-6">
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined className="text-(--text-muted)!" />,
            },
            {
              title: (
                <span className="text-(--text-muted)! flex items-center gap-1">
                  <UserOutlined className="text-(--text-muted)!" /> Account
                </span>
              ),
            },
            {
              title: <span className="text-(--text-main)! font-bold!">Login</span>,
            },
          ]}
        />
      </div>

      <div className="modern-form-container max-w-md w-full p-8 md:p-10 rounded-4xl shadow-2xl">
        <div className="text-center mb-10!">
          <Title level={2} className="text-(--text-main)! m-0! font-black! tracking-tight!">
            Welcome Back
          </Title>
          <Text className="text-(--text-muted)! text-base! mt-2! block!">
            Enter your credentials to access your hideout
          </Text>
        </div>

        <LoginForm />

        <Divider plain>
          <Text className="text-(--text-muted)! text-xs! uppercase! tracking-widest! font-bold!">
            OR
          </Text>
        </Divider>

        <div className="text-center mt-6!">
          <Text className="text-(--text-muted)! block! mb-2!">Don't have an account?</Text>
          <Link
            to="/account/register"
            className="text-primary! font-bold! hover:underline! transition-all!"
          >
            Create one for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
