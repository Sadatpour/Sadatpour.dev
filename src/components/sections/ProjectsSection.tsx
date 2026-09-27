'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '@/lib/projects'
import { FILTER_META, getCategoryLabels, getTechIcon } from '@/lib/projectMeta'
import SectionHeader from '@/components/ui/SectionHeader'
import aiProjects from '@/data/ai-projects.json'
import wordpressProjects from '@/data/wordpress-projects.json'

gsap.registerPlugin(ScrollTrigger)

interface AiProject {
  title: Record<string, string>
  desc: Record<string, string>
  url: string
  tags: string[]
  icon: string
  featured?: boolean
}

interface WpProject {
  slug: string
  title: Record<string, string>
  url?: string
  featured?: boolean
  kind?: Record<string, string>
  desc?: Record<string, string>
  metric?: { value: string; label: Record<string, string> }
  tags: string[]
}

const AI_PROJECTS = aiProjects as AiProject[]
const AI_GOLD = '#7c5cff'
const AI_AMBER = '#2f6bff'

const WP_PROJECTS = wordpressProjects as WpProject[]
const WP_BLUE = '#21759B'
const WP_ACCENT = '#2b8cc4'

// Projects shown in the WordPress or AI blocks are left out of the "more projects" marquee.
const HIGHLIGHTED_SLUGS = new Set([...WP_PROJECTS.map(p => p.slug), 'otaghak-blog', 'sadatpour'])
const OTHER_PROJECTS = projects.filter(p => !HIGHLIGHTED_SLUGS.has(p.slug))

const AI_ICON_SVGS: Record<string, ReactNode> = {
  brain: (
    <>
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <path d="M50 18c-8 0-14 4-18 10-3 5-5 12-5 22s2 17 5 22c4 6 10 10 18 10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
      <path d="M50 18c8 0 14 4 18 10 3 5 5 12 5 22s-2 17-5 22c-4 6-10 10-18 10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.1" />
      <circle cx="32" cy="35" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="28" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="68" cy="35" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="68" r="4" fill="currentColor" opacity="0.3" />
      <path d="M32 35l18-7 18 7M32 35l6 25M50 28v40M68 35l-6 25" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
    </>
  ),
  game: (
    <>
      <rect x="18" y="32" width="64" height="36" rx="6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M28 50h4v12h-4zM36 56h4v6h-4zM52 44h4v18h-4z" fill="currentColor" opacity="0.3" />
      <circle cx="64" cy="50" r="4" fill="currentColor" opacity="0.35" />
      <path d="M18 46l-4-4v16l4-4M82 46l4-4v16l-4-4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12" />
    </>
  ),
  checklist: (
    <>
      <rect x="28" y="20" width="44" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M38 40l6 6 10-12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 55h16M38 62h24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />
      <rect x="44" y="28" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.12" />
    </>
  ),
  compass: (
    <>
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <path d="M50 8v8M50 84v8M8 50h8M84 50h8" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <path d="M64 36L54 54l-18 10 10-18z" fill="currentColor" opacity="0.28" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" opacity="0.45" />
    </>
  ),
  code: (
    <>
      <rect x="16" y="22" width="68" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M16 34h68" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <path d="M40 46l-10 8 10 8M60 46l10 8-10 8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M53 44l-6 20" stroke="currentColor" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
    </>
  ),
  rocket: (
    <>
      <path d="M50 14c10 8 14 20 14 32 0 6-1 12-3 17H39c-2-5-3-11-3-17 0-12 4-24 14-32z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.22" />
      <circle cx="50" cy="40" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="50" cy="40" r="2.5" fill="currentColor" opacity="0.3" />
      <path d="M36 52c-6 4-9 10-10 18 6-1 12-3 16-7M64 52c6 4 9 10 10 18-6-1-12-3-16-7" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <path d="M46 68c0 6 1 10 4 14 3-4 4-8 4-14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </>
  ),
}

function AiBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ background: 'rgba(124,92,255,0.12)', boxShadow: '0 0 0 1px rgba(124,92,255,0.25)' }}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke={AI_AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
      </svg>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: AI_AMBER }}>
        {label}
      </span>
    </span>
  )
}

