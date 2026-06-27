import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

export const BuildProcessSection = () => {
  const { t } = useLanguage();

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

      <div className="process-grid">
        {t.process.steps.map(([title, description], index) => (
          <div className="process-step" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};
