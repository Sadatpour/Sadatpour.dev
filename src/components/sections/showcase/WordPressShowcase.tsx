'use client'

import { useLocale, useTranslations } from '@/i18n/I18nProvider'
import { FILTER_META } from '@/lib/projectMeta'
import wordpressProjects from '@/data/wordpress-projects.json'
import { CompactCard, FeaturedCard, MiniCard, ShowcaseHeader, type ShowcaseProject } from './ShowcaseCards'

type WpProject = ShowcaseProject & { more?: boolean }

export const WP_PROJECTS = wordpressProjects as WpProject[]

const WP_ACCENT = '#2b8cc4'

export default function WordPressShowcase() {
  const t = useTranslations('projects')
  const th = useTranslations('hero')
  const locale = useLocale()

  // Resume projects first (featured, then compact); other WordPress work follows as mini cards.
  const featured = WP_PROJECTS.filter(p => p.featured)
  const resume = WP_PROJECTS.filter(p => !p.featured && !p.more)
  const more = WP_PROJECTS.filter(p => p.more)

  return (
    <div className="sc-block relative mb-20 sm:mb-28">
      <ShowcaseHeader
        badge="WordPress"
        badgeColor={WP_ACCENT}
        icon={<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d={FILTER_META.wordpress.icon} /></svg>}
        title={t('wp_title')}
        intro={t('wp_intro')}
        stats={[
          { value: `${WP_PROJECTS.length}+`, label: th('projects') },
          { value: '15+', label: th('years_exp') },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featured.map((proj, i) => (
          <FeaturedCard key={proj.slug} proj={proj} index={i} locale={locale} visitLabel={t('visit')}
            className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''} />
        ))}
        {resume.map((proj, i) => (
          <CompactCard key={proj.slug} proj={proj} index={featured.length + i} locale={locale} />
        ))}
      </div>

      {more.length > 0 && (
        <>
          <div className="mt-12 sm:mt-14 mb-5 flex items-center gap-4">
            <h4 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text)' }}>{t('wp_more')}</h4>
            <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {more.map((proj, i) => (
              <MiniCard key={proj.slug} proj={proj} index={featured.length + resume.length + i} locale={locale} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
