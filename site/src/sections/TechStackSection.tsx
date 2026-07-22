import { motion, useReducedMotion } from 'framer-motion';
import {
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiLinux,
  SiNginx,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTelegram,
  SiTypescript,
} from 'react-icons/si';
import {
  ArrowRightIcon,
  CodeIcon,
  CubeIcon,
  GridIcon,
  TelegramIcon,
  UserIcon,
} from '../components/ui/Icons';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const capabilityIcons = [
  TelegramIcon,
  CubeIcon,
  CodeIcon,
  UserIcon,
  GridIcon,
  ArrowRightIcon,
  GridIcon,
  TelegramIcon,
  CubeIcon,
  CodeIcon,
];

const technologyLogos = [
  { name: 'React', Icon: SiReact, color: '#61dafb' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'Telegram', Icon: SiTelegram, color: '#29a9ea' },
  { name: 'Python', Icon: SiPython, color: '#f7cb4d' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#00a98f' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#5d90c7' },
  { name: 'Redis', Icon: SiRedis, color: '#e74b3c' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Linux', Icon: SiLinux, color: '#f5c451' },
  { name: 'Nginx', Icon: SiNginx, color: '#31a852' },
  { name: 'GitHub Actions', Icon: SiGithubactions, color: '#6da8ff' },
] as const;

export const TechStackSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const labels = {
    ru: {
      ready: 'ГОТОВО К PRODUCTION',
      capabilities: '10 ВОЗМОЖНОСТЕЙ',
      endToEnd: 'ПОЛНЫЙ ЦИКЛ',
      output: 'РЕЗУЛЬТАТ',
      product: 'МАСШТАБИРУЕМЫЙ ПРОДУКТ',
      tools: 'ИНСТРУМЕНТЫ, НА КОТОРЫХ РАБОТАЕТ СИСТЕМА',
    },
    uz: {
      ready: 'PRODUCTION UCHUN TAYYOR',
      capabilities: '10 IMKONIYAT',
      endToEnd: 'TO‘LIQ SIKL',
      output: 'NATIJA',
      product: 'MASSHTABLANUVCHI MAHSULOT',
      tools: 'TIZIMNI ISHLATUVCHI VOSITALAR',
    },
    en: {
      ready: 'PRODUCTION READY',
      capabilities: '10 CAPABILITIES',
      endToEnd: 'END TO END',
      output: 'OUTPUT',
      product: 'SCALABLE PRODUCT',
      tools: 'TOOLS THAT POWER THE SYSTEM',
    },
  }[language];

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

      <motion.div
        className="stack-workbench"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="stack-workbench-bar">
          <div aria-hidden="true"><i /><i /><i /></div>
          <span>shx.product-stack.ts</span>
          <small><i /> {labels.ready}</small>
        </div>

        <div className="stack-proof">
          <div>
            <small>{t.stack.proofLabel}</small>
            <strong>{t.stack.proofValue}</strong>
            <span>{t.stack.proofUnit}</span>
          </div>
          <div className="stack-proof-products">
            <span>CYBER DONATE</span>
            <span>STARS PAY</span>
            <span>CYBER MATE</span>
            <span>SHX DEV</span>
          </div>
        </div>

        <div className="stack-story-grid">
          <section className="stack-capabilities">
            <div className="stack-block-heading">
              <span>{t.stack.capabilitiesLabel}</span>
              <small>{labels.capabilities}</small>
            </div>

            <div className="stack-capability-grid">
              {t.stack.capabilities.map(([title, description, tools, usedIn], index) => {
                const Icon = capabilityIcons[index];

                return (
                  <motion.article
                    className="stack-capability"
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{
                      duration: 0.58,
                      delay: index * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={reducedMotion ? undefined : { y: -4 }}
                    key={title}
                  >
                    <div className="stack-capability-head">
                      <span><Icon /></span>
                      <i>{String(index + 1).padStart(2, '0')}</i>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="stack-capability-tools">{tools}</div>
                    <div className="stack-capability-used">
                      <small>{t.stack.usedInLabel}</small>
                      <span>{usedIn}</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <motion.aside
            className="stack-architecture"
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.74, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="stack-block-heading">
              <span>{t.stack.architectureLabel}</span>
              <small>{labels.endToEnd}</small>
            </div>
            <p>{t.stack.architectureDescription}</p>

            <div className="stack-architecture-flow">
              <motion.i
                aria-hidden="true"
                initial={reducedMotion ? false : { scaleY: 0 }}
                whileInView={reducedMotion ? undefined : { scaleY: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.2, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              />
              {t.stack.architecture.map(([layer, technologies], index) => (
                <motion.div
                  className="stack-layer"
                  initial={reducedMotion ? false : { opacity: 0.18, x: 14 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.38 }}
                  transition={{ duration: 0.52, delay: 0.5 + index * 0.11 }}
                  key={layer}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{layer}</strong>
                    <small>{technologies}</small>
                  </div>
                  <i aria-hidden="true">↓</i>
                </motion.div>
              ))}
            </div>

            <div className="stack-architecture-result">
              <span className="stack-architecture-logo" aria-hidden="true">
                <img className="site-brand-logo" src="/brand/Main%20Logo.png" alt="" />
              </span>
              <div>
                <small>{labels.output}</small>
                <strong>{labels.product}</strong>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="stack-technology-layer">
          <div className="stack-block-heading">
            <span>{t.stack.technologyLabel}</span>
            <small>{labels.tools}</small>
          </div>
          <div className="stack-logo-grid">
            {technologyLogos.map(({ name, Icon, color }, index) => (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.42, delay: index * 0.035 }}
                whileHover={reducedMotion ? undefined : { y: -4, scale: 1.03 }}
                key={name}
              >
                <Icon aria-hidden="true" style={{ color }} />
                <span>{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};
