import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ProjectOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardHome: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Dashboard Overview</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Active Projects"
              value={12}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="Completed Tasks"
              value={95.4}
              precision={1}
              valueStyle={{ color: '#00d1ff' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <Statistic
              title="System Status"
              value="Operational"
              valueStyle={{ color: '#cf1322', fontSize: '18px' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" style={{ marginTop: '24px' }}>
        <p>Your creative projects are synced and up to date.</p>
        <p>New registration module implemented successfully.</p>
      </Card>
    </div>
  );
};

export default DashboardHome;
