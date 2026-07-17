import { motion, useScroll } from 'framer-motion';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LanguageProvider, useLanguage } from './i18n';
import { AboutSection } from './sections/AboutSection';
import { BuildProcessSection } from './sections/BuildProcessSection';
import { ContactSection } from './sections/ContactSection';
import { EcosystemSection } from './sections/EcosystemSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TimelineSection } from './sections/TimelineSection';
import { scrollToSection } from './utils/scroll';

const AppContent = () => {
  const { language, t } = useLanguage();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', t.meta.description);

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', t.meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t.meta.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', t.meta.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', t.meta.description);
  }, [language, t]);

  useEffect(() => {
    const restoreHash = () => {
      if (window.location.hash) {
        window.requestAnimationFrame(() =>
          scrollToSection(window.location.hash, { updateHistory: false, behavior: 'auto' }),
        );
      }
    };

    restoreHash();
    window.addEventListener('popstate', restoreHash);
    return () => window.removeEventListener('popstate', restoreHash);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <a className="skip-link" href="#content">
        {t.header.skip}
      </a>
      <Header />
      <main className="shell" id="content">
        <span id="top" className="anchor-target" />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <BuildProcessSection />
        <EcosystemSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
