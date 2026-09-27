'use client'

import type { CSSProperties } from 'react'
import { useLocale, useTranslations } from '@/i18n/I18nProvider'
import { FILTER_META } from '@/lib/projectMeta'
import wordpressProjects from '@/data/wordpress-projects.json'
import WpMotif from './WpMotifs'

export interface WpProject {
  slug: string
  title: Record<string, string>
  accent: string
  motif: string
  kind?: Record<string, string>
  url?: string
  featured?: boolean
  desc?: Record<string, string>
  metric?: { value: string; label: Record<string, string> }
  tags: string[]
}

export const WP_PROJECTS = wordpressProjects as WpProject[]

const WP_BLUE = '#21759B'
const WP_ACCENT = '#2b8cc4'

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`
const pick = (map: Record<string, string> | undefined, locale: string) => map?.[locale] ?? map?.en

function displayDomain(url: string) {
  const { host, pathname } = new URL(url)
  return host.replace(/^www\./, '') + pathname.replace(/\/$/, '')
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  )
}

function CardShell({ proj, className, children }: { proj: WpProject; className: string; children: React.ReactNode }) {
  const style = { '--acc': proj.accent, background: 'var(--card)' } as CSSProperties
  const cls = `wp-card group relative flex overflow-hidden border transition-all duration-500 ${className}`
  return proj.url ? (
    <a href={proj.url} target="_blank" rel="noopener noreferrer" className={`${cls} wp-card-link`} style={style}>{children}</a>
  ) : (
    <div className={cls} style={style}>{children}</div>
  )
}

function KindPill({ proj, locale }: { proj: WpProject; locale: string }) {
  const kind = pick(proj.kind, locale)
  if (!kind) return null
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-bold backdrop-blur-sm"
      style={{ background: tint(proj.accent, 14), color: proj.accent, boxShadow: `inset 0 0 0 1px ${tint(proj.accent, 30)}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: proj.accent }} />
      {kind}
    </span>
  )
}

