import { useCallback, useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

type ProjectGroup = 'main' | 'ecosystem' | 'experiments';

const featuredTitles = ['CYBER DONATE', 'STARS PAY', 'CYBER MATE', 'SHX-Dev'];

export const ProjectsSection = () => {
  const { projects, t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState<ProjectGroup>('main');
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeGroup === 'main') {
      return projects.filter((project) => featuredTitles.includes(project.title));
    }

    if (activeGroup === 'ecosystem') {
      return projects.filter(
        (project) => project.category === 'SHX Ecosystem' && !featuredTitles.includes(project.title),
      );
    }

    return projects.filter((project) => project.category === 'Experimental & Entertainment');
  }, [activeGroup, projects]);

  const selectedProject = selectedTitle
    ? projects.find((project) => project.title === selectedTitle) ?? null
    : null;

  const closeProject = useCallback(() => setSelectedTitle(null), []);

  const tabs: Array<{ id: ProjectGroup; label: string }> = [
    { id: 'main', label: t.projects.main },
    { id: 'ecosystem', label: t.projects.ecosystem },
    { id: 'experiments', label: t.projects.experiments },
  ];

  return (
    <AnimatedSection id="projects">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={
          <>
            {t.projects.title}
            <br />
            <em>{t.projects.accent}</em>.
          </>
        }
        subtitle={t.projects.subtitle}
      />

      <div className="project-tabs" role="tablist" aria-label={t.projects.categories}>
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeGroup === tab.id}
            className={activeGroup === tab.id ? 'active' : ''}
            onClick={() => setActiveGroup(tab.id)}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`projects-browser-grid ${activeGroup === 'main' ? 'is-featured' : ''}`} role="tabpanel">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            compact={activeGroup !== 'main'}
            exploreLabel={t.projects.explore}
            onExplore={(selected) => setSelectedTitle(selected.title)}
          />
        ))}
      </div>

      <p className="project-browser-note">{t.projects.note}</p>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        labels={{
          close: t.projects.close,
          overview: t.projects.overview,
          gallery: t.projects.gallery,
          stack: t.projects.stack,
          surface: t.projects.surface,
          business: t.projects.business,
          role: t.projects.role,
          result: t.projects.result,
          timeline: t.projects.timeline,
          delivered: t.projects.delivered,
          challenges: t.projects.challenges,
          outcomes: t.projects.outcomes,
          openLive: t.projects.openLive,
          inDevelopment: t.projects.inDevelopment,
        }}
      />
    </AnimatedSection>
  );
};
