import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { ProjectIcon } from './ProjectIcon';
import { ArrowRightIcon } from './ui/Icons';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n';

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const { t } = useLanguage();
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      className={`card ${compact ? 'compact-card' : ''}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3 }}
    >
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
      <div className="card-icon">
        <ProjectIcon icon={project.icon} />
      </div>
      {project.metric && !compact ? <div className="project-metric">{project.metric}</div> : null}
      <h3 className="card-title">{project.title}</h3>
      {project.headline && !compact ? <p className="card-headline">{project.headline}</p> : null}
      <p className="card-desc">{project.description}</p>
      {compact ? null : (
        <div className="project-details">
          <div>
            <span>{t.projects.stack}</span>
            <p>{project.stack?.join(' / ') ?? project.products.join(' / ')}</p>
          </div>
          {project.monetization?.length ? (
            <div>
              <span>{t.projects.surface}</span>
              <p>{project.products.join(' / ')}</p>
            </div>
          ) : null}
        </div>
      )}
      <div className="card-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="card-meta">
        <span className="y">{project.meta}</span>
        {project.href ? (
          <a className="card-arrow" href={project.href} target="_blank" rel="noreferrer">
            <span className="sr-only">
              {t.projects.open} {project.title}
            </span>
            <ArrowRightIcon />
          </a>
        ) : (
          <span className="card-arrow">
            <ArrowRightIcon />
          </span>
        )}
      </div>
    </motion.article>
  );
};
