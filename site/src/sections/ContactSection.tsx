import { useState } from 'react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import {
  ArrowRightIcon,
  GitHubIcon,
  MailIcon,
  TelegramIcon,
} from '../components/ui/Icons';
import { useLanguage } from '../i18n';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    const email = 'hello@shx.dev';
    const fallback = document.createElement('textarea');
    fallback.value = email;
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    fallback.remove();

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const channels = [
    {
      label: t.contact.telegram,
      value: '@shxdev',
      href: 'https://t.me/shxdev',
      Icon: TelegramIcon,
      primary: true,
    },
    {
      label: t.contact.github,
      value: 'github.com/shxdev',
      href: 'https://github.com/shxdev',
      Icon: GitHubIcon,
      primary: false,
    },
    {
      label: t.contact.email,
      value: 'hello@shx.dev',
      href: 'mailto:hello@shx.dev',
      Icon: MailIcon,
      primary: false,
    },
  ];

  return (
    <AnimatedSection id="contact" className="contact-section">
      <div className="contact">
        <div className="contact-orbit" aria-hidden="true" />
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2>
          <span>{t.contact.title}</span>
          <i aria-hidden="true">↓</i>
          <em>{t.contact.accent}.</em>
        </h2>
        <p className="contact-lead">{t.contact.lead}</p>

        <div className="contact-channels">
          {channels.map(({ label, value, href, Icon, primary }) => (
            <a
              className={`contact-channel ${primary ? 'is-primary' : ''}`}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              key={label}
            >
              <span className="contact-channel-icon">
                <Icon />
              </span>
              <span className="contact-channel-copy">
                <small>{label}</small>
                <strong>{value}</strong>
              </span>
              <ArrowRightIcon className="contact-channel-arrow" />
            </a>
          ))}
        </div>

        <div className="contact-bottom">
          <div className="contact-meta">
            {t.contact.replies}
            <a href="https://t.me/shxdev">@shxdev</a>
          </div>
          <div className="contact-secondary-actions">
            <button type="button" onClick={copyEmail}>
              {copied ? t.contact.copied : t.contact.copyEmail}
            </button>
            <a href="/resume/shx-dev-resume.pdf" download>
              {t.contact.resume}
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
