import { useLanguage } from '../i18n';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="shell foot">
        <div className="left">
          <span className="brand-mark" aria-hidden="true">
            <img src="/brand/shx-logo.png" alt="" />
          </span>
          <div>
            <div className="footer-brand">SHX&nbsp;DEV</div>
            <div className="tagline mt-1">
              {t.footer.tagline}
            </div>
          </div>
        </div>
        <div className="tagline">&copy; 2026 &middot; {t.footer.rights} &middot; v 3.0</div>
      </div>
    </footer>
  );
};
