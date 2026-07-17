import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

export const BuildProcessSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="process" className="process-v2">
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

      <div className="process-v2-route">
        <motion.div
          className="process-v2-line"
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={reducedMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {t.process.steps.map(([title, description], index) => (
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.58,
              delay: 0.18 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            key={title}
          >
            <div className="process-v2-index">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {index === t.process.steps.length - 1 ? (
              <strong className="process-v2-result">{t.process.finalLabel}</strong>
            ) : null}
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
};
