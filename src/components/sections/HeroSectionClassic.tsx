'use client'

/**
 * Classic hero (signature stage with orbiting tech logos), kept as a backup.
 * Switch back with HERO_VARIANT in src/lib/siteConfig.ts.
 */

import { useEffect, useRef } from 'react'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { TECH } from '@/lib/techLogos'
import SignatureStamp from '@/components/ui/SignatureStamp'
import { gsap } from 'gsap'

const CHIPS = [
  { key: 'years_exp', value: '15+', color: 'var(--blue)', pos: 'top-[4%] left-[0%]', depth: 26, delay: '0s' },
  { key: 'clients', value: '50+', color: 'var(--violet)', pos: 'top-[10%] right-[0%]', depth: -20, delay: '1.1s' },
  { key: 'projects', value: '50+', color: '#00d4aa', pos: 'bottom-[6%] left-[8%]', depth: 16, delay: '2.2s' },
]

// real tech logos riding the two orbit rings (percent positions on the ring box)
const ORBIT_OUTER = [
  { tech: TECH.elementor, x: 50, y: 0 },
  { tech: TECH.wordpress, x: 100, y: 50 },
  { tech: TECH.php, x: 50, y: 100 },
  { tech: TECH.html5, x: 0, y: 50 },
]
const ORBIT_INNER = [
  { tech: TECH.tailwind, x: 100, y: 50 },
  { tech: TECH.javascript, x: 0, y: 50 },
]

