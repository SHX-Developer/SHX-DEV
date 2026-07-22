import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionFX } from '../components/ui/SectionFX';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';
import { isPerformanceLite } from '../utils/performance';

const products = [
  {
    id: 'cyber-donate',
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

type ProductId = (typeof products)[number]['id'];

export const EcosystemSection = () => {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const limitMotion = Boolean(reducedMotion || isPerformanceLite());
  const [activeProduct, setActiveProduct] = useState<ProductId>('cyber-donate');

  const activeIndex = products.findIndex((product) => product.id === activeProduct);
  const active = products[activeIndex];
  const activeCopy = t.ecosystem.products[activeIndex];
  const activeInfrastructure = useMemo(
    () => new Set(active.infrastructure),
    [active.infrastructure],
  );
  const liveSystemLabel = {
    ru: 'СИСТЕМА РАБОТАЕТ',
    uz: 'TIZIM ISHLAMOQDA',
    en: 'LIVE SYSTEM',
  }[language];
  const modulesLabel = {
    ru: 'МОДУЛЕЙ',
    uz: 'MODUL',
    en: 'MODULES',
  }[language];
  const activeProductLabel = {
    ru: 'АКТИВНЫЙ ПРОДУКТ',
    uz: 'FAOL MAHSULOT',
    en: 'ACTIVE PRODUCT',
  }[language];
  const operatingSystemLabel = {
    ru: 'SHX / ОПЕРАЦИОННАЯ СИСТЕМА ПРОДУКТОВ',
    uz: 'SHX / MAHSULOT OPERATSION TIZIMI',
    en: 'SHX / PRODUCT OPERATING SYSTEM',
  }[language];
  const productOsLabel = {
    ru: 'PRODUCT OS',
    uz: 'MAHSULOT OS',
    en: 'PRODUCT OS',
  }[language];

  return (
    <AnimatedSection id="stack" className="ecosystem-v2">
      <SectionFX variant="ecosystem" />
      <span id="stack" className="anchor-target" />
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
        className="product-os"
        initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.985 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="product-os-bar">
          <span>{operatingSystemLabel}</span>
          <small>
            <i />
            {liveSystemLabel}
          </small>
        </div>

        <div className="product-os-canvas">
          <div className="product-os-grid" aria-hidden="true" />
          {products.map((product, index) => (
            <motion.i
              className={`product-os-connection connection-${index + 1}${
                activeProduct === product.id ? ' is-active' : ''
              }`}
              style={{ rotate: [-145, -35, 145, 35][index] }}
              aria-hidden="true"
              initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
              whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.35 + index * 0.12 }}
              key={`connection-${product.id}`}
            />
          ))}

          <motion.div
            className="product-os-core"
            animate={
              limitMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 0 30px rgba(139,92,246,.18)',
                      '0 0 70px rgba(139,92,246,.42)',
                      '0 0 30px rgba(139,92,246,.18)',
                    ],
                  }
            }
            transition={{ duration: 3.2, repeat: Infinity }}
          >
            <small>{productOsLabel}</small>
            <strong className="product-os-logo" aria-hidden="true">
              <img className="site-brand-logo" src="/brand/Main%20Logo.png" alt="" />
            </strong>
            <span>17 {modulesLabel}</span>
          </motion.div>

          {t.ecosystem.products.map(([name, category], index) => {
            const product = products[index];
            const isActive = product.id === activeProduct;

            return (
              <motion.button
                className={`product-os-node node-${index + 1}${isActive ? ' is-active' : ''}`}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveProduct(product.id)}
                onFocus={() => setActiveProduct(product.id)}
                onMouseEnter={() => setActiveProduct(product.id)}
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                key={product.id}
              >
                <span>
                  {product.mark === 'SHX' ? (
                    <img
                      className="site-brand-logo"
                      src="/brand/Main%20Logo.png"
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    product.mark
                  )}
                </span>
                <div>
                  <small>{category}</small>
                  <strong>{name}</strong>
                </div>
                <i />
              </motion.button>
            );
          })}
        </div>

        <div className="product-os-inspector" aria-live="polite">
          <div className="product-os-active-copy">
            <small>
              {activeProductLabel} /{' '}
              {String(activeIndex + 1).padStart(2, '0')}
            </small>
            <h3>{activeCopy[0]}</h3>
            <p>{activeCopy[2]}</p>
          </div>

          <div className="product-os-modules">
            <small>{t.ecosystem.infrastructureTitle}</small>
            <div>
              {t.ecosystem.infrastructure.map(([id, label]) => (
                <span className={activeInfrastructure.has(id) ? 'is-active' : ''} key={id}>
                  <i />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="product-os-architecture">
          <div className="product-os-architecture-heading">
            <small>{t.stack.architectureLabel}</small>
            <p>{t.stack.architectureDescription}</p>
          </div>
          <div className="product-os-flow">
            {t.stack.architecture.map(([layer, technologies], index) => (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -14 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                key={layer}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{layer}</strong>
                <small>{technologies}</small>
                {index < t.stack.architecture.length - 1 ? <i aria-hidden="true">→</i> : null}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="product-os-principles" aria-label={t.ecosystem.principlesTitle}>
          {t.ecosystem.principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>

        <div className="product-os-benefits">
          {t.ecosystem.benefits.map((benefit, index) => (
            <span key={benefit}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              {benefit}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
};
