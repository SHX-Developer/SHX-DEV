/* Sections: Nav, Hero, About, Stack, Projects, Journey */
const { useEffect: uE, useRef: uR, useState: uS } = React;

/* ============ NAVBAR ============ */
function Nav() {
  const [shrunk, setShrunk] = uS(false);
  uE(() => {
    const onScroll = () => setShrunk(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['About', 'Work', 'Stack', 'Services', 'Contact'];
  return (
    <div className="nav-fixed">
      <nav className={`nav-pill ${shrunk ? 'shrunk' : ''}`}>
        <a href="#top" className="nav-brand">
          <span className="dot"></span>
          shx<span className="tld">.dev</span>
        </a>
        <div className="nav-sep"></div>
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">Hire me <Icon.arrow /></a>
      </nav>
    </div>
  );
}

/* ============ HERO ============ */
function Hero({ particleDensity }) {
  return (
    <section id="top" style={{ paddingTop: 180, paddingBottom: 0, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CosmicCanvas density={particleDensity} />
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <a href="#work" className="chip reveal" style={{ marginBottom: 32 }}>
          <span className="dot"></span>
          <span>Building digital products in real time</span>
          <Icon.arrow style={{ opacity: 0.7 }} />
        </a>

        <h1 className="display reveal" style={{ '--reveal-delay': '120ms' }}>
          <span className="white">Building products</span><br/>
          <span className="white">that </span><span className="ital">bend reality.</span>
        </h1>

        <p className="reveal muted" style={{
          maxWidth: 560, margin: '32px auto 0', fontSize: 18,
          '--reveal-delay': '260ms'
        }}>
          Independent developer crafting Telegram bots, web apps,
          payment systems and admin panels. From idea to event horizon.
        </p>

        <div className="reveal" style={{
          display: 'flex', gap: 14, justifyContent: 'center',
          marginTop: 40, flexWrap: 'wrap',
          '--reveal-delay': '380ms'
        }}>
          <a href="#work" className="btn btn-primary">View work <Icon.arrow /></a>
          <a href="#contact" className="btn btn-ghost">Start a project</a>
        </div>

        {/* Specs strip */}
        <div className="reveal" style={{
          display: 'flex', justifyContent: 'center', gap: 40, marginTop: 80,
          flexWrap: 'wrap',
          '--reveal-delay': '520ms'
        }}>
          {[
            ['CURRENT', 'Available · UTC+3'],
            ['LATEST', 'AI ops dashboard'],
            ['UPTIME', '99.97% / 30d'],
          ].map(([k,v]) => (
            <div key={k} style={{ textAlign: 'left' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-2)' }}>{k}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: 'var(--text-1)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Black hole */}
      <div className="blackhole-wrap">
        <div className="blackhole-glow"></div>
        <div className="blackhole"></div>
      </div>

      {/* Bottom fade to next section */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 200,
        background: 'linear-gradient(180deg, transparent, var(--bg-0))',
        zIndex: 3, pointerEvents: 'none'
      }}></div>
    </section>
  );
}

/* ============ ABOUT / IDENTITY ============ */
function About() {
  const stats = [
    { n: 7, suf: '+', label: 'Years coding' },
    { n: 64, suf: '', label: 'Projects shipped' },
    { n: 23, suf: '', label: 'Telegram bots' },
    { n: 12, suf: '', label: 'Systems live' },
  ];
  return (
    <section id="about">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>01 — IDENTITY</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The observer</span> <span className="ital">behind the system.</span></h2>
          </div>
          <p>Equal parts engineer, designer and operator. I ship end-to-end — from schema to shader — so products feel inevitable, not assembled.</p>
        </div>

        <div className="grid reveal" style={{ gridTemplateColumns: '1fr 1.4fr', gap: 24, alignItems: 'stretch' }}>
          {/* Identity card */}
          <div className="glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
            {/* Hologram avatar */}
            <div style={{
              position: 'relative',
              height: 260,
              borderRadius: 14,
              background:
                'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.35), transparent 60%),' +
                'radial-gradient(circle at 50% 80%, rgba(124,58,237,0.3), transparent 60%),' +
                'linear-gradient(180deg, #160828, #0a0218)',
              border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* concentric rings */}
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  width: 80 + i*48, height: 80 + i*48,
                  borderRadius: '50%',
                  border: `1px solid rgba(168,85,247,${0.35 - i*0.07})`,
                  animation: `ring-pulse 4s ${i*0.4}s ease-in-out infinite`,
                }} />
              ))}
              <div style={{
                width: 88, height: 88,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C084FC, #7C3AED)',
                boxShadow: '0 0 40px rgba(168,85,247,0.6), inset 0 0 30px rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: 44, color: 'white',
                position: 'relative', zIndex: 2,
              }}>s</div>
              {/* scanline */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,0.025) 3px 4px)',
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
              }}></div>
            </div>

            <div style={{ marginTop: 22, display: 'grid', gap: 14 }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="mono dim" style={{ fontSize: 11 }}>HANDLE</span>
                <span className="mono" style={{ fontSize: 13 }}>@shx</span>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="mono dim" style={{ fontSize: 11 }}>BASE</span>
                <span className="mono" style={{ fontSize: 13 }}>Lisbon · 38.71°N</span>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="mono dim" style={{ fontSize: 11 }}>FOCUS</span>
                <span className="mono" style={{ fontSize: 13 }}>Fullstack · Bots · AI</span>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="mono dim" style={{ fontSize: 11 }}>STATUS</span>
                <span className="mono" style={{ fontSize: 13, color: '#7ee0a1' }}>● ONLINE</span>
              </div>
            </div>
            <style>{`@keyframes ring-pulse { 0%,100% { opacity: 0.6; transform: scale(1);} 50% { opacity: 1; transform: scale(1.04);} }`}</style>
          </div>

          {/* Bio + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="glass" style={{ padding: 36 }}>
              <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-0)', marginBottom: 18 }}>
                I'm a solo studio. I write the backend, design the interface,
                wire the payments, and watch the logs at 3am. I'm fastest when
                I own the whole loop.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-1)' }}>
                I care about products that <span className="ital" style={{ fontFamily: 'var(--font-serif)', color: 'var(--p-2)' }}>feel</span> right —
                a Telegram bot that replies before you finish typing, a checkout that doesn't
                make you blink, an admin panel an operator actually wants to open. Software at the
                edge of effortless.
              </p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {stats.map(s => (
                <div key={s.label} className="glass" style={{ padding: '22px 18px' }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 52, lineHeight: 1,
                    background: 'linear-gradient(180deg, #fff, var(--p-2))',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  }}>
                    <CountUp to={s.n} suffix={s.suf} />
                  </div>
                  <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 10 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .grid[style*="1fr 1.4fr"] { grid-template-columns: 1fr !important; }
          #about .grid[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ TECH STACK — ORBIT ============ */
function Stack() {
  const orbits = [
    { r: 160, dur: 28, items: ['React', 'Next.js', 'TypeScript'] },
    { r: 240, dur: 42, items: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'] },
    { r: 320, dur: 60, items: ['Telegram API', 'Stripe', 'OpenAI', 'GCP', 'Linux'] },
  ];
  return (
    <section id="stack">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>02 — STACK</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Tools in</span> <span className="ital">orbit.</span></h2>
          </div>
          <p>Concentric systems, all routed through one core. Pick a layer — frontend, infra, integrations — they all answer to the same source.</p>
        </div>

        <div className="reveal" style={{
          position: 'relative',
          height: 720,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 28,
          border: '1px solid var(--hairline)',
          background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.08), transparent 60%), var(--bg-1)',
        }}>
          {/* nebula */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(124,58,237,0.18), transparent 50%),' +
                        'radial-gradient(circle at 70% 30%, rgba(192,132,252,0.15), transparent 55%)',
            filter: 'blur(40px)',
          }}></div>

          {/* orbit rings */}
          {orbits.map((o, oi) => (
            <div key={oi} style={{
              position: 'absolute',
              width: o.r * 2, height: o.r * 2,
              borderRadius: '50%',
              border: '1px dashed rgba(168,85,247,0.18)',
              animation: `orbit-rot ${o.dur}s linear infinite ${oi % 2 ? 'reverse' : ''}`,
            }}>
              {o.items.map((label, i) => {
                const ang = (360 / o.items.length) * i;
                return (
                  <div key={label} style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    transform: `rotate(${ang}deg) translate(${o.r}px) rotate(-${ang}deg) translate(-50%, -50%)`,
                    animation: `orbit-counter ${o.dur}s linear infinite ${oi % 2 ? '' : 'reverse'}`,
                  }}>
                    <OrbitChip label={label} />
                  </div>
                );
              })}
            </div>
          ))}

          {/* Core */}
          <div style={{
            position: 'relative', zIndex: 5,
            width: 120, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #E9D5FF, var(--p-1) 40%, var(--p-4) 80%)',
            boxShadow: '0 0 50px rgba(168,85,247,0.6), 0 0 120px rgba(168,85,247,0.3), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 10px 20px rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 13, color: '#1a0530', fontWeight: 600,
            animation: 'core-pulse 4s ease-in-out infinite',
          }}>
            CORE
          </div>
        </div>

        {/* Flat list fallback / readable summary */}
        <div className="reveal" style={{
          marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'
        }}>
          {['TypeScript','React','Next.js','Node.js','Express','PostgreSQL','Redis','Prisma','Docker','Linux','Telegram Bot API','Stripe','OpenAI','GCP','GitHub Actions','Tailwind','GSAP'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbit-rot { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes orbit-counter { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
        @keyframes core-pulse { 0%,100% { box-shadow: 0 0 50px rgba(168,85,247,0.6), 0 0 120px rgba(168,85,247,0.3), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 10px 20px rgba(255,255,255,0.25); } 50% { box-shadow: 0 0 70px rgba(168,85,247,0.8), 0 0 160px rgba(168,85,247,0.45), inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 10px 20px rgba(255,255,255,0.25); } }
        body.no-motion #stack [style*="orbit-rot"], body.no-motion #stack [style*="orbit-counter"], body.no-motion #stack [style*="core-pulse"] { animation: none !important; }
        @media (max-width: 720px) {
          #stack .reveal > div[style*="height: 720px"] { height: 540px !important; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}
function OrbitChip({ label }) {
  return (
    <div style={{
      whiteSpace: 'nowrap',
      padding: '8px 14px',
      borderRadius: 999,
      fontFamily: 'var(--font-mono)', fontSize: 12,
      color: 'var(--text-0)',
      background: 'rgba(20,8,40,0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(168,85,247,0.3)',
      boxShadow: '0 0 20px rgba(168,85,247,0.25)',
    }}>{label}</div>
  );
}

/* ============ PROJECTS ============ */
function Projects() {
  const items = [
    {
      tag: 'TELEGRAM · SAAS',
      name: 'Astra Bot Studio',
      blurb: 'No-code Telegram bot builder used by 4.2k creators. Flow editor, payments, broadcast queue, analytics.',
      stack: ['Next.js', 'tRPC', 'Postgres', 'Stripe'],
      status: 'LIVE',
      metric: '4.2k creators',
      hue: 268,
    },
    {
      tag: 'FINTECH · PAYMENTS',
      name: 'Lumen Checkout',
      blurb: 'Drop-in checkout with multi-PSP routing. Picks the cheapest reliable route per transaction in <120ms.',
      stack: ['Node', 'Stripe', 'Mollie', 'Redis'],
      status: 'LIVE',
      metric: '$1.4M/mo routed',
      hue: 280,
    },
    {
      tag: 'INTERNAL TOOLS',
      name: 'Orbit Admin',
      blurb: 'Headless admin panel framework. Build a CRUD console over any Postgres schema in an afternoon.',
      stack: ['React', 'Prisma', 'Tailwind'],
      status: 'OPEN-SOURCE',
      metric: '2.1k stars',
      hue: 256,
    },
    {
      tag: 'AI · OPS',
      name: 'Signal Desk',
      blurb: 'AI ops assistant. Reads your logs, traces, error budgets — answers in plain language, drafts the postmortem.',
      stack: ['OpenAI', 'pgvector', 'Next.js'],
      status: 'BETA',
      metric: 'Closed beta · 38 teams',
      hue: 292,
    },
  ];
  return (
    <section id="work">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>03 — WORK</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>A universe</span> <span className="ital">of products.</span></h2>
          </div>
          <p>Selected systems I've designed, shipped and operated. Each one a planet in its own orbit — with its own gravity, weather, deadlines.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {items.map((p, i) => (
            <ProjectCard key={p.name} p={p} delay={i * 80} />
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
          <a href="#" className="btn btn-ghost">All work · 18 projects <Icon.arrowUR /></a>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          #work .grid[style*="repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, delay }) {
  const ref = uR(null);
  const [pos, setPos] = uS({ x: 0.5, y: 0.5, active: false });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, active: true });
  };
  const onLeave = () => setPos(p => ({ ...p, active: false }));

  return (
    <div
      ref={ref}
      className="reveal glass"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        '--reveal-delay': `${delay}ms`,
        padding: 28,
        minHeight: 320,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .3s, border-color .3s',
        transform: pos.active ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: pos.active ? 'rgba(168,85,247,0.4)' : 'var(--hairline)',
      }}
    >
      {/* Spotlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle 280px at ${pos.x*100}% ${pos.y*100}%, hsla(${p.hue},90%,70%,0.18), transparent 60%)`,
        opacity: pos.active ? 1 : 0,
        transition: 'opacity .3s',
        pointerEvents: 'none',
      }}></div>

      {/* Preview frame */}
      <div style={{
        height: 160,
        borderRadius: 12,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
        background:
          `radial-gradient(circle at 30% 40%, hsla(${p.hue},85%,65%,0.5), transparent 60%),` +
          `radial-gradient(circle at 80% 70%, hsla(${p.hue+12},80%,55%,0.4), transparent 50%),` +
          'linear-gradient(180deg, #170828, #08010f)',
        border: '1px solid var(--hairline)',
      }}>
        {/* Mock UI lines */}
        <div style={{ position: 'absolute', inset: 0, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }}></div>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '60%', background: `hsla(${p.hue},80%,75%,0.5)`, borderRadius: 4 }}></div>
            <div style={{ height: 6, width: '40%', background: 'rgba(255,255,255,0.15)', borderRadius: 4 }}></div>
            <div style={{ height: 6, width: '70%', background: 'rgba(255,255,255,0.12)', borderRadius: 4 }}></div>
          </div>
        </div>
        {/* sweep */}
        {pos.active && <div style={{
          position: 'absolute', top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          left: `${pos.x * 100}%`, transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}></div>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className="mono dim" style={{ fontSize: 10.5, letterSpacing: '0.16em' }}>{p.tag}</span>
        <span className="mono" style={{
          fontSize: 10.5, letterSpacing: '0.14em',
          padding: '4px 10px', borderRadius: 999,
          background: p.status === 'LIVE' ? 'rgba(126,224,161,0.12)' : p.status === 'BETA' ? 'rgba(255,200,100,0.12)' : 'rgba(168,85,247,0.15)',
          color: p.status === 'LIVE' ? '#7ee0a1' : p.status === 'BETA' ? '#ffc864' : 'var(--p-2)',
          border: '1px solid currentColor', borderOpacity: 0.3,
        }}>{p.status}</span>
      </div>

      <h3 style={{ fontSize: 26, marginBottom: 10 }}>{p.name}</h3>
      <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.55, marginBottom: 20 }}>{p.blurb}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.stack.map(s => <span key={s} className="mono" style={{
            fontSize: 10.5, padding: '4px 10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--hairline)',
            color: 'var(--text-1)',
          }}>{s}</span>)}
        </div>
        <span className="mono dim" style={{ fontSize: 11 }}>{p.metric}</span>
      </div>
    </div>
  );
}