function FeaturedCard({ proj, index, locale, visitLabel, hero, className }: {
  proj: WpProject
  index: number
  locale: string
  visitLabel: string
  hero?: boolean
  className: string
}) {
  const title = pick(proj.title, locale)
  const desc = pick(proj.desc, locale)
  const heroMetric = hero && !!proj.metric

  return (
    <CardShell proj={proj} className={`flex-col rounded-[26px] ${className}`}>
      {/* Visual */}
      <div className={`relative overflow-hidden ${hero ? 'h-80 sm:h-80 lg:h-auto lg:flex-1 lg:min-h-[260px]' : 'h-36 sm:h-40'}`}
        style={{ background: `radial-gradient(120% 90% at 70% 10%, ${tint(proj.accent, 20)}, transparent 70%)` }}
      >
        <div className="lineart-dots absolute inset-0 opacity-60" aria-hidden />
        <WpMotif motif={proj.motif}
          className={`absolute inset-x-0 bottom-0 w-full transition-transform duration-700 group-hover:scale-[1.04] ${hero ? 'h-[55%] sm:h-[62%] lg:h-[72%] px-4 sm:px-8 origin-bottom' : 'top-0 h-full p-4 sm:p-5'}`}
          style={{ color: proj.accent }}
        />
        {heroMetric && proj.metric && (
          <div className="absolute inset-x-0 top-16 sm:top-20 flex flex-col items-start px-6 sm:px-8">
            <div className="w-fit text-6xl sm:text-7xl font-black leading-none tabular-nums" dir="ltr"
              style={{ color: proj.accent, textShadow: `0 0 40px ${tint(proj.accent, 45)}` }}>
              {proj.metric.value}
            </div>
            <div className="mt-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{pick(proj.metric.label, locale)}</div>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
          <KindPill proj={proj} locale={locale} />
          <span className="font-mono text-xs font-bold tabular-nums" dir="ltr" style={{ color: tint(proj.accent, 80) }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(to top, var(--card), transparent)' }} aria-hidden />
      </div>

      {/* Content */}
      <div className={`relative flex flex-col ${hero ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className={`font-black leading-tight ${hero ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`} style={{ color: 'var(--text)' }}>
            {title}
          </h3>
          {proj.url && (
            <span className="font-mono text-[11px] truncate" dir="ltr" style={{ color: 'var(--text-muted)' }}>{displayDomain(proj.url)}</span>
          )}
        </div>

        {desc && (
          <p className={`mt-3 leading-relaxed ${hero ? 'text-sm sm:text-base max-w-xl' : 'text-sm line-clamp-3'}`} style={{ color: 'var(--text-secondary)' }}>
            {desc}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          {proj.metric && !heroMetric ? (
            <div className="flex items-baseline gap-2">
              <span className={`font-black tabular-nums leading-none ${hero ? 'text-4xl sm:text-5xl' : 'text-3xl'}`} dir="ltr" style={{ color: proj.accent }}>
                {proj.metric.value}
              </span>
              <span className="text-xs font-medium max-w-[9rem]" style={{ color: 'var(--text-muted)' }}>{pick(proj.metric.label, locale)}</span>
            </div>
          ) : <span />}
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5"
            style={{ background: tint(proj.accent, 12), color: proj.accent }}
          >
            {visitLabel}
            <ArrowIcon size={12} />
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5 border-t pt-4" dir="ltr" style={{ borderColor: 'var(--border)' }}>
          {proj.tags.map(tag => (
            <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ background: 'var(--card-hover)', color: 'var(--text-secondary)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

function CompactCard({ proj, index, locale }: { proj: WpProject; index: number; locale: string }) {
  const title = pick(proj.title, locale)

  return (
    <CardShell proj={proj} className="flex-col rounded-2xl lg:col-span-4">
      <div className="relative h-28 overflow-hidden" style={{ background: `radial-gradient(90% 120% at 50% 0%, ${tint(proj.accent, 16)}, transparent 75%)` }}>
        <div className="lineart-dots absolute inset-0 opacity-50" aria-hidden />
        <WpMotif motif={proj.motif}
          className="absolute inset-0 h-full w-full py-3 transition-transform duration-700 group-hover:scale-110"
          style={{ color: proj.accent }}
        />
        <span className="absolute top-3 start-4 font-mono text-[10px] font-bold tabular-nums" dir="ltr" style={{ color: tint(proj.accent, 85) }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <KindPill proj={proj} locale={locale} />
          {proj.url && (
            <span className="shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100" style={{ color: proj.accent }}>
              <ArrowIcon />
            </span>
          )}
        </div>
        <h4 className="mt-2 truncate text-lg font-black leading-tight" style={{ color: 'var(--text)' }}>{title}</h4>
        {proj.url && (
          <span className="block truncate font-mono text-[10px]" dir="ltr" style={{ color: 'var(--text-muted)' }}>{displayDomain(proj.url)}</span>
        )}
        <div className="mt-auto flex flex-wrap gap-1 pt-3" dir="ltr">
          {proj.tags.map(tag => (
            <span key={tag} className="rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ background: 'var(--card-hover)', color: 'var(--text-muted)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

export default function WordPressShowcase() {
  const t = useTranslations('projects')
  const th = useTranslations('hero')
  const locale = useLocale()

  const featured = WP_PROJECTS.filter(p => p.featured)
  const rest = WP_PROJECTS.filter(p => !p.featured)
  const featuredLayout = ['md:col-span-2 lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5']

  return (
    <div className="wp-block relative mb-20 sm:mb-28">
      {/* Header */}
      <div className="relative mb-8 sm:mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: tint(WP_BLUE, 12), boxShadow: `inset 0 0 0 1px ${tint(WP_BLUE, 30)}` }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={WP_ACCENT} strokeWidth="2">
              <path d={FILTER_META.wordpress.icon} />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: WP_ACCENT }}>WordPress</span>
          </span>
          <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            {t('wp_title')}
          </h3>
          <p className="mt-2 max-w-lg text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>{t('wp_intro')}</p>
        </div>

        <div className="flex gap-3">
          {[
            { value: String(WP_PROJECTS.length).padStart(2, '0'), label: th('projects') },
            { value: '15+', label: th('years_exp') },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl border px-5 py-3 text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="text-2xl sm:text-3xl font-black tabular-nums" dir="ltr" style={{ color: WP_ACCENT }}>{stat.value}</div>
              <div className="mt-0.5 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {featured.map((proj, i) => (
          <FeaturedCard key={proj.slug} proj={proj} index={i} locale={locale} visitLabel={t('visit')}
            hero={i === 0} className={featuredLayout[i] ?? 'lg:col-span-4'} />
        ))}
        {rest.map((proj, i) => (
          <CompactCard key={proj.slug} proj={proj} index={featured.length + i} locale={locale} />
        ))}
      </div>
    </div>
  )
}
