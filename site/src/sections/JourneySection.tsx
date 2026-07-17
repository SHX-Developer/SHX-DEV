import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, CubeIcon, GridIcon } from '../components/ui/Icons';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const journeyIcons = [ArrowRightIcon, GridIcon, CodeIcon, CubeIcon];

const journeyVisuals = [
  { image: '/projects/cyber-donate-live.png', mark: 'CD', label: 'FIRST PRODUCT' },
  { image: null, mark: '10K', label: 'COMMERCE GROWTH' },
  { image: '/projects/stars-pay-live.png', mark: 'SP', label: 'PAYMENT SCALE' },
  { image: null, mark: 'SHX', label: 'PRODUCT PLATFORM' },
] as const;

export const JourneySection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="journey">
      <SectionHeading
        eyebrow={t.journey.eyebrow}
        title={
          <>
            {t.journey.title}
            <br />
            <em>{t.journey.accent}</em>.
          </>
        }
        subtitle={t.journey.subtitle}
      />

      <motion.div
        className="journey-dashboard"
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="journey-dashboard-bar">
          <div aria-hidden="true"><i /><i /><i /></div>
          <span>{t.journey.rangeLabel}</span>
          <small><i /> LIVE JOURNEY</small>
        </div>

        <div className="journey-track">
          <motion.i
            className="journey-line journey-line-horizontal"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.i
            className="journey-line journey-line-vertical"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={reducedMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          />

          {t.journey.items.map(([year, phase, product, description, metrics, tags], index) => {
            const Icon = journeyIcons[index];
            const visual = journeyVisuals[index];
            const isFinal = index === t.journey.items.length - 1;

            return (
              <motion.article
                className={`journey-card${isFinal ? ' is-final' : ''}`}
                data-stage={index + 1}
                initial={reducedMotion ? false : { opacity: 0.16, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{
                  duration: 0.7,
                  delay: 0.28 + index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                key={year}
              >
                <div className="journey-marker">
                  <span />
                  <strong>{year}</strong>
                </div>

                <div className="journey-card-body">
                  <div className="journey-phase">
                    <span><Icon /></span>
                    <small>{phase}</small>
                  </div>

                  <div className={`journey-visual${visual.image ? ' has-image' : ''}`}>
                    {visual.image ? (
                      <img src={visual.image} alt={`${product} interface`} loading="lazy" />
                    ) : (
                      <div className="journey-generated-visual" aria-hidden="true">
                        <span>{visual.mark}</span>
                        <i />
                        <i />
                        <i />
                      </div>
                    )}
                    <small>{visual.label}</small>
                  </div>

                  <span className="journey-product-label">PRODUCT</span>
                  <h3>{product}</h3>
                  <p>{description}</p>

                  <div className="journey-metrics">
                    {metrics.map(([value, label]) => (
                      <div key={`${value}-${label}`}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="journey-tags">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </AnimatedSection>
  );
};
