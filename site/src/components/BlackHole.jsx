import { useEffect, useRef } from 'react'

export default function BlackHole({ height = 600 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let heightPx = 0
    let dpr = 1
    let lastFrame = 0
    let smokeBands = []
    let dustBands = []
    const frameInterval = 1000 / 24

    const makeSprite = (size, inner, outer) => {
      const sprite = document.createElement('canvas')
      sprite.width = size
      sprite.height = size
      const spriteCtx = sprite.getContext('2d')
      const gradient = spriteCtx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, inner)
      gradient.addColorStop(0.42, outer)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      spriteCtx.fillStyle = gradient
      spriteCtx.fillRect(0, 0, size, size)
      return sprite
    }

    const smokeSprite = makeSprite(96, 'rgba(205,158,255,0.18)', 'rgba(124,58,237,0.08)')
    const hotSprite = makeSprite(48, 'rgba(255,245,222,0.8)', 'rgba(232,121,249,0.18)')

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = canvas.clientWidth
      heightPx = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = heightPx * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      smokeBands = Array.from({ length: 128 }, (_, index) => ({
        angle: Math.random() * Math.PI * 2,
        radius: 260 + (index % 4) * 34 + (Math.random() - 0.5) * 24,
        speed: 0.0015 + Math.random() * 0.0022,
        size: 34 + Math.random() * 72,
        alpha: 0.14 + Math.random() * 0.26,
        tilt: 0.135 + Math.random() * 0.055,
        wobble: Math.random() * Math.PI * 2,
        band: Math.random() < 0.58 ? 'front' : 'back',
      }))

      dustBands = Array.from({ length: 320 }, (_, index) => ({
        angle: Math.random() * Math.PI * 2,
        radius: 230 + (index % 5) * 35 + (Math.random() - 0.5) * 18,
        speed: 0.0045 + Math.random() * 0.009,
        size: 0.35 + Math.random() * 1.35,
        alpha: 0.18 + Math.random() * 0.58,
        tilt: 0.125 + Math.random() * 0.06,
        lane: Math.random() < 0.68 ? 'front' : 'back',
      }))
    }

    const drawOrbitalSprite = (cx, cy, item, sprite) => {
      item.angle += item.speed
      item.wobble += 0.006
      const wobble = Math.sin(item.wobble) * 8
      const x = cx + Math.cos(item.angle) * (item.radius + wobble)
      const y = cy + Math.sin(item.angle) * item.radius * item.tilt
      const front = Math.sin(item.angle) > 0
      const inLane = item.band === 'front' ? front : !front
      const size = item.size * (front ? 1.18 : 0.72)

      ctx.globalAlpha = item.alpha * (inLane ? 1 : 0.24)
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size)
    }

    const drawDust = (cx, cy, item) => {
      item.angle += item.speed
      const x = cx + Math.cos(item.angle) * item.radius
      const y = cy + Math.sin(item.angle) * item.radius * item.tilt
      const front = Math.sin(item.angle) > 0
      const inLane = item.lane === 'front' ? front : !front
      const hot = Math.cos(item.angle) < -0.1
      const alpha = item.alpha * (inLane ? 1 : 0.18)

      ctx.globalAlpha = alpha
      ctx.fillStyle = hot ? '#fff1c7' : '#d8b4fe'
      ctx.beginPath()
      ctx.arc(x, y, item.size * (front ? 1.25 : 0.8), 0, Math.PI * 2)
      ctx.fill()

      if (hot && front) {
        const glow = item.size * 11
        ctx.globalAlpha = alpha * 0.32
        ctx.drawImage(hotSprite, x - glow / 2, y - glow / 2, glow, glow)
      }
    }

    const tick = (time) => {
      raf = requestAnimationFrame(tick)
      if (time - lastFrame < frameInterval) return
      lastFrame = time

      ctx.clearRect(0, 0, width, heightPx)
      const cx = width / 2
      const cy = heightPx * 0.545

      ctx.globalCompositeOperation = 'lighter'
      for (const item of smokeBands) drawOrbitalSprite(cx, cy, item, smokeSprite)
      for (const item of dustBands) drawDust(cx, cy, item)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="bh-wrap bh-cinematic" style={{ width: 'min(1160px, 118vw)', maxWidth: '100%', height }}>
      <div className="bh-space-fog" />
      <div className="bh-depth-shadow" />
      <canvas ref={canvasRef} className="bh-matter-canvas" aria-hidden="true" />

      <div className="blackhole" aria-hidden="true">
        <div className="bh-atmosphere" />
        <div className="bh-disk bh-disk-back" />
        <div className="bh-disk-smoke bh-disk-smoke-back" />
        <div className="bh-disk bh-disk-bloom" />
        <div className="bh-lens bh-lens-wide" />
        <div className="bh-lens bh-lens-hot" />
        <div className="bh-disk-smoke bh-disk-smoke-front" />
        <div className="bh-disk bh-disk-front" />
        <div className="bh-disk bh-disk-sparks" />
        <div className="bh-event-horizon" />
        <div className="bh-photon-ring" />
        <div className="bh-reflection" />
      </div>
    </div>
  )
}