function AiProjectCard({ proj, locale, visitLabel, big }: {
  proj: AiProject
  locale: string
  visitLabel: string
  big?: boolean
}) {
  const title = proj.title[locale] ?? proj.title.en
  const desc = proj.desc[locale] ?? proj.desc.en
  const icon = AI_ICON_SVGS[proj.icon] || AI_ICON_SVGS.brain

  return (
    <a
      href={proj.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`ai-card group relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
        big
          ? 'rounded-[28px] border-2 p-6 sm:p-8 lg:col-span-2 min-h-[220px] sm:min-h-[260px]'
          : 'rounded-2xl border p-5 sm:p-6 lg:col-span-1'
      }`}
      style={{
        background: big
          ? `linear-gradient(150deg, color-mix(in srgb, ${AI_GOLD} 7%, var(--card)), var(--card) 55%)`
          : 'var(--card)',
        borderColor: big ? 'rgba(124,92,255,0.35)' : 'var(--border)',
        boxShadow: big ? '0 12px 48px -18px rgba(124,92,255,0.25)' : undefined,
      }}
    >
      {/* line-art texture */}
      <div className={`${big ? 'lineart-grid' : 'lineart-dots'} absolute inset-0 opacity-50 pointer-events-none`} aria-hidden />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(600px circle at 50% 0%, rgba(124,92,255,${big ? 0.18 : 0.1}), transparent 70%)` }}
      />
      <div className={`absolute -top-8 ${big ? '-right-6 w-52 h-52' : '-right-8 w-36 h-36'} opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.14] group-hover:scale-110 group-hover:rotate-6`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" style={{ color: AI_GOLD }}>
          {icon}
        </svg>
      </div>
      {/* corner sparkline (big cards) */}
      {big && (
        <svg className="absolute bottom-0 left-0 right-0 h-16 w-full opacity-40 pointer-events-none" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id={`spk-${proj.icon}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AI_GOLD} stopOpacity="0.35" />
              <stop offset="100%" stopColor={AI_GOLD} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 45 C 30 20, 55 50, 85 32 S 140 8, 170 30 S 230 52, 265 22 S 295 30, 300 26 L300 60 L0 60 Z" fill={`url(#spk-${proj.icon})`} />
          <path d="M0 45 C 30 20, 55 50, 85 32 S 140 8, 170 30 S 230 52, 265 22 S 295 30, 300 26" fill="none" stroke={AI_GOLD} strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
      )}

      <div className="relative z-[1] flex items-center gap-2 mb-4">
        <AiBadge label="AI" />
        <div className="ml-auto flex gap-1">
          {proj.tags.slice(0, big ? 3 : 2).map(tag => (
            <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: 'rgba(124,92,255,0.08)', color: 'rgba(124,92,255,0.7)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h3 className={`relative z-[1] font-black mb-2 leading-tight ${big ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'}`}
        style={{ color: 'var(--text)' }}
      >
        {title}
      </h3>
      <p className={`relative z-[1] leading-relaxed ${big ? 'text-sm sm:text-base max-w-md' : 'text-xs sm:text-sm'}`}
        style={{ color: 'var(--text-secondary)' }}
      >
        {desc}
      </p>

      <div className="relative z-[1] mt-auto pt-4 flex items-center justify-between">
        <span className={`font-bold flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5 ${big ? 'text-xs' : 'text-[10px]'}`}
          style={{ color: AI_AMBER }}
        >
          {visitLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </span>
        {big && (
          <span className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: 'rgba(124,92,255,0.12)' }}>
            <span className="block h-full w-1/3 rounded-full transition-all duration-700 group-hover:w-full"
              style={{ background: `linear-gradient(90deg, ${AI_GOLD}, ${AI_AMBER})` }} />
          </span>
        )}
      </div>
    </a>
  )
}

function WpBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ background: `${WP_BLUE}1f`, boxShadow: `0 0 0 1px ${WP_BLUE}40` }}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke={WP_ACCENT} strokeWidth="2">
        <path d={FILTER_META.wordpress.icon} />
      </svg>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: WP_ACCENT }}>
        WordPress
      </span>
    </span>
  )
}

function ExternalArrow({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  )
}

function WpFeaturedCard({ proj, locale, visitLabel }: { proj: WpProject; locale: string; visitLabel: string }) {
  const title = proj.title[locale] ?? proj.title.en
  const kind = proj.kind?.[locale] ?? proj.kind?.en
  const desc = proj.desc?.[locale] ?? proj.desc?.en

  return (
    <a
      href={proj.url}
      target="_blank"
      rel="noopener noreferrer"
      className="wp-card group relative flex flex-col overflow-hidden rounded-[24px] border-2 p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2"
      style={{
        background: `linear-gradient(150deg, color-mix(in srgb, ${WP_BLUE} 9%, var(--card)), var(--card) 60%)`,
        borderColor: `${WP_BLUE}59`,
        boxShadow: `0 12px 48px -18px ${WP_BLUE}40`,
      }}
    >
      <div className="lineart-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(600px circle at 50% 0%, ${WP_BLUE}2e, transparent 70%)` }}
      />
      <div className="absolute -top-8 -right-8 w-44 h-44 opacity-[0.06] transition-all duration-700 group-hover:opacity-[0.12] group-hover:scale-110 group-hover:rotate-6" aria-hidden>
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke={WP_BLUE} strokeWidth="0.6">
          <path d={FILTER_META.wordpress.icon} />
        </svg>
      </div>

      <div className="relative z-[1] flex items-center gap-2 mb-4">
        <WpBadge />
        {kind && (
          <span className="ml-auto text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>{kind}</span>
        )}
      </div>

      <h3 className="relative z-[1] text-2xl sm:text-[1.7rem] font-black mb-2 leading-tight" style={{ color: 'var(--text)' }}>
        {title}
      </h3>
      {desc && (
        <p className="relative z-[1] text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {desc}
        </p>
      )}

      {proj.metric && (
        <div className="relative z-[1] mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-black tabular-nums" dir="ltr" style={{ color: WP_ACCENT }}>{proj.metric.value}</span>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {proj.metric.label[locale] ?? proj.metric.label.en}
          </span>
        </div>
      )}

      <div className="relative z-[1] mt-4 flex flex-wrap gap-1.5" dir="ltr">
        {proj.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-medium"
            style={{ background: `${WP_BLUE}14`, color: 'var(--text-secondary)', boxShadow: `0 0 0 1px ${WP_BLUE}26` }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="relative z-[1] mt-auto pt-5">
        <span className="text-xs font-bold inline-flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5" style={{ color: WP_ACCENT }}>
          {visitLabel}
          <ExternalArrow />
        </span>
      </div>
    </a>
  )
}

