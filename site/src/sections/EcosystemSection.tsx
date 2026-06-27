import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const nodeClasses = ['n-platforms', 'n-games', 'n-social', 'n-automation'] as const;

export const EcosystemSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="ecosystem">
      <SectionHeading
        eyebrow={t.ecosystem.eyebrow}
        title={
          <>
            {t.ecosystem.title}
            <br />
            <em>{t.ecosystem.accent}</em>
          </>
        }
        subtitle={t.ecosystem.subtitle}
      />

      <div className="eco-wrap">
        <div className="eco-canvas">
          <div className="eco-orbit solid o1" />
          <div className="eco-orbit o2" />
          <div className="eco-orbit o3" />

          <div className="eco-core">
            <div>
              <div className="ttl">SHX</div>
              <div className="sub">{t.ecosystem.core}</div>
            </div>
          </div>

          {t.ecosystem.nodes.map(([name, description], index) => (
            <div className={`eco-node ${nodeClasses[index]}`} key={name}>
              <div className="nm">{name}</div>
              <div className="dsc">{description}</div>
              <span className="dot" />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