export default function HeroSectionClassic() {
  const t = useTranslations('hero')
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo('.hp-in', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        .fromTo('.hp-stage', { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.35')
        .fromTo('.hp-chip', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.13, ease: 'back.out(1.8)' }, '-=0.5')
    }, ref)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5)
      target.y = (e.clientY / window.innerHeight - 0.5)
    }
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      const stage = stageRef.current
      if (stage) {
        stage.querySelectorAll<HTMLElement>('[data-depth]').forEach(el => {
          const d = Number(el.dataset.depth) || 0
          el.style.transform = `translate3d(${cur.x * d}px, ${cur.y * d}px, 0)`
        })
      }
      raf = requestAnimationFrame(tick)
    }
    if (!reduced) {
      window.addEventListener('mousemove', onMove, { passive: true })
      raf = requestAnimationFrame(tick)
    }
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[calc(100svh-60px)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-6 sm:min-h-screen sm:pt-16 lg:pt-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* animated grid + stronger ambient glow */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{
          background: `
            radial-gradient(50% 38% at 50% 8%, color-mix(in srgb, var(--violet) 40%, transparent) 0%, transparent 70%),
            radial-gradient(42% 38% at 50% 58%, color-mix(in srgb, var(--blue) 32%, transparent) 0%, transparent 70%),
            radial-gradient(30% 30% at 50% 60%, color-mix(in srgb, var(--cta) 20%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      {/* headline */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <span className="hp-in inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
          style={{ borderColor: 'color-mix(in srgb, var(--brand) 45%, transparent)', background: 'color-mix(in srgb, var(--brand) 12%, transparent)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--brand)' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand)' }} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
            {t('open_for_work')}
          </span>
        </span>

        <h1 className="hp-in hero-gradient-text font-black leading-[1.05] tracking-tight text-[clamp(2.8rem,9vw,5.5rem)]" style={{ textWrap: 'balance' }}>
          {t('name')}
        </h1>
        <p className="hp-in mt-4 text-lg sm:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="hp-in mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="hero-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v12H4zM2 20h20" />
            </svg>
            {t('cta_work')}
          </a>
          <a href="#contact" className="btn">{t('cta_contact')}</a>
        </div>
      </div>

      {/* central stage */}
      <div ref={stageRef} className="hp-stage relative z-10 mt-14 sm:mt-16 w-full max-w-2xl aspect-[2/1]">
        {/* converging light beams — three lines meeting under the mark */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden data-depth="6">
          <defs>
            <linearGradient id="beam-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="beam-r" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--violet)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* left side → focal point (50,30) */}
          <line className="hero-beam" x1="0" y1="16" x2="50" y2="30" stroke="url(#beam-l)" strokeWidth="0.5" />
          <line className="hero-beam" x1="0" y1="30" x2="50" y2="30" stroke="url(#beam-l)" strokeWidth="0.5" style={{ animationDelay: '0.6s' }} />
          <line className="hero-beam" x1="0" y1="44" x2="50" y2="30" stroke="url(#beam-l)" strokeWidth="0.5" style={{ animationDelay: '1.2s' }} />
          {/* right side → focal point */}
          <line className="hero-beam" x1="100" y1="16" x2="50" y2="30" stroke="url(#beam-r)" strokeWidth="0.5" />
          <line className="hero-beam" x1="100" y1="30" x2="50" y2="30" stroke="url(#beam-r)" strokeWidth="0.5" style={{ animationDelay: '0.6s' }} />
          <line className="hero-beam" x1="100" y1="44" x2="50" y2="30" stroke="url(#beam-r)" strokeWidth="0.5" style={{ animationDelay: '1.2s' }} />
        </svg>

        {/* rotating conic halo */}
        <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2" aria-hidden>
          <div className="hero-conic h-56 w-56 rounded-full opacity-40 blur-2xl"
            style={{ background: 'conic-gradient(from 0deg, var(--blue), var(--violet), var(--cta), var(--blue))' }} />
        </div>

        {/* orbit rings with real tech logos */}
        <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2" aria-hidden data-depth="8">
          <div className="hero-orbit relative h-64 w-64 rounded-full border sm:h-72 sm:w-72" style={{ borderColor: 'color-mix(in srgb, var(--violet) 26%, transparent)' }}>
            {ORBIT_OUTER.map((o, i) => (
              <span key={i} className="hero-orbit-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${o.x}%`, top: `${o.y}%` }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md"
                  style={{ background: `color-mix(in srgb, ${o.tech.color} 20%, var(--card))`, borderColor: `${o.tech.color}66`, boxShadow: `0 6px 22px -6px ${o.tech.color}` }}
                >
                  <svg viewBox={o.tech.viewBox} className="h-5 w-5" style={{ fill: o.tech.color }}><path d={o.tech.path} /></svg>
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2" aria-hidden data-depth="14">
          <div className="hero-orbit-rev relative h-44 w-44 rounded-full border" style={{ borderColor: 'color-mix(in srgb, var(--blue) 26%, transparent)' }}>
            {ORBIT_INNER.map((o, i) => (
              <span key={i} className="hero-orbit-node-rev absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${o.x}%`, top: `${o.y}%` }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-md"
                  style={{ background: `color-mix(in srgb, ${o.tech.color} 20%, var(--card))`, borderColor: `${o.tech.color}66`, boxShadow: `0 6px 18px -6px ${o.tech.color}` }}
                >
                  <svg viewBox={o.tech.viewBox} className="h-4 w-4" style={{ fill: o.tech.color }}><path d={o.tech.path} /></svg>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* focal glow + animated signature mark */}
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2" data-depth="-22">
          <div className="animate-float relative flex h-28 w-40 items-center justify-center rounded-[26px] border sm:h-32 sm:w-52"
            style={{
              background: 'linear-gradient(160deg, color-mix(in srgb, var(--violet) 26%, var(--card)), var(--card))',
              borderColor: 'color-mix(in srgb, var(--violet) 50%, transparent)',
              boxShadow: '0 28px 80px -12px color-mix(in srgb, var(--violet) 70%, transparent), inset 0 1px 0 rgba(255,255,255,0.16)',
            }}
          >
            <div className="absolute -inset-8 rounded-full opacity-80 blur-2xl"
              style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--blue) 55%, transparent), transparent 70%)' }} />
            <SignatureStamp className="relative w-[110px] sm:w-[150px]" loop />
          </div>
        </div>

        {/* floating stat chips (parallax) */}
        {CHIPS.map(chip => (
          <div key={chip.key} data-depth={chip.depth} className={`hp-chip absolute ${chip.pos}`}>
            <div className="animate-float flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-md" style={{ animationDelay: chip.delay,
                background: 'color-mix(in srgb, var(--card) 88%, transparent)',
                borderColor: `color-mix(in srgb, ${chip.color} 45%, transparent)`,
                boxShadow: `0 10px 30px -12px ${chip.color}`,
              }}
            >
              <span className="font-mono text-lg font-black leading-none" style={{ color: chip.color }}>{chip.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }} dir={isRTL ? 'rtl' : 'ltr'}>
                {t(chip.key)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* scroll hint */}
      <div className="hp-in relative z-10 mt-14 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">{t('scroll')}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
