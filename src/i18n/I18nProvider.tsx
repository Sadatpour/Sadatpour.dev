'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { isRTLLocale } from '@/lib/locales'

type Messages = Record<string, unknown>

type I18nContextType = {
  locale: string
  messages: Messages
  t: (key: string) => string
  isRTL: boolean
}

const defaultMessages: Messages = {}

const I18nContext = createContext<I18nContextType>({
  locale: 'fa',
  messages: defaultMessages,
  t: (key: string) => key,
  isRTL: false,
})

export function I18nProvider({ 
  children, 
  initialLocale = 'fa',
  initialMessages = defaultMessages,
}: { 
  children: ReactNode
  initialLocale?: string
  initialMessages?: Messages
}) {
  const [data, setData] = useState<{ locale: string; messages: Messages; isRTL: boolean }>({
    locale: initialLocale,
    messages: initialMessages,
    isRTL: isRTLLocale(initialLocale),
  })

  useEffect(() => {
    setData({
      locale: initialLocale,
      messages: initialMessages,
      isRTL: isRTLLocale(initialLocale),
    })
  }, [initialLocale, initialMessages])

  useEffect(() => {
    const dir = data.isRTL ? 'rtl' : 'ltr'
    const html = document.documentElement
    if (html.dir !== dir) html.dir = dir
    if (html.lang !== data.locale) html.lang = data.locale
  }, [data.locale, data.isRTL])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = data.messages
    for (const k of keys) {
      value = typeof value === 'object' && value !== null
        ? (value as Record<string, unknown>)[k]
        : undefined
    }
    return typeof value === 'string' ? value : key
  }

  return (
    <I18nContext.Provider value={{ ...data, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useTranslations(key: string) {
  const { t } = useI18n()
  return (subKey: string) => t(`${key}.${subKey}`)
}

export function useLocale() {
  const { locale } = useI18n()
  return locale
}

export function useIsRTL() {
  const { isRTL } = useI18n()
  return isRTL
}