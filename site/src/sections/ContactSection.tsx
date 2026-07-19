import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, GitHubIcon, MailIcon, TelegramIcon } from '../components/ui/Icons';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionFX } from '../components/ui/SectionFX';
import { useLanguage } from '../i18n';
import { isPerformanceLite } from '../utils/performance';

export const ContactSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const limitMotion = Boolean(reducedMotion || isPerformanceLite());

  const channels = [
    {
      label: t.contact.telegram,
      value: '@shxdev',
      href: 'https://t.me/shxdev',
      Icon: TelegramIcon,
    },
    {
      label: t.contact.github,
      value: 'github.com/SHX-Developer',
      href: 'https://github.com/SHX-Developer',
      Icon: GitHubIcon,
    },
    {
      label: t.contact.email,
      value: 'geomangd2003@gmail.com',
      href: 'mailto:geomangd2003@gmail.com',
      Icon: MailIcon,
    },
  ];

  const steps = {
    ru: [
      ['01', 'Напишите', 'Коротко опишите идею или задачу.'],
      ['02', 'Созвонимся', 'Уточним контекст, цели и ограничения.'],
      ['03', 'Соберём план', 'Зафиксируем архитектуру, этапы и результат.'],
      ['04', 'Начнём', 'Перейдём к первому рабочему релизу.'],
    ],
    uz: [
      ['01', 'Xabar yozing', 'G‘oya yoki vazifani qisqacha tasvirlab bering.'],
      ['02', 'Suhbatlashamiz', 'Kontekst, maqsadlar va cheklovlarni aniqlaymiz.'],
      ['03', 'Reja tuzamiz', 'Arxitektura, bosqichlar va natijani belgilaymiz.'],
      ['04', 'Boshlaymiz', 'Birinchi ishlaydigan relizga o‘tamiz.'],
    ],
    en: [
      ['01', 'Send a message', 'Share the idea or problem in a few lines.'],
      ['02', 'Quick call', 'We clarify the context, goals and constraints.'],
      ['03', 'Shape the plan', 'We define architecture, stages and outcome.'],
      ['04', 'Start building', 'We move toward the first working release.'],
    ],
  }[language];
  const nextStepsLabel = {
    ru: 'ЧТО БУДЕТ ПОСЛЕ СООБЩЕНИЯ',
    uz: 'XABARDAN KEYIN NIMA BO‘LADI',
    en: 'WHAT HAPPENS AFTER YOUR MESSAGE',
  }[language];

  return (
    <AnimatedSection id="contact" className="contact-v2">
      <SectionFX variant="contact" />
      <motion.div
        className="contact-v2-glow"
        animate={
          limitMotion ? undefined : { opacity: [0.28, 0.6, 0.28], scale: [0.94, 1.06, 0.94] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="contact-v2-heading">
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2>
          {t.contact.title}
          <br />
          <em>{t.contact.accent}.</em>
        </h2>
        <p>{t.contact.lead}</p>
      </div>

      <div className="contact-v2-path">
        <small>{nextStepsLabel}</small>
        <div>
          {steps.map(([number, title, description], index) => (
            <motion.article
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              key={number}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              {index < steps.length - 1 ? <i aria-hidden="true">→</i> : null}
            </motion.article>
          ))}
        </div>
      </div>

      <div className="contact-v2-channels">
        {channels.map(({ label, value, href, Icon }, index) => (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            key={label}
          >
            <span>
              <Icon />
              {label}
            </span>
            <strong>{value}</strong>
            {index === 0 ? <ArrowRightIcon /> : null}
          </a>
        ))}
      </div>
    </AnimatedSection>
  );
};
