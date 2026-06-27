import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

export const JourneySection = () => {
  const { t } = useLanguage();

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
      <div className="timeline">
        {t.journey.items.map(([year, title, description]) => (
          <div className="tl-item" key={`${year}-${title}`}>
            <div className="tl-year">{year}</div>
            <div className="tl-title">{title}</div>
            <div className="tl-desc">{description}</div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};
