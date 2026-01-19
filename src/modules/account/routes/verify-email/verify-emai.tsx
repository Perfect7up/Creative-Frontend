import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Result, Button, Spin, Typography, Breadcrumb } from 'antd';
import { HomeOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAuth } from '~/modules/account/hook/use-auth';

const { Title, Text } = Typography;

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { useVerifyEmailQuery } = useAuth();
  const { isFetching, isSuccess, isError } = useVerifyEmailQuery(token);

  useEffect(() => {
    if (!token) {
      console.error('No verification token found in URL');
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full mb-6">
        <Breadcrumb
          items={[
            { href: '/', title: <HomeOutlined className="text-(--text-muted)!" /> },
            {
              title: (
                <span className="text-(--text-muted)! flex items-center gap-1">
                  <CheckCircleOutlined className="text-(--text-muted)!" /> Account
                </span>
              ),
            },
            { title: <span className="text-(--text-main)! font-bold!">Verify Email</span> },
          ]}
        />
      </div>

      <div className="modern-form-container max-w-xl w-full p-8 md:p-12 rounded-4xl shadow-2xl">
        {isFetching && (
          <div className="text-center py-10!">
            <Spin indicator={<LoadingOutlined className="text-primary! text-5xl!" spin />} />
            <Title level={3} className="text-(--text-main)! mt-8! mb-2! font-black!">
              Verifying your email...
            </Title>
            <Text className="text-(--text-muted)! text-base!">
              Communicating with Creative Gateway API...
            </Text>
          </div>
        )}

        {!isFetching && isSuccess && (
          <Result
            status="success"
            title={
              <span className="text-(--text-main)! font-black! tracking-tight!">
                Verification Successful!
              </span>
            }
            subTitle={
              <span className="text-(--text-muted)! text-base!">
                Your email has been verified. You can now access all features of Creative Hideout.
              </span>
            }
            extra={[
              <Button
                type="primary"
                key="login"
                size="large"
                className="btn-get-started h-14! px-10! rounded-2xl! font-bold! text-lg!"
                onClick={() => navigate('/account/login')}
              >
                Sign In to Dashboard
              </Button>,
            ]}
          />
        )}

        {!isFetching && (isError || !token) && (
          <Result
            status="error"
            title={<span className="text-(--text-main)! font-black!">Verification Failed</span>}
            subTitle={
              <span className="text-(--text-muted)! text-base!">
                {!token
                  ? 'No verification token was provided in the link.'
                  : 'The verification link is invalid, expired, or has already been used.'}
              </span>
            }
            extra={[
              <Button
                type="primary"
                key="register"
                className="btn-get-started h-12! px-8! rounded-xl! font-bold!"
                onClick={() => navigate('/account/register')}
              >
                Back to Registration
              </Button>,
              <Button
                key="support"
                className="h-12! px-8! rounded-xl! font-bold! text-(--text-main)! border-(--nav-border)! hover:border-primary!"
                onClick={() => window.open('mailto:support@creativehideout.com')}
              >
                Contact Support
              </Button>,
            ]}
          >
            <div className="mt-6! p-6! rounded-2xl! bg-(--input-bg) border! border-(--nav-border)">
              <Text className="text-(--text-main)! font-bold! text-lg! block! mb-4!">
                Common reasons for this error:
              </Text>
              <ul className="space-y-3! list-disc! list-inside!">
                <li>
                  <Text className="text-(--text-muted)!">The token is more than 24 hours old.</Text>
                </li>
                <li>
                  <Text className="text-(--text-muted)!">
                    You have already clicked this link before.
                  </Text>
                </li>
                <li>
                  <Text className="text-(--text-muted)!">
                    The URL was copied incorrectly from your email.
                  </Text>
                </li>
              </ul>
            </div>
          </Result>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
