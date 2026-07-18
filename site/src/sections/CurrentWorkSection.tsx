import { motion, useReducedMotion } from 'framer-motion';
import { CodeIcon, CubeIcon, GridIcon, UserIcon } from '../components/ui/Icons';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const initiativeIcons = [CodeIcon, UserIcon, GridIcon, CubeIcon];

export const CurrentWorkSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const labels = {
    ru: {
      tracks: '04 АКТИВНЫХ НАПРАВЛЕНИЯ',
      roadmap: 'ROADMAP / В РАБОТЕ',
      directions: 'НАПРАВЛЕНИЯ ПРОДУКТОВ',
    },
    uz: {
      tracks: '04 FAOL YO‘NALISH',
      roadmap: 'YO‘L XARITASI / JONLI',
      directions: 'MAHSULOT YO‘NALISHLARI',
    },
    en: {
      tracks: '04 ACTIVE TRACKS',
      roadmap: 'ROADMAP / LIVE',
      directions: 'PRODUCT DIRECTIONS',
    },
  }[language];

  return (
    <AnimatedSection id="current">
      <SectionHeading
        eyebrow={t.current.eyebrow}
        title={
          <>
            {t.current.title}
            <br />
            <em>{t.current.accent}</em>.
          </>
        }
        subtitle={t.current.subtitle}
      />

      <motion.div
        className="current-board"
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="current-board-bar">
          <div aria-hidden="true"><i /><i /><i /></div>
          <span>{t.current.boardLabel}</span>
          <small><i /> {labels.tracks}</small>
        </div>

        <div className="current-board-summary">
          <div>
            <small>{labels.roadmap}</small>
            <strong>04</strong>
            <span>{labels.directions}</span>
          </div>
          <div>
            {t.current.items.map(([status, statusLabel]) => (
              <span data-status={status} key={status}>
                <i />
                {statusLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="current-board-columns" aria-hidden="true">
          <span>{t.current.statusLabel}</span>
          <span>{t.current.initiativeLabel}</span>
          <span>{t.current.progressLabel}</span>
          <span>{t.current.updatedLabel}</span>
          <span>{t.current.priorityLabel}</span>
        </div>

        <div className="current-board-rows">
          {t.current.items.map(
            ([status, statusLabel, title, description, progress, updated, priority], index) => {
              const Icon = initiativeIcons[index];

              return (
                <motion.article
                  className="current-work-row"
                  data-status={status}
                  initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.34 }}
                  transition={{
                    duration: 0.64,
                    delay: 0.12 + index * 0.11,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={reducedMotion ? undefined : { x: 4 }}
                  aria-label={`${title}: ${progress}%`}
                  key={title}
                >
                  <div className="current-status">
                    <span><i />{statusLabel}</span>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                  </div>

                  <div className="current-initiative">
                    <span><Icon /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>

                  <div className="current-progress">
                    <div>
                      <small>{t.current.progressLabel}</small>
                      <strong>{progress}%</strong>
                    </div>
                    <span>
                      <motion.i
                        initial={reducedMotion ? false : { width: 0 }}
                        whileInView={reducedMotion ? undefined : { width: `${progress}%` }}
                        viewport={{ once: true, amount: 0.55 }}
                        transition={{ duration: 1, delay: 0.32 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </div>

                  <div className="current-meta">
                    <small>{t.current.updatedLabel}</small>
                    <strong>{updated}</strong>
                  </div>

                  <div className="current-priority">
                    <small>{t.current.priorityLabel}</small>
                    <strong>{priority}</strong>
                  </div>
                </motion.article>
              );
            },
          )}
        </div>
      </motion.div>
    </AnimatedSection>
  );
};
