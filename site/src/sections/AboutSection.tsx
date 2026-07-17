import { AnimatedSection } from '../components/ui/AnimatedSection';
import { useLanguage } from '../i18n';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="about">
      <span className="eyebrow">{t.about.eyebrow}</span>
      <div className="about-grid">
        <div>
          <h2 className="section-title">
            {t.about.title}
            <br />
            <em>{t.about.accent}</em>
          </h2>
          <p className="about-lead">{t.about.lead}</p>
          <p className="about-principle">{t.about.p1}</p>
          <div className="about-metrics" aria-label={t.about.metricsLabel}>
            {t.about.metrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-side">
          <div className="about-identity" aria-label={t.about.portraitLabel}>
            <div className="identity-topbar">
              <span /><span /><span />
              <small>shx.profile.ts</small>
            </div>
            <div className="identity-profile">
              <span className="identity-avatar" aria-hidden="true">SHX</span>
              <div>
                <strong>Shahrizod</strong>
                <small>Founder · Fullstack Product Engineer</small>
              </div>
            </div>
            <pre aria-hidden="true"><code>{`const developer = {
  name: 'Shahrizod',
  role: 'Founder / Product Engineer',
  stack: ['FastAPI', 'React', 'PostgreSQL'],
  experience: '3+ years',
  currently_building: [
    'Cyber Donate', 'Stars Pay', 'SHX DEV'
  ],
  mission: 'Make useful software.'
};`}</code></pre>
            <div className="identity-status"><span /> {t.about.status}</div>
          </div>
          <div className="skills">
            {t.skills.map((group) => (
              <div className="sk-block" key={group.title}>
                <h4>{group.title}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
