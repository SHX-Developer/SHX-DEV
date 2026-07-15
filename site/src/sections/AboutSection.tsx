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
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
        <div className="about-side">
          <div className="about-identity" aria-label={t.about.portraitLabel}>
            <div className="identity-topbar">
              <span /><span /><span />
              <small>shx.profile.ts</small>
            </div>
            <pre aria-hidden="true"><code>{`const developer = {\n  name: 'Shahrizod',\n  focus: ['Telegram', 'Payments', 'Web Apps'],\n  users: '30,000+',\n  status: 'building'\n};`}</code></pre>
            <div className="identity-status"><span /> AVAILABLE FOR PRODUCT WORK</div>
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
