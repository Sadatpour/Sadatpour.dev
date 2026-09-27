'use client'

import { useEffect, useRef } from 'react'

/**
 * Full-page code-themed canvas background.
 * Drifting code glyphs + a linked node network; the accent palette and
 * parallax offset shift as the user scrolls from section to section.
 * Disable via ENABLE_CODE_CANVAS in src/lib/siteConfig.ts to restore
 * the previous plain background.
 */

const GLYPHS = ['{', '}', '<', '>', '/', ';', '=', '(', ')', '=>', '[]', '&&', '||', '++', '</>', 'fn', 'if', '01', '10']

// One accent per home section, in scroll order: hero → about → skills → projects → experience → contact
const SECTION_COLORS: [number, number, number][] = [
  [0, 158, 138],   // hero      — brand teal
  [97, 218, 251],  // about     — react blue
  [168, 85, 247],  // skills    — purple
  [252, 181, 3],   // projects  — amber
  [255, 107, 107], // experience — coral
  [0, 158, 138],   // contact   — back to brand
]

interface Glyph {
  x: number
  y: number
  vy: number
  vx: number
  char: string
  size: number
  alpha: number
  accent: boolean
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function paletteAt(progress: number): [number, number, number] {
  const scaled = Math.min(Math.max(progress, 0), 1) * (SECTION_COLORS.length - 1)
  const i = Math.min(Math.floor(scaled), SECTION_COLORS.length - 2)
  const t = scaled - i
  const [r1, g1, b1] = SECTION_COLORS[i]
  const [r2, g2, b2] = SECTION_COLORS[i + 1]
  return [lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t)]
}

export default function CodeScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let glyphs: Glyph[] = []
    let nodes: Node[] = []
    let raf = 0
    let running = true

    const seed = () => {
      const area = width * height
      const glyphCount = Math.min(90, Math.round(area / 22000))
      const nodeCount = Math.min(36, Math.round(area / 55000))
      glyphs = Array.from({ length: glyphCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 0.08 + Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 0.05,
        char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        size: 10 + Math.random() * 14,
        alpha: 0.05 + Math.random() * 0.12,
        accent: Math.random() < 0.22,
      }))
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      const docH = document.documentElement.scrollHeight - height
      const progress = docH > 0 ? window.scrollY / docH : 0
      const [r, g, b] = paletteAt(progress)
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const base = isLight ? '20, 20, 20' : '235, 235, 235'
      // slow parallax: the field slides up as the page scrolls section to section
      const parallax = (window.scrollY * 0.12) % height

      ctx.clearRect(0, 0, width, height)

      // node network
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!reducedMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const d2 = dx * dx + dy * dy
          if (d2 < 26000) {
            const a = (1 - d2 / 26000) * (isLight ? 0.10 : 0.13)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isLight ? 0.35 : 0.4})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // drifting code glyphs (with scroll parallax)
      for (const p of glyphs) {
        if (!reducedMotion) {
          p.y -= p.vy
          p.x += p.vx
          if (p.y < -30) { p.y = height + 30; p.x = Math.random() * width }
          if (p.x < -30) p.x = width + 30
          if (p.x > width + 30) p.x = -30
        }
        let y = p.y - parallax
        if (y < -40) y += height + 80
        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
        ctx.fillStyle = p.accent
          ? `rgba(${r}, ${g}, ${b}, ${p.alpha * 2.4})`
          : `rgba(${base}, ${p.alpha})`
        ctx.fillText(p.char, p.x, y)
      }

      if (running && !reducedMotion) raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running && !reducedMotion) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      }
    }

    // reduced motion: render a single static frame, refresh palette on scroll end
    const onScrollStatic = () => draw()

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (reducedMotion) {
      draw()
      window.addEventListener('scroll', onScrollStatic, { passive: true })
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', onScrollStatic)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  )
}
