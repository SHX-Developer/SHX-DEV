import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const caseStack = ['FastAPI', 'PostgreSQL', 'Telegram WebApp', 'Payments', 'Admin tools'] as const;

export const CyberDonateCaseSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="case-study">
      <SectionHeading
        eyebrow={t.caseStudy.eyebrow}
        title={
          <>
            {t.caseStudy.title}
            <br />
            <em>{t.caseStudy.accent}</em>.
          </>
        }
        subtitle={t.caseStudy.subtitle}
      />

      <div className="case-study">
        <div className="case-panel case-main">
          <div className="case-kicker">{t.caseStudy.kicker}</div>
          <h3>{t.caseStudy.heading}</h3>
          <p>{t.caseStudy.text}</p>
          <div className="case-metrics">
            {t.caseStudy.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="case-panel">
          <h3>{t.caseStudy.built}</h3>
          <ul className="case-list">
            {t.caseStudy.work.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="case-panel">
          <h3>{t.caseStudy.stack}</h3>
          <div className="case-stack">
            {caseStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="case-panel case-shot">
          <div className="case-shot-window" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>{t.caseStudy.screenshotNote}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};
