import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { MouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon, DownloadIcon } from '../components/ui/Icons';
import { SectionFX } from '../components/ui/SectionFX';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { isPerformanceLite } from '../utils/performance';
import { scrollToSection } from '../utils/scroll';

const techMarks: Record<string, string> = {
  PYTHON: 'Py',
  TYPESCRIPT: 'TS',
  FASTAPI: 'FA',
  POSTGRESQL: 'PG',
  'TELEGRAM WEB APPS': 'TG',
};

const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault();
  scrollToSection(href);
};

const CounterValue = ({ value, locale }: { value: string; locale: Language }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!ref.current || !inView) return;

    const target = Number(value.replace(/\D/g, ''));
    if (!target || reducedMotion) {
      ref.current.textContent = value;
      return;
    }

    const suffix = value.replace(/[0-9,\s]/g, '');
    const controls = animate(0, target, {
      duration: target > 1000 ? 1.65 : 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        ref.current.textContent = `${Math.round(latest).toLocaleString(
          locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US',
        )}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, locale, reducedMotion, value]);

  return <span ref={ref}>{reducedMotion ? value : '0'}</span>;
};

export const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const performanceLite = isPerformanceLite();
  const cardRotateXValue = useMotionValue(0);
  const cardRotateYValue = useMotionValue(0);
  const cardRotateX = useSpring(cardRotateXValue, { stiffness: 140, damping: 22 });
  const cardRotateY = useSpring(cardRotateYValue, { stiffness: 140, damping: 22 });

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (performanceLite) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    if (!reducedMotion) {
      event.currentTarget.style.setProperty('--parallax-x', `${(x - 0.5) * 20}px`);
      event.currentTarget.style.setProperty('--parallax-y', `${(y - 0.5) * 16}px`);
    }

  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (performanceLite) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    event.currentTarget.style.setProperty('--card-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--card-y', `${y * 100}%`);

    if (!reducedMotion) {
      cardRotateXValue.set((0.5 - y) * 5);
      cardRotateYValue.set((x - 0.5) * 5);
    }
  };

  const handleCardPointerLeave = () => {
    cardRotateXValue.set(0);
    cardRotateYValue.set(0);
  };

  return (
    <section
      className="hero"
      onPointerMove={handleHeroPointerMove}
    >
      <SectionFX variant="hero" />
      <div className="hero-aura hero-aura-one" aria-hidden="true" />
      <div className="hero-aura hero-aura-two" aria-hidden="true" />
      <div className="hero-mesh" aria-hidden="true" />
      <div className="hero-signal-field" aria-hidden="true">
        <svg viewBox="0 0 900 300" preserveAspectRatio="none">
          <path d="M-40 230C150 100 282 280 470 162C610 74 710 94 940 18" />
          <path d="M-40 278C180 152 310 310 500 210C660 126 766 148 940 70" />
        </svg>
        <span className="hero-particle particle-one" />
        <span className="hero-particle particle-two" />
        <span className="hero-particle particle-three" />
        <span className="hero-particle particle-four" />
      </div>

      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : { y: 24 }}
          animate={reducedMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="pill"
            initial={reducedMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={reducedMotion ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pulse" />
            {t.hero.pill}
          </motion.span>
          <motion.h1
            initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)', y: 70 }}
            animate={reducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)', y: 24 }}
            animate={reducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.subtitleStart}
            <strong>{t.hero.subtitleStrong}</strong>
            {t.hero.subtitleEnd}
          </motion.p>
          <motion.p
            className="hero-story"
            initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)', y: 20 }}
            animate={reducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.proof} <strong>{t.hero.proofStrong}</strong>
          </motion.p>
          <div className="hero-actions">
            <Button
              variant="primary"
              href="#projects"
              onClick={(event) => handleAnchorClick(event, '#projects')}
            >
              {t.hero.viewProjects}
              <ArrowRightIcon className="arrow" />
            </Button>
            <Button href="#about" onClick={(event) => handleAnchorClick(event, '#about')}>
              {t.hero.about}
            </Button>
            <Button href="/resume/shx-dev-resume.pdf" download="Shaxrizod_Ilxomov_Resume.pdf">
              {t.hero.resume}
              <DownloadIcon />
            </Button>
          </div>
          <div className="hero-tags">
            {t.hero.tags.map((tag) => (
              <span className="tag" key={tag}>
                <i aria-hidden="true">{techMarks[tag] ?? tag.slice(0, 2)}</i>
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="hero-showcase"
          initial={reducedMotion ? false : { opacity: 0, x: 30 }}
          animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={
            reducedMotion || performanceLite
              ? undefined
              : {
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformPerspective: 1200,
                }
          }
          onPointerMove={handleCardPointerMove}
          onPointerLeave={handleCardPointerLeave}
        >
          <div className="hero-showcase-light" aria-hidden="true" />
          <div className="hero-showcase-head">
            <span>
              SHX / {{ ru: 'ПРОФИЛЬ', uz: 'PROFIL', en: 'PROFILE' }[language]}
            </span>
            <span className="hero-showcase-status">
              <i />
              2026
            </span>
          </div>

          <div className="hero-showcase-main">
            <div>
              <p className="profile-kicker">{t.hero.profileKicker}</p>
              <h2>{t.hero.profileTitle}</h2>
              <p className="hero-showcase-text">{t.hero.profileText}</p>
              <div className="hero-personal-note">
                <span className="hero-personal-avatar" aria-hidden="true">
                  <img className="site-brand-logo" src="/brand/Main%20Logo.png" alt="" />
                </span>
                <div>
                  <strong>Shahrizod</strong>
                  <small>
                    {{
                      ru: 'Создаю продукты из Ташкента',
                      uz: 'Toshkentdan turib mahsulotlar yarataman',
                      en: 'Building products from Tashkent',
                    }[language]}
                  </small>
                </div>
                <i aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="proof-grid">
            {t.hero.metrics.map(([value, label]) => (
              <div key={label}>
                <CounterValue value={value} locale={language} />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>01</span>
        <i />
        <span>SHX DEV</span>
      </div>
    </section>
  );
};
