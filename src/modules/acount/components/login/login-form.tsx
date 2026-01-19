import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Alert, Form } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/modules/acount/hook/use-auth';
import { loginSchema, type LoginFormData } from '../../schema/auth.schema';

export const LoginForm: React.FC = () => {
  const { login, status, errors: apiErrors } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      { body: data },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
      },
    );
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Email"
        validateStatus={formErrors.Email ? 'error' : ''}
        help={formErrors.Email?.message ? String(formErrors.Email.message) : undefined}
      >
        <Input
          {...register('Email')}
          prefix={<MailOutlined className="text-gray-400" />}
          placeholder="email@example.com"
          size="large"
          onChange={(e) => setValue('Email', e.target.value, { shouldValidate: true })}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        validateStatus={formErrors.Password ? 'error' : ''}
        help={formErrors.Password?.message ? String(formErrors.Password.message) : undefined}
      >
        <Input.Password
          {...register('Password')}
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Password"
          size="large"
          onChange={(e) => setValue('Password', e.target.value, { shouldValidate: true })}
        />
      </Form.Item>
      {!!apiErrors.login && (
        <Alert
          message="Login Failed"
          description="Invalid email or password. Please try again."
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={status.isLoggingIn}
          style={{ background: '#00d1ff', borderColor: '#00d1ff' }}
        >
          {status.isLoggingIn ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form.Item>
    </Form>
  );
};
