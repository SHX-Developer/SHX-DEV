import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';

const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault();
  scrollToSection(href);
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const closeAndScroll = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    if (isOpen) {
      setIsOpen(false);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => scrollToSection(href)),
      );
      return;
    }

    scrollToSection(href);
  };

  return (
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="#top" onClick={(event) => closeAndScroll(event, '#top')}>
            <span className="brand-mark" aria-hidden="true">
              <img src="/brand/shx-logo.png" alt="" />
            </span>
            SHX&nbsp;DEV
          </a>
          <nav className="nav-links" aria-label={t.header.primaryNav}>
            {t.header.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="language-toggle"
              type="button"
              aria-label={t.header.languageLabel}
              onClick={toggleLanguage}
            >
              <span className={language === 'en' ? 'active' : ''}>EN</span>
              <span className={language === 'ru' ? 'active' : ''}>RU</span>
            </button>
            <a
              className="nav-cta"
              href="#contact"
              onClick={(event) => handleAnchorClick(event, '#contact')}
            >
              <span className="dot" />
              {t.header.cta}
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? t.header.menuClose : t.header.menu}
              onClick={() => setIsOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        {isOpen ? (
          <motion.nav
            className="mobile-menu shell"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            aria-label={t.header.mobileNav}
          >
            {t.header.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => closeAndScroll(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </header>
    </>
  );
};
