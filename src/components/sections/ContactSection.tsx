'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import Motif from '@/components/sections/showcase/Motifs'
import { tint } from '@/components/sections/showcase/ShowcaseCards'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'sadatpour.web@gmail.com'
const EMAIL_ACCENT = '#00b89c'

const CHANNELS = [
  {
    label: 'GitHub', handle: 'github.com/Sadatpour', href: 'https://github.com/Sadatpour',
    color: '#a78bfa', motif: 'git',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'LinkedIn', handle: 'linkedin.com/in/sadatpour', href: 'https://linkedin.com/in/sadatpour',
    color: '#2f6bff', motif: 'network',
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
]

const MAIL_ICON = 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'

function ChannelIcon({ path, color }: { path: string; color: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      style={{ background: tint(color, 16), boxShadow: `inset 0 0 0 1px ${tint(color, 35)}`, color }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </span>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  )
}

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
      gsap.fromTo('.c-item', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: '.c-grid', start: 'top 82%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="section-wrap relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden
        style={{ background: `radial-gradient(50% 100% at 50% 0%, ${tint(EMAIL_ACCENT, 14)}, transparent 70%)` }}
      />

      <div className="section-container relative">
        <SectionHeader title={t('title')} subtitle={t('social_intro')} />

        <div className="c-grid mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          {/* ── Email: primary channel ── */}
          <a href={`mailto:${EMAIL}`}
            className="c-item sc-card sc-card-link group relative flex flex-col overflow-hidden rounded-[24px] border lg:col-span-2 lg:row-span-2"
            style={{ '--acc': EMAIL_ACCENT, background: 'var(--card)' } as CSSProperties}
          >
            <div className="relative h-48 sm:h-56 overflow-hidden"
              style={{ background: `radial-gradient(120% 100% at 60% 0%, ${tint(EMAIL_ACCENT, 22)}, transparent 72%)` }}
            >
              <div className="lineart-grid absolute inset-0 opacity-50" aria-hidden />
              <Motif motif="mail" className="absolute inset-0 h-full w-full p-5 transition-transform duration-700 group-hover:scale-[1.05]" style={{ color: EMAIL_ACCENT }} />
              <span className="absolute top-4 start-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm"
                style={{ background: tint(EMAIL_ACCENT, 14), boxShadow: `inset 0 0 0 1px ${tint(EMAIL_ACCENT, 35)}` }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: EMAIL_ACCENT }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: EMAIL_ACCENT }} />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: EMAIL_ACCENT }}>
                  {th('open_for_work')}
                </span>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(to top, var(--card), transparent)' }} aria-hidden />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ChannelIcon path={MAIL_ICON} color={EMAIL_ACCENT} />
                <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Email</span>
              </div>
              <span className="mt-4 block break-all font-mono text-[clamp(0.8rem,4.3vw,1.125rem)] sm:text-3xl font-black leading-tight" dir="ltr"
                style={{ color: 'var(--text)', textAlign: isRTL ? 'right' : 'left' }}
              >
                {EMAIL}
              </span>
              <p className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {t('location_note')}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                <div className="flex gap-2" dir="ltr">
                  {[{ label: '100% Remote', color: EMAIL_ACCENT }, { label: '< 24h Reply', color: 'var(--blue)' }].map(b => (
                    <span key={b.label} className="rounded-md px-2 py-1 font-mono text-[10px] font-bold" style={{ color: b.color, background: tint(b.color, 12) }}>
                      {b.label}
                    </span>
                  ))}
                </div>
                <span className="hero-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 group-hover:gap-3">
                  {th('cta_contact')}
                  <Arrow />
                </span>
              </div>
            </div>
          </a>

          {/* ── Social channels ── */}
          {CHANNELS.map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
              className="c-item sc-card sc-card-link group relative flex flex-col overflow-hidden rounded-[24px] border"
              style={{ '--acc': c.color, background: 'var(--card)' } as CSSProperties}
            >
              <div className="relative h-32 overflow-hidden"
                style={{ background: `radial-gradient(120% 100% at 60% 0%, ${tint(c.color, 20)}, transparent 72%)` }}
              >
                <div className="lineart-dots absolute inset-0 opacity-50" aria-hidden />
                <Motif motif={c.motif} className="absolute inset-0 h-full w-full py-3 transition-transform duration-700 group-hover:scale-[1.06]" style={{ color: c.color }} />
              </div>
              <div className="flex flex-1 items-center gap-3 p-5">
                <ChannelIcon path={c.icon} color={c.color} />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-black leading-tight" style={{ color: 'var(--text)' }}>{c.label}</span>
                  <span className="block truncate font-mono text-[11px]" dir="ltr" style={{ color: 'var(--text-muted)', textAlign: isRTL ? 'right' : 'left' }}>{c.handle}</span>
                </span>
                <span className="shrink-0 opacity-50 transition-all duration-300 group-hover:opacity-100" style={{ color: c.color }}>
                  <Arrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
