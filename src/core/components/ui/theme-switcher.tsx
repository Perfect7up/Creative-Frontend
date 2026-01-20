import React from 'react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { SunOutlined, MoonOutlined, DesktopOutlined, CheckOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/use-theme';

interface Props {
  size?: 'small' | 'large';
}

const ThemeSwitcher: React.FC<Props> = ({ size = 'large' }) => {
  const { themeMode, setThemeMode } = useTheme();

  const themeOptions: MenuProps['items'] = [
    {
      key: 'light',
      label: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <SunOutlined />
            <span>Light</span>
          </div>
          {themeMode === 'light' && <CheckOutlined className="text-blue-600" />}
        </div>
      ),
      onClick: () => setThemeMode('light'),
    },
    {
      key: 'dark',
      label: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <MoonOutlined />
            <span>Dark</span>
          </div>
          {themeMode === 'dark' && <CheckOutlined className="text-blue-600" />}
        </div>
      ),
      onClick: () => setThemeMode('dark'),
    },
    {
      key: 'system',
      label: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <DesktopOutlined />
            <span>System</span>
          </div>
          {themeMode === 'system' && <CheckOutlined className="text-blue-600" />}
        </div>
      ),
      onClick: () => setThemeMode('system'),
    },
  ];

  const getThemeIcon = () => {
    if (themeMode === 'light') return <SunOutlined />;
    if (themeMode === 'dark') return <MoonOutlined />;
    return <DesktopOutlined />;
  };

  return (
    <Dropdown menu={{ items: themeOptions }} trigger={['click']} placement="bottomRight">
      <Button
        className={`theme-switcher-btn ${size === 'small' ? 'w-11 h-11 rounded-xl' : 'w-12 h-12 rounded-2xl'}`}
        icon={getThemeIcon()}
        aria-label="Toggle theme"
      />
    </Dropdown>
  );
};

export default ThemeSwitcher;
