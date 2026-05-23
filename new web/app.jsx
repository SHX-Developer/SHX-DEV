/* Root app — wires every section + Tweaks panel. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 268,
  "particleDensity": 1,
  "glowIntensity": 1,
  "reduceMotion": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useReveal();
  useMouseGlow();

  // Apply tweaks to CSS vars
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--particle-density', t.particleDensity);
    r.style.setProperty('--glow-intensity', t.glowIntensity);

    // Shift purple hues by remapping the OKLCH-ish way via HSL conversion
    // hue 268 → base. Offset = hue - 268
    const offset = t.accentHue - 268;
    const css = `
      :root {
        --p-1: hsl(${268 + offset}, 92%, 65%);
        --p-2: hsl(${275 + offset}, 95%, 75%);
        --p-3: hsl(${262 + offset}, 84%, 56%);
        --p-4: hsl(${258 + offset}, 80%, 50%);
        --glow: ${hslToRgbStr(268 + offset, 92, 65)};
      }
    `;
    let tag = document.getElementById('__tweak-overrides');
    if (!tag) { tag = document.createElement('style'); tag.id = '__tweak-overrides'; document.head.appendChild(tag); }
    tag.textContent = css;

    document.body.classList.toggle('no-motion', t.reduceMotion);
  }, [t]);

  return (
    <>
      <Nav />
      <Hero particleDensity={t.particleDensity} />
      <About />
      <Stack />
      <Projects />
      <Journey />
      <Services />
      <Terminal />
      <Skills />
      <Reviews />
      <DataCore />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Aesthetic" />
        <TweakSlider label="Accent hue" value={t.accentHue} min={220} max={320} step={1} unit="°"
                     onChange={(v) => setTweak('accentHue', v)} />
        <TweakSlider label="Glow intensity" value={Math.round(t.glowIntensity * 100)} min={0} max={150} step={5} unit="%"
                     onChange={(v) => setTweak('glowIntensity', v / 100)} />
        <TweakSlider label="Particle density" value={Math.round(t.particleDensity * 100)} min={0} max={200} step={10} unit="%"
                     onChange={(v) => setTweak('particleDensity', v / 100)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Reduce motion" value={t.reduceMotion}
                     onChange={(v) => setTweak('reduceMotion', v)} />
      </TweaksPanel>
    </>
  );
}

/* helpers */
function hslToRgbStr(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
  return [255*f(0), 255*f(8), 255*f(4)].map(x => Math.round(x)).join(' ');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
