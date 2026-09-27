'use client'

import { useEffect, useRef } from 'react'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '@/lib/projects'
import { FILTER_META, getCategoryLabels, getTechIcon } from '@/lib/projectMeta'
import SectionHeader from '@/components/ui/SectionHeader'
import WordPressShowcase, { WP_PROJECTS } from '@/components/sections/showcase/WordPressShowcase'
import AiShowcase from '@/components/sections/showcase/AiShowcase'

gsap.registerPlugin(ScrollTrigger)

// Projects shown in the WordPress or AI blocks are left out of the "more projects" list.
const HIGHLIGHTED_SLUGS = new Set([...WP_PROJECTS.map(p => p.slug), 'otaghak-blog', 'sadatpour'])
const OTHER_PROJECTS = projects.filter(p => !HIGHLIGHTED_SLUGS.has(p.slug))

function ClientProjectCard({ project, label, isRTL }: { project: Project; label: string; isRTL: boolean }) {
  const pm = FILTER_META[project.category] || FILTER_META.all
  const techIcons = project.tags.map(t => getTechIcon(t)).filter(Boolean).slice(0, 3)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="group flex w-full max-w-sm items-center gap-3 rounded-xl border p-4 transition-all duration-300 hover:border-[var(--border-strong)] sm:w-96"
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      })
      gsap.utils.toArray<HTMLElement>('.sc-block').forEach(block => {
        gsap.fromTo(block.querySelectorAll('.sc-card'), { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: block, start: 'top 78%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projects" className="section-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <WordPressShowcase />
        <AiShowcase />

        {OTHER_PROJECTS.length > 0 && (
          <>
            <div className="mt-20 sm:mt-24 mb-6 sm:mb-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
                {t('client_projects')}
              </h3>
              <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                {t('client_intro')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {OTHER_PROJECTS.map(project => (
                <ClientProjectCard key={project.slug} project={project} label={labels[project.category]} isRTL={isRTL} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
