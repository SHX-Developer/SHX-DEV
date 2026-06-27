import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

export const TechStackSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="stack">
      <SectionHeading
        eyebrow={t.stack.eyebrow}
        title={
          <>
            {t.stack.title}
            <br />
            <em>{t.stack.accent}</em>.
          </>
        }
        subtitle={t.stack.subtitle}
      />

      <div className="tech-stack-groups">
        {t.stack.groups.map((group) => (
          <div className="tech-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tech-list">
              {group.items.map(([icon, name]) => (
                <span key={name}>
                  <i aria-hidden="true">{icon}</i>
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};
