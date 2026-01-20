import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

interface Props {
  items: MenuProps['items'];
  className?: string;
}

const NavMenu: React.FC<Props> = ({ items, className }) => {
  return <Menu mode="horizontal" items={items} className={className} disabledOverflow />;
};

export default NavMenu;
