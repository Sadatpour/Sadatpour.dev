'use client'

import { useEffect, useRef } from 'react'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'sadatpour.web@gmail.com'

const SOCIALS = [
  {
    label: 'GitHub', handle: '@Sadatpour', href: 'https://github.com/Sadatpour',
    color: '#a78bfa',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'LinkedIn', handle: 'in/sadatpour', href: 'https://linkedin.com/in/sadatpour',
    color: '#2f6bff',
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'Email', handle: 'sadatpour.web', href: `mailto:${EMAIL}`,
    color: '#00d4aa',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  },
]

export default function ContactSection() {
  const t = useTranslations('contact')
  const th = useTranslations('hero')
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      })
      gsap.fromTo('.c-item', { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.c-grid', start: 'top 82%' },
      })
      gsap.fromTo('.c-cta', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.c-cta', start: 'top 88%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="section-wrap relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden
        style={{ background: 'radial-gradient(50% 100% at 50% 0%, color-mix(in srgb, var(--violet) 16%, transparent), transparent 70%)' }}
      />

      <div className="section-container relative">
        <SectionHeader title={t('title')} subtitle={t('social_intro')} />

        {/* ── 3 social cards ── */}
        <div className="c-grid mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" dir="ltr">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="c-item group relative overflow-hidden rounded-3xl border p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: 'color-mix(in srgb, var(--card) 80%, transparent)',
                borderColor: 'var(--border)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="lineart-dots absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(420px circle at 50% 0%, ${s.color}22, transparent 65%)` }}
              />
              <span
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(145deg, ${s.color}22, ${s.color}08)`,
                  boxShadow: `0 0 0 1px ${s.color}33`,
                  color: s.color,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </span>

              <span className="relative min-w-0 flex-1">
                <span className="block text-base font-bold" style={{ color: 'var(--text)' }}>{s.label}</span>
                <span className="block truncate font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{s.handle}</span>
              </span>

              <svg className="relative h-4 w-4 shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          ))}
        </div>

        {/* ── CTA card below (compact, no duplicated title) ── */}
        <a href={`mailto:${EMAIL}`}
          className="c-cta group relative mx-auto mt-3 flex max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-3xl border p-6 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
          style={{
            borderColor: 'color-mix(in srgb, var(--violet) 40%, transparent)',
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--violet) 16%, var(--card)), color-mix(in srgb, var(--blue) 10%, var(--card)) 60%, var(--card))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="lineart-grid absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
          <div className="pointer-events-none absolute -top-24 -end-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--brand), transparent)' }}
          />
          {/* live availability signal line-art chart */}
          <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-50" viewBox="0 0 500 80" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="avail-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 60 L80 60 L110 60 L130 30 L150 60 L200 60 L230 60 L250 18 L270 60 L340 60 L360 60 L380 40 L400 60 L500 60 L500 80 L0 80 Z" fill="url(#avail-fill)" />
            <path d="M0 60 L80 60 L110 60 L130 30 L150 60 L200 60 L230 60 L250 18 L270 60 L340 60 L360 60 L380 40 L400 60 L500 60" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeOpacity="0.7" />
          </svg>

          <div className="relative text-center sm:text-start">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1"
              style={{ borderColor: 'color-mix(in srgb, var(--brand) 40%, transparent)', background: 'color-mix(in srgb, var(--brand) 10%, transparent)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand)' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand)' }} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--brand)' }}>
                {th('open_for_work')}
              </span>
            </div>
            {/* live metric badges (packetraft-style) */}
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start" dir="ltr">
              <span className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold"
                style={{ color: 'var(--brand)', background: 'color-mix(in srgb, var(--brand) 12%, transparent)' }}
              >
                100% Remote
              </span>
              <span className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold"
                style={{ color: 'var(--blue)', background: 'color-mix(in srgb, var(--blue) 12%, transparent)' }}
              >
                &lt; 24h Reply
              </span>
            </div>
            <p className="flex items-center justify-center gap-2 text-xs sm:text-sm sm:justify-start" style={{ color: 'var(--text-secondary)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t('location_note')}
            </p>
          </div>

          <span className="hero-cta relative inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-300" dir="ltr">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
            </svg>
            {EMAIL}
          </span>
        </a>
      </div>
    </section>
  )
}
