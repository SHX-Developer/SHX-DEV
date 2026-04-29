// Hero 3D glass orb scene + particles + tech icons
const { useEffect, useRef, useState } = React;

// ----------- Cosmic Particles canvas -----------
function ParticlesBg({ density = 1, speed = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let raf, w, h, dpr, stars = [], shooting = [];
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const N = Math.floor(w * h / 9000 * density);
      stars = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * 0.7 + 0.3,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.02 + 0.005,
        hue: Math.random() < 0.18 ? 'b' : Math.random() < 0.1 ? 'p' : 'w',
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = (t) => {
      ctx.clearRect(0, 0, w, h);
      // Stars
      for (const s of stars) {
        s.tw += s.tws;
        const a = (Math.sin(s.tw) * 0.5 + 0.5) * s.z;
        const c = s.hue === 'b' ? `rgba(160,210,255,${a})` :
                  s.hue === 'p' ? `rgba(190,160,255,${a})` :
                                  `rgba(255,255,255,${a * 0.9})`;
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
        // Drift
        s.y += 0.02 * s.z * speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
      }
      // Occasional shooting star
      if (Math.random() < 0.003) {
        shooting.push({
          x: Math.random() * w, y: Math.random() * h * 0.5,
          vx: 4 + Math.random() * 3, vy: 1 + Math.random() * 1.5,
          life: 1
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.x += s.vx; s.y += s.vy; s.life -= 0.01;
        if (s.life <= 0 || s.x > w || s.y > h) { shooting.splice(i, 1); continue; }
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density, speed]);
  return <canvas ref={ref} className="particles-canvas" aria-hidden="true" />;
}

// ----------- Hero glass orb 3D-ish -----------
function GlassOrb({ size = 360, mouseX = 0, mouseY = 0 }) {
  // Mouse-driven tilt
  const tx = mouseX * 12;
  const ty = -mouseY * 12;

  return (
    <div className="orb-wrap" style={{ width: size, height: size, transform: `rotateY(${tx}deg) rotateX(${ty}deg)` }}>
      {/* outer glow */}
      <div className="orb-glow" />
      {/* rings */}
      <svg className="orb-ring orb-ring-1" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <linearGradient id="rg1" x1="0" x2="1">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="200" rx="195" ry="55" fill="none" stroke="url(#rg1)" strokeWidth="1.2" />
      </svg>
      <svg className="orb-ring orb-ring-2" viewBox="0 0 400 400" aria-hidden="true">
        <ellipse cx="200" cy="200" rx="190" ry="80" fill="none" stroke="rgba(167,139,250,0.35)" strokeWidth="1" strokeDasharray="3 6" />
      </svg>
      <svg className="orb-ring orb-ring-3" viewBox="0 0 400 400" aria-hidden="true">
        <ellipse cx="200" cy="200" rx="180" ry="35" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />
      </svg>

      {/* core glass sphere */}
      <div className="orb-core">
        <div className="orb-core-highlight" />
        <div className="orb-core-glow" />
        <div className="orb-core-grid" />
        <div className="orb-core-shine" />
      </div>

      {/* floating tech icons orbiting */}
      <FloatingIcon label="React" angle={20} radius={size * 0.58} delay={0}>
        <ReactIcon />
      </FloatingIcon>
      <FloatingIcon label="Telegram" angle={95} radius={size * 0.62} delay={2}>
        <TelegramIcon />
      </FloatingIcon>
      <FloatingIcon label="Node" angle={170} radius={size * 0.58} delay={4}>
        <NodeIcon />
      </FloatingIcon>
      <FloatingIcon label="Python" angle={245} radius={size * 0.62} delay={6}>
        <PythonIcon />
      </FloatingIcon>
      <FloatingIcon label="Postgres" angle={310} radius={size * 0.58} delay={8}>
        <PgIcon />
      </FloatingIcon>
      <FloatingIcon label="Docker" angle={350} radius={size * 0.55} delay={10}>
        <DockerIcon />
      </FloatingIcon>
    </div>
  );
}

function FloatingIcon({ children, angle, radius, delay, label }) {
  const a = (angle * Math.PI) / 180;
  const x = Math.cos(a) * radius;
  const y = Math.sin(a) * radius * 0.55;
  return (
    <div
      className="float-icon"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        animationDelay: `${delay}s`,
      }}
      aria-label={label}
    >
      <div className="float-icon-inner">
        {children}
      </div>
    </div>
  );
}

// Tech icon SVGs (originals)
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7DD3FC" strokeWidth="1.4">
    <circle cx="12" cy="12" r="2" fill="#7DD3FC" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7DD3FC" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
    <path d="M21 4 2.8 11.4l5.6 1.8 2 6 3.4-3.6 5.4 4z" />
    <path d="m8.4 13.2 7-5.4-5.6 6.6" />
  </svg>
);
const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#A7F3D0" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M12 2 3 7v10l9 5 9-5V7z" />
    <path d="M9 9.5v5c0 1.1.9 2 2 2s2-.9 2-2v-5" opacity="0.7"/>
    <path d="M15 9.5h2c.6 0 1 .4 1 1 0 .6-.4 1-1 1h-1c-.6 0-1 .4-1 1 0 .6.4 1 1 1h2" opacity="0.7"/>
  </svg>
);
const PythonIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FCD34D" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M9 4h6c1.7 0 3 1.3 3 3v3H10c-1.7 0-3 1.3-3 3v3H6c-1.7 0-3-1.3-3-3v-3c0-1.7 1.3-3 3-3h6V6H9z"/>
    <circle cx="9" cy="6.5" r=".7" fill="#FCD34D"/>
  </svg>
);
const PgIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#93C5FD" strokeWidth="1.4">
    <ellipse cx="12" cy="5.5" rx="8" ry="2.5"/>
    <path d="M4 5.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6"/>
    <path d="M4 11.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6"/>
  </svg>
);
const DockerIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7DD3FC" strokeWidth="1.4">
    <rect x="3" y="11" width="3" height="3"/>
    <rect x="7" y="11" width="3" height="3"/>
    <rect x="11" y="11" width="3" height="3"/>
    <rect x="7" y="7" width="3" height="3"/>
    <rect x="11" y="7" width="3" height="3"/>
    <rect x="11" y="3" width="3" height="3"/>
    <path d="M2 15c2 4 7 5 12 4 4-1 6-3 7-7-1 0-2 0-3 1"/>
  </svg>
);

window.ParticlesBg = ParticlesBg;
window.GlassOrb = GlassOrb;
