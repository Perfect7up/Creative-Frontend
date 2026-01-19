import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, ConfigProvider, Dropdown, theme as antdTheme } from 'antd';
import {
  MenuOutlined,
  GithubOutlined,
  ArrowRightOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState(false);

  // Scroll Logic States
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | 'top'>('top');

  useEffect(() => {
    // 1. Theme Logic
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let activeDark = false;
      if (themeMode === 'dark') activeDark = true;
      else if (themeMode === 'light') activeDark = false;
      else activeDark = mediaQuery.matches;

      setIsDark(activeDark);
      if (activeDark) root.classList.add('dark');
      else root.classList.remove('dark');
    };

    applyTheme();
    const listener = () => {
      if (themeMode === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', listener);

    // 2. Optimized Scroll Logic
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 10) {
        setScrollDir('top');
      } else if (scrollY > lastScrollY) {
        setScrollDir('down');
      } else if (scrollY < lastScrollY) {
        setScrollDir('up');
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDir);
    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('scroll', updateScrollDir);
    };
  }, [themeMode]);

  const menuItems: MenuProps['items'] = [
    { label: 'Features', key: 'features' },
    { label: 'Solutions', key: 'solutions' },
    { label: 'Resources', key: 'resources' },
    { label: 'Docs', key: 'docs' },
  ];

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

  const visibilityClass = scrollDir === 'down' ? 'navbar-hidden' : 'navbar-visible';
  const activeClass = scrollDir !== 'top' ? 'nav-container-active' : '';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1d4ed8',
          borderRadius: 16,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Header
        className={`fixed left-1/2 z-50 w-[94%] max-w-360 h-auto bg-transparent p-0 leading-none transition-all navbar-wrapper ${visibilityClass}`}
        style={{ top: '24px' }}
      >
        <div
          className={`bg-(--nav-bg) backdrop-blur-xl border border-(--nav-border) rounded-4xl px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${activeClass}`}
        >
          <div className="flex items-center shrink-0">
            <a
              href="/"
              className="text-2xl md:text-3xl font-black tracking-tighter text-(--text-main) cursor-pointer select-none"
            >
              Dev<span className="text-primary">Flow</span>
            </a>
          </div>

          <div className="hidden lg:flex flex-1 justify-center px-4">
            <Menu
              mode="horizontal"
              items={menuItems}
              className="modern-menu w-full max-w-md border-none"
              disabledOverflow
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Dropdown
              menu={{ items: themeOptions, selectable: true, selectedKeys: [themeMode] }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                className="theme-switcher-btn w-12! h-12! rounded-2xl!"
                icon={getThemeIcon()}
              />
            </Dropdown>

            <Button
              type="text"
              href="https://github.com/Perfect7up/Creative-Frontend"
              target="_blank"
              icon={<GithubOutlined className="text-lg" />}
              className="flex items-center font-semibold text-(--text-muted) hover:text-primary transition-colors"
            />

            <Button
              type="text"
              href="/account/login"
              className="font-bold text-(--text-main) px-6 h-12 hover:text-primary transition-colors"
            >
              Log in
            </Button>

            <Button
              type="primary"
              href="/account/register"
              className="btn-get-started flex items-center gap-2 h-12 px-8 rounded-2xl font-bold border-none"
            >
              Get Started <ArrowRightOutlined className="text-xs" />
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Dropdown menu={{ items: themeOptions }} trigger={['click']}>
              <Button
                className="theme-switcher-btn w-11! h-11! rounded-xl!"
                icon={getThemeIcon()}
              />
            </Dropdown>
            <Button
              type="text"
              className="w-11 h-11 flex items-center justify-center bg-(--nav-border) text-(--text-main) rounded-xl"
              icon={<MenuOutlined className="text-xl" />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        <Drawer
          title={<span className="font-black text-xl text-(--text-main)">DevFlow</span>}
          onClose={() => setOpen(false)}
          open={open}
          width={320}
          closeIcon={null}
          styles={{
            body: { backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(10px)' },
            header: {
              backgroundColor: 'var(--nav-bg)',
              borderBottom: '1px solid var(--nav-border)',
            },
          }}
          extra={
            <Button
              type="text"
              onClick={() => setOpen(false)}
              className="text-(--text-main) text-lg"
            >
              ✕
            </Button>
          }
        >
          <div className="flex flex-col h-full">
            <Menu
              mode="inline"
              items={menuItems}
              className="border-none text-lg bg-transparent font-medium mt-4 modern-menu"
            />
            <div className="mt-auto space-y-4 pb-10 px-4">
              <Button
                block
                size="large"
                href="/account/login"
                className="h-14 rounded-2xl font-bold text-(--text-main) border-(--nav-border)"
              >
                Log in
              </Button>
              <Button
                block
                type="primary"
                size="large"
                href="/account/register"
                className="btn-get-started h-14 rounded-2xl font-bold"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </Drawer>
      </Header>

      <div className="h-28" />
    </ConfigProvider>
  );
};

export default Navbar;
