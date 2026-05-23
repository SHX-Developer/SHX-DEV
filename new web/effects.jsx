/* Shared effects + tiny hooks. Exposes to window. */
const { useEffect, useRef, useState, useMemo } = React;

/* Reveal-on-scroll observer */
function useReveal() {
  useEffect(() => {
    const check = () => {
      const els = document.querySelectorAll('.reveal:not(.in)');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        // If already in viewport at mount, reveal immediately
        if (r.top < vh && r.bottom > 0) {
          el.classList.add('in');
        } else {
          io.observe(el);
        }
      });
      return io;
    };
    const io = check();
    // Re-scan late in case sections mount after first paint
    const t1 = setTimeout(check, 400);
    // Safety net: anything left hidden after 2s, reveal
    const t2 = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    }, 2000);
    return () => { io && io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, []);
}

/* Mouse glow + parallax cursor tracking */
function useMouseGlow() {
  useEffect(() => {
    const el = document.getElementById('mouseGlow');
    if (!el) return;
    let tx = window.innerWidth/2, ty = window.innerHeight/2;
    let x = tx, y = ty;
    let raf = null;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      // Expose cursor for parallax
      document.documentElement.style.setProperty('--mx', (x/window.innerWidth - 0.5).toFixed(3));
      document.documentElement.style.setProperty('--my', (y/window.innerHeight - 0.5).toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
}

/* Particle / shooting star canvas */
function CosmicCanvas({ density = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, dpr;
    let stars = [];
    let shooters = [];
    let raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const N = Math.floor((w*h)/9000 * density);
      stars = Array.from({length: N}, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.2 + 0.2,
        a: Math.random()*0.6 + 0.2,
        v: Math.random()*0.4 + 0.1,
        tw: Math.random()*Math.PI*2,
        ts: Math.random()*0.04 + 0.005,
        purple: Math.random() < 0.18,
      }));
    };

    const spawnShooter = () => {
      if (shooters.length > 2) return;
      const startSide = Math.random() < 0.5;
      shooters.push({
        x: startSide ? -50 : w + 50,
        y: Math.random() * h * 0.6,
        vx: (startSide ? 1 : -1) * (6 + Math.random()*4),
        vy: 1 + Math.random()*2,
        life: 0,
        max: 60 + Math.random()*40,
      });
    };

    const draw = () => {
      ctx.clearRect(0,0,w,h);
      // stars
      for (const s of stars) {
        s.tw += s.ts;
        const a = s.a * (0.6 + 0.4*Math.sin(s.tw));
        ctx.beginPath();
        ctx.fillStyle = s.purple
          ? `rgba(192,132,252,${a})`
          : `rgba(255,255,255,${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
        // slow drift
        s.y += s.v * 0.05;
        if (s.y > h) { s.y = 0; s.x = Math.random()*w; }
      }
      // shooters
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.life++;
        sh.x += sh.vx; sh.y += sh.vy;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx*12, sh.y - sh.vy*12);
        grad.addColorStop(0, 'rgba(255,255,255,0.9)');
        grad.addColorStop(0.4, 'rgba(192,132,252,0.6)');
        grad.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx*12, sh.y - sh.vy*12);
        ctx.stroke();
        if (sh.life > sh.max || sh.x < -200 || sh.x > w+200) shooters.splice(i,1);
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => resize();
    resize();
    draw();
    const shootInt = setInterval(() => { if (Math.random() < 0.6) spawnShooter(); }, 2800);
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); clearInterval(shootInt); window.removeEventListener('resize', onResize); };
  }, [density]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

/* Count-up number */
function CountUp({ to, duration = 1800, suffix = '', prefix = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* Typewriter for terminal */
function Typewriter({ lines, speed = 30, lineDelay = 220, onDone }) {
  const [out, setOut] = useState([]);
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) started.current = true; });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started.current) {
      const id = setInterval(() => {
        if (started.current) { clearInterval(id); setLi(0); setCi(0); }
      }, 100);
      return () => clearInterval(id);
    }
    if (li >= lines.length) { onDone && onDone(); return; }
    const cur = lines[li];
    if (ci < cur.text.length) {
      const t = setTimeout(() => {
        setOut(prev => {
          const next = [...prev];
          next[li] = { ...cur, text: cur.text.slice(0, ci+1) };
          return next;
        });
        setCi(ci+1);
      }, cur.fast ? 6 : speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLi(li+1); setCi(0); }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [li, ci, started.current]);

  return (
    <div ref={ref} className="term-body">
      {out.map((l, i) => (
        <div key={i} className={`term-line ${l.cls || ''}`}>
          {l.prefix && <span className="term-prefix">{l.prefix}</span>}
          <span>{l.text}</span>
        </div>
      ))}
      {started.current && li < lines.length && <span className="term-cursor">▊</span>}
    </div>
  );
}

/* Tiny SVG icon set — minimal glyphs, no detailed brand SVGs */
const Icon = {
  arrow: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowUR: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  spark: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v6m0 6v6m9-9h-6m-6 0H3m13.5-6.5L15 7m-6 10l-1.5 1.5M16.5 17.5L15 16m-6-10L7.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  copy: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2"/></svg>,
  send: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  download: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

Object.assign(window, { useReveal, useMouseGlow, CosmicCanvas, CountUp, Typewriter, Icon });
