import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionFX } from '../components/ui/SectionFX';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

type ProjectGroup = 'main' | 'ecosystem' | 'experiments';

const featuredTitles = ['CYBER DONATE', 'STARS PAY', 'CYBER MATE', 'SHX DEV'];
const ecosystemTitles = [
  'SHX-Flow',
  'SHX-Vault',
  'SHX-Connect',
  'SHX-Stream',
  'SHX-Canvas',
  'SHX-Loop',
];

export const ProjectsSection = () => {
  const { projects, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<ProjectGroup>('main');
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeGroup === 'main') {
      return projects.filter((project) => featuredTitles.includes(project.title));
    }

    if (activeGroup === 'ecosystem') {
      return projects
        .filter(
          (project) =>
            project.category === 'SHX Ecosystem' && !featuredTitles.includes(project.title),
        )
        .sort(
          (first, second) =>
            ecosystemTitles.indexOf(first.title) - ecosystemTitles.indexOf(second.title),
        );
    }

    return projects.filter((project) => project.category === 'Experimental & Entertainment');
  }, [activeGroup, projects]);

  const selectedProject = selectedTitle
    ? (projects.find((project) => project.title === selectedTitle) ?? null)
    : null;

  const closeProject = useCallback(() => setSelectedTitle(null), []);

  const tabs: Array<{ id: ProjectGroup; label: string }> = [
    { id: 'main', label: t.projects.main },
    { id: 'ecosystem', label: t.projects.ecosystem },
    { id: 'experiments', label: t.projects.experiments },
  ];

  return (
    <AnimatedSection id="projects">
      <SectionFX variant="projects" />
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
            {activeGroup === tab.id ? (
              <motion.span
                className="project-tab-indicator"
                layoutId="project-tab-indicator"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 430, damping: 36, mass: 0.82 }
                }
              />
            ) : null}
            <span className="project-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className={`projects-browser-grid ${activeGroup === 'main' ? 'is-featured' : ''}`}
          role="tabpanel"
          key={activeGroup}
          initial={reducedMotion ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              compact={activeGroup !== 'main'}
              exploreLabel={t.projects.explore}
              onExplore={(selected) => setSelectedTitle(selected.title)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="project-browser-note">{t.projects.note}</p>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        labels={{
          close: t.projects.close,
          overview: t.projects.overview,
          gallery: t.projects.gallery,
          result: t.projects.result,
          openLive: t.projects.openLive,
          inDevelopment: t.projects.inDevelopment,
        }}
      />
    </AnimatedSection>
  );
};
