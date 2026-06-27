import type { ProjectIcon as ProjectIconName } from '../data/projects';

type ProjectIconProps = {
  icon: ProjectIconName;
};

export const ProjectIcon = ({ icon }: ProjectIconProps) => {
  switch (icon) {
    case 'link':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M9 7H6a4 4 0 0 0 0 8h3M15 7h3a4 4 0 0 1 0 8h-3M9 11h6" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3l2.6 6.3 6.4.5-5 4.3 1.6 6.4L12 17l-5.6 3.5 1.6-6.4-5-4.3 6.4-.5z" />
        </svg>
      );
    case 'cube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
          <path d="M8 9v6M16 9v6M12 7v10" />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M21 12c0 5-4 9-9 9-1.6 0-3.1-.4-4.4-1.1L3 21l1.1-4.6A9 9 0 1 1 21 12z" />
        </svg>
      );
    case 'play':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <polygon points="10,8 16,12 10,16" />
        </svg>
      );
    case 'pulse':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 12h4l3 8 4-16 3 8h4" />
        </svg>
      );
  }
};
