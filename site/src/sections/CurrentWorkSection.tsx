import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

export const CurrentWorkSection = () => {
  const { t } = useLanguage();

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

      <div className="current-grid">
        {t.current.items.map(([title, description]) => (
          <div className="current-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};
