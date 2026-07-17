import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';
import { ArrowRightIcon } from './ui/Icons';

type ProgressStyle = CSSProperties & {
  '--scroll-progress': string;
};

export const BackToTop = () => {
  const { language } = useLanguage();
  const { scrollY, scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const label = language === 'ru' ? 'Наверх' : 'Back to top';

  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsVisible(value > 520);
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(Math.min(100, Math.max(0, Math.round(value * 100))));
  });

  const style = {
    '--scroll-progress': `${progress}%`,
  } as ProgressStyle;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          className="back-to-top"
          type="button"
          aria-label={label}
          data-label={label}
          style={style}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.72, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.78, y: 14 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          whileTap={reducedMotion ? undefined : { scale: 0.9 }}
          onClick={() => scrollToSection('#top')}
        >
          <span className="back-to-top-core">
            <ArrowRightIcon />
          </span>
          <span className="sr-only">{label}</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};
