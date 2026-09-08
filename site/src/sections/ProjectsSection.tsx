import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
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

const getProjectSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getProjectGroup = (category: string, title: string): ProjectGroup => {
  if (featuredTitles.includes(title)) return 'main';
  if (category === 'SHX Ecosystem') return 'ecosystem';
  return 'experiments';
};

export const ProjectsSection = () => {
  const { projects, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<ProjectGroup>('main');
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

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

  const restoreProjectFocus = useCallback(() => {
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const syncProjectFromUrl = useCallback(() => {
    const slug = new URL(window.location.href).searchParams.get('project');
    const nextProject = slug
      ? projects.find((candidate) => getProjectSlug(candidate.title) === slug)
      : null;

    setSelectedTitle(nextProject?.title ?? null);
    if (nextProject) {
      setActiveGroup(getProjectGroup(nextProject.category, nextProject.title));
    } else {
      restoreProjectFocus();
    }
  }, [projects, restoreProjectFocus]);

  useEffect(() => {
    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, [syncProjectFromUrl]);

  const openProject = useCallback((project: (typeof projects)[number], trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setSelectedTitle(project.title);
    setActiveGroup(getProjectGroup(project.category, project.title));

    const url = new URL(window.location.href);
    const slug = getProjectSlug(project.title);
    url.searchParams.set('project', slug);
    if (!url.hash) url.hash = 'projects';
    window.history.pushState({ ...window.history.state, shxProject: slug }, '', url);
  }, []);

  const closeProject = useCallback(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get('project');

    if (slug && window.history.state?.shxProject === slug) {
      window.history.back();
      return;
    }

    url.searchParams.delete('project');
    window.history.replaceState(window.history.state, '', url);
    setSelectedTitle(null);
    restoreProjectFocus();
  }, [restoreProjectFocus]);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeGroup);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    setActiveGroup(tabs[nextIndex].id);
    document.getElementById(`project-tab-${tabs[nextIndex].id}`)?.focus();
  };

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
            id={`project-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeGroup === tab.id}
            aria-controls={`project-panel-${tab.id}`}
            tabIndex={activeGroup === tab.id ? 0 : -1}
            className={activeGroup === tab.id ? 'active' : ''}
            onClick={() => setActiveGroup(tab.id)}
            onKeyDown={handleTabKeyDown}
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
          id={`project-panel-${activeGroup}`}
          className={`projects-browser-grid ${activeGroup === 'main' ? 'is-featured' : ''}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${activeGroup}`}
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
              onExplore={openProject}
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
          stack: t.projects.stack,
          surface: t.projects.surface,
          business: t.projects.business,
          role: t.projects.role,
          delivered: t.projects.delivered,
          openLive: t.projects.openLive,
          inDevelopment: t.projects.inDevelopment,
          timeline: t.projects.timeline,
          challenges: t.projects.challenges,
          outcomes: t.projects.outcomes,
        }}
      />
    </AnimatedSection>
  );
};
