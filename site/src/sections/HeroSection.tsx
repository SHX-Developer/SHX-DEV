import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon, DownloadIcon } from '../components/ui/Icons';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';

const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault();
  scrollToSection(href);
};

export const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="hero">
      <video
        className="hero-bg-video"
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/hero-poster.webp"
      >
        <source src="/videos/galaxy-2.mp4" type="video/mp4" />
      </video>
      <div className="hero-bg-overlay" aria-hidden="true" />

      <motion.div
        className="hero-copy"
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pill">
          <span className="pulse" />
          {t.hero.pill}
        </span>
        <h1>{t.hero.title}</h1>
        <p className="hero-sub">
          {t.hero.subtitleStart}
          <strong>{t.hero.subtitleStrong}</strong>
          {t.hero.subtitleEnd}
        </p>
        <p className="hero-proof">
          {t.hero.proof}
          <br />
          <strong>{t.hero.proofStrong}</strong>
        </p>
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
          <Button href="#resume" onClick={(event) => handleAnchorClick(event, '#resume')}>
            {t.hero.resume}
            <DownloadIcon />
          </Button>
        </div>
        <div className="hero-tags">
          {t.hero.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="hero-profile"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="profile-card">
          <div className="avatar-shell" aria-hidden="true">
            <span className="avatar-mark">SHX</span>
          </div>
          <div>
            <p className="profile-kicker">{t.hero.profileKicker}</p>
            <h2>{t.hero.profileTitle}</h2>
            <p>{t.hero.profileText}</p>
          </div>
        </div>
        <div className="proof-grid">
          {t.hero.metrics.map(([value, label]) => (
            <div key={label}>
              <span>{value}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>
        <div className="stack-strip" aria-label={t.hero.stackLabel}>
          <span>React</span>
          <span>TypeScript</span>
          <span>Python</span>
          <span>FastAPI</span>
          <span>PostgreSQL</span>
          <span>Docker</span>
          <span>Linux</span>
          <span>Telegram API</span>
        </div>
      </motion.div>
    </section>
  );
};
