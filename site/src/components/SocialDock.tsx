import { socials } from '../data/socials';
import { useLanguage } from '../i18n';

export const SocialDock = () => {
  const { t } = useLanguage();

  return (
    <div className="dock" aria-label={t.socials}>
      {socials.map(({ href, label, Icon, separated }) => (
        <span className="dock-item" key={label}>
          {separated ? <span className="sep" aria-hidden="true" /> : null}
          <a href={href} title={label} aria-label={label}>
            <Icon />
          </a>
        </span>
      ))}
    </div>
  );
};
