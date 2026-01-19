import React from 'react';
import { Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/login/login-form';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <div className="text-center mb-8">
          <Title level={2} style={{ margin: 0 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Enter your credentials to access your hideout</Text>
        </div>

        <LoginForm />

        <Divider plain>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            OR
          </Text>
        </Divider>

        <div className="text-center">
          <Text type="secondary">Don't have an account? </Text>
          <Link to="/register" className="text-[#00d1ff] font-medium hover:underline">
            Create one for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
