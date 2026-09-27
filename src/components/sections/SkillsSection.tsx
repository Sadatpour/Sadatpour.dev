'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import { TECH } from '@/lib/techLogos'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// nodes placed around the hub (percent coordinates)
const NODES = [
  { key: 'elementor', x: 16, y: 22 },
  { key: 'javascript', x: 50, y: 12 },
  { key: 'wordpress', x: 84, y: 22 },
  { key: 'tailwind', x: 14, y: 74 },
  { key: 'html5', x: 50, y: 88 },
  { key: 'php', x: 86, y: 74 },
]

// proficiency by qualitative tier (no numbers, no bars)
const TIERS = [
  { key: 'wordpress', tier: 'expert' },
  { key: 'tailwind', tier: 'expert' },
  { key: 'php', tier: 'proficient' },
]

// full toolbelt grid
const GRID = ['javascript', 'tailwind', 'css3', 'html5', 'wordpress', 'php', 'github', 'figma', 'elementor']

const cardStyle = {
  background: 'color-mix(in srgb, var(--card) 82%, transparent)',
  borderColor: 'var(--border)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
} as const

function CardLabel({ color, text }: { color: string; text: string }) {
  return (
    <div className="relative z-[2] mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
      style={{ borderColor: `color-mix(in srgb, ${color} 35%, transparent)`, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>{text}</span>
    </div>
  )
}

export default function SkillsSection() {
  const t = useTranslations('skills')
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      })
      gsap.fromTo('.sk-card', { y: 40, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-bento', start: 'top 82%' },
      })
      gsap.fromTo('.sk-node', { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.9)',
        scrollTrigger: { trigger: '.sk-bento', start: 'top 78%' },
      })
      gsap.fromTo('.sk-tile', { y: 20, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.sk-grid', start: 'top 88%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="skills" className="section-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="sk-bento grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
          {/* ── constellation ── */}
          <div className="sk-card relative overflow-hidden rounded-3xl border p-5 sm:p-6 lg:col-span-2" style={cardStyle} dir="ltr">
            <div className="lineart-grid absolute inset-0 opacity-60 pointer-events-none" aria-hidden />
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--violet), transparent)' }} aria-hidden />

            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <CardLabel color="var(--violet)" text={t('stack')} />
            </div>

            <div className="relative mx-auto mt-2 h-[280px] w-full max-w-[520px] sm:h-[320px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {NODES.map(n => (
                  <line key={n.key} className="constellation-line sk-line"
                    x1="50" y1="50" x2={n.x} y2={n.y}
                    stroke={TECH[n.key].color} strokeWidth="0.4" strokeOpacity="0.5" />
                ))}
              </svg>

              {/* hub */}
              <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
                <div className="animate-float relative flex h-16 w-16 items-center justify-center rounded-2xl border sm:h-20 sm:w-20"
                  style={{
                    background: 'linear-gradient(160deg, color-mix(in srgb, var(--violet) 24%, var(--card)), var(--card))',
                    borderColor: 'color-mix(in srgb, var(--violet) 45%, transparent)',
                    boxShadow: '0 16px 44px -12px color-mix(in srgb, var(--violet) 60%, transparent)',
                  }}
                >
                  <div className="absolute -inset-4 rounded-full opacity-60 blur-xl"
                    style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--blue) 45%, transparent), transparent 70%)' }} />
                  <Image src="/logo.png" alt="" width={40} height={40} className="relative h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                </div>
              </div>

              {/* logo nodes with names */}
              {NODES.map(n => {
                const tech = TECH[n.key]
                return (
                  <div key={n.key} className="sk-node absolute z-[2] flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }} title={tech.name}
                  >
                    <div className="constellation-node flex h-11 w-11 items-center justify-center rounded-xl border sm:h-12 sm:w-12"
                      style={{ background: `color-mix(in srgb, ${tech.color} 14%, var(--card))`, borderColor: `${tech.color}55`, boxShadow: `0 8px 24px -8px ${tech.color}` }}
                    >
                      <svg viewBox={tech.viewBox} className="h-6 w-6" style={{ fill: tech.color }}>
                        <path d={tech.path} />
                      </svg>
                    </div>
                    <span className="whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-bold leading-none backdrop-blur-sm"
                      style={{ color: 'var(--text-secondary)', background: 'color-mix(in srgb, var(--bg) 55%, transparent)' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── proficiency by tier (no %, no bars) ── */}
          <div className="sk-card relative overflow-hidden rounded-3xl border p-5 sm:p-6" style={cardStyle} dir="ltr">
            <div className="lineart-dots absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <CardLabel color="var(--blue)" text={t('level')} />
            </div>
            <div className="relative flex flex-col gap-2.5">
              {TIERS.map(r => {
                const tech = TECH[r.key]
                const tierColor = r.tier === 'expert' ? '#00d4aa' : r.tier === 'advanced' ? 'var(--blue)' : 'var(--text-muted)'
                return (
                  <div key={r.key} className="flex items-center gap-3 rounded-xl border px-3 py-2"
                    style={{ background: `color-mix(in srgb, ${tech.color} 7%, var(--card))`, borderColor: 'var(--border)' }}
                    title={tech.name}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${tech.color}18`, boxShadow: `0 0 0 1px ${tech.color}33` }}
                    >
                      <svg viewBox={tech.viewBox} className="h-[18px] w-[18px]" style={{ fill: tech.color }}><path d={tech.path} /></svg>
                    </span>
                    <span className="flex-1 truncate text-[13px] font-bold" style={{ color: 'var(--text)' }}>{tech.name}</span>
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: tierColor, background: `color-mix(in srgb, ${tierColor} 14%, transparent)` }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t(r.tier)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── toolbelt logo grid ── */}
          <div className="sk-card relative overflow-hidden rounded-3xl border p-5 sm:p-6 lg:col-span-3" style={cardStyle}>
            <CardLabel color="#00d4aa" text={t('toolbelt')} />
            <div className="sk-grid grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-9">
              {GRID.map(key => {
                const tech = TECH[key]
                return (
                  <div key={key} title={tech.name}
                    className="sk-tile group relative flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border p-1.5 transition-all duration-300 hover:-translate-y-1.5"
                    style={{ background: `color-mix(in srgb, ${tech.color} 8%, var(--card))`, borderColor: `${tech.color}2e` }}
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 20%, ${tech.color}33, transparent 70%)` }} />
                    <svg viewBox={tech.viewBox} className="relative h-6 w-6 sm:h-7 sm:w-7" style={{ fill: tech.color }}>
                      <path d={tech.path} />
                    </svg>
                    <span className="relative w-full truncate text-center text-[8px] sm:text-[9px] font-bold leading-tight" style={{ color: 'var(--text-secondary)' }}>
                      {tech.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
