import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { Language } from '../i18n';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';
import { isPerformanceLite } from '../utils/performance';

const languages: Array<{
  value: Language;
  flag: string;
  label: string;
  disabled?: boolean;
}> = [
  { value: 'ru', flag: '🇷🇺', label: 'Русский' },
  { value: 'uz', flag: '🇺🇿', label: 'O‘zbekcha' },
  { value: 'en', flag: '🇺🇸', label: 'English' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuTop, setMobileMenuTop] = useState(80);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const performanceLite = isPerformanceLite();
  const languageMenuLabel = {
    ru: 'Язык интерфейса',
    uz: 'Interfeys tili',
    en: 'Interface language',
  }[language];
  const soonLabel = {
    ru: 'Скоро',
    uz: 'Tez orada',
    en: 'Soon',
  }[language];

  useEffect(() => {
    const clearActiveAtTop = () => {
      if (window.scrollY < 180) setActiveHref(null);
    };

    window.addEventListener('scroll', clearActiveAtTop, { passive: true });
    return () => window.removeEventListener('scroll', clearActiveAtTop);
  }, []);

  useEffect(() => {
    const sections = t.header.nav
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveHref(`#${visibleEntry.target.id}`);
      },
      {
        rootMargin: '-24% 0px -62% 0px',
        threshold: [0, 0.08, 0.2],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.header.nav]);

  useEffect(() => {
    if (!isOpen) return;

    const updateMobileMenuPosition = () => {
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom;
      if (headerBottom !== undefined) setMobileMenuTop(Math.round(headerBottom + 10));
    };

    updateMobileMenuPosition();
    window.addEventListener('resize', updateMobileMenuPosition);
    window.addEventListener('scroll', updateMobileMenuPosition, { passive: true });
    return () => {
      window.removeEventListener('resize', updateMobileMenuPosition);
      window.removeEventListener('scroll', updateMobileMenuPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsLanguageOpen(false);
      }
    };

    const closeLanguageMenu = (event: PointerEvent) => {
      if (
        isLanguageOpen &&
        languageRef.current &&
        event.target instanceof Node &&
        !languageRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeLanguageMenu);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeLanguageMenu);
    };
  }, [isLanguageOpen]);

  const closeAndScroll = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveHref(href === '#top' ? null : href);

    if (isOpen) {
      setIsOpen(false);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => scrollToSection(href)));
      return;
    }

    scrollToSection(href);
  };

  const handleHeaderLight = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (performanceLite) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--header-light-opacity', '0.82');
    event.currentTarget.style.setProperty('--header-light-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--header-light-y', `${event.clientY - rect.top}px`);
  };

  const resetHeaderLight = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--header-light-opacity', '0');
    event.currentTarget.style.setProperty('--header-light-x', '50%');
    event.currentTarget.style.setProperty('--header-light-y', '50%');
  };

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsLanguageOpen(false);
  };

  return (
    <header className="nav" ref={headerRef}>
      <div
        className="nav-inner"
        onPointerMove={handleHeaderLight}
        onPointerLeave={resetHeaderLight}
      >
        <span className="nav-reflection" aria-hidden="true" />

        <a
          className="brand"
          href="#top"
          onClick={(event) => closeAndScroll(event, '#top')}
        >
          <span className="brand-mark" aria-hidden="true">
            <img className="site-brand-logo" src="/brand/Logo.png" alt="" />
          </span>
          <span className="brand-name">SHX DEV</span>
        </a>

        <nav className="nav-links" aria-label={t.header.primaryNav}>
          {t.header.nav.map((link) => (
            <a
              className={`nav-link${activeHref === link.href ? ' is-active' : ''}`}
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? 'page' : undefined}
              onClick={(event) => closeAndScroll(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="language-picker" ref={languageRef}>
            <button
              className="language-toggle"
              type="button"
              aria-label={t.header.languageLabel}
              aria-expanded={isLanguageOpen}
              aria-haspopup="menu"
              onClick={() => {
                setIsOpen(false);
                setIsLanguageOpen((value) => !value);
              }}
            >
              <span aria-hidden="true">◎</span>
              <strong>{language.toUpperCase()}</strong>
              <i aria-hidden="true">⌄</i>
            </button>

            <AnimatePresence>
              {isLanguageOpen ? (
                <motion.div
                  className="language-menu"
                  role="menu"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.14, ease: 'easeOut' }}
                >
                  <span className="language-menu-label">{languageMenuLabel}</span>
                  {languages.map((item) => {
                    const isSelected = item.value === language;
                    return (
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={isSelected}
                        disabled={item.disabled}
                        className={isSelected ? 'is-selected' : ''}
                        onClick={() => {
                          if (!item.disabled) chooseLanguage(item.value);
                        }}
                        key={item.value}
                      >
                        <span className="language-flag" aria-hidden="true">
                          {item.flag}
                        </span>
                        <span>{item.label}</span>
                        {item.disabled ? (
                          <small>{soonLabel}</small>
                        ) : (
                          <i aria-hidden="true">{isSelected ? '✓' : ''}</i>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <a
            className="nav-cta"
            href="#contact"
            onClick={(event) => closeAndScroll(event, '#contact')}
          >
            <span className="nav-cta-spark" aria-hidden="true">
              ✦
            </span>
            {t.header.cta}
            <span className="nav-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? t.header.menuClose : t.header.menu}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          createPortal(
            <motion.nav
              className="mobile-menu"
              id="mobile-navigation"
              style={{ top: mobileMenuTop }}
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18 }}
              aria-label={t.header.mobileNav}
            >
              {t.header.nav.map((link) => (
                <a
                  className={activeHref === link.href ? 'is-active' : ''}
                  key={link.href}
                  href={link.href}
                  onClick={(event) => closeAndScroll(event, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>,
            document.body,
          )
        ) : null}
      </AnimatePresence>
    </header>
  );
};
