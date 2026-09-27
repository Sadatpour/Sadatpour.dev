'use client'

import type { CSSProperties, ReactNode } from 'react'
import Motif from './Motifs'

type Localized = Record<string, string>

export interface ShowcaseProject {
  slug: string
  title: Localized
  accent: string
  motif: string
  kind?: Localized
  url?: string
  featured?: boolean
  desc?: Localized
  metric?: { value: string; label: Localized }
  tags: string[]
}

export const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`
export const pick = (map: Localized | undefined, locale: string) => map?.[locale] ?? map?.en

const indexLabel = (index: number) => String(index + 1).padStart(2, '0')

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

function CardShell({ proj, className, children }: { proj: ShowcaseProject; className: string; children: ReactNode }) {
  const style = { '--acc': proj.accent, background: 'var(--card)' } as CSSProperties
  const cls = `sc-card group relative flex flex-col overflow-hidden border transition-all duration-500 ${className}`
  return proj.url ? (
    <a href={proj.url} target="_blank" rel="noopener noreferrer" className={`${cls} sc-card-link`} style={style}>{children}</a>
  ) : (
    <div className={cls} style={style}>{children}</div>
  )
}

function KindPill({ proj, locale, small }: { proj: ShowcaseProject; locale: string; small?: boolean }) {
  const kind = pick(proj.kind, locale)
  if (!kind) return null
  return (
    <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full font-bold backdrop-blur-sm ${small ? 'px-2 py-0.5 text-[9px] sm:text-[10px]' : 'px-2.5 py-1 text-[10px] sm:text-[11px]'}`}
      style={{ background: tint(proj.accent, 14), color: proj.accent, boxShadow: `inset 0 0 0 1px ${tint(proj.accent, 30)}` }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: proj.accent }} />
      <span className="truncate">{kind}</span>
    </span>
  )
}

function Visual({ proj, index, className, padding, children }: {
  proj: ShowcaseProject
  index: number
  className: string
  padding: string
  children?: ReactNode
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 100% at 60% 0%, ${tint(proj.accent, 18)}, transparent 72%)` }}
    >
      <div className="lineart-dots absolute inset-0 opacity-50" aria-hidden />
      <Motif motif={proj.motif}
        className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.06] ${padding}`}
        style={{ color: proj.accent }}
      />
      <span className="absolute top-3 end-4 font-mono text-[10px] sm:text-xs font-bold tabular-nums" dir="ltr" style={{ color: tint(proj.accent, 85) }}>
        {indexLabel(index)}
      </span>
      {children}
    </div>
  )
}

function Tags({ tags, small }: { tags: string[]; small?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1" dir="ltr">
      {tags.map(tag => (
        <span key={tag} className={`rounded font-medium ${small ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]'}`}
          style={{ background: 'var(--card-hover)', color: small ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

/** Large card: illustration, description, metric and a visit button. */
export function FeaturedCard({ proj, index, locale, visitLabel, className = '' }: {
  proj: ShowcaseProject
  index: number
  locale: string
  visitLabel: string
  className?: string
}) {
  const desc = pick(proj.desc, locale)

  return (
    <CardShell proj={proj} className={`rounded-[24px] ${className}`}>
      <Visual proj={proj} index={index} className="h-36 sm:h-40" padding="p-4 sm:p-5">
        <div className="absolute top-3 start-4"><KindPill proj={proj} locale={locale} /></div>
        <div className="absolute inset-x-0 bottom-0 h-14" style={{ background: 'linear-gradient(to top, var(--card), transparent)' }} aria-hidden />
      </Visual>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl sm:text-2xl font-black leading-tight" style={{ color: 'var(--text)' }}>{pick(proj.title, locale)}</h3>
          {proj.url && (
            <span className="truncate font-mono text-[11px]" dir="ltr" style={{ color: 'var(--text-muted)' }}>{displayDomain(proj.url)}</span>
          )}
        </div>
        {desc && (
          <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
        )}

        <div className="mt-auto pt-5 flex flex-wrap items-end justify-between gap-4">
          {proj.metric ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tabular-nums leading-none" dir="ltr" style={{ color: proj.accent }}>{proj.metric.value}</span>
              <span className="max-w-[9rem] text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{pick(proj.metric.label, locale)}</span>
            </div>
          ) : <span />}
          {proj.url && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5"
              style={{ background: tint(proj.accent, 12), color: proj.accent }}
            >
              {visitLabel}
              <ArrowIcon size={12} />
            </span>
          )}
        </div>

        <div className="mt-5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
          <Tags tags={proj.tags} />
        </div>
      </div>
    </CardShell>
  )
}

/** Medium card: illustration strip, type, title, domain, optional short description. */
export function CompactCard({ proj, index, locale, className = '' }: {
  proj: ShowcaseProject
  index: number
  locale: string
  className?: string
}) {
  const desc = pick(proj.desc, locale)

  return (
    <CardShell proj={proj} className={`rounded-2xl ${className}`}>
      <Visual proj={proj} index={index} className="h-28" padding="py-3" />
      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <KindPill proj={proj} locale={locale} />
          {proj.url && (
            <span className="shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100" style={{ color: proj.accent }}>
              <ArrowIcon />
            </span>
          )}
        </div>
        <h4 className="mt-2 truncate text-lg font-black leading-tight" style={{ color: 'var(--text)' }}>{pick(proj.title, locale)}</h4>
        {proj.url && (
          <span className="block truncate font-mono text-[10px]" dir="ltr" style={{ color: 'var(--text-muted)' }}>{displayDomain(proj.url)}</span>
        )}
        {desc && (
          <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
        )}
        <div className="mt-auto pt-3"><Tags tags={proj.tags} small /></div>
      </div>
    </CardShell>
  )
}

/** Small card for secondary projects: illustration, type and title. */
export function MiniCard({ proj, index, locale }: { proj: ShowcaseProject; index: number; locale: string }) {
  return (
    <CardShell proj={proj} className="rounded-2xl">
      <Visual proj={proj} index={index} className="h-20 sm:h-24" padding="py-2" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <div className="flex min-w-0"><KindPill proj={proj} locale={locale} small /></div>
        <h4 className="text-sm sm:text-base font-black leading-tight line-clamp-2" style={{ color: 'var(--text)' }}>{pick(proj.title, locale)}</h4>
        {proj.url && (
          <span className="mt-auto block truncate font-mono text-[9px] sm:text-[10px]" dir="ltr" style={{ color: 'var(--text-muted)' }}>{displayDomain(proj.url)}</span>
        )}
      </div>
    </CardShell>
  )
}

/** Block header: badge, title, intro and optional stat tiles. */
export function ShowcaseHeader({ badge, badgeColor, icon, title, intro, stats = [] }: {
  badge: string
  badgeColor: string
  icon: ReactNode
  title: string
  intro: string
  stats?: { value: string; label: string }[]
}) {
  return (
    <div className="relative mb-8 sm:mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{ background: tint(badgeColor, 12), boxShadow: `inset 0 0 0 1px ${tint(badgeColor, 30)}`, color: badgeColor }}
        >
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{badge}</span>
        </span>
        <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: 'var(--text)' }}>{title}</h3>
        <p className="mt-2 max-w-lg text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>{intro}</p>
      </div>
      {stats.length > 0 && (
        <div className="flex gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-2xl border px-5 py-3 text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="text-2xl sm:text-3xl font-black tabular-nums" style={{ color: badgeColor }}>{stat.value}</div>
              <div className="mt-0.5 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
