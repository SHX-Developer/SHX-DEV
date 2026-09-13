import { GitHubIcon, MailIcon, TelegramIcon, XIcon } from '../components/ui/Icons';
import type { ComponentType, SVGProps } from 'react';

type Social = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  separated?: boolean;
};

export const socials: Social[] = [
  { href: 'https://github.com/SHX-Developer', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://t.me/shxdev', label: 'Telegram', Icon: TelegramIcon },
  { href: 'https://x.com/shxdev', label: 'X', Icon: XIcon },
  { href: 'mailto:geomangd2003@gmail.com', label: 'Email', Icon: MailIcon, separated: true },
];
