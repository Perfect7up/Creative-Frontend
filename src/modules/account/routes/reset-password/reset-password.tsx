import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button, Typography, Result, Breadcrumb, message } from 'antd';
import { LockOutlined, HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAuth } from '~/modules/account/hook/use-auth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { resetPassword, status } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      Token: token ?? '',
      NewPassword: '',
      ConfirmPassword: '',
    },
  });

  useEffect(() => {
    if (token) setValue('Token', token);
  }, [token, setValue]);

  const onFinish = (data: ResetPasswordFormData) => {
    const { ConfirmPassword, ...payload } = data;
    void ConfirmPassword;

    resetPassword(
      { body: payload },
      {
        onSuccess: () => {
          message.success('Password updated successfully!');
          navigate('/account/login');
        },
      },
    );
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="modern-form-container max-w-md w-full p-8 md:p-12 rounded-4xl shadow-2xl text-center">
          <Result
            status="warning"
            title={<span className="text-(--text-main)! font-black!">Invalid Link</span>}
            subTitle={
              <span className="text-(--text-muted)!">
                The reset token is missing or has expired.
              </span>
            }
            extra={
              <Button
                href="/account/forgot-password"
                type="primary"
                className="btn-get-started h-12! px-8! rounded-xl! font-bold!"
              >
                Request New Link
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full mb-6">
        <Breadcrumb
          items={[
            { href: '/', title: <HomeOutlined className="text-(--text-muted)!" /> },
            {
              title: (
                <span className="text-(--text-muted)! flex items-center gap-1">
                  <SafetyCertificateOutlined className="text-(--text-muted)!" /> Account
                </span>
              ),
            },
            { title: <span className="text-(--text-main)! font-bold!">Reset Password</span> },
          ]}
        />
      </div>

      <div className="modern-form-container max-w-md w-full p-8 md:p-10 rounded-4xl shadow-2xl">
        <div className="text-center mb-10!">
          <Title level={2} className="text-(--text-main)! m-0! font-black! tracking-tight!">
            New Password
          </Title>
          <Text className="text-(--text-muted)! text-base! mt-2! block!">
            Enter your new secure password below
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onFinish)} requiredMark={false}>
          <Form.Item
            label={<span className="text-(--text-main)! font-semibold!">New Password</span>}
            validateStatus={formErrors.NewPassword ? 'error' : ''}
            help={formErrors.NewPassword?.message}
          >
            <Controller
              name="NewPassword"
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

          <Form.Item
            label={<span className="text-(--text-main)! font-semibold!">Confirm Password</span>}
            validateStatus={formErrors.ConfirmPassword ? 'error' : ''}
            help={formErrors.ConfirmPassword?.message}
          >
            <Controller
              name="ConfirmPassword"
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

          <Form.Item className="mt-8! mb-0!">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={status.isResetting}
              className="btn-get-started h-14! rounded-2xl! font-bold! text-lg!"
            >
              {status.isResetting ? 'Updating...' : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
