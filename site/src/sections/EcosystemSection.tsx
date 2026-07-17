import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { CubeIcon } from '../components/ui/Icons';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const products = [
  {
    id: 'cyber-donate',
    theme: 'commerce',
    mark: 'CD',
    infrastructure: [
      'payments',
      'telegram-api',
      'fastapi',
      'postgresql',
      'admin-panel',
      'notifications',
      'analytics',
      'design-system',
      'shared-ui',
    ],
  },
  {
    id: 'stars-pay',
    theme: 'payments',
    mark: 'SP',
    infrastructure: [
      'authentication',
      'telegram-api',
      'payments',
      'admin-panel',
      'fastapi',
      'react',
      'typescript',
      'postgresql',
      'notifications',
      'analytics',
    ],
  },
  {
    id: 'cyber-mate',
    theme: 'community',
    mark: 'CM',
    infrastructure: [
      'authentication',
      'notifications',
      'websocket',
      'react',
      'typescript',
      'postgresql',
      'redis',
      'design-system',
      'shared-ui',
      'analytics',
    ],
  },
  {
    id: 'shx-dev',
    theme: 'developer',
    mark: 'SHX',
    infrastructure: [
      'authentication',
      'react',
      'typescript',
      'design-system',
      'shared-ui',
      'web-components',
      'analytics',
      'ci-cd',
      'docker',
    ],
  },
] as const;

export const EcosystemSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const activeInfrastructure = useMemo(
    () => new Set(products.find((product) => product.id === activeProduct)?.infrastructure ?? []),
    [activeProduct],
  );

  const reveal = (delay: number, x = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 22, x },
    whileInView: reducedMotion ? undefined : { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

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

      <motion.div
        className="eco-dashboard"
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="eco-dashboard-topbar">
          <div className="eco-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>SHX / PRODUCT OPERATING SYSTEM</span>
          <small><i /> LIVE SYSTEM</small>
        </div>

        <div className="eco-dashboard-grid">
          <motion.aside className="eco-platform-card" {...reveal(0.08, -18)}>
            <div className="eco-platform-mark">
              <span>SHX</span>
              <CubeIcon />
            </div>
            <div className="eco-platform-copy">
              <small>{t.ecosystem.platformType}</small>
              <h3>{t.ecosystem.platformTitle}</h3>
              <p>{t.ecosystem.platformDescription}</p>
            </div>
            <div className="eco-platform-status">
              <span />
              SYSTEM CORE
            </div>
          </motion.aside>

          <div className="eco-products-column">
            <motion.div className="eco-column-heading" {...reveal(0.16)}>
              <span>{t.ecosystem.productsLabel}</span>
              <small>04 PRODUCTS</small>
            </motion.div>

            <div className="eco-product-list">
              {t.ecosystem.products.map(([name, category, description], index) => {
                const product = products[index];
                const isActive = activeProduct === product.id;

                return (
                  <motion.button
                    className={`eco-product${isActive ? ' is-active' : ''}`}
                    data-theme={product.theme}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveProduct(isActive ? null : product.id)}
                    onFocus={() => setActiveProduct(product.id)}
                    onBlur={() => setActiveProduct(null)}
                    onMouseEnter={() => setActiveProduct(product.id)}
                    onMouseLeave={(event) => {
                      if (document.activeElement !== event.currentTarget) setActiveProduct(null);
                    }}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.62,
                      delay: 0.2 + index * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={reducedMotion ? undefined : { scale: 1.018, x: 3 }}
                    key={product.id}
                  >
                    <motion.i
                      className="eco-link eco-link-left"
                      aria-hidden="true"
                      initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
                      whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{ duration: 0.55, delay: 0.5 + index * 0.06 }}
                    />
                    <span className="eco-product-mark">{product.mark}</span>
                    <span className="eco-product-copy">
                      <small>{category}</small>
                      <strong>{name}</strong>
                      <span>{description}</span>
                    </span>
                    <span className="eco-product-state" aria-hidden="true">
                      <i />
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <motion.i
                      className="eco-link eco-link-right"
                      aria-hidden="true"
                      initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
                      whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{ duration: 0.55, delay: 0.56 + index * 0.06 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            <motion.p className="eco-interaction-hint" {...reveal(0.58)}>
              <span />
              {t.ecosystem.interactionHint}
            </motion.p>
          </div>

          <div className="eco-system-column">
            <motion.section className="eco-panel eco-infrastructure" {...reveal(0.58, 18)}>
              <div className="eco-panel-heading">
                <div>
                  <small>PLATFORM CORE</small>
                  <h3>{t.ecosystem.infrastructureTitle}</h3>
                </div>
                <span>17 MODULES</span>
              </div>
              <p>{t.ecosystem.infrastructureDescription}</p>
              <div className={`eco-infra-grid${activeProduct ? ' has-active' : ''}`}>
                {t.ecosystem.infrastructure.map(([id, label], index) => (
                  <motion.span
                    className={`eco-infra-pill${activeInfrastructure.has(id) ? ' is-active' : ''}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: 0.66 + index * 0.025 }}
                    key={id}
                  >
                    <i />
                    {label}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            <motion.section className="eco-panel eco-principles" {...reveal(0.78, 18)}>
              <div className="eco-panel-heading">
                <div>
                  <small>BUILD STANDARD</small>
                  <h3>{t.ecosystem.principlesTitle}</h3>
                </div>
              </div>
              <div>
                {t.ecosystem.principles.map((principle, index) => (
                  <span key={principle}>
                    <i>{String(index + 1).padStart(2, '0')}</i>
                    {principle}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section className="eco-panel eco-benefits" {...reveal(0.92, 18)}>
              <div className="eco-panel-heading">
                <div>
                  <small>SHARED VALUE</small>
                  <h3>{t.ecosystem.benefitsTitle}</h3>
                </div>
              </div>
              <ul>
                {t.ecosystem.benefits.map((benefit) => (
                  <li key={benefit}>
                    <i aria-hidden="true">✓</i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};
