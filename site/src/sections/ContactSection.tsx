import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ArrowRightIcon } from '../components/ui/Icons';
import { useLanguage } from '../i18n';

export const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="contact" className="contact-section">
      <div className="contact">
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2>
          {t.contact.title}
          <br />
          <em>{t.contact.accent}</em>.
        </h2>
        <p className="contact-lead">{t.contact.lead}</p>
        <div className="contact-actions">
          <Button variant="primary" href="https://t.me/shxdev">
            {t.contact.contact}
            <ArrowRightIcon />
          </Button>
          <Button href="https://t.me/shxdev">{t.contact.telegram}</Button>
          <Button href="https://github.com/shxdev">{t.contact.github}</Button>
          <Button href="mailto:hello@shx.dev">{t.contact.email}</Button>
          <Button href="#resume">{t.contact.resume}</Button>
        </div>
        <div className="contact-meta">
          {t.contact.replies}
          <a href="https://t.me/shxdev">@shxdev</a>
          {' \u00b7 hello'}
          <span>@</span>shx.dev
        </div>
      </div>
    </AnimatedSection>
  );
};
