import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  MailIcon,
  TelegramIcon,
  UserIcon,
} from '../components/ui/Icons';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';
import { scrollToSection } from '../utils/scroll';

export const ResumeSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const channels = [
    { label: 'TELEGRAM', href: 'https://t.me/shxdev', Icon: TelegramIcon },
    { label: 'GITHUB', href: 'https://github.com/shxdev', Icon: GitHubIcon },
    { label: 'EMAIL', href: 'mailto:hello@shx.dev', Icon: MailIcon },
  ];

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

      <div className="proof-stage">
        <motion.div
          className="proof-timeline"
          initial={reducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="proof-window-bar">
            <div aria-hidden="true"><i /><i /><i /></div>
            <span>{t.resume.timelineLabel}</span>
            <small><i /> VERIFIED GROWTH</small>
          </div>

          <div className="proof-timeline-list">
            {t.resume.items.map(([year, role, company, meta], index) => (
              <motion.article
                className="proof-milestone"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.58,
                  delay: 0.12 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                key={`${year}-${role}`}
              >
                <div className="proof-year">
                  <span>{year}</span>
                  <i />
                </div>
                <div className="proof-milestone-copy">
                  <h3>{role}</h3>
                  <p>{company}</p>
                </div>
                <strong>{meta}</strong>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="proof-ready"
          initial={reducedMotion ? false : { opacity: 0, x: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="proof-profile">
            <span className="proof-profile-avatar">
              <UserIcon />
            </span>
            <div>
              <strong>{t.resume.profileName}</strong>
              <small>{t.resume.profileRole}</small>
            </div>
            <span className="proof-availability"><i />{t.resume.availability}</span>
          </div>

          <div className="proof-ready-copy">
            <span>READY TO BUILD / SHX</span>
            <h3>{t.resume.readyTitle}</h3>
            <p>{t.resume.collaborationText}</p>
          </div>

          <a className="proof-document" href="/resume/shx-dev-resume.pdf" download>
            <span className="proof-document-icon">
              <DownloadIcon />
            </span>
            <div className="proof-document-main">
              <strong>{t.resume.projectResume}</strong>
              <small>PDF / 1 PAGE</small>
            </div>
            <dl>
              <div>
                <dt>{t.resume.documentUpdatedLabel}</dt>
                <dd>{t.resume.documentUpdated}</dd>
              </div>
              <div>
                <dt>{t.resume.documentProjectsLabel}</dt>
                <dd>{t.resume.documentProjects}</dd>
              </div>
              <div>
                <dt>{t.resume.documentTechLabel}</dt>
                <dd>{t.resume.documentTech}</dd>
              </div>
            </dl>
            <span className="proof-document-download">
              {t.resume.requestResume}
              <ArrowRightIcon />
            </span>
          </a>

          <div className="proof-ready-action">
            <Button
              variant="primary"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('#contact');
              }}
            >
              {t.resume.getInTouch}
              <ArrowRightIcon />
            </Button>
          </div>

          <div className="proof-direct-channels">
            {channels.map(({ label, href, Icon }) => (
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                key={label}
              >
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>

          <p className="proof-motto">{t.resume.motto}</p>
        </motion.aside>
      </div>

      <motion.div
        className="proof-final-metrics"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {t.resume.metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
};
