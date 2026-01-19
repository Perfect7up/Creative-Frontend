import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button, Typography, Result, Alert, Breadcrumb } from 'antd';
import { MailOutlined, ArrowLeftOutlined, HomeOutlined, KeyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '~/modules/account/hook/use-auth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const { forgotPassword, status, errors: apiErrors } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { Email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword({ body: data }, { onSuccess: () => setIsSent(true) });
  };

  if (isSent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="modern-form-container max-w-md w-full p-8 md:p-12 rounded-4xl shadow-2xl text-center">
          <Result
            status="success"
            title={
              <span className="text-(--text-main)! font-black! tracking-tight!">
                Reset Link Sent
              </span>
            }
            subTitle={
              <span className="text-(--text-muted)! text-base!">
                Please check your email for instructions to reset your password.
              </span>
            }
            extra={[
              <Link key="login" to="/account/login">
                <Button
                  type="primary"
                  className="btn-get-started h-12! px-8! rounded-xl! font-bold!"
                >
                  Back to Login
                </Button>
              </Link>,
            ]}
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
            {
              href: '/',
              title: <HomeOutlined className="text-(--text-muted)!" />,
            },
            {
              title: (
                <span className="text-(--text-muted)! flex items-center gap-1">
                  <KeyOutlined className="text-(--text-muted)!" /> Account
                </span>
              ),
            },
            { title: <span className="text-(--text-main)! font-bold!">Forgot Password</span> },
          ]}
        />
      </div>

      <div className="modern-form-container max-w-md w-full p-8 md:p-10 rounded-4xl shadow-2xl">
        <div className="text-center mb-10!">
          <Title level={2} className="text-(--text-main)! m-0! font-black! tracking-tight!">
            Reset Password
          </Title>
          <Text className="text-(--text-muted)! text-base! mt-2! block!">
            Enter your email to receive a reset link
          </Text>
        </div>

        {!!apiErrors.forgot && (
          <Alert
            message="Error"
            description="Could not send reset link. Please try again."
            type="error"
            showIcon
            className="auth-alert mb-6! rounded-xl!"
          />
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} requiredMark={false}>
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

          <Form.Item className="mt-8! mb-0!">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={status.isSendingForgot}
              className="btn-get-started h-14! rounded-2xl! font-bold! text-lg!"
            >
              {status.isSendingForgot ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-8!">
          <Link
            to="/account/login"
            className="text-(--text-muted)! font-semibold! hover:text-primary! transition-all! flex items-center justify-center gap-2!"
          >
            <ArrowLeftOutlined className="text-xs!" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
