import React from 'react';
import { Button, Input, Divider } from 'antd';
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
  MailOutlined,
} from '@ant-design/icons';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Solutions', 'Pricing', 'Releases'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Community', 'Guides'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Contact'],
    },
  ];

  return (
    <footer className="w-full pb-10 px-4 md:px-0">
      <div className="max-w-360 mx-auto bg-(--nav-bg) backdrop-blur-xl border border-(--nav-border) shadow-2xl rounded-4xl p-8 md:p-16 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center shrink-0">
              <span className="text-3xl font-black tracking-tighter text-(--text-main) cursor-pointer select-none">
                Dev<span className="text-primary">Flow</span>
              </span>
            </div>
            <p className="text-lg text-(--text-muted) max-w-sm leading-relaxed">
              Supercharge your workflow with our all-in-one developer platform. Built for modern
              teams who value speed and design.
            </p>

            <div className="space-y-4">
              <span className="block font-bold text-(--text-main)">Stay updated</span>
              <div className="flex gap-2 max-w-md">
                <Input
                  placeholder="Enter your email"
                  prefix={<MailOutlined className="text-slate-400" />}
                  className=" rounded-xl bg-white/50 dark:bg-slate-800/50 border-(--nav-border)"
                />
                <Button
                  type="primary"
                  className="btn-get-started h-12 rounded-xl font-bold shrink-0"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="font-bold text-(--text-main) uppercase tracking-widest text-sm">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a className="footer-link flex items-center group font-medium">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Divider className="my-12 border-(--nav-border)" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-(--text-muted) font-medium">
            © {new Date().getFullYear()} DevFlow Inc. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Button
              icon={<TwitterOutlined className="text-xl" />}
              className="social-icon-btn w-12 h-12 rounded-2xl"
            />
            <Button
              icon={<GithubOutlined className="text-xl" />}
              className="social-icon-btn w-12 h-12 rounded-2xl"
            />
            <Button
              icon={<LinkedinOutlined className="text-xl" />}
              className="social-icon-btn w-12 h-12 rounded-2xl"
            />
            <Button className="btn-get-started flex items-center gap-2 h-12 px-6 rounded-2xl font-bold">
              Contact Support <ArrowRightOutlined className="text-xs" />
            </Button>
          </div>
        </div>
      </div>

      {/* Legal Links Footer (Outside Glass) */}
      <div className="max-w-360 mx-auto mt-8 px-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm font-semibold text-(--text-muted)">
        <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
        <a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
        <a className="hover:text-primary transition-colors cursor-pointer">Cookie Settings</a>
        <a className="hover:text-primary transition-colors cursor-pointer">Security</a>
      </div>
    </footer>
  );
};

export default Footer;
