import { useEffect, useRef } from 'react'

// Cosmic Particles canvas (mounted via portal in App)
export function ParticlesBg({ density = 1, speed = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let raf, w, h, dpr
    let stars = []
    const shooting = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const N = Math.floor((w * h) / 9000 * density)
      stars = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.7 + 0.3,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.02 + 0.005,
        hue: Math.random() < 0.18 ? 'b' : Math.random() < 0.1 ? 'p' : 'w',
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += s.tws
        const a = (Math.sin(s.tw) * 0.5 + 0.5) * s.z
        const c = s.hue === 'b'
          ? `rgba(160,210,255,${a})`
          : s.hue === 'p'
            ? `rgba(190,160,255,${a})`
            : `rgba(255,255,255,${a * 0.9})`
        ctx.fillStyle = c
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2)
        ctx.fill()
        s.y += 0.02 * s.z * speed
        if (s.y > h) {
          s.y = 0
          s.x = Math.random() * w
        }
      }
      if (Math.random() < 0.003) {
        shooting.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.5,
          vx: 4 + Math.random() * 3,
          vy: 1 + Math.random() * 1.5,
          life: 1,
        })
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.01
        if (s.life <= 0 || s.x > w || s.y > h) {
          shooting.splice(i, 1)
          continue
        }
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12)
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12)
        ctx.stroke()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density, speed])

  return <canvas ref={ref} className="particles-canvas" aria-hidden="true" />
}
