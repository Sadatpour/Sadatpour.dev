'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import { TECH } from '@/lib/techLogos'
import { localizeDigits } from '@/lib/format'
import { tint } from '@/components/sections/showcase/ShowcaseCards'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, ReactNode> = {
  ai: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  perf: <><path d="M4 15a8 8 0 0 1 16 0" /><path d="M12 15l4-3" /></>,
  motion: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  design: <><path d="M12 3l8 4-8 4-8-4z" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" /></>,
}

// core-focus areas — capability cards (no percentages)
const FOCUS = [
  { label: 'WordPress', sub: 'THEMES · PLUGINS', color: '#21759B', logo: 'wordpress' },
  { label: 'AI Coding', sub: 'PROMPT-DRIVEN', color: '#7C5CFF', icon: 'ai' },
  { label: 'Performance', sub: 'SPEED · SEO', color: '#FF6B6B', icon: 'perf' },
  { label: 'UI Motion', sub: 'GSAP · SCROLL', color: '#88CE02', icon: 'motion' },
  { label: 'Design', sub: 'UI · UX', color: '#F59E0B', icon: 'design' },
]

const LANGUAGES = [
  { key: 'persian', flag: '🇮🇷', descKey: 'native', color: '#00d4aa' },
  { key: 'tabari', flag: '🌿', descKey: 'native', color: '#00d4aa' },
  { key: 'english', flag: '🇬🇧', descKey: 'b1', color: 'var(--blue)' },
  { key: 'german', flag: '🇩🇪', descKey: 'b1', color: 'var(--violet)' },
]

const STATS = [
  { value: '15+', key: 'years_exp', color: 'var(--blue)' },
  { value: '50+', key: 'clients', color: 'var(--violet)' },
  { value: '50+', key: 'projects', color: '#00d4aa' },
]

const cardStyle = {
  background: 'color-mix(in srgb, var(--card) 80%, transparent)',
  borderColor: 'var(--border)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
} as const

function FocusCard({ f, index, className = '' }: { f: (typeof FOCUS)[number]; index: number; className?: string }) {
  return (
    <div className={`foc-pill sc-card sc-card-link group relative flex flex-col overflow-hidden rounded-2xl border ${className}`}
      style={{ '--acc': f.color, background: 'var(--card)' } as CSSProperties}
    >
      <div className="relative flex h-20 items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(120% 110% at 50% 0%, ${tint(f.color, 20)}, transparent 75%)` }}
      >
        <div className="lineart-dots absolute inset-0 opacity-50" aria-hidden />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ background: tint(f.color, 16), boxShadow: `inset 0 0 0 1px ${tint(f.color, 35)}, 0 10px 24px -12px ${f.color}` }}
        >
          {f.logo ? (
            <svg viewBox={TECH[f.logo].viewBox} className="h-5 w-5" style={{ fill: f.color }}><path d={TECH[f.logo].path} /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[f.icon!]}</svg>
          )}
        </span>
        <span className="absolute top-2.5 end-3 font-mono text-[10px] font-bold tabular-nums" dir="ltr" style={{ color: tint(f.color, 85) }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-3 pb-4 pt-2.5 text-center" dir="ltr">
        <span className="text-[13px] sm:text-sm font-black leading-tight" style={{ color: 'var(--text)' }}>{f.label}</span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: `color-mix(in srgb, ${f.color} 70%, var(--text))` }}>{f.sub}</span>
      </div>
    </div>
  )
}

function TehranClock({ locale }: { locale: string }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-GB', {
      timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [locale])
  return (
    <span className="font-mono text-2xl sm:text-3xl font-black tracking-tight" dir="ltr"
      style={{ color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}
    >
      {time || '––:––'}
    </span>
  )
}

