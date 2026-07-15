import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { DownloadIcon } from '../components/ui/Icons';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';

export const ResumeSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="resume">
      <SectionHeading
        eyebrow={t.resume.eyebrow}
        title={
          <>
            {t.resume.title}
            <br />
            <em>{t.resume.accent}</em>.
          </>
        }
        subtitle={t.resume.subtitle}
      />
      <div className="resume">
        <div className="resume-card">
          {t.resume.items.map(([year, role, company, meta]) => (
            <div className="exp-item" key={`${year}-${role}`}>
              <div className="yr">{year}</div>
              <div>
                <div className="role">{role}</div>
                <div className="co">{company}</div>
              </div>
              <div className="meta">{meta}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="download-cta">
            <h4>{t.resume.projectResume}</h4>
            <p>{t.resume.projectResumeText}</p>
            <Button variant="primary" href="/resume/shx-dev-resume.pdf" download>
              {t.resume.requestResume}
              <DownloadIcon />
            </Button>
          </div>
          <div className="download-cta resume-contact">
            <h4>{t.resume.collaboration}</h4>
            <p>{t.resume.collaborationText}</p>
            <Button
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('#contact');
              }}
            >
              {t.resume.getInTouch}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
