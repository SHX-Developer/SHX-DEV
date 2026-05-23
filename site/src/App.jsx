import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useTweaks } from './hooks/useTweaks.js'
import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakSlider,
  TweakToggle,
} from './components/TweaksPanel.jsx'
import { ParticlesBg } from './components/Scene.jsx'
import {
  Nav, Hero, About, Projects, TechStack, Services,
  Process, Experience, Resume, Contact, Footer,
} from './components/Sections.jsx'
import BootSequence from './components/BootSequence.jsx'

const TWEAK_DEFAULTS = {
  accent: 'blue',
  particleDensity: 0.8,
  noise: true,
}

const ACCENTS = {
  purple:  { p: '#7C3AED', ps: '#A78BFA', g1: 'rgba(124,58,237,0.45)', g2: 'rgba(56,189,248,0.10)' },
  blue:    { p: '#0EA5E9', ps: '#7DD3FC', g1: 'rgba(14,165,233,0.45)', g2: 'rgba(124,58,237,0.10)' },
  gold:    { p: '#F5C542', ps: '#FCD34D', g1: 'rgba(245,197,66,0.35)', g2: 'rgba(124,58,237,0.18)' },
  magenta: { p: '#E11D74', ps: '#F472B6', g1: 'rgba(225,29,116,0.40)', g2: 'rgba(56,189,248,0.10)' },
}

function applyAccent(key) {
  const a = ACCENTS[key] || ACCENTS.purple
  const r = document.documentElement
  r.style.setProperty('--purple', a.p)
  r.style.setProperty('--purple-soft', a.ps)
  const bg = document.getElementById('cosmic-bg')
  if (bg) {
    bg.style.background = `
      radial-gradient(ellipse 80% 60% at 50% -10%, ${a.g1}, transparent 60%),
      radial-gradient(ellipse 60% 40% at 90% 30%, ${a.g2}, transparent 60%),
      radial-gradient(ellipse 70% 50% at 10% 80%, ${a.g1.replace('0.45','0.18').replace('0.40','0.16').replace('0.35','0.14')}, transparent 60%),
      linear-gradient(180deg, #05030D 0%, #0A0617 40%, #05030D 100%)
    `
  }
}

function ParticlesPortal({ density }) {
  const mount = document.getElementById('particles-mount')
  if (!mount) return null
  return ReactDOM.createPortal(<ParticlesBg density={density} speed={1} />, mount)
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)

  useEffect(() => { applyAccent(tweaks.accent) }, [tweaks.accent])
  useEffect(() => {
    const el = document.querySelector('.cosmic-noise')
    if (el) el.style.display = tweaks.noise ? '' : 'none'
  }, [tweaks.noise])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Services />
        <Process />
        <Experience />
        <Resume />
        <Contact />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakRadio
            label="Color"
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={[
              { value: 'purple',  label: 'Purple' },
              { value: 'blue',    label: 'Cyan' },
              { value: 'gold',    label: 'Gold' },
              { value: 'magenta', label: 'Mag' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Atmosphere">
          <TweakSlider
            label="Particles"
            min={0} max={2} step={0.1}
            value={tweaks.particleDensity}
            onChange={(v) => setTweak('particleDensity', v)}
          />
          <TweakToggle
            label="Film grain"
            value={tweaks.noise}
            onChange={(v) => setTweak('noise', v)}
          />
        </TweakSection>
      </TweaksPanel>

      <ParticlesPortal density={tweaks.particleDensity} />
      <BootSequence />
    </>
  )
}
