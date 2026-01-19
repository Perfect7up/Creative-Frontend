import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Result, Button, Spin, Typography, Layout } from 'antd';
import { useAuth } from '~/modules/acount/hook/use-auth';

const { Content } = Layout;
const { Text } = Typography;

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
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: 500, width: '100%', padding: '20px' }}>
          {isFetching && (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" tip="Verifying your email..." />
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Communicating with Creative Gateway API...</Text>
              </div>
            </div>
          )}

          {!isFetching && isSuccess && (
            <Result
              status="success"
              title="Verification Successful!"
              subTitle="Your email has been verified. You can now access all features of Creative Hideout."
              extra={[
                <Button
                  type="primary"
                  key="login"
                  size="large"
                  onClick={() => navigate('/account/login')}
                  style={{ background: '#00d1ff', borderColor: '#00d1ff' }}
                >
                  Sign In to Dashboard
                </Button>,
              ]}
            />
          )}

          {!isFetching && (isError || !token) && (
            <Result
              status="error"
              title="Verification Failed"
              subTitle={
                !token
                  ? 'No verification token was provided in the link.'
                  : 'The verification link is invalid, expired, or has already been used.'
              }
              extra={[
                <Button type="primary" key="register" onClick={() => navigate('/register')}>
                  Back to Registration
                </Button>,
                <Button
                  key="support"
                  onClick={() => window.open('mailto:support@creativehideout.com')}
                >
                  Contact Support
                </Button>,
              ]}
            >
              <div className="desc">
                <Text strong style={{ fontSize: 16 }}>
                  Common reasons for this error:
                </Text>
                <ul style={{ marginTop: 8 }}>
                  <li>
                    <Text type="secondary">The token is more than 24 hours old.</Text>
                  </li>
                  <li>
                    <Text type="secondary">You have already clicked this link before.</Text>
                  </li>
                  <li>
                    <Text type="secondary">The URL was copied incorrectly from your email.</Text>
                  </li>
                </ul>
              </div>
            </Result>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default VerifyEmailPage;
