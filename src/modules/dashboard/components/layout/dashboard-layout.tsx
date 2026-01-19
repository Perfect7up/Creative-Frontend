import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/modules/acount/hook/use-auth';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
  ];

  const handleLogoutClick = () => {
    logout({
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        style={{ background: '#000513' }}
      >
        <div style={{ height: 64, margin: 16, color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {!collapsed ? 'Creative Hideout' : 'CH'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ background: '#000513' }}
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 24,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Logout',
                    icon: <LogoutOutlined />,
                    onClick: () => handleLogoutClick(),
                  },
                ],
              }}
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar style={{ backgroundColor: '#00d1ff' }} icon={<UserOutlined />} />
                <span className="hidden md:inline">My Account</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
