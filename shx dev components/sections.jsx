// All the sections (About, Projects, Tech, Services, Process, Experience, Resume, Contact)
const { useEffect, useRef, useState } = React;

// ---- Reveal-on-scroll wrapper ----
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}

// ============ NAV ============
function Nav() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = ['home', 'about', 'projects', 'stack', 'services', 'process', 'experience', 'resume', 'contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.4 });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  const links = [
    ['about', 'About'],
    ['projects', 'Work'],
    ['stack', 'Stack'],
    ['services', 'Services'],
    ['contact', 'Contact'],
  ];
  return (
    <nav className="nav">
      <span className="nav-brand">
        <span className="nav-brand-dot" />
        <span>shx<span style={{color: 'var(--text-3)'}}>.dev</span></span>
      </span>
      <div className="nav-links">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>
        ))}
      </div>
      <a href="#contact" className="btn btn-primary" style={{padding: '8px 14px', fontSize: 12}}>Hire me →</a>
    </nav>
  );
}

// ============ HERO (Reflect-style with black hole) ============
function Hero() {
  return (
    <section className="r-hero" id="home">
      <div className="r-hero-top">
        <a href="#projects" className="r-pill" style={{opacity: 0, animation: 'wordUp 0.9s ease 0.1s forwards'}}>
          <span className="r-pill-spark">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>
            </svg>
          </span>
          Building digital products in real time
          <span style={{color: 'var(--text-3)', fontSize: 14}}>→</span>
        </a>
        <h1 className="r-title" style={{opacity: 0, animation: 'wordUp 1s ease 0.25s forwards'}}>
          Building products<br/>that <em>bend reality.</em>
        </h1>
        <p className="r-sub" style={{opacity: 0, animation: 'wordUp 1s ease 0.5s forwards'}}>
          Independent developer crafting Telegram bots, web apps,
          payment systems and admin panels. From idea to event horizon.
        </p>
        <div className="r-cta" style={{opacity: 0, animation: 'wordUp 1s ease 0.7s forwards'}}>
          <a href="#projects" className="btn btn-primary">View work<ArrowIcon/></a>
          <a href="#contact" className="btn btn-glass">Start a project</a>
        </div>
      </div>

      <div className="r-hole-stage">
        <BlackHole height={680} />
      </div>

      <div className="r-preview-wrap">
        <HeroPreview/>
      </div>
    </section>
  );
}

