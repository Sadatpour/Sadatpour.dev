'use client'

import { useEffect, useRef } from 'react'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import SectionHeader from '@/components/ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPS = [
  { key: 'nerkhito', name: 'Nerkhito', color: '#2F6BFF', tags: ['WordPress', 'PHP', 'JavaScript'],
    icon: 'M20 7h-4V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM9 5h6v2H9V5z' },
  { key: 'otaghak', name: 'Otaghak', color: '#F05032', tags: ['WordPress', 'SEO', 'CSS'],
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z' },
  { key: 'dalili', name: 'Dalili Group', color: '#E53935', tags: ['WordPress', 'Elementor', 'CSS'],
    icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z' },
  { key: 'shatel', name: 'Shatel', color: '#7C5CFF', tags: ['E-Commerce', 'Support', 'Digital Products'],
    icon: 'M5 12a7 7 0 1 1 14 0M5 12a7 7 0 0 0 14 0M12 2v20M2 12h20' },
  { key: 'freelance', name: 'Freelance', color: '#00d4aa', tags: ['React', 'Next.js', 'UI Motion'],
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
]

export default function ExperienceSection() {
  const t = useTranslations('experience')
  const isRTL = useIsRTL()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sh-head', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      })
      gsap.fromTo('.xp-item', { y: 40, opacity: 0, scale: 0.96 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.xp-grid', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="experience" className="section-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-container">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="xp-grid grid gap-3 sm:gap-4 lg:grid-cols-2">
          {EXPS.map((exp, i) => (
            <div
              key={exp.key}
              className={`xp-item group relative overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                EXPS.length % 2 === 1 && i === EXPS.length - 1 ? 'lg:col-span-2' : ''
              }`}
              style={{
                background: 'color-mix(in srgb, var(--card) 80%, transparent)',
                borderColor: 'var(--border)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="lineart-dots absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(500px circle at 0% 0%, ${exp.color}22 0%, transparent 65%)` }}
              />

              {/* decorative activity bar-graph */}
              <div className="absolute bottom-4 end-4 flex items-end gap-1 opacity-60 pointer-events-none" aria-hidden dir="ltr">
                {[9, 16, 11, 22, 14, 26, 18].map((hRaw, bi) => (
                  <span key={bi} className="w-1.5 rounded-sm transition-all duration-500 group-hover:opacity-100"
                    style={{ height: hRaw, background: `linear-gradient(180deg, ${exp.color}, ${exp.color}55)`, opacity: 0.4 + bi * 0.08 }}
                  />
                ))}
              </div>

              <div className="flex items-start justify-between gap-2 mb-3 relative">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${exp.color}1e`, boxShadow: `0 0 0 1px ${exp.color}40` }}
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={exp.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={exp.icon} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text)' }}>
                      {exp.name}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: exp.color }}>
                      {t(`${exp.key}.role`)}
                    </p>
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold"
                  style={{ borderColor: `${exp.color}55`, color: exp.color, fontVariantNumeric: 'tabular-nums' }}
                >
                  {t(`${exp.key}.period`)}
                </span>
              </div>

              <p className="text-xs sm:text-sm mb-3 leading-6 relative ps-[56px]" style={{ color: 'var(--text-secondary)' }}>
                {t(`${exp.key}.summary`)}
              </p>

              <div className="flex flex-wrap gap-1.5 relative ps-[56px]">
                {exp.tags.map(tag => (
                  <span key={tag} className="badge" style={{ borderColor: 'var(--border)' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
