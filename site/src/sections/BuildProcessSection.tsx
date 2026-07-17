import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import {
  ArrowRightIcon,
  CodeIcon,
  CubeIcon,
  GridIcon,
  UserIcon,
} from '../components/ui/Icons';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const processIcons = [UserIcon, CubeIcon, ArrowRightIcon, GridIcon, CodeIcon, CubeIcon];

export const BuildProcessSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="process">
      <SectionHeading
        eyebrow={t.process.eyebrow}
        title={
          <>
            {t.process.title}
            <br />
            <em>{t.process.accent}</em>.
          </>
        }
        subtitle={t.process.subtitle}
      />

      <div className="process-lifecycle" aria-hidden="true">
        <span>{t.process.routeLabel}</span>
        <strong>01 → 06</strong>
      </div>

      <div className="process-grid">
        <motion.div
          className="process-route"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, scaleX: 0.3 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
        {t.process.steps.map(([title, description], index) => {
          const Icon = processIcons[index % processIcons.length];
          const isFinal = index === t.process.steps.length - 1;

          return (
            <motion.article
              className={`process-step${isFinal ? ' is-final' : ''}`}
              data-stage={index + 1}
              key={title}
              initial={reducedMotion ? false : { opacity: 0.22, y: 22, scale: 0.985 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.72,
                delay: index * 0.13,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reducedMotion ? undefined : { y: -6 }}
            >
              <div className="process-step-head">
                <div className="process-icon">
                  <Icon />
                  {isFinal ? <i aria-hidden="true">✓</i> : null}
                </div>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              {isFinal ? (
                <div className="process-final-label">
                  <b aria-hidden="true">✓</b>
                  {t.process.finalLabel}
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </AnimatedSection>
  );
};