/* ============ JOURNEY ============ */
function Journey() {
  const checkpoints = [
    { year: '2018', title: 'First commit', desc: 'A buggy Telegram weather bot. Crashed for two days. Hooked for life.' },
    { year: '2020', title: 'First client', desc: 'Built a delivery dispatch panel for a friend\'s family bakery. Still running.' },
    { year: '2022', title: 'First SaaS', desc: 'Orbit Admin shipped. 200 users in a week, 2k stars in a month.' },
    { year: '2023', title: 'Full-time solo', desc: 'Quit my last salaried job. Took on payments, AI, automation work.' },
    { year: '2024', title: 'Studio of one', desc: 'Lumen Checkout, Astra Bot Studio. 6-figure year, calm afternoons.' },
    { year: '2026', title: 'Currently', desc: 'Shipping Signal Desk and writing about everything I learn.' },
  ];
  return (
    <section id="journey">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>04 — JOURNEY</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>A path</span> <span className="ital">through the galaxy.</span></h2>
          </div>
          <p>Checkpoints along the way. No straight lines — gravity bends every trajectory.</p>
        </div>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* spine */}
          <div style={{
            position: 'absolute', left: 8, top: 6, bottom: 6,
            width: 1.5,
            background: 'linear-gradient(180deg, transparent, var(--p-1) 10%, var(--p-3) 90%, transparent)',
            boxShadow: '0 0 12px rgba(168,85,247,0.6)',
          }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {checkpoints.map((c, i) => (
              <div key={c.year} className="reveal" style={{ '--reveal-delay': `${i*60}ms`, position: 'relative' }}>
                {/* checkpoint dot */}
                <div style={{
                  position: 'absolute', left: -28, top: 4,
                  width: 17, height: 17, borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--p-2), var(--p-3))',
                  boxShadow: '0 0 16px rgba(168,85,247,0.7), 0 0 0 4px rgba(8,4,16,1), 0 0 0 5px rgba(168,85,247,0.3)',
                }}></div>
                <div className="glass" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--p-2)', letterSpacing: '0.14em' }}>{c.year}</span>
                    <span style={{ width: 24, height: 1, background: 'var(--hairline-strong)' }}></span>
                    <h4 style={{ fontSize: 19, fontWeight: 500 }}>{c.title}</h4>
                  </div>
                  <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.55 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, Stack, Projects, Journey });
