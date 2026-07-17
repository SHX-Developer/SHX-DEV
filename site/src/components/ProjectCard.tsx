import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n';
import { ProjectIcon } from './ProjectIcon';
import { ArrowRightIcon } from './ui/Icons';

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  exploreLabel: string;
  onExplore: (project: Project) => void;
};

export const ProjectCard = ({
  project,
  compact = false,
  exploreLabel,
  onExplore,
}: ProjectCardProps) => {
  const { t } = useLanguage();

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-topline">
        <div className={`card-icon${project.title === 'SHX-Dev' ? ' is-brand' : ''}`}>
          {project.title === 'SHX-Dev' ? (
            <img src="/brand/shx-logo.png" alt="" aria-hidden="true" />
          ) : (
            <ProjectIcon icon={project.icon} />
          )}
        </div>
        <span className="project-classification">{project.meta}</span>
      </div>

      {compact ? null : (
        <div className="project-preview" aria-hidden="true">
          {project.screenshot ? (
            <img src={project.screenshot} alt="" />
          ) : (
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
          )}
        </div>
      )}

      <div className="card-content">
        {project.headline && !compact ? (
          <p className="project-kind">{project.headline}</p>
        ) : null}
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
          <button className="card-explore" type="button" onClick={() => onExplore(project)}>
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
