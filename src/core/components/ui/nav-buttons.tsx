import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, GithubOutlined } from '@ant-design/icons';

const NavButtons: React.FC = () => (
  <div className="hidden lg:flex items-center gap-3 shrink-0">
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
);

export default NavButtons;
