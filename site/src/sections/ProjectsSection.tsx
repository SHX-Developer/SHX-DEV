import { ProjectCard } from '../components/ProjectCard';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n';

const featuredTitles = ['CYBER DONATE', 'STARS PAY', 'CYBER MATE', 'SHX-Dev'];

export const ProjectsSection = () => {
  const { projects, t } = useLanguage();
  const featuredProjects = projects.filter((project) => featuredTitles.includes(project.title));
  const supportingProjects = projects.filter((project) => !featuredTitles.includes(project.title));

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

      <div className="project-groups">
        <div className="project-group">
          <div className="project-group-head">
            <span>{t.projects.main}</span>
          </div>
          <div className="grid-2 featured-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div className="project-group">
          <div className="project-group-head">
            <span>{t.projects.experiments}</span>
          </div>
          <p className="project-group-note">{t.projects.note}</p>
          <div className="compact-projects">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} compact />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
