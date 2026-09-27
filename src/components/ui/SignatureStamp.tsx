'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

function isDarkMode() {
  if (typeof document === 'undefined') return true
  return document.documentElement.getAttribute('data-theme') !== 'light'
}

export default function SignatureStamp({ className, style, loop }: { className?: string; style?: CSSProperties; loop?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(isDarkMode())
    const observer = new MutationObserver(() => setDark(isDarkMode()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()
    let cleanup: (() => void) | undefined

    const start = () => {
      const scale = 2
      canvas.width = img.naturalWidth * scale
      canvas.height = img.naturalHeight * scale
      setLoaded(true)

      let progress = 0
      let raf = 0
      let resetTimer: ReturnType<typeof setTimeout> | null = null

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const px = progress * canvas.width

        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, px, canvas.height)
        ctx.clip()
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.restore()

        const grad = ctx.createRadialGradient(px, canvas.height * 0.5, 0, px, canvas.height * 0.5, 80)
        grad.addColorStop(0, 'rgba(0,158,138,0.12)')
        grad.addColorStop(1, 'rgba(0,158,138,0)')
        ctx.fillStyle = grad
        ctx.fillRect(px - 100, 0, 200, canvas.height)

        ctx.beginPath()
        ctx.arc(px, canvas.height * 0.5 + Math.sin(progress * 30) * 3, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#009e8a'
        ctx.fill()

        progress += 0.012
        if (progress < 1) {
          raf = requestAnimationFrame(draw)
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          if (loop) {
            resetTimer = setTimeout(() => {
              progress = 0
              raf = requestAnimationFrame(draw)
            }, 2500)
          }
        }
      }
      raf = requestAnimationFrame(draw)

      return () => {
        cancelAnimationFrame(raf)
        if (resetTimer) clearTimeout(resetTimer)
      }
    }

    img.onload = () => { cleanup = start() }
    img.onerror = () => setLoaded(true)
    img.src = '/MY-Signture.png'

    return () => cleanup?.()
  }, [loop])

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <canvas
        role="img"
        aria-label="Mojtaba Sadatpour signature"
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s',
          filter: dark ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    </div>
  )
}
