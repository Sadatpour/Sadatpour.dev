export interface LocaleInfo {
  code: string
  label: string
  name: string
  rtl: boolean
}

export const LOCALES: readonly LocaleInfo[] = [
  { code: 'fa', label: 'FA', name: 'فارسی', rtl: true },
  { code: 'en', label: 'EN', name: 'English', rtl: false },
  { code: 'de', label: 'DE', name: 'Deutsch', rtl: false },
  { code: 'tr', label: 'TR', name: 'Türkçe', rtl: false },
  { code: 'ar', label: 'AR', name: 'العربية', rtl: true },
  { code: 'zh', label: 'ZH', name: '中文', rtl: false },
] as const

export const LOCALE_CODES = LOCALES.map(l => l.code)

export const DEFAULT_LOCALE = 'fa'

export function isRTLLocale(locale: string): boolean {
  return LOCALES.find(l => l.code === locale)?.rtl ?? false
}
