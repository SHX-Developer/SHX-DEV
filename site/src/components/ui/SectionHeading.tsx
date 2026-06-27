import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
};

const normalizeEyebrow = (eyebrow: string) => eyebrow.replace(/^\/\s*\d+\s*-\s*/, '');

export const SectionHeading = ({ eyebrow, title, subtitle }: SectionHeadingProps) => (
  <>
    <span className="eyebrow">{normalizeEyebrow(eyebrow)}</span>
    <h2 className="section-title">{title}</h2>
    {subtitle ? <p className="section-sub">{subtitle}</p> : null}
  </>
);
