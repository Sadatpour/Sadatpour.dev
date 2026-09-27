'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '@/components/ui/Navbar'
import SignatureStamp from '@/components/ui/SignatureStamp'
import CodeScrollCanvas from '@/components/canvas/CodeScrollCanvas'
import { ENABLE_CODE_CANVAS, HERO_VARIANT } from '@/lib/siteConfig'
import HeroSection from '@/components/sections/HeroSection'
import HeroSectionClassic from '@/components/sections/HeroSectionClassic'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import { useTranslations, useIsRTL } from '@/i18n/I18nProvider'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

export default function HomePage() {
  const tf = useTranslations('footer')
  const tnav = useTranslations('nav')
  const th = useTranslations('hero')
  const isRTL = useIsRTL()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
      if (saved) {
        setTheme(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    } catch {}
  }, [])

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let frame = 0
    let cancelled = false
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      const raf = (time: number) => {
        lenis?.raf(time)
        ScrollTrigger.update()
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    })
    return () => { cancelled = true; cancelAnimationFrame(frame); lenis?.destroy() }
  }, [])

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        let best: string | null = null
        let bestRatio = 0
        for (const id of SECTIONS) {
          const ratio = visible.get(id) ?? 0
          if (ratio > bestRatio) { best = id; bestRatio = ratio }
        }
        if (best) setActiveSection(best)
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch {}
  }

  return (
    <>
      {ENABLE_CODE_CANVAS && <CodeScrollCanvas />}
      <div className="noise-overlay" aria-hidden />
      <Navbar theme={theme} onThemeToggle={toggleTheme} activeSection={activeSection} />

      <main className="relative z-20 w-full max-sm:pt-[60px]">
        {HERO_VARIANT === 'classic' ? <HeroSectionClassic /> : <HeroSection />}
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <footer className="relative z-20 mt-24 px-4 pb-8 sm:mt-32 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[32px] border px-6 py-10 sm:px-10 sm:py-12"
            style={{
              background: 'color-mix(in srgb, var(--card) 82%, transparent)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="lineart-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
            <div className="absolute inset-x-10 top-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, var(--cta), var(--violet), transparent)' }} />
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--violet), transparent 70%)' }} aria-hidden />

            <div className="relative flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex flex-col gap-3 sm:max-w-xs" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <SignatureStamp className="max-w-[150px] opacity-80 hover:opacity-100 transition-opacity" loop />
                <p className="text-xs leading-6" style={{ color: 'var(--text-muted)' }}>
                  {tf('bio')}
                </p>
                <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1"
                  style={{ borderColor: 'color-mix(in srgb, var(--brand) 40%, transparent)', background: 'color-mix(in srgb, var(--brand) 10%, transparent)' }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand)' }} />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
                    {th('open_for_work')}
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  {tf('navigate')}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {['about', 'skills', 'projects', 'experience', 'contact'].map(id => (
                    <a key={id} href={`#${id}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 hover:text-[var(--cta)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="h-1 w-1 rounded-full transition-all duration-300 group-hover:w-3" style={{ background: 'var(--cta)' }} />
                      {tnav(id)}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3" style={{ textAlign: isRTL ? 'right' : 'left' }} dir="ltr">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Connect
                </p>
                {[
                  { label: 'GitHub', href: 'https://github.com/Sadatpour' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/sadatpour' },
                  { label: 'sadatpour.web@gmail.com', href: 'mailto:sadatpour.web@gmail.com' },
                ].map(l => (
                  <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-xs transition-colors duration-300 hover:text-[var(--text)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {l.label}
                    <svg className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-70 group-hover:translate-x-0"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row" style={{ borderColor: 'var(--border)' }}>
              <p className="flex items-center gap-1 text-[11px] font-medium tracking-wide" style={{ color: 'var(--text-muted)' }} dir="ltr">
                &copy; {new Date().getFullYear()} {tf('crafted_pfx')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--cta)" className="mx-0.5 align-middle">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {tf('crafted_sfx')}
              </p>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--cta)]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                aria-label="Scroll to top"
              >
                {th('scroll')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
