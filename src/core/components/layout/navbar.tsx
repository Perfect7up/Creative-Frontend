import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, theme as antdTheme } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import NavMenu from '../ui/nav-menu';
import ThemeSwitcher from '../ui/theme-switcher';
import NavButtons from '../ui/nav-buttons';
import MobileMenuDrawer from '../ui/mobile-menu-drawer';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | 'top'>('top');

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const activeDark =
        themeMode === 'dark' ? true : themeMode === 'light' ? false : mediaQuery.matches;
      setIsDark(activeDark);

      if (activeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    const listener = () => {
      if (themeMode === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', listener);

    let lastScrollY = window.scrollY;
    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setScrollDir(scrollY <= 10 ? 'top' : scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDir);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('scroll', updateScrollDir);
    };
  }, [themeMode]);

  const menuItems = [
    { label: 'Features', key: 'features' },
    { label: 'Solutions', key: 'solutions' },
    { label: 'Resources', key: 'resources' },
    { label: 'Docs', key: 'docs' },
  ];

  const visibilityClass = scrollDir === 'down' ? 'navbar-hidden' : 'navbar-visible';
  const activeClass = scrollDir !== 'top' ? 'nav-container-active' : '';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: '#1d4ed8', borderRadius: 16, fontFamily: 'Inter, sans-serif' },
      }}
    >
      <Header
        className={`fixed left-1/2 z-50 w-[94%] max-w-360 h-auto bg-transparent p-0 leading-none transition-all navbar-wrapper ${visibilityClass}`}
        style={{ top: '24px' }}
      >
        <div
          className={`bg-(--nav-bg) backdrop-blur-xl border border-(--nav-border) rounded-4xl px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${activeClass}`}
        >
          <a
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter text-(--text-main) cursor-pointer select-none"
          >
            Dev<span className="text-primary">Flow</span>
          </a>

          <div className="hidden lg:flex flex-1 justify-center px-4">
            <NavMenu items={menuItems} className="modern-menu w-full max-w-md border-none" />
          </div>

          <NavButtons />

          <div className="lg:hidden flex items-center gap-3">
            <ThemeSwitcher themeMode={themeMode} setThemeMode={setThemeMode} size="small" />
            <button
              className="w-11 h-11 flex items-center justify-center bg-(--nav-border) text-(--text-main) rounded-xl"
              onClick={() => setOpen(true)}
            >
              <MenuOutlined className="text-xl" />
            </button>
          </div>
        </div>

        <MobileMenuDrawer open={open} setOpen={setOpen} menuItems={menuItems} />
      </Header>

      <div className="h-28" />
    </ConfigProvider>
  );
};

export default Navbar;
