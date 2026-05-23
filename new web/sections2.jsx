/* Sections part 2: Services, Terminal, Skills, Reviews, DataCore, Contact, Footer */

/* ============ SERVICES — MISSIONS ============ */
function Services() {
  const missions = [
    { code: 'M-01', name: 'Telegram Bots', desc: 'Bots that scale: payments, scheduling, broadcasts, mini-apps. From MVP to 100k users.', tags: ['Bot API', 'Mini Apps', 'Webhooks'] },
    { code: 'M-02', name: 'Admin Panels', desc: 'CRUDs your team actually wants to open. Tables, auth, audit logs, role permissions, exports.', tags: ['React', 'Postgres', 'Auth'] },
    { code: 'M-03', name: 'Fullstack Apps', desc: 'End-to-end product builds. Database, API, UI, deploy. Ready to demo in 4 weeks.', tags: ['Next.js', 'tRPC', 'Prisma'] },
    { code: 'M-04', name: 'Payment Systems', desc: 'Stripe, Mollie, crypto rails. Subscriptions, marketplaces, refunds, reconciliation, webhooks.', tags: ['Stripe', 'Mollie', 'Crypto'] },
    { code: 'M-05', name: 'UI / UX Design', desc: 'Hi-fi interfaces in Figma + React. Design systems, prototypes, motion. End-to-end with build.', tags: ['Figma', 'Tailwind', 'Motion'] },
    { code: 'M-06', name: 'Automation', desc: 'Long-running pipelines, scrapers, data ingestion, alerting. The plumbing that keeps the lights on.', tags: ['Cron', 'Queues', 'AI'] },
  ];
  return (
    <section id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>05 — SERVICES</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Available</span> <span className="ital">missions.</span></h2>
          </div>
          <p>Six things I'm reliably great at. Pick one — or combine them into a full product.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {missions.map((m, i) => (
            <div key={m.code} className="reveal glass mission-card" style={{ '--reveal-delay': `${i*60}ms`, padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--p-2)', letterSpacing: '0.16em' }}>{m.code}</span>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.arrowUR style={{ color: 'var(--p-2)' }} />
                </div>
              </div>
              <h4 style={{ fontSize: 22, marginBottom: 10 }}>{m.name}</h4>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.55, marginBottom: 18 }}>{m.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {m.tags.map(t => (
                  <span key={t} className="mono" style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--hairline)', color: 'var(--text-2)' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mission-card { transition: transform .3s, border-color .3s, box-shadow .3s; }
        .mission-card:hover { transform: translateY(-4px); border-color: rgba(168,85,247,0.4); box-shadow: 0 14px 50px rgba(168,85,247,0.15); }
        @media (max-width: 900px) {
          #services .grid[style*="repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #services .grid[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ LIVE TERMINAL ============ */
function Terminal() {
  const lines = [
    { prefix: '$ ', text: 'shx --status --verbose', cls: 'cmd' },
    { text: '↳ booting workspace...' },
    { text: '↳ loading neural modules [████████░░] 80%' },
    { text: '↳ loading neural modules [██████████] 100%', cls: 'ok' },
    { text: '↳ syncing telegram infrastructure (23 bots)' },
    { text: '↳ checking payment routes ········· OK', cls: 'ok' },
    { text: '↳ vector store cold start ·········· 142ms' },
    { text: '↳ deploying signal-desk@0.4.2 → prod' },
    { text: '↳ health: 99.97% / 30d · last incident 41d ago', cls: 'ok' },
    { prefix: '$ ', text: 'shx --available-for-hire', cls: 'cmd' },
    { text: '> true', cls: 'highlight' },
  ];

  return (
    <section id="terminal" style={{ paddingTop: 80, paddingBottom: 140 }}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>06 — LIVE</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Console</span> <span className="ital">output.</span></h2>
          </div>
          <p>Snapshot from the bridge. Real systems, real status — refreshed when the page loads.</p>
        </div>

        <div className="reveal glass" style={{ padding: 0, overflow: 'hidden', maxWidth: 880, margin: '0 auto' }}>
          {/* Window chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 18px',
            borderBottom: '1px solid var(--hairline)',
            background: 'rgba(255,255,255,0.025)',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }}></span>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }}></span>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }}></span>
            </div>
            <span className="mono dim" style={{ fontSize: 12, marginLeft: 12 }}>shx@reality — zsh</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--p-2)' }}>● connected</span>
          </div>
          <Typewriter lines={lines} speed={28} lineDelay={140} />
        </div>

        {/* Live stats strip */}
        <div className="reveal" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
          {[
            ['Active deploys', '12'],
            ['Bots online', '23'],
            ['Avg p95 / API', '78ms'],
            ['Coffee today', '∞'],
          ].map(([k, v]) => (
            <div key={k} className="glass" style={{ padding: '16px 18px' }}>
              <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, marginTop: 6, color: 'var(--p-2)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .term-body {
          font-family: var(--font-mono);
          font-size: 13.5px;
          line-height: 1.7;
          padding: 22px 24px;
          color: var(--text-1);
          min-height: 280px;
        }
        .term-line { white-space: pre-wrap; }
        .term-prefix { color: var(--p-2); margin-right: 4px; }
        .term-line.cmd { color: var(--text-0); }
        .term-line.ok { color: #7ee0a1; }
        .term-line.highlight { color: var(--p-2); font-weight: 600; font-size: 15px; padding-top: 4px; }
        .term-cursor { color: var(--p-2); animation: blink 1s steps(1) infinite; margin-left: 2px; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 700px) {
          #terminal .reveal[style*="grid-template-columns"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ SKILLS VIZ — energy bars / modules ============ */
function Skills() {
  const groups = [
    {
      label: 'Engineering',
      items: [
        { k: 'TypeScript / React', v: 95 },
        { k: 'Node / Backend', v: 92 },
        { k: 'Postgres / Schema design', v: 88 },
        { k: 'Infra / Linux / Docker', v: 80 },
      ],
    },
    {
      label: 'Product',
      items: [
        { k: 'UI / Interaction design', v: 86 },
        { k: 'Copywriting', v: 78 },
        { k: 'AI prompting / pipelines', v: 84 },
        { k: 'Client comms', v: 90 },
      ],
    },
  ];
  return (
    <section id="skills" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>07 — CAPABILITY</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Energy</span> <span className="ital">distribution.</span></h2>
          </div>
          <p>An honest reading. Bars charge as they enter the viewport.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {groups.map(g => (
            <div key={g.label} className="reveal glass" style={{ padding: 28 }}>
              <h4 style={{ fontSize: 14, fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--p-2)', marginBottom: 22 }}>{g.label}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {g.items.map(it => <EnergyBar key={it.k} item={it} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #skills .grid[style*="repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function EnergyBar({ item }) {
  const ref = uR(null);
  const [v, setV] = uS(0);
  uE(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => setV(item.v), 100); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const cells = 20;
  const filled = Math.round((v / 100) * cells);
  return (
    <div ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>{item.k}</span>
        <span className="mono dim" style={{ fontSize: 12 }}>{v.toString().padStart(2,'0')}<span style={{ color: 'var(--text-3)' }}>/100</span></span>
      </div>
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: cells }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 14, borderRadius: 2,
            background: i < filled
              ? `linear-gradient(180deg, hsl(${270 + i*1.5}, 90%, 70%), hsl(${265 + i*1.5}, 85%, 55%))`
              : 'rgba(255,255,255,0.04)',
            boxShadow: i < filled ? `0 0 8px hsla(${270 + i*1.5}, 90%, 60%, 0.5)` : 'none',
            transition: `background .6s ${i*30}ms, box-shadow .6s ${i*30}ms`,
          }}></div>
        ))}
      </div>
    </div>
  );
}

/* ============ REVIEWS ============ */
function Reviews() {
  const reviews = [
    { quote: "shx shipped our entire payment stack solo in three weeks. Stripe, refunds, reconciliation, the dashboard — all of it. We've been live for fourteen months. Zero outages.", who: 'Maya R.', role: 'Founder · Vellum Studios' },
    { quote: "He cares about the boring details. Migrations, retries, what happens at 3am when something breaks. Most contractors don't. He's the rare one.", who: 'Daniil P.', role: 'CTO · Pinepost' },
    { quote: "We hired shx to build an admin panel for our ops team. Six weeks later he'd turned it into the system the company runs on. Best money we ever spent.", who: 'Lena O.', role: 'Head of Ops · Cargolink' },
  ];
  return (
    <section id="reviews" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>08 — TRANSMISSIONS</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Words from</span> <span className="ital">other observers.</span></h2>
          </div>
          <p>Signals received from the people who paid me to build the things above.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {reviews.map((r, i) => (
            <div key={r.who} className="reveal glass review-card" style={{ '--reveal-delay': `${i*80}ms`, padding: 28 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 0.4, color: 'var(--p-2)', opacity: 0.6, marginBottom: 10, height: 18 }}>"</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-0)', marginBottom: 22 }}>{r.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--hairline)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${260+i*15}, 85%, 65%), hsl(${280+i*10}, 80%, 50%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'white' }}>{r.who[0]}</div>
                <div>
                  <div style={{ fontSize: 14 }}>{r.who}</div>
                  <div className="mono dim" style={{ fontSize: 11 }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .review-card { transition: transform 6s ease-in-out, border-color .3s; animation: float 8s ease-in-out infinite; }
        .review-card:nth-child(2) { animation-delay: -2s; }
        .review-card:nth-child(3) { animation-delay: -4s; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .review-card:hover { border-color: rgba(168,85,247,0.35); }
        body.no-motion .review-card { animation: none; }
        @media (max-width: 900px) { #reviews .grid[style*="repeat(3"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ============ DATA CORE / RESUME ============ */
function DataCore() {
  return (
    <section id="resume" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>09 — DATA CORE</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Download</span> <span className="ital">my data core.</span></h2>
          </div>
          <p>The compressed version of me. Education, experience, languages, achievements — one file.</p>
        </div>

        <div className="reveal glass" style={{ padding: 36, position: 'relative', overflow: 'hidden' }}>
          {/* glow blob */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)', pointerEvents: 'none' }}></div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 32, position: 'relative' }}>
            <CoreColumn title="Experience" items={[
              ['2024 → now', 'Studio of one — shx.dev'],
              ['2022 → 2024', 'Senior fullstack · Pinepost'],
              ['2020 → 2022', 'Product engineer · Vellum'],
              ['2019 → 2020', 'Freelance · misc.'],
            ]} />
            <CoreColumn title="Education" items={[
              ['2019', 'BSc Computer Science'],
              ['Self-taught', 'Distributed systems, design'],
              ['2023', 'Stripe Partner certification'],
            ]} />
            <CoreColumn title="Languages" items={[
              ['English', 'Fluent · C2'],
              ['Russian', 'Native'],
              ['Portuguese', 'Conversational · B2'],
              ['SQL', 'Mostly fluent'],
            ]} />
          </div>

          <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div>
              <div className="mono dim" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>file</div>
              <div className="mono" style={{ fontSize: 15, marginTop: 4 }}>shx_2026.pdf <span className="dim">· 184kb · updated 4d ago</span></div>
            </div>
            <a href="#" className="btn btn-primary"><Icon.download /> Download core</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #resume .grid[style*="1fr 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
function CoreColumn({ title, items }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--p-2)', marginBottom: 18 }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(([k,v]) => (
          <div key={k+v}>
            <div className="mono dim" style={{ fontSize: 11 }}>{k}</div>
            <div style={{ fontSize: 14.5, marginTop: 2, color: 'var(--text-0)' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ CONTACT — TRANSMIT SIGNAL ============ */
function Contact() {
  const [sent, setSent] = uS(false);
  const [sending, setSending] = uS(false);
  const [form, setForm] = uS({ from: '', topic: 'New project', msg: '' });

  const handleSend = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>10 — CONTACT</div>
            <h2 className="h-section"><span className="white" style={{ background: 'linear-gradient(180deg,#fff,#BDB5D1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Transmit</span> <span className="ital">a signal.</span></h2>
          </div>
          <p>Tell me what you're building. I read everything within 24 hours, usually less. No agencies, no recruiters.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'stretch' }}>
          {/* Console form */}
          <form onSubmit={handleSend} className="reveal glass" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--p-2)', letterSpacing: '0.16em' }}>OUTBOUND TRANSMISSION</span>
              <span style={{ flex: 1, height: 1, background: 'var(--hairline-strong)' }}></span>
              <span className="mono dim" style={{ fontSize: 11 }}>CHANNEL: shx.dev</span>
            </div>

            {sent ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontFamily: 'var(--font-serif)', color: 'var(--p-2)', marginBottom: 10 }}>✦</div>
                <h3 style={{ fontSize: 24, marginBottom: 8 }}>Signal received.</h3>
                <p className="muted" style={{ fontSize: 15 }}>I'll be back at you within 24h.</p>
              </div>
            ) : (
              <>
                <Field label="FROM" placeholder="you@domain.com" value={form.from} onChange={(v) => setForm({...form, from: v})} required type="email" />
                <Field label="TOPIC" select options={['New project','Existing system','Audit / review','Collaboration','Other']} value={form.topic} onChange={(v) => setForm({...form, topic: v})} />
                <Field label="PAYLOAD" textarea placeholder="What are you building? Constraints? Budget? Honesty welcome." value={form.msg} onChange={(v) => setForm({...form, msg: v})} required />
                <button type="submit" disabled={sending} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                  {sending ? <><span className="beam"></span> Transmitting...</> : <>Transmit signal <Icon.send /></>}
                </button>
              </>
            )}
          </form>

          {/* Direct lines */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ContactRow k="EMAIL" v="hello@shx.dev" copy />
            <ContactRow k="TELEGRAM" v="@shx" />
            <ContactRow k="GITHUB" v="github.com/shx" />
            <ContactRow k="SCHEDULE" v="cal.com/shx · 30 min" />

            <div className="glass" style={{ padding: 22, marginTop: 'auto' }}>
              <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: '0.16em' }}>NOW PLAYING</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: 'linear-gradient(135deg, #C084FC, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                    {[12,6,16,9].map((h,i) => <div key={i} style={{ width: 2, height: h, background: 'white', borderRadius: 1, animation: `eq 1.2s ${i*0.15}s ease-in-out infinite` }}></div>)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--text-0)' }}>Cosmic Drift — Vol. 03</div>
                  <div className="mono dim" style={{ fontSize: 11 }}>ambient · low-fi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .field {
          margin-bottom: 18px;
        }
        .field-label {
          font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em;
          color: var(--text-2); margin-bottom: 8px; text-transform: uppercase;
        }
        .field-input, .field-textarea, .field-select {
          width: 100%;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--hairline);
          border-radius: 10px;
          padding: 14px 16px;
          color: var(--text-0);
          font-family: var(--font-sans);
          font-size: 15px;
          transition: border-color .25s, box-shadow .25s, background .25s;
          outline: none;
        }
        .field-textarea { min-height: 130px; resize: vertical; font-family: var(--font-sans); }
        .field-input::placeholder, .field-textarea::placeholder { color: var(--text-3); }
        .field-input:focus, .field-textarea:focus, .field-select:focus {
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15), 0 0 30px rgba(168,85,247,0.15);
          background: rgba(255,255,255,0.04);
        }
        .field-select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--p-2) 50%), linear-gradient(135deg, var(--p-2) 50%, transparent 50%); background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%; background-size: 6px 6px, 6px 6px; background-repeat: no-repeat; padding-right: 38px; }
        .beam { display: inline-block; width: 16px; height: 2px; background: white; border-radius: 1px; animation: beam 1s linear infinite; box-shadow: 0 0 12px white; }
        @keyframes beam { 0% { transform: translateX(-8px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(8px); opacity: 0; } }
        @keyframes eq { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @media (max-width: 820px) {
          #contact .grid[style*="1.3fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type='text', textarea, select, options, required }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      {textarea ? (
        <textarea className="field-textarea" placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} required={required} />
      ) : select ? (
        <select className="field-select" value={value} onChange={(e)=>onChange(e.target.value)}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input className="field-input" type={type} placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} required={required} />
      )}
    </div>
  );
}

function ContactRow({ k, v, copy }) {
  const [copied, setCopied] = uS(false);
  const doCopy = () => {
    navigator.clipboard?.writeText(v);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="glass" style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: '0.16em' }}>{k}</div>
        <div className="mono" style={{ fontSize: 14, marginTop: 4 }}>{v}</div>
      </div>
      {copy && (
        <button onClick={doCopy} style={{ background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--text-1)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon.copy /> {copied ? 'COPIED' : 'COPY'}
        </button>
      )}
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer style={{ position: 'relative', padding: '80px 0 40px', overflow: 'hidden', borderTop: '1px solid var(--hairline)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 800px 400px at 50% 100%, rgba(168,85,247,0.15), transparent 60%)', pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 1,
            background: 'linear-gradient(180deg, var(--p-2), var(--p-3))',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            opacity: 0.9,
          }}>shx.dev</div>
          <div className="mono dim" style={{ fontSize: 11, letterSpacing: '0.24em', marginTop: 12, textTransform: 'uppercase' }}>
            building products that bend reality
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 28, borderTop: '1px solid var(--hairline)' }}>
          <div className="mono dim" style={{ fontSize: 12 }}>
            © 2026 shx.dev <span style={{ color: 'var(--text-3)' }}>· solo studio, Lisbon</span>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            {['Telegram','GitHub','X','Read.cv'].map(l => (
              <a key={l} href="#" className="mono dim" style={{ fontSize: 12, textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={(e)=>e.target.style.color='var(--p-2)'} onMouseLeave={(e)=>e.target.style.color=''}>{l}</a>
            ))}
          </div>
          <div className="mono dim" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7ee0a1', boxShadow: '0 0 8px #7ee0a1' }}></span>
            All systems nominal
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Services, Terminal, Skills, Reviews, DataCore, Contact, Footer });
