import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/projects';
import { ArrowRightIcon, CloseIcon, ExternalLinkIcon } from './ui/Icons';

type ProjectModalLabels = {
  close: string;
  overview: string;
  gallery: readonly [string, string, string];
  result: string;
  openLive: string;
  inDevelopment: string;
};

type ProjectModalProps = {
  project: Project | null;
  labels: ProjectModalLabels;
  onClose: () => void;
};

const ProductPreview = ({ project, active }: { project: Project; active: number }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const renderProjectMark = () =>
    project.title === 'SHX-Dev' ? (
      <img src="/brand/shx-logo.png" alt="" />
    ) : (
      project.title.slice(0, 2)
    );

  const galleryImage = project.gallery?.[active];
  const imageSource = galleryImage ?? (active === 0 ? project.screenshot : undefined);

  useEffect(() => {
    setImageFailed(false);
  }, [active, imageSource, project.title]);

  if (imageSource && !imageFailed) {
    return (
      <img
        className={`showcase-live-shot${galleryImage ? ' is-gallery' : ''}`}
        src={imageSource}
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
        alt={`${project.title} live interface`}
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
            <img src="/brand/shx-logo.png" alt="" />
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
            <small>PRODUCT ARCHITECTURE</small>
            <strong>{project.title}</strong>
          </div>
        </div>
        <div className="architecture-layers">
          <div>
            <small>01 / EXPERIENCE</small>
            <strong>{project.headline ?? project.meta}</strong>
          </div>
          <i />
          <div>
            <small>02 / PRODUCT</small>
            <strong>{project.products.slice(0, 2).join(' · ')}</strong>
          </div>
          <i />
          <div>
            <small>03 / SYSTEM</small>
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
        <small>ADMIN / LIVE</small>
      </div>
      <div className="showcase-admin-metrics">
        {(project.stats ?? [
          [project.metric ?? 'LIVE', 'Product status'],
          [String(project.products.length), 'Product surfaces'],
          [String(project.tags.length), 'Core modules'],
        ])
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
          <span>PRODUCT SURFACE</span>
          <span>STATUS</span>
          <span>ACTIVITY</span>
        </div>
        {project.products.slice(0, 4).map((item, index) => (
          <div className="showcase-admin-row" key={item}>
            <span>
              <i>{String(index + 1).padStart(2, '0')}</i>
              {item}
            </span>
            <strong>ACTIVE</strong>
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

export const ProjectModal = ({ project, labels, onClose }: ProjectModalProps) => {
  const [activePreview, setActivePreview] = useState(0);
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const previewCount = labels.gallery.length;
  const modalStats =
    project?.stats ??
    (project
      ? [
          [String(project.products.length), 'Product surfaces'],
          [String(project.tags.length), 'Core areas'],
          ['IN DEV', 'Status'],
        ]
      : []);

  const showPrevious = useCallback(() => {
    setActivePreview((current) => (current - 1 + previewCount) % previewCount);
  }, [previewCount]);

  const showNext = useCallback(() => {
    setActivePreview((current) => (current + 1) % previewCount);
  }, [previewCount]);

  useEffect(() => {
    if (!project) return;

    setActivePreview(0);
    project.gallery?.forEach((source) => {
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
  }, [project, onClose, showNext, showPrevious]);

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
              <h2 id={titleId}>{project.title}</h2>
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
                      {String(previewCount).padStart(2, '0')} · {labels.gallery[activePreview]}
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
                      <ProductPreview project={project} active={activePreview} />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    className="showcase-carousel-arrow is-previous"
                    type="button"
                    onClick={showPrevious}
                    aria-label={`${labels.gallery[(activePreview - 1 + previewCount) % previewCount]}`}
                  >
                    <ArrowRightIcon />
                  </button>
                  <button
                    className="showcase-carousel-arrow is-next"
                    type="button"
                    onClick={showNext}
                    aria-label={`${labels.gallery[(activePreview + 1) % previewCount]}`}
                  >
                    <ArrowRightIcon />
                  </button>

                  <div className="showcase-carousel-dots" aria-label={labels.overview}>
                    {labels.gallery.map((label, index) => (
                      <button
                        type="button"
                        aria-label={label}
                        aria-current={activePreview === index ? 'true' : undefined}
                        className={activePreview === index ? 'active' : ''}
                        onClick={() => setActivePreview(index)}
                        key={label}
                      />
                    ))}
                  </div>
                </div>
                <div className="showcase-tabs" role="tablist" aria-label={labels.overview}>
                  {labels.gallery.map((label, index) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activePreview === index}
                      className={activePreview === index ? 'active' : ''}
                      onClick={() => setActivePreview(index)}
                      key={label}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="project-modal-info">
                <p>{project.description}</p>

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
                  <span className="project-live-link is-disabled">
                    {labels.inDevelopment}
                  </span>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
