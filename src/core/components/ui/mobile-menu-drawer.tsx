import React from 'react';
import { Drawer, Button, Menu } from 'antd';
import type { MenuProps } from 'antd';

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  menuItems: MenuProps['items'];
}

const MobileMenuDrawer: React.FC<Props> = ({ open, setOpen, menuItems }) => (
  <Drawer
    title={<span className="font-black text-xl text-(--text-main)">DevFlow</span>}
    onClose={() => setOpen(false)}
    open={open}
    width={320}
    closeIcon={null}
    styles={{
      body: { backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(10px)' },
      header: { backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--nav-border)' },
    }}
    extra={
      <Button type="text" onClick={() => setOpen(false)} className="text-(--text-main) text-lg">
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
);

export default MobileMenuDrawer;
