import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

const PARTICLE_COUNT = 70
const MAX_LINK_DIST = 140
const PARTICLE_COLOR = 'rgba(160, 196, 255, 0.85)'
const LINK_COLOR = 'rgba(120, 170, 255, OPACITY)'

function createParticles(width, height) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.6,
  }))
}

// Fondo animado tipo "constelación" en canvas — sin dependencias externas,
// para mantener el bundle liviano.
export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let particles = []
    let animationId

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(width, height)
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_LINK_DIST) {
            ctx.strokeStyle = LINK_COLOR.replace('OPACITY', String(0.16 * (1 - dist / MAX_LINK_DIST)))
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = PARTICLE_COLOR
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(step)
    }

    resize()
    step()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