export default function AboutSection() {
  const t = useTranslations('about')
  const th = useTranslations('hero')
  const locale = useLocale()
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      })
      gsap.fromTo('.bio-card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
      gsap.fromTo('.foc-pill', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: '.bio-card', start: 'top 86%', once: true },
      })
      gsap.fromTo('.bento', { y: 26, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.bento-grid', start: 'top 96%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" className="section-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* bio — statement card + core focus */}
        <div className="bio-card sc-card relative mb-3 sm:mb-4 overflow-hidden rounded-[24px] border"
          style={{ '--acc': 'var(--brand)', background: 'var(--card)' } as CSSProperties}
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* statement */}
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="lineart-dots absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
              <span className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: tint('var(--brand)', 12), boxShadow: `inset 0 0 0 1px ${tint('var(--brand)', 30)}`, color: 'var(--brand)' }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="currentColor" aria-hidden>
                  <path d="M4 11.5C4 7.9 6.2 5.3 9.6 4.5l.7 1.7C8.4 7 7.4 8.4 7.3 10H10v8H4v-6.5zm10 0c0-3.6 2.2-6.2 5.6-7l.7 1.7c-1.9.8-2.9 2.2-3 3.8H20v8h-6v-6.5z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{th('name')}</span>
              </span>
              <p className="relative mt-5 max-w-3xl text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed sm:leading-relaxed"
                style={{ color: 'var(--text)', textWrap: 'pretty' }}
              >
                {t('bio')}
              </p>
            </div>

            {/* signature panel */}
            <div className="relative flex min-h-[200px] flex-col items-center justify-center gap-3 overflow-hidden border-t p-8 text-center lg:border-t-0 lg:border-s"
              style={{ borderColor: 'var(--border)', background: `radial-gradient(110% 90% at 50% 0%, ${tint('var(--brand)', 22)}, transparent 75%)` }}
            >
              <div className="lineart-grid absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
              <svg className="pointer-events-none absolute inset-0 m-auto h-60 w-60 opacity-60" viewBox="0 0 100 100" fill="none" aria-hidden>
                <circle cx="50" cy="50" r="46" stroke="var(--brand)" strokeWidth="0.4" strokeOpacity="0.35" strokeDasharray="1.5 2.5" />
                <circle cx="50" cy="50" r="34" stroke="var(--brand)" strokeWidth="0.4" strokeOpacity="0.3" />
                <circle cx="96" cy="50" r="1.6" fill="var(--brand)" className="sc-pulse" />
                <circle cx="16" cy="50" r="1.2" fill="var(--brand)" fillOpacity="0.6" />
              </svg>
              <Image src="/MY-Signture.png" alt="Sadatpour" width={200} height={48} className="signature-ink relative h-12 w-auto object-contain" />
              <span className="relative max-w-[16rem] text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-secondary)' }}>
                {t('focus_value')}
              </span>
            </div>
          </div>

          {/* core focus */}
          <div className="relative border-t p-6 sm:p-8" style={{ borderColor: 'var(--border)' }}>
            <div className="mb-5 flex items-center gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
                {t('core_focus')}
              </p>
              <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {FOCUS.map((f, i) => (
                // an odd last card spans the full row in the 2-column mobile grid
                <FocusCard key={f.label} f={f} index={i}
                  className={i === FOCUS.length - 1 && FOCUS.length % 2 ? 'col-span-2 sm:col-span-1' : ''} />
              ))}
            </div>
          </div>
        </div>

        {/* info cards */}
        <div className="bento-grid grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {/* stats — counts only, no mastery % */}
          <div className="bento relative overflow-hidden rounded-3xl border p-5 sm:p-6 flex flex-col justify-center gap-5" style={cardStyle}>
            <div className="lineart-dots absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
            {STATS.map(s => (
              <div key={s.key} className="relative flex items-baseline justify-between gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight" style={{ color: s.color, fontVariantNumeric: 'tabular-nums' }}>
                  {localizeDigits(s.value, locale)}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-end" style={{ color: 'var(--text-muted)' }}>
                  {th(s.key)}
                </span>
              </div>
            ))}
          </div>

          {/* availability */}
          <a href="#contact"
            className="bento group relative overflow-hidden rounded-3xl border p-5 sm:p-6 flex flex-col justify-between gap-5 transition-transform duration-300 hover:-translate-y-1"
            style={{
              ...cardStyle,
              borderColor: 'color-mix(in srgb, var(--brand) 45%, transparent)',
              background: 'linear-gradient(140deg, color-mix(in srgb, var(--brand) 16%, var(--card)), color-mix(in srgb, var(--card) 82%, transparent) 60%)',
            }}
          >
            <svg className="pointer-events-none absolute -bottom-6 -end-6 h-32 w-32 opacity-45" viewBox="0 0 100 100" fill="none" aria-hidden>
              <circle cx="50" cy="50" r="32" stroke="var(--brand)" strokeWidth="0.6" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="21" stroke="var(--brand)" strokeWidth="0.5" strokeOpacity="0.45" />
              <circle cx="50" cy="50" r="10" stroke="var(--brand)" strokeWidth="0.5" strokeOpacity="0.4" />
              <path d="M50 50L82 40" stroke="var(--brand)" strokeWidth="0.8" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="2" fill="var(--brand)" />
            </svg>
            <div className="relative flex items-center justify-between">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand)' }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: 'var(--brand)' }} />
              </span>
              <span className="flex items-end gap-0.5" dir="ltr" aria-hidden>
                {[6, 10, 8, 13].map((hRaw, bi) => (
                  <span key={bi} className="w-1 rounded-sm" style={{ height: hRaw, background: 'var(--brand)', opacity: 0.4 + bi * 0.18 }} />
                ))}
              </span>
            </div>
            <div className="relative">
              <p className="text-sm sm:text-base font-bold leading-snug mb-2" style={{ color: 'var(--text)' }}>
                {t('available')}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group-hover:gap-2.5" style={{ color: 'var(--brand)' }}>
                {th('cta_contact')}
                <svg className="h-3 w-3 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </a>

          {/* location + live clock */}
          <div className="bento relative overflow-hidden rounded-3xl border p-5 sm:p-6 flex flex-col justify-between gap-4" style={cardStyle}>
            <div className="lineart-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
            <svg className="pointer-events-none absolute -bottom-2 -end-2 h-28 w-28 opacity-40" viewBox="0 0 100 100" fill="none" aria-hidden>
              <circle cx="50" cy="46" r="30" stroke="var(--blue)" strokeWidth="0.6" strokeOpacity="0.5" />
              <circle cx="50" cy="46" r="20" stroke="var(--blue)" strokeWidth="0.5" strokeOpacity="0.4" />
              <path d="M20 46h60M50 16v60" stroke="var(--blue)" strokeWidth="0.4" strokeOpacity="0.3" />
              <path d="M50 30a7 7 0 0 0-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 0 0-7-7z" fill="var(--brand)" fillOpacity="0.55" />
            </svg>
            <div className="relative flex items-center gap-2">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
              </svg>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{t('location_label')}</p>
            </div>
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <TehranClock locale={locale} />
                <span className="rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold" style={{ color: 'var(--blue)', background: 'color-mix(in srgb, var(--blue) 12%, transparent)' }} dir="ltr">
                  {localizeDigits('GMT+3:30', locale)}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{t('location')}</p>
            </div>
          </div>

          {/* focus highlight */}
          <div className="bento relative overflow-hidden rounded-3xl border p-5 sm:p-6 flex flex-col justify-between gap-4" style={cardStyle}>
            <div className="lineart-dots absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
            <svg className="pointer-events-none absolute -top-4 -end-4 h-28 w-28 opacity-50" viewBox="0 0 100 100" fill="none" aria-hidden>
              <circle cx="50" cy="50" r="34" stroke="var(--violet)" strokeWidth="0.6" strokeOpacity="0.5" />
              <circle cx="50" cy="50" r="22" stroke="var(--violet)" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="2 3" />
              <circle cx="84" cy="50" r="2" fill="var(--violet)" /><circle cx="50" cy="50" r="5" fill="var(--violet)" fillOpacity="0.25" />
            </svg>
            <div className="relative flex items-center gap-2">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{t('focus_label')}</p>
            </div>
            <p className="relative text-sm sm:text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>{t('focus_value')}</p>
          </div>

          {/* languages — flag + qualitative label (no meter) */}
          <div className="bento relative overflow-hidden rounded-3xl border p-5 sm:p-6 sm:col-span-2 lg:col-span-2" style={cardStyle}>
            <div className="lineart-dots absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
            <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('languages_header')}
            </p>
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
              {LANGUAGES.map(lang => (
                <div key={lang.key} className="flex flex-col items-center gap-2 rounded-2xl border p-3 text-center"
                  style={{ background: `color-mix(in srgb, ${lang.color} 8%, var(--card))`, borderColor: `${lang.color}2e` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                    style={{ background: `color-mix(in srgb, ${lang.color} 14%, var(--card))`, boxShadow: `0 0 0 1px ${lang.color}33` }}
                  >
                    {lang.flag}
                  </span>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: 'var(--text)' }}>{t(`languages.${lang.key}`)}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: lang.color, background: `color-mix(in srgb, ${lang.color} 14%, transparent)` }}>
                    {t(`languages.${lang.descKey}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
