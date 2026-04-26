import { useEffect, useState } from 'react'

// Developer Core System scene — interactive ringed orb behind the hero.
export default function CoreSystem({ size = 520, mouseX = 0, mouseY = 0 }) {
  const [hovered, setHovered] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const loop = (t) => {
      setTick((t - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const tx = mouseX * 8
  const ty = -mouseY * 8

  const rings = [
    { r: size * 0.22, speed: 0.18, tilt: 12, items: [
      { id: 'react',  label: 'React' },
      { id: 'node',   label: 'Node' },
      { id: 'python', label: 'Python' },
    ] },
    { r: size * 0.34, speed: -0.10, tilt: -8, items: [
      { id: 'tg',     label: 'Telegram' },
      { id: 'pg',     label: 'Postgres' },
      { id: 'redis',  label: 'Redis' },
      { id: 'docker', label: 'Docker' },
    ] },
    { r: size * 0.46, speed: 0.06, tilt: 6, items: [
      { id: 'pay',    label: 'Payments' },
      { id: 'auth',   label: 'OAuth' },
      { id: 'api',    label: 'REST API' },
      { id: 'mini',   label: 'Mini App' },
      { id: 'admin',  label: 'Admin' },
    ] },
  ]

  const placed = []
  rings.forEach((ring, ri) => {
    const n = ring.items.length
    const baseRot = tick * ring.speed
    ring.items.forEach((it, i) => {
      const angle = baseRot + (i / n) * Math.PI * 2
      const x = Math.cos(angle) * ring.r
      const y = Math.sin(angle) * ring.r * Math.cos((ring.tilt * Math.PI) / 180)
      placed.push({ ...it, x, y, ring: ri })
    })
  })

  return (
    <div className="core-wrap" style={{ width: size, height: size, transform: `rotateY(${tx}deg) rotateX(${ty}deg)` }}>
      <div className="core-bg-grid" />
      <div className="core-bg-glow" />

      <CornerCross />

      <div className="core-hud core-hud-tl">
        <div className="hud-row">SYS / CORE_v2.6</div>
        <div className="hud-row dim">UPTIME 1284d</div>
      </div>
      <div className="core-hud core-hud-tr">
        <div className="hud-row" style={{ textAlign: 'right' }}>
          <span style={{ color: '#86efac' }}>●</span> ONLINE
        </div>
        <div className="hud-row dim" style={{ textAlign: 'right' }}>LAT 42ms</div>
      </div>
      <div className="core-hud core-hud-bl">
        <div className="hud-row dim">NODES {placed.length}</div>
      </div>
      <div className="core-hud core-hud-br">
        <div className="hud-row dim" style={{ textAlign: 'right' }}>
          {hovered ? `→ ${placed.find((p) => p.id === hovered)?.label.toUpperCase()}` : 'IDLE'}
        </div>
      </div>

      <svg className="core-svg" viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}>
        <defs>
          <radialGradient id="coreGrad" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#5B21B6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0A0617" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx="0" cy="0"
            rx={r.r}
            ry={r.r * Math.cos((r.tilt * Math.PI) / 180) * 0.95}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth={i === 0 ? 0.8 : 0.6}
            strokeDasharray={i === 1 ? '2 6' : 'none'}
            opacity={hovered ? 0.4 : 0.7}
            style={{ transition: 'opacity 0.4s ease' }}
          />
        ))}

        {hovered && (() => {
          const n = placed.find((p) => p.id === hovered)
          if (!n) return null
          return (
            <g>
              <line x1="0" y1="0" x2={n.x} y2={n.y}
                stroke="#A78BFA" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
              <line x1="0" y1="0" x2={n.x} y2={n.y}
                stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            </g>
          )
        })()}

        <circle cx="0" cy="0" r={size * 0.085} fill="url(#coreGrad)" />
        <circle cx="0" cy="0" r={size * 0.085} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="0" cy="0" r={size * 0.115} fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="0.4" />
        <circle cx="0" cy="0" r={size * 0.135} fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="0.3" strokeDasharray="1 3" />
      </svg>

      <div className="core-label">
        <div className="core-label-mono">DEV.CORE</div>
        <div className="core-label-name">shx</div>
      </div>

      {placed.map((n) => (
        <CoreNode
          key={n.id}
          {...n}
          active={hovered === n.id}
          onEnter={() => setHovered(n.id)}
          onLeave={() => setHovered(null)}
        />
      ))}

      {hovered && (() => {
        const n = placed.find((p) => p.id === hovered)
        if (!n) return null
        return (
          <div className="core-tooltip" style={{ left: `calc(50% + ${n.x}px)`, top: `calc(50% + ${n.y}px)` }}>
            {n.label.toUpperCase()}
            <div className="core-tooltip-row">RING_{n.ring + 1} · NODE_{n.id}</div>
          </div>
        )
      })()}

      <div className="core-scan" />
    </div>
  )
}

function CoreNode({ x, y, label, active, onEnter, onLeave }) {
  return (
    <button
      type="button"
      className={`core-node ${active ? 'is-active' : ''}`}
      style={{
        transform: `translate(calc(50% + ${x}px - 50%), calc(50% + ${y}px - 50%))`,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={label}
    >
      <span className="core-node-dot" />
      <span className="core-node-lbl">{label}</span>
    </button>
  )
}

function CornerCross() {
  return (
    <>
      <span className="cross-c cross-tl" />
      <span className="cross-c cross-tr" />
      <span className="cross-c cross-bl" />
      <span className="cross-c cross-br" />
    </>
  )
}
