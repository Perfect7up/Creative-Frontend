import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Alert, Form, Row, Col } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '~/modules/account/hook/use-auth';
import { registerSchema, type RegisterFormData } from '../../schema/auth.schema';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register: registerUser, status, apiErrorMessages } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onFinish = (values: RegisterFormData) => {
    // Correctly destructure ConfirmPassword out so it's not sent to the API
    const { ConfirmPassword, ...apiPayload } = values;
    void ConfirmPassword;

    registerUser(
      { body: apiPayload },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <div className="w-full">
      {/* Global API Error Alert (Handles the "One or more errors" fix) */}
      {apiErrorMessages.register && (
        <Alert
          message="Registration Error"
          description={apiErrorMessages.register}
          type="error"
          showIcon
          className="auth-alert mb-6! rounded-xl!"
        />
      )}

      <Form
        layout="vertical"
        onFinish={handleSubmit(onFinish)}
        requiredMark={false}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span className="text-(--text-main)! font-semibold!">First Name</span>}
              validateStatus={formErrors.FirstName ? 'error' : ''}
              help={formErrors.FirstName?.message}
            >
              <Controller
                name="FirstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-(--text-muted)!" />}
                    placeholder="John"
                    size="large"
                    className="h-12! rounded-2xl! text-(--text-main)! bg-(--input-bg)! border-(--nav-border)!"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span className="text-(--text-main)! font-semibold!">Last Name</span>}
              validateStatus={formErrors.LastName ? 'error' : ''}
              help={formErrors.LastName?.message}
            >
              <Controller
                name="LastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Doe"
                    size="large"
                    className="h-12! rounded-2xl! text-(--text-main)! bg-(--input-bg)! border-(--nav-border)!"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

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
                placeholder="john@example.com"
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

        {/* Confirm Password Restored */}
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
            loading={status.isRegistering}
            className="btn-get-started h-14! rounded-2xl! font-bold! text-lg!"
          >
            {status.isRegistering ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
