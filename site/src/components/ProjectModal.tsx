import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n';
import { ArrowRightIcon, CloseIcon, ExternalLinkIcon } from './ui/Icons';

type ProjectModalLabels = {
  close: string;
  overview: string;
  gallery: readonly [string, string, string];
  result: string;
  stack: string;
  surface: string;
  business: string;
  role: string;
  delivered: string;
  openLive: string;
  inDevelopment: string;
};

type ProjectModalProps = {
  project: Project | null;
  labels: ProjectModalLabels;
  onClose: () => void;
};

const ProductPreview = ({
  project,
  active,
  imageSource,
}: {
  project: Project;
  active: number;
  imageSource?: string;
}) => {
  const { language } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const copy = {
    ru: {
      liveInterface: 'рабочий интерфейс',
      architecture: 'АРХИТЕКТУРА ПРОДУКТА',
      experience: 'ОПЫТ',
      product: 'ПРОДУКТ',
      system: 'СИСТЕМА',
      adminLive: 'АДМИН / В РАБОТЕ',
      productStatus: 'Статус продукта',
      productSurfaces: 'Интерфейсы продукта',
      coreModules: 'Основные модули',
      surface: 'ИНТЕРФЕЙС ПРОДУКТА',
      status: 'СТАТУС',
      activity: 'АКТИВНОСТЬ',
      active: 'АКТИВЕН',
    },
    uz: {
      liveInterface: 'ishlaydigan interfeys',
      architecture: 'MAHSULOT ARXITEKTURASI',
      experience: 'TAJRIBA',
      product: 'MAHSULOT',
      system: 'TIZIM',
      adminLive: 'ADMIN / JONLI',
      productStatus: 'Mahsulot holati',
      productSurfaces: 'Mahsulot interfeyslari',
      coreModules: 'Asosiy modullar',
      surface: 'MAHSULOT INTERFEYSI',
      status: 'HOLAT',
      activity: 'FAOLLIK',
      active: 'FAOL',
    },
    en: {
      liveInterface: 'live interface',
      architecture: 'PRODUCT ARCHITECTURE',
      experience: 'EXPERIENCE',
      product: 'PRODUCT',
      system: 'SYSTEM',
      adminLive: 'ADMIN / LIVE',
      productStatus: 'Product status',
      productSurfaces: 'Product surfaces',
      coreModules: 'Core modules',
      surface: 'PRODUCT SURFACE',
      status: 'STATUS',
      activity: 'ACTIVITY',
      active: 'ACTIVE',
    },
  }[language];
  const renderProjectMark = () =>
    project.title === 'SHX DEV' ? (
      <img className="site-brand-logo" src="/brand/Main%20Logo.png" alt="" />
    ) : (
      project.title.slice(0, 2)
    );

  useEffect(() => {
    setImageFailed(false);
  }, [active, imageSource, project.title]);

  if (imageSource && !imageFailed) {
    return (
      <img
        className="showcase-live-shot is-gallery"
        src={imageSource}
        decoding="async"
        onError={() => setImageFailed(true)}
        alt={`${project.title} — ${String(active + 1).padStart(2, '0')}`}
      />
    );
  }

  if (active === 0) {
    if (!project.screenshot || imageFailed) {
      return (
        <div className="showcase-ui" aria-hidden="true">
          <div className="showcase-sidebar">
            <span className="showcase-brand">{renderProjectMark()}</span>
            <i />
            <i />
            <i />
          </div>
          <div className="showcase-content">
            <div className="showcase-topbar">
              <span>{project.headline ?? project.meta}</span>
              <i />
            </div>
            <div className="showcase-hero-card">
              <small>{project.meta}</small>
              <strong>{project.metric ?? project.title}</strong>
              <span>{project.description}</span>
            </div>
            <div className="showcase-mini-grid">
              {project.products.slice(0, 3).map((item) => (
                <div key={item}>
                  <i />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <img
        className="showcase-live-shot"
        src={project.screenshot}
        decoding="async"
        alt={`${project.title} — ${copy.liveInterface}`}
      />
    );
  }

  if (active === 1) {
    return (
      <div className="showcase-flow" aria-hidden="true">
        {project.products.slice(0, 3).map((product, index) => (
          <div className="flow-step" key={product}>
            <span>0{index + 1}</span>
            <strong>{product}</strong>
          </div>
        ))}
        <div className="flow-line" />
      </div>
    );
  }

  if (active === 2) {
    return (
      <div className="showcase-system" aria-hidden="true">
        <div className="system-core">
          <span className="system-core-logo">
            <img className="site-brand-logo" src="/brand/Main%20Logo.png" alt="" />
          </span>
          <strong>{project.title}</strong>
        </div>
        {(project.stack ?? project.tags).slice(0, 5).map((item, index) => (
          <div className={`system-node system-node-${index + 1}`} key={item}>
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (active === 3) {
    return (
      <div className="showcase-architecture" aria-hidden="true">
        <div className="architecture-heading">
          <span>{renderProjectMark()}</span>
          <div>
            <small>{copy.architecture}</small>
            <strong>{project.title}</strong>
          </div>
        </div>
        <div className="architecture-layers">
          <div>
            <small>01 / {copy.experience}</small>
            <strong>{project.headline ?? project.meta}</strong>
          </div>
          <i />
          <div>
            <small>02 / {copy.product}</small>
            <strong>{project.products.slice(0, 2).join(' · ')}</strong>
          </div>
          <i />
          <div>
            <small>03 / {copy.system}</small>
            <strong>{(project.stack ?? project.tags).slice(0, 3).join(' · ')}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="showcase-admin" aria-hidden="true">
      <div className="showcase-admin-bar">
        <div>
          <span>{renderProjectMark()}</span>
          <strong>{project.title}</strong>
        </div>
        <small>{copy.adminLive}</small>
      </div>
      <div className="showcase-admin-metrics">
        {(
          project.stats ?? [
            [project.metric ?? 'LIVE', copy.productStatus],
            [String(project.products.length), copy.productSurfaces],
            [String(project.tags.length), copy.coreModules],
          ]
        )
          .slice(0, 3)
          .map(([value, label]) => (
            <div key={`${value}-${label}`}>
              <small>{label}</small>
              <strong>{value}</strong>
              <i />
            </div>
          ))}
      </div>
      <div className="showcase-admin-table">
        <div className="showcase-admin-table-head">
          <span>{copy.surface}</span>
          <span>{copy.status}</span>
          <span>{copy.activity}</span>
        </div>
        {project.products.slice(0, 4).map((item, index) => (
          <div className="showcase-admin-row" key={item}>
            <span>
              <i>{String(index + 1).padStart(2, '0')}</i>
              {item}
            </span>
            <strong>{copy.active}</strong>
            <span>
              <i style={{ width: `${84 - index * 13}%` }} />
            </span>
          </div>
        ))}
      </div>
      <div className="showcase-admin-footer">
        {(project.stack ?? project.tags).slice(0, 4).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
};

const PreviewThumbnail = ({
  source,
  label,
  index,
  active,
  onSelect,
}: {
  source?: string;
  label: string;
  index: number;
  active: boolean;
  onSelect: () => void;
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [source]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={label}
      className={active ? 'active' : ''}
      onClick={onSelect}
    >
      {!imageFailed && source ? (
        <img src={source} alt="" aria-hidden="true" onError={() => setImageFailed(true)} />
      ) : (
        <span className="showcase-thumbnail-fallback" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <span className="showcase-thumbnail-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </button>
  );
};

export const ProjectModal = ({ project, labels, onClose }: ProjectModalProps) => {
  const { language } = useLanguage();
  const [activePreview, setActivePreview] = useState(0);
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const fallbackLabels = {
    ru: {
      surfaces: 'Интерфейсы продукта',
      areas: 'Ключевые области',
      inDevelopment: 'В РАЗРАБОТКЕ',
      status: 'Статус',
      preview: 'Превью',
      focus: 'Фокус проекта',
      liveProduct: 'Доступен онлайн',
      liveDescription: 'Откройте рабочий продукт в новой вкладке.',
      conceptDescription: 'Проект находится на стадии разработки концепции.',
    },
    uz: {
      surfaces: 'Mahsulot interfeyslari',
      areas: 'Asosiy yo‘nalishlar',
      inDevelopment: 'ISHLAB CHIQILMOQDA',
      status: 'Holat',
      preview: 'Ko‘rinish',
      focus: 'Loyiha yo‘nalishi',
      liveProduct: 'Onlayn mavjud',
      liveDescription: 'Ishlayotgan mahsulotni yangi oynada oching.',
      conceptDescription: 'Loyiha konsepsiya ishlab chiqish bosqichida.',
    },
    en: {
      surfaces: 'Product surfaces',
      areas: 'Core areas',
      inDevelopment: 'IN DEV',
      status: 'Status',
      preview: 'Preview',
      focus: 'Project focus',
      liveProduct: 'Available online',
      liveDescription: 'Open the live product in a new tab.',
      conceptDescription: 'This project is currently in concept development.',
    },
  }[language];
  const previewSources = useMemo(
    () =>
      project
        ? [project.screenshot, ...(project.gallery ?? [])].filter((source): source is string =>
            Boolean(source),
          )
        : [],
    [project],
  );
  const previewCount = Math.max(previewSources.length, 1);
  const previewLabels = Array.from(
    { length: previewCount },
    (_, index) => `${fallbackLabels.preview} ${index + 1}`,
  );
  const modalStats =
    project?.stats ??
    (project
      ? [
          [String(project.products.length), fallbackLabels.surfaces],
          [String(project.tags.length), fallbackLabels.areas],
          [fallbackLabels.inDevelopment, fallbackLabels.status],
        ]
      : []);
  const detailBlocks = project
    ? project.roles?.length
      ? [
          { label: labels.role, items: project.roles, variant: 'tags' },
          {
            label: labels.delivered,
            items: project.delivered?.length ? project.delivered : project.products,
            variant: 'list',
          },
          {
            label: labels.stack,
            items: project.stack?.length ? project.stack : project.tags,
            variant: 'tags',
          },
        ]
      : [
          { label: labels.surface, items: project.products, variant: 'list' },
          {
            label: labels.business,
            items: project.monetization?.length
              ? project.monetization
              : [fallbackLabels.inDevelopment],
            variant: 'list',
          },
          { label: fallbackLabels.focus, items: project.tags, variant: 'tags' },
        ]
    : [];

  const showPrevious = useCallback(() => {
    setActivePreview((current) => (current - 1 + previewCount) % previewCount);
  }, [previewCount]);

  const showNext = useCallback(() => {
    setActivePreview((current) => (current + 1) % previewCount);
  }, [previewCount]);

  useEffect(() => {
    if (!project) return;

    setActivePreview(0);
    previewSources.forEach((source) => {
      const image = new Image();
      image.src = source;
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, previewSources, showNext, showPrevious]);

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="project-modal-backdrop"
          initial={reducedMotion ? false : { opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(18px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.35 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="project-modal"
            data-theme={project.theme ?? 'violet'}
            layoutId={`project-${project.title}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reducedMotion ? false : { opacity: 0, y: 36, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="project-modal-header">
              <div>
                <span className="project-modal-kicker">{project.category}</span>
                <h2 id={titleId}>{project.title}</h2>
              </div>
              <button
                className="project-modal-close"
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>

            <div className="project-modal-layout">
              <div className="project-showcase">
                <div className="showcase-window">
                  <div className="showcase-window-bar">
                    <span />
                    <span />
                    <span />
                    <small>
                      {String(activePreview + 1).padStart(2, '0')} /{' '}
                      {String(previewCount).padStart(2, '0')} · {previewLabels[activePreview]}
                    </small>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      className="showcase-slide"
                      key={activePreview}
                      initial={reducedMotion ? false : { opacity: 0, x: 34, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -28, scale: 0.985 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      drag={reducedMotion ? false : 'x'}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -55 || info.velocity.x < -450) showNext();
                        if (info.offset.x > 55 || info.velocity.x > 450) showPrevious();
                      }}
                    >
                      <ProductPreview
                        project={project}
                        active={activePreview}
                        imageSource={previewSources[activePreview]}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    className="showcase-carousel-arrow is-previous"
                    type="button"
                    onClick={showPrevious}
                    aria-label={`${previewLabels[(activePreview - 1 + previewCount) % previewCount]}`}
                  >
                    <ArrowRightIcon />
                  </button>
                  <button
                    className="showcase-carousel-arrow is-next"
                    type="button"
                    onClick={showNext}
                    aria-label={`${previewLabels[(activePreview + 1) % previewCount]}`}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
                <div className="showcase-thumbnails" role="tablist" aria-label={labels.overview}>
                  {previewLabels.map((label, index) => (
                    <PreviewThumbnail
                      source={previewSources[index]}
                      label={label}
                      index={index}
                      active={activePreview === index}
                      onSelect={() => setActivePreview(index)}
                      key={label}
                    />
                  ))}
                </div>
              </div>

              <div className="project-modal-info">
                <div className="project-modal-intro">
                  <span className="project-modal-eyebrow">{project.meta}</span>
                  <h3>{project.headline ?? project.title}</h3>
                  <p>{project.description}</p>
                </div>

                {modalStats.length ? (
                  <div className="modal-result-grid" aria-label={labels.result}>
                    {modalStats.map(([value, label]) => (
                      <div key={`${value}-${label}`}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="project-detail-grid">
                  {detailBlocks.map((block, blockIndex) => (
                    <section
                      className={`project-detail-card${blockIndex === 0 ? ' is-accent' : ''}`}
                      key={block.label}
                    >
                      <span>{block.label}</span>
                      {block.variant === 'tags' ? (
                        <div className="project-detail-tags">
                          {block.items.map((item) => (
                            <i key={item}>{item}</i>
                          ))}
                        </div>
                      ) : (
                        <ul>
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                <div className="project-modal-cta">
                  <div>
                    <span>{project.href ? fallbackLabels.liveProduct : fallbackLabels.status}</span>
                    <p>
                      {project.href
                        ? fallbackLabels.liveDescription
                        : fallbackLabels.conceptDescription}
                    </p>
                  </div>
                  {project.href ? (
                    <a
                      className="project-live-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {labels.openLive}
                      <ExternalLinkIcon />
                    </a>
                  ) : (
                    <span className="project-live-link is-disabled">{labels.inDevelopment}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
