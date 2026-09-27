'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { TECH } from '@/lib/techLogos'
import SignatureStamp from '@/components/ui/SignatureStamp'
import Motif from '@/components/sections/showcase/Motifs'
import { pick, tint } from '@/components/sections/showcase/ShowcaseCards'
import { WP_PROJECTS } from '@/components/sections/showcase/WordPressShowcase'
import { gsap } from 'gsap'

const STATS = [
  { key: 'years_exp', value: '15+', color: 'var(--blue)' },
  { key: 'clients', value: '50+', color: 'var(--violet)' },
  { key: 'projects', value: '50+', color: 'var(--brand)' },
]

const STACK = ['wordpress', 'elementor', 'php', 'javascript', 'html5', 'tailwind'] as const

// Floating project cards on the stage: slug, placement, parallax depth, tilt, float delay
const STAGE_CARDS = [
  { slug: 'nerkhito', pos: 'top-0 start-0 w-[62%]', depth: 18, tilt: '-3deg', delay: '0s', z: 'z-[2]' },
  { slug: 'dalili-group', pos: 'top-[31%] end-0 w-[56%]', depth: -14, tilt: '3deg', delay: '1.2s', z: 'z-[3]' },
  { slug: 'otaghak', pos: 'bottom-[2%] start-[4%] w-[58%]', depth: 10, tilt: '-1.5deg', delay: '2.1s', z: 'z-[1]' },
]

function StageCard({ slug, locale }: { slug: string; locale: string }) {
  const proj = WP_PROJECTS.find(p => p.slug === slug)
  if (!proj) return null
  return (
    <div className="sc-card overflow-hidden rounded-2xl border" style={{ '--acc': proj.accent, background: 'var(--card)', boxShadow: `0 24px 60px -24px ${tint(proj.accent, 70)}` } as CSSProperties}>
      <div className="relative h-20 sm:h-24 overflow-hidden"
        style={{ background: `radial-gradient(120% 100% at 60% 0%, ${tint(proj.accent, 22)}, transparent 72%)` }}
      >
        <div className="lineart-dots absolute inset-0 opacity-50" aria-hidden />
        <Motif motif={proj.motif} className="absolute inset-0 h-full w-full py-2" style={{ color: proj.accent }} />
      </div>
      <div className="flex items-end justify-between gap-2 px-3.5 pb-3.5 pt-2 sm:px-4 sm:pb-4">
        <div className="min-w-0">
          <span className="block truncate text-[9px] sm:text-[10px] font-bold" style={{ color: proj.accent }}>{pick(proj.kind, locale)}</span>
          <span className="block truncate text-sm sm:text-base font-black leading-tight" style={{ color: 'var(--text)' }}>{pick(proj.title, locale)}</span>
        </div>
        {proj.metric && (
          <span className="shrink-0 text-base sm:text-xl font-black tabular-nums leading-none" dir="ltr" style={{ color: proj.accent }}>{proj.metric.value}</span>
        )}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .fromTo('.hp-in', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
        .fromTo('.hp-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out', clearProps: 'transform' }, '-=0.5')
    }, ref)

    // Mouse parallax for the stage cards
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      stageRef.current?.querySelectorAll<HTMLElement>('[data-depth]').forEach(el => {
        const d = Number(el.dataset.depth) || 0
        el.style.translate = `${cur.x * d}px ${cur.y * d}px`
      })
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
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:pt-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* grid + ambient glow */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{
          background: `
            radial-gradient(40% 45% at 22% 30%, color-mix(in srgb, var(--brand) 22%, transparent) 0%, transparent 70%),
            radial-gradient(45% 50% at 78% 55%, color-mix(in srgb, var(--violet) 30%, transparent) 0%, transparent 70%),
            radial-gradient(30% 30% at 70% 90%, color-mix(in srgb, var(--blue) 18%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* ── Copy ── */}
        <div className="flex flex-col items-start">
          <span className="hp-in inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{ background: tint('var(--brand)', 12), boxShadow: `inset 0 0 0 1px ${tint('var(--brand)', 40)}` }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--brand)' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand)' }} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>{t('open_for_work')}</span>
          </span>

          <h1 className="hp-in hero-gradient-text mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2.7rem,7.5vw,5.25rem)]" style={{ textWrap: 'balance' }}>
            {t('name')}
          </h1>
          <p className="hp-in mt-4 max-w-xl text-lg sm:text-2xl font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>

          <div className="hp-in mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="hero-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v12H4zM2 20h20" />
              </svg>
              {t('cta_work')}
            </a>
            <a href="#contact" className="btn">{t('cta_contact')}</a>
          </div>

          {/* stat tiles */}
          <div className="hp-in mt-10 grid w-full max-w-md grid-cols-3 gap-3">
            {STATS.map(s => (
              <div key={s.key} className="rounded-2xl border px-3 py-3 text-center sm:px-4"
                style={{ background: 'color-mix(in srgb, var(--card) 70%, transparent)', borderColor: 'var(--border)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
              >
                <div className="text-2xl sm:text-3xl font-black tabular-nums leading-none" style={{ color: s.color }}>{s.value}</div>
                <div className="mt-1.5 text-[10px] sm:text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{t(s.key)}</div>
              </div>
            ))}
          </div>

          {/* stack */}
          <div className="hp-in mt-6 flex flex-wrap items-center gap-2">
            {STACK.map(key => {
              const tech = TECH[key]
              return (
                <span key={key} title={tech.name} className="flex h-9 w-9 items-center justify-center rounded-xl border"
                  style={{ background: tint(tech.color, 12), borderColor: tint(tech.color, 30) }}
                >
                  <svg viewBox={tech.viewBox} className="h-4 w-4" style={{ fill: tech.color }} aria-label={tech.name}><path d={tech.path} /></svg>
                </span>
              )
            })}
          </div>
        </div>

        {/* ── Stage: floating project cards ── */}
        <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
            <circle cx="50" cy="50" r="48" stroke="var(--violet)" strokeOpacity="0.22" strokeWidth="0.3" strokeDasharray="1.2 2" />
            <circle cx="50" cy="50" r="34" stroke="var(--brand)" strokeOpacity="0.2" strokeWidth="0.3" />
            <circle cx="98" cy="50" r="0.9" fill="var(--violet)" />
            <circle cx="16" cy="50" r="0.7" fill="var(--brand)" />
          </svg>
          <div className="hero-conic pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" aria-hidden
            style={{ background: 'conic-gradient(from 0deg, var(--blue), var(--violet), var(--brand), var(--blue))' }} />

          {STAGE_CARDS.map(c => (
            <div key={c.slug} data-depth={c.depth} className={`hp-card absolute ${c.pos} ${c.z}`}>
              <div className="animate-float" style={{ animationDelay: c.delay }}>
                <div style={{ rotate: c.tilt }}><StageCard slug={c.slug} locale={locale} /></div>
              </div>
            </div>
          ))}

          {/* signature stamp */}
          <div data-depth={-24} className="hp-card absolute bottom-[8%] end-[2%] z-[4]">
            <div className="animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="glass-bar flex h-20 w-36 items-center justify-center rounded-2xl border sm:h-24 sm:w-44">
                <SignatureStamp className="w-[100px] sm:w-[124px]" loop />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="hp-in relative z-10 mx-auto mt-14 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">{t('scroll')}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