function WpCompactCard({ proj, locale }: { proj: WpProject; locale: string }) {
  const title = proj.title[locale] ?? proj.title.en
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${WP_BLUE}14`, boxShadow: `0 0 0 1px ${WP_BLUE}2e` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WP_ACCENT} strokeWidth="2">
          <path d={FILTER_META.wordpress.icon} />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-base font-bold" style={{ color: 'var(--text)' }}>
          <span className="truncate">{title}</span>
          {proj.url && (
            <span className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60 rtl:-scale-x-100" style={{ color: 'var(--text-muted)' }}>
              <ExternalArrow size={11} />
            </span>
          )}
        </span>
        <span className="mt-1.5 flex flex-wrap gap-1" dir="ltr">
          {proj.tags.map(tag => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: `${WP_BLUE}12`, color: 'var(--text-muted)' }}>
              {tag}
            </span>
          ))}
        </span>
      </span>
    </>
  )
  const className = 'wp-card group flex items-start gap-3 rounded-xl border p-4 transition-all duration-300'
  const style = { background: 'var(--card)', borderColor: 'var(--border)' }

  return proj.url ? (
    <a href={proj.url} target="_blank" rel="noopener noreferrer"
      className={`${className} hover:-translate-y-1 hover:border-[var(--border-strong)]`} style={style}>
      {body}
    </a>
  ) : (
    <div className={className} style={style}>{body}</div>
  )
}

function ClientProjectCard({ project, label, isRTL }: { project: Project; label: string; isRTL: boolean }) {
  const pm = FILTER_META[project.category] || FILTER_META.all
  const techIcons = project.tags.map(t => getTechIcon(t)).filter(Boolean).slice(0, 3)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="group flex w-80 shrink-0 items-center gap-3 rounded-xl border p-4 transition-all duration-300 hover:border-[var(--border-strong)] sm:w-96"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${pm.color}14`, boxShadow: `0 0 0 1px ${pm.color}2e` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pm.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={pm.icon} />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base sm:text-lg font-bold" style={{ color: 'var(--text)' }}>{project.title}</span>
        <span className="block truncate text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</span>
      </span>
      <span className="flex items-center gap-1.5 shrink-0">
        {techIcons.map((tech, idx) => tech && (
          <svg key={idx} width="13" height="13" viewBox={tech.viewBox || '0 0 24 24'} fill="none" stroke={tech.color} strokeWidth="2" opacity="0.7">
            <path d={tech.icon} />
          </svg>
        ))}
        <svg className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0 rtl:rotate-180"
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--text-muted)' }}
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </span>
    </a>
  )
}

