import { motion, useReducedMotion } from 'framer-motion';

type SectionFXVariant =
  | 'hero'
  | 'projects'
  | 'about'
  | 'process'
  | 'ecosystem'
  | 'timeline'
  | 'contact';

export const SectionFX = ({ variant }: { variant: SectionFXVariant }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`section-fx section-fx-${variant}${reducedMotion ? ' is-reduced' : ''}`}
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.1 }}
      aria-hidden="true"
    >
      {variant === 'hero' ? (
        <>
          <span className="fx-hero-ring fx-hero-ring-one" />
          <span className="fx-hero-ring fx-hero-ring-two" />
          <span className="fx-hero-satellite" />
          <span className="fx-hero-flare" />
        </>
      ) : null}

      {variant === 'projects' ? (
        <>
          <span className="fx-projects-scan" />
          <span className="fx-projects-beam" />
          <span className="fx-projects-spark fx-projects-spark-one" />
          <span className="fx-projects-spark fx-projects-spark-two" />
        </>
      ) : null}

      {variant === 'about' ? (
        <>
          <span className="fx-about-orbit">
            <i />
            <i />
            <i />
          </span>
          <span className="fx-about-radar" />
        </>
      ) : null}

      {variant === 'process' ? (
        <>
          <span className="fx-process-track" />
          <span className="fx-process-signal" />
          <span className="fx-process-echo fx-process-echo-one" />
          <span className="fx-process-echo fx-process-echo-two" />
        </>
      ) : null}

      {variant === 'ecosystem' ? (
        <>
          <span className="fx-data-particle fx-data-particle-one" />
          <span className="fx-data-particle fx-data-particle-two" />
          <span className="fx-data-particle fx-data-particle-three" />
          <span className="fx-data-particle fx-data-particle-four" />
          <span className="fx-ecosystem-wave" />
        </>
      ) : null}

      {variant === 'timeline' ? (
        <>
          <span className="fx-timeline-rail" />
          <span className="fx-timeline-signal" />
          <span className="fx-timeline-year fx-timeline-year-one">2023</span>
          <span className="fx-timeline-year fx-timeline-year-two">NOW</span>
        </>
      ) : null}

      {variant === 'contact' ? (
        <>
          <span className="fx-contact-comet fx-contact-comet-one" />
          <span className="fx-contact-comet fx-contact-comet-two" />
          <span className="fx-contact-comet fx-contact-comet-three" />
          <span className="fx-contact-halo" />
        </>
      ) : null}
    </motion.div>
  );
};
