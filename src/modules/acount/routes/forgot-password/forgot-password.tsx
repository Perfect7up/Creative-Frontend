import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Form, Input, Button, Typography, Result, Alert } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '~/modules/acount/hook/use-auth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const { forgotPassword, status, errors: apiErrors } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword({ body: data }, { onSuccess: () => setIsSent(true) });
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Result
          status="success"
          title="Reset Link Sent"
          subTitle="Please check your email for instructions to reset your password."
          extra={[
            <Link key="login" to="/login">
              <Button type="primary">Back to Login</Button>
            </Link>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <Title level={3}>Forgot Password?</Title>
          <Text type="secondary">Enter your email to receive a reset link.</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email Address"
            validateStatus={formErrors.Email ? 'error' : ''}
            help={formErrors.Email?.message ? String(formErrors.Email.message) : undefined}
          >
            <Input
              {...register('Email')}
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              size="large"
              onChange={(e) => setValue('Email', e.target.value, { shouldValidate: true })}
            />
          </Form.Item>

          {!!apiErrors.forgot && (
            <Alert
              message="Error"
              description="Could not send reset link."
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={status.isSendingForgot}
            style={{ background: '#00d1ff', borderColor: '#00d1ff' }}
          >
            Send Link
          </Button>

          <div className="text-center mt-6">
            <Link to="/login" className="text-gray-500">
              <ArrowLeftOutlined /> Back
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
