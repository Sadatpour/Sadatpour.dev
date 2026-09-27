'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations, useIsRTL } from '@/i18n/I18nProvider'
import { usePathname } from 'next/navigation'
import { LOCALES } from '@/lib/locales'

type Props = { theme: 'dark' | 'light'; onThemeToggle: () => void; activeSection: string }

export default function Navbar({ theme, onThemeToggle, activeSection }: Props) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isRTL = useIsRTL()
  const isDark = theme === 'dark'

  const items = useMemo(() => [
    { id: 'hero', key: 'home' },
    { id: 'about', key: 'about' },
    { id: 'skills', key: 'skills' },
    { id: 'projects', key: 'projects' },
    { id: 'experience', key: 'experience' },
    { id: 'contact', key: 'contact' },
  ], [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const close = () => setLangOpen(false)
    const t = setTimeout(() => document.addEventListener('click', close), 0)
    return () => { clearTimeout(t); document.removeEventListener('click', close) }
  }, [langOpen])

  const switchLocale = (next: string) => {
    setLangOpen(false)
    setMenuOpen(false)
    try { localStorage.setItem('locale', next) } catch {}
    const segs = pathname.split('/')
    segs[1] = next
    window.location.href = segs.join('/')
  }

  return (
    <nav dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 border-b px-4 py-2.5 transition-all duration-300 max-sm:mb-[60px] ${scrolled ? 'glass-header' : 'border-transparent'}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3">
        <Link href={`/${locale}#hero`} className="flex items-center shrink-0">
          <Image src="/MY-Signture.png" alt="Sadatpour" width={240} height={60}
            className="h-11 w-auto object-contain sm:h-12" style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
        </Link>

        <div className="hidden md:flex items-center gap-0.5 rounded-xl border p-1"
          style={{ borderColor: 'color-mix(in srgb, var(--border) 60%, transparent)', background: 'color-mix(in srgb, var(--bg-2) 40%, transparent)' }}
        >
          {items.map((item) => {
            const active = activeSection === item.id
            return (
              <a key={item.id} href={`#${item.id}`}
                className="relative rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-300"
                style={{
                  color: active ? '#fff' : 'var(--text-secondary)',
                  background: active ? 'linear-gradient(180deg, var(--cta), color-mix(in srgb, var(--cta) 80%, #000))' : 'transparent',
                  boxShadow: active ? '0 6px 18px -8px var(--cta)' : 'none',
                }}
              >
                {t(item.key)}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={onThemeToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <div className="relative">
            <button type="button" onClick={() => setLangOpen(v => !v)}
              className="flex h-9 items-center gap-1 px-3 rounded-lg border-2 text-sm font-medium transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              {LOCALES.find(l => l.code === locale)?.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div
                className="glass-panel absolute top-12 z-50 min-w-[150px] overflow-hidden rounded-xl border"
                style={{ [isRTL ? 'left' : 'right']: 0 }}
              >
                {LOCALES.map((item) => (
                  <button key={item.code} type="button" onClick={() => switchLocale(item.code)}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-all hover:bg-black/5"
                    style={{
                      color: item.code === locale ? 'var(--brand)' : 'var(--text-secondary)',
                      fontWeight: item.code === locale ? 700 : 400,
                    }}
                  >
                    <span className="w-5 text-xs">{item.label}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={() => setMenuOpen(v => !v)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass-panel mx-auto mt-2 max-w-6xl overflow-hidden rounded-xl border">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium"
              style={{ color: activeSection === item.id ? 'var(--brand)' : 'var(--text-secondary)' }}
            >
              {t(item.key)}
              {activeSection === item.id && (
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--brand)' }} />
              )}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
