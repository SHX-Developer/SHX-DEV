import { useLanguage } from '../i18n';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="shell foot">
        <div className="left">
          <div className="tagline">{t.footer.tagline}</div>
        </div>
        <div className="tagline">&copy; 2026 &middot; {t.footer.rights} &middot; v 3.0</div>
      </div>
    </footer>
  );
};
