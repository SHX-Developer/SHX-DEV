import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export const AnimatedSection = ({ id, className, children }: AnimatedSectionProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28, filter: 'blur(10px)' }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
};
