'use client'

import { useLocale, useTranslations } from '@/i18n/I18nProvider'
import aiProjects from '@/data/ai-projects.json'
import { CompactCard, FeaturedCard, ShowcaseHeader, type ShowcaseProject } from './ShowcaseCards'

export const AI_PROJECTS = aiProjects as ShowcaseProject[]

const AI_ACCENT = '#7c5cff'

export default function AiShowcase() {
  const t = useTranslations('projects')
  const locale = useLocale()

  const featured = AI_PROJECTS.filter(p => p.featured)
  const rest = AI_PROJECTS.filter(p => !p.featured)

  return (
    <div className="sc-block relative mb-14 sm:mb-16">
      <ShowcaseHeader
        badge="AI"
        badgeColor={AI_ACCENT}
        icon={<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg>}
        title={t('ai_vibe')}
        intro={t('ai_intro')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featured.map((proj, i) => (
          <FeaturedCard key={proj.slug} proj={proj} index={i} locale={locale} visitLabel={t('visit')} className="sm:col-span-2 lg:col-span-2" />
        ))}
        {rest.map((proj, i) => (
          <CompactCard key={proj.slug} proj={proj} index={featured.length + i} locale={locale} />
        ))}
      </div>
    </div>
  )
}
