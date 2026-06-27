import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SocialDock } from './components/SocialDock';
import { LanguageProvider, useLanguage } from './i18n';
import { AboutSection } from './sections/AboutSection';
import { BuildProcessSection } from './sections/BuildProcessSection';
import { ContactSection } from './sections/ContactSection';
import { CyberDonateCaseSection } from './sections/CyberDonateCaseSection';
import { CurrentWorkSection } from './sections/CurrentWorkSection';
import { EcosystemSection } from './sections/EcosystemSection';
import { HeroSection } from './sections/HeroSection';
import { JourneySection } from './sections/JourneySection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ResumeSection } from './sections/ResumeSection';
import { TechStackSection } from './sections/TechStackSection';

const AppContent = () => {
  const { language, t } = useLanguage();

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

  return (
    <>
      <Header />
      <main className="shell" id="top">
        <HeroSection />
        <ProjectsSection />
        <CyberDonateCaseSection />
        <AboutSection />
        <BuildProcessSection />
        <EcosystemSection />
        <TechStackSection />
        <JourneySection />
        <CurrentWorkSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <SocialDock />
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
