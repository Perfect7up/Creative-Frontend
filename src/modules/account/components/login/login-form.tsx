import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Alert, Form } from 'antd';
import { MailOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '~/modules/account/hook/use-auth';
import { loginSchema, type LoginFormData } from '../../schema/auth.schema';

export const LoginForm: React.FC = () => {
  const { login, status, apiErrorMessages, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Email: '',
      Password: '',
    },
  });

  // 👇 already logged in → kick to dashboard
  useEffect(() => {
    if (isAuthenticated && !status.isLoggingIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, status.isLoggingIn, navigate]);

  const onFinish = (values: LoginFormData) => {
    login({ body: values });
  };

  return (
    <div className="w-full">
      {apiErrorMessages.login && (
        <Alert
          message="Login Failed"
          description={apiErrorMessages.login}
          type="error"
          showIcon
          className="auth-alert mb-6! rounded-xl!"
        />
      )}

      <Form layout="vertical" onFinish={handleSubmit(onFinish)} requiredMark={false}>
        <Form.Item
          label={<span className="text-(--text-main)! font-semibold!">Email Address</span>}
          validateStatus={formErrors.Email ? 'error' : ''}
          help={formErrors.Email?.message}
        >
          <Controller
            name="Email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined className="text-(--text-muted)!" />}
                placeholder="name@company.com"
                size="large"
                className="h-12! rounded-2xl! text-(--text-main)! bg-(--input-bg)! border-(--nav-border)!"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-(--text-main)! font-semibold!">Password</span>}
          validateStatus={formErrors.Password ? 'error' : ''}
          help={formErrors.Password?.message}
          className="mb-2!"
        >
          <Controller
            name="Password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined className="text-(--text-muted)!" />}
                placeholder="••••••••"
                size="large"
                className="h-12! rounded-2xl! text-(--text-main)! bg-(--input-bg)! border-(--nav-border)!"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end mb-6!">
          <Link
            to="/account/forgot-password"
            className="text-primary! text-sm! font-semibold! flex items-center gap-1! hover:underline! transition-all!"
          >
            <QuestionCircleOutlined className="text-xs!" />
            Forgot password?
          </Link>
        </div>

        <Form.Item className="mt-2! mb-0!">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={status.isLoggingIn}
            disabled={status.isLoggingIn}
            className="btn-get-started h-14! rounded-2xl! font-bold! text-lg!"
          >
            {status.isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