// Preview "product surface" peeking up from behind the black hole.
// Two-column layout: a notes / project list + a project detail readout.
function HeroPreview() {
  const items = [
    { id: 1, title: 'Cyber Donate · v2.6', kind: 'TG · Web', status: 'live', tag: '+14%' },
    { id: 2, title: 'StarsPay · order #4821', kind: 'TG Bot', status: 'live', tag: '47s' },
    { id: 3, title: 'Cyber Mate · beta', kind: 'Mini App', status: 'beta', tag: 'new' },
    { id: 4, title: 'Admin panel · v1.2', kind: 'Internal', status: 'active', tag: 'wip' },
    { id: 5, title: 'Payment relay · core', kind: 'API', status: 'live', tag: 'OK' },
  ];
  return (
    <div className="hp-grid">
      {/* Window chrome */}
      <div className="hp-chrome">
        <div className="hp-dots">
          <span/><span/><span/>
        </div>
        <div className="hp-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity: 0.5}}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          shx.dev/system
        </div>
        <div className="hp-chrome-spacer"/>
      </div>

      <div className="hp-body">
        {/* Sidebar */}
        <div className="hp-sidebar">
          <div className="hp-side-row hp-side-active">
            <span className="hp-side-ic">◍</span>System
            <span className="hp-side-ct">5</span>
          </div>
          <div className="hp-side-row"><span className="hp-side-ic">⌘</span>Products<span className="hp-side-ct">12</span></div>
          <div className="hp-side-row"><span className="hp-side-ic">▤</span>Orders<span className="hp-side-ct">284</span></div>
          <div className="hp-side-row"><span className="hp-side-ic">⊞</span>Payments<span className="hp-side-ct">$14k</span></div>
          <div className="hp-side-row"><span className="hp-side-ic">↻</span>Automation</div>
          <div className="hp-side-sep"/>
          <div className="hp-side-label">Pinned</div>
          <div className="hp-side-row dim"><span className="hp-side-ic">★</span>Cyber Donate</div>
          <div className="hp-side-row dim"><span className="hp-side-ic">★</span>StarsPay</div>
          <div className="hp-side-row dim"><span className="hp-side-ic">★</span>Admin v1.2</div>
        </div>

        {/* Center column — list */}
        <div className="hp-center">
          <div className="hp-section-h">
            <span style={{color:'#fff', fontSize: 14, fontWeight: 500}}>Active products</span>
            <span className="mono" style={{fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em'}}>UPDATED 2 MIN AGO</span>
          </div>
          <ul className="hp-list">
            {items.map((it, i) => (
              <li key={it.id} className={`hp-row ${i === 0 ? 'hp-row-active' : ''}`}>
                <span className={`hp-dot hp-dot-${it.status}`}/>
                <div className="hp-row-main">
                  <div className="hp-row-title">{it.title}</div>
                  <div className="hp-row-kind">{it.kind}</div>
                </div>
                <span className="hp-row-tag">{it.tag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — detail */}
        <div className="hp-right">
          <div className="hp-section-h">
            <span style={{color:'#fff', fontSize: 14, fontWeight: 500}}>Cyber Donate · v2.6</span>
            <span className="mono" style={{fontSize: 10, color: '#86efac'}}>● LIVE</span>
          </div>
          <div className="hp-chart">
            <svg viewBox="0 0 220 80" preserveAspectRatio="none" style={{width: '100%', height: 80}}>
              <defs>
                <linearGradient id="hpchart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E879F9" stopOpacity="0.5"/>
                  <stop offset="1" stopColor="#E879F9" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,32 L140,18 L160,22 L180,12 L200,16 L220,8"
                    stroke="#E879F9" strokeWidth="1.8" fill="none"/>
              <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,32 L140,18 L160,22 L180,12 L200,16 L220,8 L220,80 L0,80 Z"
                    fill="url(#hpchart)"/>
            </svg>
          </div>
          <div className="hp-stats">
            <div><div className="hp-stat-v">$8.4k</div><div className="hp-stat-l">Volume / 24h</div></div>
            <div><div className="hp-stat-v">214</div><div className="hp-stat-l">Orders</div></div>
            <div><div className="hp-stat-v">99.8%</div><div className="hp-stat-l">Uptime</div></div>
          </div>
          <div className="hp-mini-rows">
            <div className="hp-mini-row"><span>order #4821</span><span className="mono" style={{color:'#86efac'}}>delivered</span></div>
            <div className="hp-mini-row"><span>order #4820</span><span className="mono" style={{color:'#86efac'}}>delivered</span></div>
            <div className="hp-mini-row"><span>order #4819</span><span className="mono" style={{color:'#FCD34D'}}>pending</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// ============ ABOUT ============
function About() {
  const flow = [
    ['01', 'Idea', '🌱'],
    ['02', 'Design', '✦'],
    ['03', 'Develop', '⌘'],
    ['04', 'Launch', '↗'],
    ['05', 'Growth', '∞'],
  ];
  return (
    <section id="about">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About</span>
          <h2 className="h-section">
            Independent developer building<br/><em>real digital solutions.</em>
          </h2>
        </Reveal>

        <div className="about-grid">
          <Reveal>
            <div className="glass about-card">
              <div className="about-name">Independent Developer</div>
              <p style={{fontSize: 15, lineHeight: 1.65, color: 'var(--text-2)', margin: 0}}>
                I build shipping products end-to-end — Telegram bots, web apps,
                payment workflows, admin panels and automation systems. My background
                blends engineering with procurement & contract consulting, so I think
                in business outcomes, not just code.
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
                {['TypeScript','Python','React','Node.js','PostgreSQL','aiogram'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="about-stats">
                <div className="about-stat"><strong>4y+</strong>building products</div>
                <div className="about-stat"><strong>20+</strong>projects shipped</div>
                <div className="about-stat"><strong>3</strong>continents served</div>
                <div className="about-stat"><strong>∞</strong>cups of coffee</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24, height: '100%'}}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                letterSpacing: '0.12em', color: 'var(--text-3)', textTransform: 'uppercase'
              }}>
                — How I work
              </div>
              <div className="flow-grid">
                {flow.map(([n, label, ic], i) => (
                  <div key={n} className="glass glass-hover flow-step">
                    <div className="step-num">{n}</div>
                    <div className="step-icon" style={{fontSize: 14}}>{ic}</div>
                    <div className="step-label">{label}</div>
                  </div>
                ))}
              </div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: 'var(--text-2)', lineHeight: 1.6, margin: 0
              }}>
                {'>'} Every project moves through these phases.<br/>
                {'>'} No skipping steps. No half-built features. No surprises.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============ PROJECTS ============
function Projects() {
  const projects = [
    {
      key: 'cyber-donate',
      title: 'Cyber Donate',
      kind: 'PRODUCT / TG + WEB',
      desc: 'Telegram-based digital top-up platform for games and digital services with multi-currency payments.',
      tags: ['Next.js', 'Node.js', 'Stripe', 'Postgres'],
      caps: ['Telegram bot', 'Order system', 'Payment flow', 'Admin panel', 'Multi-currency', 'Webhook receipts'],
      mock: <CyberDonateMock />,
      status: 'live',
      statusLabel: 'LIVE',
      uptime: '482d',
    },
    {
      key: 'starspay',
      title: 'StarsPay',
      kind: 'PRODUCT / TG BOT',
      desc: 'Telegram Stars purchasing platform with live order status, multilingual UI and admin verification flow.',
      tags: ['aiogram', 'Python', 'Redis', 'i18n'],
      caps: ['Live order status', '5 languages', 'Currency switch', 'Receipt upload', 'Admin verification', 'Webhook events'],
      mock: <StarsPayMock />,
      status: 'live',
      statusLabel: 'LIVE',
      uptime: '210d',
    },
    {
      key: 'cyber-mate',
      title: 'Cyber Mate',
      kind: 'PRODUCT / TG MINI APP',
      desc: 'Telegram Mini App for finding teammates — profiles, game selection, likes / matches, in-app messaging.',
      tags: ['React', 'WebSockets', 'Postgres'],
      caps: ['Player profiles', 'Game selection', 'Likes & matches', 'In-app chat', 'Activity stats', 'Mini App SDK'],
      mock: <CyberMateMock />,
      status: 'beta',
      statusLabel: 'BETA',
      uptime: '47d',
    },
  ];

  const [open, setOpen] = useState('cyber-donate');

  return (
    <section id="projects">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Active products</span>
          <h2 className="h-section">Live products,<br/><em>orbiting steadily.</em></h2>
        </Reveal>

        <Reveal>
          <div className="glass" style={{padding: '4px'}}>
            <div className="proj-system">
              {projects.map((p, i) => {
                const isOpen = open === p.key;
                return (
                  <div key={p.key}>
                    <div className={`proj-row ${isOpen ? 'expanded' : ''}`} onClick={() => setOpen(isOpen ? null : p.key)}>
                      <div className="proj-idx">{String(i+1).padStart(2,'0')}</div>
                      <div className="proj-name">
                        <div className="proj-name-title">{p.title}</div>
                        <div className="proj-name-kind">{p.kind}</div>
                      </div>
                      <div className="proj-meta">
                        {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                      <div style={{display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <span className="mono" style={{fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em'}}>
                          ↑ {p.uptime}
                        </span>
                        <span className={`proj-status ${p.status}`}>
                          <span className="status-dot" style={{
                            background: p.status === 'live' ? '#22c55e' : p.status === 'beta' ? '#F5C542' : '#38BDF8'
                          }}/>
                          {p.statusLabel}
                        </span>
                        <span style={{
                          color: 'var(--text-3)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                          transition: 'transform 0.3s ease', fontSize: 18, lineHeight: 1, width: 14, textAlign: 'center'
                        }}>+</span>
                      </div>
                    </div>
                    <div className={`proj-detail ${isOpen ? 'open' : ''}`}>
                      <div className="proj-detail-inner">
                        <div>
                          <div className="mono" style={{fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.14em', marginBottom: 12}}>
                            DESCRIPTION
                          </div>
                          <p style={{margin: 0, color: 'var(--text-2)', lineHeight: 1.6, fontSize: 14.5}}>{p.desc}</p>
                          <div className="mono" style={{fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.14em', marginTop: 22, marginBottom: 12}}>
                            CAPABILITIES
                          </div>
                          <ul className="proj-cap-list">
                            {p.caps.map(c => <li key={c}>{c}</li>)}
                          </ul>
                          <div className="proj-actions-row">
                            <a className="btn btn-glass" style={{padding: '10px 14px', fontSize: 12}} href="#">Open case ↗</a>
                            <a className="btn btn-ghost" style={{padding: '10px 4px', fontSize: 12}} href="#">Live demo</a>
                            <a className="btn btn-ghost" style={{padding: '10px 4px', fontSize: 12}} href="#">Source</a>
                          </div>
                        </div>
                        <div style={{
                          position: 'relative',
                          height: 320,
                          borderRadius: 16,
                          overflow: 'hidden',
                          background:
                            'radial-gradient(ellipse at 70% 0%, rgba(124, 58, 237, 0.4), transparent 60%),' +
                            'radial-gradient(ellipse at 0% 100%, rgba(56, 189, 248, 0.3), transparent 60%),' +
                            'linear-gradient(140deg, #15102E 0%, #0A0617 100%)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                          {p.mock}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== Project mockups (originals) =====
function PhoneFrame({ children, label }) {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(0.95)',
      width: 168, height: 280,
      borderRadius: 26,
      background: 'linear-gradient(180deg, #1a1238 0%, #0a0617 100%)',
      border: '1.5px solid rgba(255,255,255,0.18)',
      boxShadow: '0 30px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 6px #05030D, inset 0 0 0 7px rgba(255,255,255,0.06)',
      overflow: 'hidden',
      padding: '14px 12px',
    }}>
      <div style={{
        position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
        width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.12)'
      }}/>
      <div style={{
        position: 'absolute', inset: 6, borderRadius: 22,
        background: 'linear-gradient(165deg, #0F0926 0%, #050315 100%)',
        padding: '20px 12px 12px', overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  );
}

function CyberDonateMock() {
  return (
    <PhoneFrame>
      <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#A78BFA', letterSpacing: '0.1em', marginBottom: 6}}>
        CYBER.DONATE
      </div>
      <div style={{fontSize: 11, color: '#fff', fontWeight: 500, marginBottom: 8}}>Top up Steam</div>
      <div style={{display: 'flex', gap: 4, marginBottom: 8}}>
        {['$10','$25','$50'].map(v => (
          <div key={v} style={{
            flex: 1, padding: '5px 0', textAlign: 'center', fontSize: 9,
            border: '1px solid rgba(167,139,250,0.3)', borderRadius: 6,
            background: v === '$25' ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.03)',
            color: '#fff'
          }}>{v}</div>
        ))}
      </div>
      <div style={{
        padding: '8px 10px', borderRadius: 8,
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        fontSize: 8, color: '#A7A3B8', marginBottom: 6
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
          <span>Game balance</span><span style={{color: '#fff'}}>$25.00</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Service fee</span><span style={{color: '#fff'}}>$0.00</span>
        </div>
      </div>
      <div style={{
        padding: '8px 0', textAlign: 'center', fontSize: 9, fontWeight: 600,
        background: 'linear-gradient(180deg, #8B5CF6, #6D28D9)', borderRadius: 8,
        boxShadow: '0 4px 12px rgba(124,58,237,0.5)', color: '#fff'
      }}>
        Pay $25.00
      </div>
      <div style={{
        marginTop: 6, padding: '6px 8px', borderRadius: 6,
        background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
        fontSize: 7, color: '#86efac', display: 'flex', alignItems: 'center', gap: 4
      }}>
        <span style={{width: 4, height: 4, borderRadius: 999, background: '#22c55e'}}/>
        Order #3829 — Delivered in 47s
      </div>
    </PhoneFrame>
  );
}

function StarsPayMock() {
  return (
    <PhoneFrame>
      <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#FCD34D', letterSpacing: '0.1em', marginBottom: 8}}>
        STARS.PAY
      </div>
      <div style={{
        display: 'grid', placeItems: 'center', height: 60,
        background: 'radial-gradient(circle, rgba(245,197,66,0.2), transparent 70%)',
        marginBottom: 8
      }}>
        <div style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
          fontSize: 28, color: '#fff'
        }}>
          ★ <span style={{color: '#FCD34D'}}>500</span>
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 6}}>
        {[['100','$1.99'],['500','$8.99'],['1k','$15.99'],['5k','$74.99']].map(([s, p], i) => (
          <div key={i} style={{
            padding: '5px 6px', borderRadius: 6,
            background: i === 1 ? 'rgba(245,197,66,0.15)' : 'rgba(255,255,255,0.03)',
            border: i === 1 ? '1px solid rgba(245,197,66,0.4)' : '1px solid rgba(255,255,255,0.08)',
            fontSize: 8, color: '#fff', display: 'flex', justifyContent: 'space-between'
          }}>
            <span>★ {s}</span><span style={{color: '#A7A3B8'}}>{p}</span>
          </div>
        ))}
      </div>
      <div style={{
        padding: '8px 0', textAlign: 'center', fontSize: 9, fontWeight: 600,
        background: 'linear-gradient(180deg, #F5C542, #D4A017)', borderRadius: 8,
        color: '#1a1238'
      }}>Buy 500 ★</div>
      <div style={{marginTop: 6, fontSize: 7, color: '#A7A3B8', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace"}}>
        EN · RU · ES · PT · DE
      </div>
    </PhoneFrame>
  );
}

function CyberMateMock() {
  return (
    <PhoneFrame>
      <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#7DD3FC', letterSpacing: '0.1em', marginBottom: 6}}>
        CYBER.MATE
      </div>
      <div style={{
        height: 110, borderRadius: 10,
        background: 'linear-gradient(160deg, #2D1B5C, #38BDF8)',
        position: 'relative', marginBottom: 8, overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', bottom: 6, left: 8, right: 8,
          fontSize: 9, color: '#fff', fontWeight: 600
        }}>
          Alex, 24<div style={{fontSize: 7, color: 'rgba(255,255,255,0.7)', fontWeight: 400}}>Valorant · Diamond II</div>
        </div>
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 8, height: 8, borderRadius: 999, background: '#22c55e',
          boxShadow: '0 0 6px #22c55e'
        }}/>
      </div>
      <div style={{display: 'flex', gap: 4, marginBottom: 8}}>
        {['Valorant','CS2','Apex'].map(g => (
          <div key={g} style={{
            padding: '3px 6px', fontSize: 7, borderRadius: 999,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#A7A3B8'
          }}>{g}</div>
        ))}
      </div>
      <div style={{display: 'flex', gap: 6, justifyContent: 'center', marginTop: 4}}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
          display: 'grid', placeItems: 'center', color: '#fca5a5', fontSize: 14
        }}>✕</div>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'linear-gradient(180deg, #38BDF8, #0EA5E9)',
          display: 'grid', placeItems: 'center', color: '#fff', fontSize: 14,
          boxShadow: '0 4px 12px rgba(56,189,248,0.5)'
        }}>♥</div>
      </div>
      <div style={{
        marginTop: 8, fontSize: 7, color: '#A7A3B8', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace"
      }}>
        24 matches · 8 active chats
      </div>
    </PhoneFrame>
  );
}

// ============ TECH STACK ============
function TechStack() {
  const cats = [
    { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'] },
    { title: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'Django REST', 'FastAPI'] },
    { title: 'Bots & Apps', items: ['Telegram Bot API', 'Telegram Mini Apps', 'aiogram', 'Telegraf'] },
    { title: 'Database & Infra', items: ['PostgreSQL', 'Redis', 'Docker', 'VPS', 'Render', 'CI/CD'] },
    { title: 'Integrations', items: ['Stripe', 'OAuth', 'S3', 'Cloud Storage', 'Webhooks'] },
    { title: 'Tooling', items: ['Git', 'Linux', 'Nginx', 'Postman', 'Figma'] },
  ];

  // Orbital labels
  const orbital = {
    r1: ['React', 'Node', 'Python'],
    r2: ['Next.js', 'aiogram', 'Postgres', 'Redis'],
    r3: ['NestJS', 'Tailwind', 'Docker', 'Stripe', 'TG API'],
  };

  const place = (items, radius) => items.map((label, i) => {
    const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    return (
      <div key={label} className="tech-orbit-icon" style={{
        transform: `translate(${x}px, ${y}px)`,
      }}>{label}</div>
    );
  });

  return (
    <section id="stack">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Stack</span>
          <h2 className="h-section">An <em>orbital system</em> of tools<br/>that gets things shipped.</h2>
        </Reveal>

        <div className="stack-grid">
          <Reveal>
            <div className="tech-orbit">
              <div className="tech-orbit-ring tech-orbit-r1"/>
              <div className="tech-orbit-ring tech-orbit-r2"/>
              <div className="tech-orbit-ring tech-orbit-r3"/>
              <div className="tech-orbit-core">
                CORE<br/><span style={{color: 'var(--purple-soft)'}}>v.26</span>
              </div>
              {place(orbital.r1, 90)}
              {place(orbital.r2, 150)}
              {place(orbital.r3, 210)}
            </div>
          </Reveal>

          <div className="cards-grid" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
            {cats.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="glass glass-hover tech-cat">
                  <div className="tech-cat-title">{c.title}</div>
                  <div className="tech-cat-list">
                    {c.items.map(it => <span key={it} className="chip">{it}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
function Services() {
  const services = [
    { id: 'TG_BOT',    title: 'Telegram Bot System', caps: ['payments', 'admin panel', 'webhooks', 'automation'], price: 'from $1.2k', icon: '◍' },
    { id: 'MINI_APP',  title: 'Telegram Mini App',   caps: ['onboarding', 'commerce', 'internal tools', 'auth'], price: 'from $1.8k', icon: '◫' },
    { id: 'WEB_APP',   title: 'Full-stack Web App',  caps: ['SaaS dashboards', 'billing', 'auth', 'analytics'],  price: 'from $2.5k', icon: '⌘' },
    { id: 'PAY_SYS',   title: 'Payment / Order System', caps: ['Stripe', 'manual verify', 'multi-currency', 'receipts'], price: 'from $1.5k', icon: '⊞' },
    { id: 'ADMIN',     title: 'Admin Panel Module',  caps: ['orders', 'users', 'content', 'roles & access'],     price: 'from $900',  icon: '▤' },
    { id: 'API_CORE',  title: 'Backend API Core',    caps: ['REST', 'WebSocket', 'queues', 'caching'],          price: 'from $1.4k', icon: '◍' },
    { id: 'AUTO_FX',   title: 'Automation / Scripts',caps: ['scrapers', 'integrations', 'cron', 'workflows'],   price: 'from $600',  icon: '↻' },
    { id: 'MVP_PROD',  title: 'Product MVP Build',   caps: ['discovery', 'design', 'ship in weeks', 'iterate'], price: 'on request', icon: '✦' },
  ];
  return (
    <section id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Services</span>
          <h2 className="h-section">Modules you can<br/><em>plug into your product.</em></h2>
        </Reveal>
        <div className="cards-grid cards-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div className="glass glass-hover module-card">
                <div className="module-head">
                  <div className="service-icon" style={{fontSize: 18, color: '#fff', width: 36, height: 36}}>{s.icon}</div>
                  <span className="module-status">▣ available</span>
                </div>
                <div>
                  <div className="module-id">MOD_{String(i+1).padStart(2,'0')} · {s.id}</div>
                  <div className="module-title" style={{marginTop: 6}}>{s.title}</div>
                </div>
                <div>
                  <div className="module-caps-label">{'>'} capabilities</div>
                  <ul className="module-caps" style={{paddingLeft: 0, margin: '8px 0 0'}}>
                    {s.caps.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div className="module-foot">
                  <span>{s.price}</span>
                  <span style={{color: 'var(--purple-soft)'}}>install →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PROCESS ============
function Process() {
  const steps = [
    ['01', 'Discovery', 'Understand the goal, users, constraints.'],
    ['02', 'Structure', 'Define product scope and information arch.'],
    ['01', 'UI / UX', 'Wireframes, hi-fi design, prototype.'],
    ['04', 'Develop', 'Frontend, backend, integrations.'],
    ['05', 'Testing', 'Manual, automated, edge-case checks.'],
    ['06', 'Launch', 'Deploy, monitor, document.'],
    ['07', 'Support', 'Improvements, scaling, new features.'],
  ];
  return (
    <section id="process">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Process</span>
          <h2 className="h-section">A <em>workflow</em> battle-tested<br/>in production.</h2>
        </Reveal>
        <div className="process">
          {steps.map(([n, label, desc], i) => (
            <Reveal key={`p${i}`} delay={i * 70}>
              <div className="glass glass-hover process-step">
                <div className="num">{n}</div>
                <div className="label">{label}</div>
                <div className="desc">{desc}</div>
                <div className="node"/>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ EXPERIENCE ============
function Experience() {
  const items = [
    {
      date: '2024 — Now',
      tag: 'Independent',
      title: 'Product Builder · Full-stack Developer',
      desc: 'Designing and shipping commercial Telegram bots, Mini Apps, and SaaS-style web platforms. Working solo or with small teams across procurement, gaming and payments.',
    },
    {
      date: '2023 — 2024',
      tag: 'Telegram Native',
      title: 'Product Builder · Full-stack Developer',
      desc: 'Designing and shipping commercial Telegram bots, Mini Apps, and SaaS-style web platforms. Working solo or with small teams across procurement, gaming and payments.',
    },
    {
      date: '2022 — 2023',
      tag: 'Payments',
      title: 'Payment Systems Engineer',
      desc: 'Implemented end-to-end payment flows: Stripe integration, manual verification, currency switching, receipts and admin reconciliation tooling.',
    },
    {
      date: 'Earlier',
      tag: 'Background',
      title: 'Procurement & Contract Consulting',
      desc: 'Years of consulting on procurement processes and commercial contracts — informs how I think about workflows, edge cases and stakeholders.',
    },
  ];
  return (
    <section id="experience">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="h-section">A path through <em>products,<br/>payments & people.</em></h2>
        </Reveal>
        <div className="glass" style={{padding: '8px 32px'}}>
          {items.map((x, i) => (
            <Reveal key={`x${i}`} delay={i * 80}>
              <div className="xp-item">
                <div>
                  <div className="xp-date">{x.date}</div>
                  <span className="xp-tag mono">{x.tag}</span>
                </div>
                <div>
                  <div className="xp-title">{x.title}</div>
                  <div className="xp-desc">{x.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ RESUME ============
function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <div className="resume-grid">
          <Reveal>
            <span className="eyebrow">Resume</span>
            <h2 className="h-section" style={{marginTop: 14}}>
              Resume &<br/><em>professional profile.</em>
            </h2>
            <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 460, marginTop: 22}}>
              Download my CV or browse my professional background, technical skills
              and selected projects. Open to freelance, contract and product partnerships.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28}}>
              <a className="btn btn-primary" href="#"><DownloadIcon /> Download CV</a>
              <a className="btn btn-glass" href="#">LinkedIn ↗</a>
              <a className="btn btn-glass" href="#">GitHub ↗</a>
              <a className="btn btn-glass" href="#">Telegram ↗</a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="cv-mock">
              <div className="cv-glow" />
              <div className="cv-doc">
                <div className="cv-name">Curriculum Vitae</div>
                <div className="cv-role">Product Developer · Full-stack</div>
                <div className="cv-section-title">Profile</div>
                <div className="cv-line mid"></div>
                <div className="cv-line short"></div>
                <div className="cv-section-title">Selected Work</div>
                <div className="cv-line"></div>
                <div className="cv-line mid"></div>
                <div className="cv-line short"></div>
                <div className="cv-section-title">Stack</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6}}>
                  {['React','Next.js','Node.js','Python','aiogram','Postgres','Redis','Docker'].map(t => (
                    <span key={t} style={{
                      padding: '2px 8px', fontSize: 9,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: 'rgba(42,29,94,0.08)', border: '1px solid rgba(42,29,94,0.2)',
                      borderRadius: 999, color: '#2A1D5E'
                    }}>{t}</span>
                  ))}
                </div>
                <div className="cv-section-title">Contact</div>
                <div className="cv-line short"></div>
                <div style={{
                  position: 'absolute', bottom: 22, right: 22,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: '#6B5FA1'
                }}>v.2026 / 4 pages</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

// ============ CONTACT ============
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  const links = [
    ['Telegram', '@shx_dev', 'tg', '↗'],
    ['Email', 'hello@shx.dev', 'mail', '✉'],
    ['GitHub', 'github.com/shx-dev', 'gh', '⌘'],
    ['LinkedIn', 'linkedin.com/in/shx', 'in', '◫'],
  ];

  return (
    <section id="contact">
      <div className="container">
        <Reveal className="section-head" style={{textAlign: 'center', maxWidth: 720, margin: '0 auto 56px'}}>
          <span className="eyebrow">Contact</span>
          <h2 className="h-section">
            Let's build something <em>powerful.</em>
          </h2>
          <p style={{fontSize: 17, lineHeight: 1.5, color: 'var(--text-2)', textAlign: 'center', margin: '14px auto 0', maxWidth: 540}}>
            Have an idea, project or startup concept? Let's turn it into a working product.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div className="glass contact-side glass-hover" style={{transitionDuration: '0.4s'}}>
              <div className="eyebrow">— Direct channels</div>
              {links.map(([label, handle, k, ic]) => (
                <a key={k} href="#" className="contact-link">
                  <div className="contact-link-icon" style={{fontSize: 16}}>{ic}</div>
                  <div style={{flex: 1}}>
                    <div className="contact-link-meta">{label.toUpperCase()}</div>
                    <div className="contact-link-handle">{handle}</div>
                  </div>
                  <span style={{color: 'var(--text-3)', fontSize: 18}}>↗</span>
                </a>
              ))}
              <div style={{
                marginTop: 12, padding: '14px 16px',
                borderRadius: 12,
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.18)',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
                color: '#86efac', display: 'flex', alignItems: 'center', gap: 10
              }}>
                <span className="status-dot"/>
                Currently accepting projects · Reply within 24h
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="glass contact-form" onSubmit={submit}>
              <div className="input-wrap">
                <label>Your name</label>
                <input className="input" placeholder="Jane Cosmos"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="input-wrap">
                <label>Email or Telegram</label>
                <input className="input" placeholder="jane@cosmos.io  /  @jane"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="input-wrap">
                <label>About the project</label>
                <textarea className="textarea" placeholder="Tell me about what you want to build…"
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})}/>
              </div>
              <button type="submit" className="btn btn-primary" style={{justifyContent: 'center'}} disabled={sent}>
                {sent ? '✓ Message sent' : 'Send Message'}
                {!sent && <ArrowIcon/>}
              </button>
              <div className="mono" style={{fontSize: 11, color: 'var(--text-3)', textAlign: 'center'}}>
                — Or just say hi on Telegram. I read everything.
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="container foot">
      <div>shx.dev — built solo · 2026</div>
      <div style={{display: 'flex', gap: 18}}>
        <a href="#">tg</a>
        <a href="#">gh</a>
        <a href="#">in</a>
        <a href="#">mail</a>
      </div>
      <div>↑ back to top</div>
    </footer>
  );
}

Object.assign(window, {
  Reveal, Nav, Hero, About, Projects, TechStack, Services, Process, Experience, Resume, Contact, Footer
});
