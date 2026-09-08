import { motion } from 'framer-motion';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n';
import { isPerformanceLite } from '../utils/performance';
import { ArrowRightIcon } from './ui/Icons';

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  exploreLabel: string;
  onExplore: (project: Project, trigger: HTMLElement) => void;
};

export const ProjectCard = ({
  project,
  compact = false,
  exploreLabel,
  onExplore,
}: ProjectCardProps) => {
  const { language, t } = useLanguage();
  const [coverFailed, setCoverFailed] = useState(false);
  const performanceLite = isPerformanceLite();
  const previewPending = {
    ru: 'Скриншоты скоро',
    uz: 'Skrinshotlar tez orada',
    en: 'Screenshots coming soon',
  }[language];

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (performanceLite) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      className={`card ${compact ? 'compact-card' : ''}`}
      data-theme={project.theme ?? 'violet'}
      layoutId={`project-${project.title}`}
      onMouseMove={handleMouseMove}
      onClick={(event) => onExplore(project, event.currentTarget)}
      tabIndex={-1}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-topline">
        <span className="project-classification">{project.meta}</span>
      </div>

      {!compact || (project.screenshot && !coverFailed) ? (
        <div
          className={`project-preview${compact ? ' compact-project-preview' : ''}`}
          aria-hidden="true"
        >
          {project.screenshot && !coverFailed ? (
            <img
              src={project.screenshot}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setCoverFailed(true)}
            />
          ) : !compact ? (
            <>
              <div className="preview-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-body">
                <div>
                  <span className="preview-label">{project.headline ?? project.meta}</span>
                  <strong>{project.metric ?? project.title}</strong>
                </div>
                <div className="preview-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <div className="project-preview-placeholder" aria-label={previewPending}>
          <img className="site-brand-logo" src="/brand/shx-logo.webp" alt="" />
          <span>{previewPending}</span>
        </div>
      )}

      <div className="card-content">
        {project.headline && !compact ? <p className="project-kind">{project.headline}</p> : null}
        <h3 className="card-title">{project.title}</h3>
        {!compact && project.stats?.length ? (
          <div className="project-stats">
            {project.stats.slice(0, 4).map(([value, label]) => (
              <div key={`${value}-${label}`}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        ) : project.metric && !compact ? (
          <div className="project-impact">
            <strong>{project.metric}</strong>
          </div>
        ) : null}
        <p className="card-desc">{project.description}</p>
        <div className="card-tags">
          {project.tags.slice(0, compact ? 3 : 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-meta">
          <button
            className="card-explore"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onExplore(project, event.currentTarget);
            }}
          >
            {exploreLabel}
            <ArrowRightIcon />
            <span className="sr-only">
              : {t.projects.open} {project.title}
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
