import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

const PARTICLE_COUNT = 70
const MAX_LINK_DIST = 140
const PARTICLE_COLOR = 'rgba(160, 196, 255, 0.85)'
const LINK_COLOR = 'rgba(120, 170, 255, OPACITY)'

// Cuánto "sienten" el puntero las partículas cercanas y qué tan rápido
// se frenan — valores bajos para que el seguimiento se sienta suave, no imantado.
const POINTER_RADIUS = 200
const POINTER_STRENGTH = 0.035
const FRICTION = 0.94
const MAX_SPEED = 1.4

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
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(width, height)
    }

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Deriva ambiental leve para que nunca se sientan "congeladas".
        let accX = (Math.random() - 0.5) * 0.02
        let accY = (Math.random() - 0.5) * 0.02

        if (pointer.active) {
          const dx = pointer.x - p.x
          const dy = pointer.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0.01 && dist < POINTER_RADIUS) {
            const pull = (1 - dist / POINTER_RADIUS) * POINTER_STRENGTH
            accX += (dx / dist) * pull
            accY += (dy / dist) * pull
          }
        }

        p.vx = (p.vx + accX) * FRICTION
        p.vy = (p.vy + accY) * FRICTION

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.min(Math.max(p.x, 0), width)
        p.y = Math.min(Math.max(p.y, 0), height)
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
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseleave', handlePointerLeave)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
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
