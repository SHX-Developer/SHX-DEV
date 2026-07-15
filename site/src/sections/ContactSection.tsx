import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ArrowRightIcon } from '../components/ui/Icons';
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

  return (
    <AnimatedSection id="contact" className="contact-section">
      <div className="contact">
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2>
          {t.contact.title}
          <br />
          <em>{t.contact.accent}</em>.
        </h2>
        <p className="contact-lead">{t.contact.lead}</p>
        <div className="contact-actions">
          <Button variant="primary" href="https://t.me/shxdev" target="_blank" rel="noreferrer">
            {t.contact.contact}
            <ArrowRightIcon />
          </Button>
          <Button href="https://t.me/shxdev" target="_blank" rel="noreferrer">{t.contact.telegram}</Button>
          <Button href="https://github.com/shxdev" target="_blank" rel="noreferrer">{t.contact.github}</Button>
          <Button href="mailto:hello@shx.dev">{t.contact.email}</Button>
          <button className="btn ghost" type="button" onClick={copyEmail}>
            {copied ? t.contact.copied : t.contact.copyEmail}
          </button>
          <Button href="/resume/shx-dev-resume.pdf" download>{t.contact.resume}</Button>
        </div>
        <div className="contact-meta">
          {t.contact.replies}
          <a href="https://t.me/shxdev">@shxdev</a>
          {' \u00b7 hello'}
          <span>@</span>shx.dev
        </div>
      </div>
    </AnimatedSection>
  );
};
import { useState } from 'react';
