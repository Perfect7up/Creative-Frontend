import React from 'react';
import { Button, Dropdown } from 'antd';

import type { MenuProps } from 'antd';

import { SunOutlined, MoonOutlined, DesktopOutlined, CheckOutlined } from '@ant-design/icons';

interface Props {
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  size?: 'small' | 'large';
}

const ThemeSwitcher: React.FC<Props> = ({ themeMode, setThemeMode, size = 'large' }) => {
  const themeOptions: MenuProps['items'] = [
    {
      key: 'light',
      label: 'Light',
      icon: <SunOutlined />,
      onClick: () => setThemeMode('light'),
      extra: themeMode === 'light' && <CheckOutlined className="text-blue-600" />,
    },
    {
      key: 'dark',
      label: 'Dark',
      icon: <MoonOutlined />,
      onClick: () => setThemeMode('dark'),
      extra: themeMode === 'dark' && <CheckOutlined className="text-blue-600" />,
    },
    {
      key: 'system',
      label: 'System',
      icon: <DesktopOutlined />,
      onClick: () => setThemeMode('system'),
      extra: themeMode === 'system' && <CheckOutlined className="text-blue-600" />,
    },
  ];

  const getThemeIcon = () => {
    if (themeMode === 'light') return <SunOutlined />;
    if (themeMode === 'dark') return <MoonOutlined />;
    return <DesktopOutlined />;
  };

  return (
    <Dropdown
      menu={{ items: themeOptions, selectable: true, selectedKeys: [themeMode] }}
      trigger={['click']}
    >
      <Button
        className={`theme-switcher-btn ${size === 'small' ? 'w-11 h-11 rounded-xl' : 'w-12 h-12 rounded-2xl'}`}
        icon={getThemeIcon()}
      />
    </Dropdown>
  );
};

export default ThemeSwitcher;
