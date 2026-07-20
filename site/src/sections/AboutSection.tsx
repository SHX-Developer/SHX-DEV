import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionFX } from '../components/ui/SectionFX';
import { useLanguage } from '../i18n';

export const AboutSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const personalLabel = {
    ru: 'ЛИЧНО',
    uz: 'SHAXSAN',
    en: 'PERSONALLY',
  }[language];
  const mission = {
    ru: '«Делать полезные продукты»',
    uz: '“Foydali mahsulotlar yaratish”',
    en: '“Make useful software”',
  }[language];
  const role = {
    ru: 'Основатель · Fullstack Product Engineer',
    uz: 'Asoschi · Fullstack Product Engineer',
    en: 'Founder · Fullstack Product Engineer',
  }[language];

  return (
    <AnimatedSection id="about" className="about-v2">
      <SectionFX variant="about" />
      <div className="about-v2-grid">
        <div className="about-v2-statement">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title">
            {t.about.title}
            <br />
            <em>{t.about.accent}</em>
          </h2>
          <p className="about-v2-lead">{t.about.lead}</p>
          <blockquote>
            <span>“</span>
            {t.about.p1}
          </blockquote>
        </div>

        <motion.div
          className="about-v2-profile"
          initial={reducedMotion ? false : { opacity: 0, x: 32 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-v2-person">
            <span className="about-v2-avatar" aria-hidden="true">
              <img className="site-brand-logo" src="/brand/Logo-ShxDev.png" alt="" />
            </span>
            <div>
              <small>{personalLabel}</small>
              <strong>Shahrizod</strong>
              <p>{role}</p>
            </div>
            <span className="about-v2-live">
              <i />
              {t.about.status}
            </span>
          </div>

          <div className="about-v2-metrics" aria-label={t.about.metricsLabel}>
            {t.about.metrics.map(([value, label], index) => (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                key={label}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>

          <div className="about-v2-capabilities">
            {t.skills.map((group, index) => (
              <div key={group.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{group.title}</strong>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>

          <code>
            mission: {mission}
          </code>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};
