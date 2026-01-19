import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Form, Input, Button, Typography, Result, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '~/modules/acount/hook/use-auth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { resetPassword, status } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { Token: token ?? '' },
  });

  useEffect(() => {
    if (token) setValue('Token', token);
  }, [token, setValue]);

  const onSubmit = (data: ResetPasswordFormData) => {
    const { ConfirmPassword: _, ...payload } = data;
    void _;

    resetPassword(
      { body: payload },
      {
        onSuccess: () => {
          message.success('Password updated successfully!');
          navigate('/login');
        },
      },
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Result status="warning" title="Invalid Link" subTitle="Reset token is missing." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <Title level={3}>New Password</Title>
          <Text type="secondary">Enter your new secure password.</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="New Password"
            validateStatus={formErrors.NewPassword ? 'error' : ''}
            help={
              formErrors.NewPassword?.message ? String(formErrors.NewPassword.message) : undefined
            }
          >
            <Input.Password
              {...register('NewPassword')}
              prefix={<LockOutlined />}
              size="large"
              onChange={(e) => setValue('NewPassword', e.target.value, { shouldValidate: true })}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            validateStatus={formErrors.ConfirmPassword ? 'error' : ''}
            help={
              formErrors.ConfirmPassword?.message
                ? String(formErrors.ConfirmPassword.message)
                : undefined
            }
          >
            <Input.Password
              {...register('ConfirmPassword')}
              prefix={<LockOutlined />}
              size="large"
              onChange={(e) =>
                setValue('ConfirmPassword', e.target.value, { shouldValidate: true })
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={status.isResetting}
            style={{ background: '#00d1ff', borderColor: '#00d1ff' }}
          >
            Reset Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
