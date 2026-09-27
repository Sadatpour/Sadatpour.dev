'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { TECH } from '@/lib/techLogos'
import { tint } from '@/components/sections/showcase/ShowcaseCards'
import { gsap } from 'gsap'

const STATS = [
  { key: 'years_exp', value: '15+', color: 'var(--blue)', pos: 'top-14 -start-28', delay: '0s' },
  { key: 'clients', value: '50+', color: 'var(--violet)', pos: 'top-44 -end-32', delay: '1.1s' },
  { key: 'projects', value: '50+', color: 'var(--brand)', pos: 'bottom-16 -start-24', delay: '2s' },
]

const STACK = ['wordpress', 'elementor', 'javascript', 'html5', 'css3', 'tailwind'] as const

// Block inserter icons (24px viewBox)
const INSERTER: { key: string; path: string }[] = [
  { key: 'add', path: 'M12 5v14M5 12h14' },
  { key: 'heading', path: 'M6 4v16M18 4v16M6 12h12' },
  { key: 'image', path: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01' },
  { key: 'columns', path: 'M4 5h7v14H4zM13 5h7v14h-7z' },
  { key: 'cart', path: 'M3 4h2l2.4 11h11L21 8H7M9 20h.01M18 20h.01' },
  { key: 'button', path: 'M4 9h16v6H4zM8 12h8' },
]

const SWATCHES = ['var(--brand)', 'var(--violet)', 'var(--blue)', 'var(--cta)', '#f59e0b']

function Icon({ path, className = 'h-4 w-4' }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={path} />
    </svg>
  )
}