export default function ProjectsSection() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)
  const labels = getCategoryLabels(locale)

  const featured = AI_PROJECTS.filter(p => p.featured)
  const rest = AI_PROJECTS.filter(p => !p.featured)
  const wpFeatured = WP_PROJECTS.filter(p => p.featured)
  const wpRest = WP_PROJECTS.filter(p => !p.featured)

  // 3 rows, alternating direction
  const ROWS = [
    { items: OTHER_PROJECTS.filter((_, i) => i % 3 === 0), anim: 'marquee-left', dur: 90 },
    { items: OTHER_PROJECTS.filter((_, i) => i % 3 === 1), anim: 'marquee-right', dur: 100 },
    { items: OTHER_PROJECTS.filter((_, i) => i % 3 === 2), anim: 'marquee-left', dur: 95 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      })
      gsap.fromTo('.wp-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.wp-block', start: 'top 78%' },
      })
      gsap.fromTo('.ai-card', { y: 40, opacity: 0, scale: 0.96 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.09, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ai-block', start: 'top 78%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projects" className="section-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* ── WordPress showcase ──────────────────────────────── */}
        <div className="wp-block relative mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full" style={{ background: `linear-gradient(180deg, ${WP_ACCENT}, ${WP_BLUE})` }} />
            <div>
              <span className="text-sm sm:text-base font-black uppercase tracking-[0.2em]" style={{ color: WP_ACCENT }}>
                {t('wp_title')}
              </span>
              <p className="text-[11px] sm:text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {t('wp_intro')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {wpFeatured.map(proj => (
              <WpFeaturedCard key={proj.slug} proj={proj} locale={locale} visitLabel={t('visit')} />
            ))}
          </div>
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {wpRest.map(proj => (
              <WpCompactCard key={proj.slug} proj={proj} locale={locale} />
            ))}
          </div>
        </div>

        {/* ── AI showcase ─────────────────────────────────────── */}
        <div className="ai-block relative mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full" style={{ background: `linear-gradient(180deg, ${AI_GOLD}, ${AI_AMBER})` }} />
            <div>
              <span className="text-sm sm:text-base font-black uppercase tracking-[0.2em]" style={{ color: AI_AMBER }}>
                {t('ai_vibe')}
              </span>
              <p className="text-[11px] sm:text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {t('ai_intro')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map(proj => (
              <AiProjectCard key={proj.url} proj={proj} locale={locale} visitLabel={t('visit')} big />
            ))}
            {rest.map(proj => (
              <AiProjectCard key={proj.url} proj={proj} locale={locale} visitLabel={t('visit')} />
            ))}
          </div>
        </div>

        {/* ── Other client projects: 3 horizontal auto-scroll rows ── */}
        <div className="mt-20 sm:mt-28 mb-8 sm:mb-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            {t('client_projects')}
          </h3>
          <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
            {t('client_intro')}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4" dir="ltr">
          {ROWS.map((row, ri) => (
            <div key={ri} className="marquee">
              <div
                className="marquee-track flex w-max items-stretch gap-3"
                style={{ animation: `${row.anim} ${row.dur}s linear infinite` }}
              >
                {[...row.items, ...row.items].map((project, i) => (
                  <ClientProjectCard
                    key={`${project.slug}-${i}`}
                    project={project}
                    label={labels[project.category]}
                    isRTL={isRTL}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
