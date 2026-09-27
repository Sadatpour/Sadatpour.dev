'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import { TECH } from '@/lib/techLogos'
import { localizeDigits } from '@/lib/format'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, ReactNode> = {
  ai: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  perf: <><path d="M4 15a8 8 0 0 1 16 0" /><path d="M12 15l4-3" /></>,
  motion: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  design: <><path d="M12 3l8 4-8 4-8-4z" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" /></>,
}

// core-focus areas — scattered "capability" pills (no percentages)
const FOCUS = [
  { label: 'WordPress', sub: 'THEMES · PLUGINS', color: '#21759B', logo: 'wordpress', pos: 'top-[4%] left-[26%]' },
  { label: 'React / Next', sub: 'SPA · SSR', color: '#61DAFB', logo: 'react', pos: 'top-[24%] left-[1%]' },
  { label: 'TypeScript', sub: 'TYPES · DX', color: '#3178C6', logo: 'typescript', pos: 'top-[64%] left-[0%]' },
  { label: 'AI Coding', sub: 'PROMPT-DRIVEN', color: '#7C5CFF', icon: 'ai', pos: 'top-[88%] left-[20%]' },
  { label: 'Performance', sub: 'SPEED · SEO', color: '#FF6B6B', icon: 'perf', pos: 'top-[20%] right-[1%]' },
  { label: 'UI Motion', sub: 'GSAP · SCROLL', color: '#88CE02', icon: 'motion', pos: 'top-[60%] right-[0%]' },
  { label: 'Design', sub: 'UI · UX', color: '#F59E0B', icon: 'design', pos: 'top-[88%] right-[22%]' },
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

function FocusPill({ f }: { f: (typeof FOCUS)[number] }) {
  return (
    <span className="flex items-center gap-2.5 rounded-2xl border px-3 py-2 backdrop-blur-md"
      style={{ background: 'color-mix(in srgb, var(--card) 88%, transparent)', borderColor: `color-mix(in srgb, ${f.color} 38%, transparent)`, boxShadow: `0 10px 30px -14px ${f.color}` }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: `${f.color}1e`, boxShadow: `0 0 0 1px ${f.color}33` }}>
        {f.logo ? (
          <svg viewBox={TECH[f.logo].viewBox} className="h-4 w-4" style={{ fill: f.color }}><path d={TECH[f.logo].path} /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[f.icon!]}</svg>
        )}
      </span>
      <span className="min-w-0 text-start" dir="ltr">
        <span className="block text-[13px] font-bold leading-tight" style={{ color: 'var(--text)' }}>{f.label}</span>
        <span className="block text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{f.sub}</span>
      </span>
    </span>
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
      gsap.fromTo('.foc-pill', { scale: 0.6, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
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

        {/* bio — statement card */}
        <div className="bio-card relative overflow-hidden rounded-3xl border p-6 sm:p-8 mb-3 sm:mb-4" style={cardStyle}>
          <div className="lineart-grid absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
          <span aria-hidden className="pointer-events-none absolute top-2 select-none font-black leading-none text-[80px] sm:text-[110px] opacity-90"
            style={{ color: 'color-mix(in srgb, var(--violet) 22%, transparent)', fontFamily: 'Georgia, serif', insetInlineStart: '1.5rem' }}
          >
            {isRTL ? '”' : '“'}
          </span>
          <p className="relative text-base sm:text-lg font-semibold leading-8 max-w-3xl" style={{ color: 'var(--text)', textWrap: 'balance', paddingTop: '1.5rem' }}>
            {t('bio')}
          </p>

          {/* ── core focus — newhedge-style capability map ── */}
          <div className="relative mt-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('core_focus')}
            </p>

            {/* desktop: scattered pills around a central mark */}
            <div className="relative mx-auto hidden h-[360px] w-full max-w-[760px] lg:block">
              {/* dashed connectors + orbit glow */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <ellipse cx="50" cy="50" rx="44" ry="40" fill="none" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="1.5 2" />
                {['18,20', '6,38', '4,72', '24,92', '82,32', '92,66', '74,92'].map((p, i) => (
                  <line key={i} x1="50" y1="50" x2={p.split(',')[0]} y2={p.split(',')[1]}
                    stroke="var(--border)" strokeWidth="0.25" strokeDasharray="1 2" strokeOpacity="0.8" />
                ))}
              </svg>
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--cta), transparent 70%)' }} aria-hidden />

              {/* central mark */}
              <div className="absolute left-1/2 top-1/2 z-[2] w-[260px] -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-2 rounded-3xl border p-6 text-center"
                  style={{ ...cardStyle, borderColor: 'var(--border-strong)' }}
                >
                  <Image src="/MY-Signture.png" alt="Sadatpour" width={180} height={44}
                    className="h-11 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    {t('focus_value')}
                  </span>
                </div>
              </div>

              {/* pills */}
              {FOCUS.map(f => (
                <div key={f.label} className={`foc-pill absolute z-[3] ${f.pos}`}>
                  <FocusPill f={f} />
                </div>
              ))}
            </div>

            {/* mobile/tablet: clean grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:hidden">
              {FOCUS.map(f => (
                <div key={f.label} className="foc-pill"><FocusPill f={f} /></div>
              ))}
            </div>
          </div>

          <div className="absolute -top-16 -end-16 h-52 w-52 rounded-full opacity-[0.12] pointer-events-none blur-2xl"
            style={{ background: 'radial-gradient(circle, var(--violet), transparent)' }}
          />
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
