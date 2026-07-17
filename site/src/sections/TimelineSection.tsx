import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionFX } from '../components/ui/SectionFX';
import { useLanguage } from '../i18n';

export const TimelineSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const copy =
    language === 'ru'
      ? {
          eyebrow: 'Путь продукта',
          title: 'Одна линия времени.',
          accent: 'Без повторов.',
          subtitle:
            'Запуски, рост, текущее состояние и следующий этап — в одной последовательной истории.',
          evidence: 'РЕАЛЬНЫЙ РОСТ · 2023—СЕЙЧАС',
          now: 'СЕЙЧАС И ДАЛЬШЕ',
          progress: 'ПРОГРЕСС',
        }
      : {
          eyebrow: 'Product journey',
          title: 'One continuous timeline.',
          accent: 'No repeated story.',
          subtitle:
            'Launches, growth, the current state and the next move — in one connected narrative.',
          evidence: 'VERIFIED GROWTH · 2023—NOW',
          now: 'NOW & NEXT',
          progress: 'PROGRESS',
        };

  return (
    <AnimatedSection id="journey" className="timeline-v2">
      <SectionFX variant="timeline" />
      <div className="timeline-v2-layout">
        <div className="timeline-v2-heading">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2 className="section-title">
            {copy.title}
            <br />
            <em>{copy.accent}</em>
          </h2>
          <p>{copy.subtitle}</p>
          <small>{copy.evidence}</small>
        </div>

        <div className="timeline-v2-story">
          <motion.i
            className="timeline-v2-line"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={reducedMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {t.journey.items.map(([year, phase, product, description, metrics, tags], index) => (
            <motion.article
              className="timeline-v2-event"
              initial={reducedMotion ? false : { opacity: 0, x: 26 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              key={`${year}-${product}`}
            >
              <div className="timeline-v2-marker">
                <i />
                <strong>{year}</strong>
              </div>
              <div className="timeline-v2-event-copy">
                <small>{phase}</small>
                <h3>{product}</h3>
                <p>{description}</p>
                <div className="timeline-v2-meta">
                  {metrics.map(([value, label]) => (
                    <span key={`${value}-${label}`}>
                      <strong>{value}</strong> {label}
                    </span>
                  ))}
                </div>
                <div className="timeline-v2-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="timeline-v2-event is-now"
            initial={reducedMotion ? false : { opacity: 0, x: 26 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="timeline-v2-marker">
              <i />
              <strong>{language === 'ru' ? 'СЕЙЧАС' : 'NOW'}</strong>
            </div>
            <div className="timeline-v2-event-copy">
              <small>{copy.now}</small>
              <h3>
                {t.current.title} {t.current.accent}
              </h3>
              <p>{t.current.subtitle}</p>

              <div className="timeline-v2-roadmap">
                {t.current.items.map(
                  ([status, statusLabel, title, description, progress, updated, priority]) => (
                    <div data-status={status} key={title}>
                      <span className="timeline-v2-roadmap-status">
                        <i />
                        {statusLabel}
                      </span>
                      <div>
                        <strong>{title}</strong>
                        <p>{description}</p>
                      </div>
                      <span className="timeline-v2-progress">
                        <small>
                          {copy.progress} · {priority} · {updated}
                        </small>
                        <span>
                          <motion.i
                            initial={reducedMotion ? false : { width: 0 }}
                            whileInView={
                              reducedMotion ? undefined : { width: `${progress}%` }
                            }
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </span>
                        <strong>{progress}%</strong>
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </AnimatedSection>
  );
};