/** Canvas block: builds in with a stagger, optional "selected" state like the block editor. */
function Block({ i, selected, children, className = '' }: { i: number; selected?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`hb-block relative rounded-xl p-3 ${className}`}
      style={{
        animationDelay: `${0.5 + i * 0.35}s`,
        outline: selected ? '2px solid var(--brand)' : '1px dashed color-mix(in srgb, var(--text) 12%, transparent)',
        outlineOffset: selected ? 2 : 0,
      }}
    >
      {selected && (
        <div className="absolute -top-9 start-2 z-[2] flex items-center gap-0.5 rounded-lg border px-1 py-0.5 shadow-lg"
          style={{ background: 'var(--card)', borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}
        >
          {['M4 6h16M4 12h16M4 18h16', 'M7 7l10 10M17 7L7 17', 'M12 5v14M5 12h14'].map(p => (
            <span key={p} className="flex h-6 w-6 items-center justify-center rounded-md"><Icon path={p} className="h-3.5 w-3.5" /></span>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return <span className="block h-2 rounded-full" style={{ width: w, background: strong ? 'color-mix(in srgb, var(--text) 55%, transparent)' : 'color-mix(in srgb, var(--text) 16%, transparent)' }} />
}

function EditorMock() {
  return (
    <div dir="ltr" className="overflow-hidden rounded-[22px] border"
      style={{
        background: 'color-mix(in srgb, var(--card) 86%, transparent)',
        borderColor: 'color-mix(in srgb, var(--text) 14%, transparent)',
        boxShadow: '0 50px 120px -40px color-mix(in srgb, var(--violet) 55%, transparent), 0 30px 60px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b px-4 py-2.5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex gap-1.5">
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-medium"
          style={{ background: 'color-mix(in srgb, var(--text) 6%, transparent)', color: 'var(--text-muted)' }}
        >
          <Icon path="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" className="h-3 w-3" />
          <span className="truncate font-mono">sadatpour.dev</span>
        </div>
        <span className="hidden rounded-md px-2.5 py-1 text-[10px] font-bold text-white sm:inline-block" style={{ background: 'var(--cta)' }}>Publish</span>
      </div>

      <div className="grid md:grid-cols-[52px_minmax(0,1fr)] lg:grid-cols-[52px_minmax(0,1fr)_190px]">
        {/* inserter */}
        <div className="hidden flex-col items-center gap-1.5 border-e py-3 md:flex" style={{ borderColor: 'var(--border)' }}>
          {INSERTER.map((b, i) => (
            <span key={b.key} className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={i === 4
                ? { background: tint('var(--brand)', 18), color: 'var(--brand)', boxShadow: `inset 0 0 0 1px ${tint('var(--brand)', 40)}` }
                : { color: 'var(--text-muted)' }}
            >
              <Icon path={b.path} />
            </span>
          ))}
        </div>

        {/* canvas */}
        <div className="relative flex flex-col gap-3 p-4 sm:p-5" style={{ background: 'color-mix(in srgb, var(--bg) 35%, transparent)' }}>
          <div className="lineart-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />

          {/* header block */}
          <Block i={0} className="flex items-center justify-between">
            <Image src="/MY-Signture.png" alt="" width={120} height={30} className="signature-ink h-6 w-auto object-contain" />
            <div className="hidden items-center gap-3 sm:flex"><Line w="28px" /><Line w="34px" /><Line w="24px" /></div>
          </Block>

          {/* hero block (selected) */}
          <Block i={1} selected className="mt-6 grid grid-cols-[1.2fr_1fr] items-center gap-4">
            <div className="flex flex-col gap-2">
              <Line w="85%" strong /><Line w="65%" strong />
              <div className="mt-1 flex flex-col gap-1.5"><Line w="90%" /><Line w="70%" /></div>
              <span className="mt-2 h-6 w-20 rounded-md" style={{ background: 'linear-gradient(135deg, var(--cta), color-mix(in srgb, var(--cta) 70%, var(--violet)))' }} />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg"
              style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--violet) 45%, transparent), color-mix(in srgb, var(--blue) 30%, transparent))' }}
            >
              <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                <path d="M0 60 L25 38 L42 52 L62 30 L100 58 L100 75 L0 75Z" fill="rgba(255,255,255,0.22)" />
                <circle cx="76" cy="20" r="7" fill="rgba(255,255,255,0.45)" />
              </svg>
            </div>
          </Block>

          {/* WooCommerce product row */}
          <Block i={2} className="grid grid-cols-3 gap-2.5">
            {['var(--brand)', '#f59e0b', 'var(--violet)'].map(c => (
              <div key={c} className="flex flex-col gap-1.5 rounded-lg p-2" style={{ background: 'color-mix(in srgb, var(--text) 4%, transparent)' }}>
                <span className="aspect-[16/10] rounded-md" style={{ background: `linear-gradient(145deg, ${tint(c, 45)}, ${tint(c, 12)})` }} />
                <Line w="80%" />
                <span className="flex items-center justify-between"><Line w="40%" strong /><span className="h-3.5 w-3.5 rounded" style={{ background: c }} /></span>
              </div>
            ))}
          </Block>

          {/* block being dropped by the cursor */}
          <Block i={3} className="hb-drop flex items-center justify-center gap-2 py-2.5">
            <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold" style={{ background: tint('var(--brand)', 16), color: 'var(--brand)' }}>
              <Icon path="M12 5v14M5 12h14" className="h-3 w-3" />
              WooCommerce
            </span>
          </Block>

          {/* animated cursor */}
          <svg className="hb-cursor pointer-events-none absolute z-[3] h-5 w-5 drop-shadow" viewBox="0 0 24 24" aria-hidden>
            <path d="M4 3l15 8-6.5 1.8L10 19z" fill="var(--text)" stroke="var(--card)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>

        {/* inspector */}
        <div className="hidden flex-col gap-4 border-s p-4 lg:flex" style={{ borderColor: 'var(--border)' }}>
          <div className="flex gap-1 rounded-lg p-0.5" style={{ background: 'color-mix(in srgb, var(--text) 6%, transparent)' }}>
            <span className="flex-1 rounded-md py-1 text-center text-[10px] font-bold" style={{ background: 'var(--card)', color: 'var(--text)' }}>Block</span>
            <span className="flex-1 py-1 text-center text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>Page</span>
          </div>
          <div className="flex flex-col gap-2">
            <Line w="45%" strong />
            <div className="flex gap-1.5">
              {SWATCHES.map((c, i) => (
                <span key={c} className="h-5 w-5 rounded-full" style={{ background: c, boxShadow: i === 0 ? '0 0 0 2px var(--card), 0 0 0 3.5px var(--brand)' : undefined }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[true, false, true].map((on, i) => (
              <div key={i} className="flex items-center justify-between">
                <Line w={['55%', '40%', '50%'][i]} />
                <span className="flex h-3.5 w-6 items-center rounded-full p-0.5" style={{ background: on ? 'var(--brand)' : 'color-mix(in srgb, var(--text) 18%, transparent)', justifyContent: on ? 'flex-end' : 'flex-start' }}>
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-xl border p-3" style={{ borderColor: 'var(--border)', background: tint('#22c55e', 6) }}>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90" aria-hidden>
                <circle cx="18" cy="18" r="15" fill="none" stroke="color-mix(in srgb, #22c55e 20%, transparent)" strokeWidth="3.5" />
                <circle className="hb-ring" cx="18" cy="18" r="15" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" pathLength={100} strokeDasharray="100" />
              </svg>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold" style={{ color: 'var(--text)' }}>Core Web Vitals</span>
                <span className="flex gap-1.5 font-mono text-[8px] font-bold" style={{ color: '#22c55e' }}>LCP · CLS · INP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .fromTo('.hp-in', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
        .fromTo('.hp-editor', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform' }, '-=0.4')
        .fromTo('.hp-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.8)', clearProps: 'transform' }, '-=0.5')
    }, ref)

    // Editor window tilts slightly toward the pointer
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
      const el = tiltRef.current
      if (el) el.style.transform = `perspective(1400px) rotateX(${6 - cur.y * 6}deg) rotateY(${cur.x * 8}deg)`
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
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-4 pb-20 pt-28 sm:pt-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden
        style={{
          background: `
            radial-gradient(45% 35% at 50% 5%, color-mix(in srgb, var(--violet) 34%, transparent) 0%, transparent 70%),
            radial-gradient(40% 40% at 20% 70%, color-mix(in srgb, var(--brand) 18%, transparent) 0%, transparent 70%),
            radial-gradient(40% 40% at 82% 72%, color-mix(in srgb, var(--blue) 22%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Copy ── */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <span className="hp-in inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          style={{ background: tint('var(--brand)', 12), boxShadow: `inset 0 0 0 1px ${tint('var(--brand)', 40)}` }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--brand)' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand)' }} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>{t('open_for_work')}</span>
        </span>

        <h1 className="hp-in hero-gradient-text mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2.7rem,8vw,5.5rem)]" style={{ textWrap: 'balance' }}>
          {t('name')}
        </h1>
        <p className="hp-in mt-4 text-lg sm:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>{t('subtitle')}</p>

        <div className="hp-in mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="hero-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300">
            <Icon path="M4 4h16v12H4zM2 20h20" />
            {t('cta_work')}
          </a>
          <a href="#contact" className="btn">{t('cta_contact')}</a>
        </div>

        <div className="hp-in mt-6 flex items-center gap-2">
          {STACK.map(key => {
            const tech = TECH[key]
            return (
              <span key={key} title={tech.name} className="flex h-8 w-8 items-center justify-center rounded-lg border"
                style={{ background: tint(tech.color, 12), borderColor: tint(tech.color, 30) }}
              >
                <svg viewBox={tech.viewBox} className="h-4 w-4" style={{ fill: tech.color }} aria-label={tech.name}><path d={tech.path} /></svg>
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Block editor stage ── */}
      <div className="hp-editor relative z-10 mt-14 w-full max-w-4xl sm:mt-16">
        {/* mobile: stats as a row */}
        <div className="mb-5 grid grid-cols-3 gap-2 lg:hidden">
          {STATS.map(s => (
            <div key={s.key} className="rounded-xl border px-2 py-2.5 text-center" style={{ background: 'color-mix(in srgb, var(--card) 70%, transparent)', borderColor: 'var(--border)' }}>
              <div className="text-xl font-black leading-none" style={{ color: s.color }}>{s.value}</div>
              <div className="mt-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>{t(s.key)}</div>
            </div>
          ))}
        </div>

        <div ref={tiltRef} style={{ transform: 'perspective(1400px) rotateX(6deg)', transformOrigin: '50% 0%', willChange: 'transform' } as CSSProperties}>
          <EditorMock />
        </div>

        {/* floating stat chips */}
        {STATS.map(s => (
          <div key={s.key} className={`hp-chip absolute z-[5] hidden lg:block ${s.pos}`}>
            <div className="glass-bar animate-float flex items-center gap-2.5 rounded-2xl border px-4 py-2.5" style={{ animationDelay: s.delay }}>
              <span className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>{t(s.key)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
