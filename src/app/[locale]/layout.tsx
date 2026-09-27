import { Inter, Vazirmatn } from 'next/font/google'
import { I18nProvider } from '@/i18n/I18nProvider'
import { LOCALE_CODES, isRTLLocale } from '@/lib/locales'
import { SITE_URL } from '@/lib/siteConfig'
import '../globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }))
}

type Seo = { title: string; description: string; keywords: string[] }

const SEO: Record<string, Seo> = {
  fa: {
    title: 'مجتبا سادات‌پور | توسعه‌دهنده فرانت‌اند و مشاور فنی وب',
    description:
      'نمونه‌کار مجتبا سادات‌پور — توسعه‌دهنده فرانت‌اند و معمار راهکارهای وب، متخصص وردپرس، PHP، جاوااسکریپت و کدنویسی با هوش مصنوعی. تهران، ایران — آماده همکاری دورکاری.',
    keywords: ['مجتبا سادات‌پور', 'توسعه‌دهنده فرانت‌اند', 'برنامه‌نویس وب', 'طراحی سایت', 'توسعه‌دهنده وردپرس', 'وردپرس', 'طراحی سایت با هوش مصنوعی', 'فریلنسر وب', 'برنامه‌نویس تهران', 'مشاور فنی وب'],
  },
  en: {
    title: 'Mojtaba Sadatpour | Front-End Developer & Web Consultant',
    description:
      'Portfolio of Mojtaba Sadatpour — front-end developer and web solutions architect specializing in WordPress, PHP, JavaScript and AI-powered development. Tehran, Iran — open for remote work.',
    keywords: ['Mojtaba Sadatpour', 'front-end developer', 'WordPress developer', 'PHP developer', 'WooCommerce developer', 'AI web development', 'web solutions architect', 'freelance developer', 'Tehran developer'],
  },
  de: {
    title: 'Mojtaba Sadatpour | Frontend-Entwickler & Web-Berater',
    description:
      'Portfolio von Mojtaba Sadatpour — Frontend-Entwickler und Web-Architekt, spezialisiert auf WordPress, PHP, JavaScript und KI-gestützte Entwicklung. Offen für Remote-Arbeit.',
    keywords: ['Mojtaba Sadatpour', 'Frontend-Entwickler', 'WordPress Entwickler', 'PHP Entwickler', 'Webentwicklung', 'KI Webentwicklung', 'Freelancer'],
  },
  tr: {
    title: 'Mojtaba Sadatpour | Front-End Geliştirici & Web Danışmanı',
    description:
      'Mojtaba Sadatpour portföyü — WordPress, PHP, JavaScript ve yapay zekâ destekli geliştirmede uzman front-end geliştirici. Uzaktan çalışmaya açık.',
    keywords: ['Mojtaba Sadatpour', 'front-end geliştirici', 'WordPress geliştirici', 'PHP geliştirici', 'web geliştirme', 'yapay zeka web', 'serbest çalışan'],
  },
  ar: {
    title: 'مجتبى ساداتبور | مطوّر واجهات أمامية ومستشار ويب',
    description:
      'أعمال مجتبى ساداتبور — مطوّر واجهات أمامية ومهندس حلول ويب متخصص في ووردبريس وPHP وJavaScript والتطوير بمساعدة الذكاء الاصطناعي. متاح للعمل عن بُعد.',
    keywords: ['مجتبى ساداتبور', 'مطور واجهات أمامية', 'مطور ووردبريس', 'مطور PHP', 'تطوير الويب', 'الذكاء الاصطناعي', 'مستقل'],
  },
  zh: {
    title: 'Mojtaba Sadatpour | 前端开发者与网站顾问',
    description:
      'Mojtaba Sadatpour 作品集——专注于 WordPress、PHP、JavaScript 和 AI 驱动开发的前端开发者与网站架构师。可远程合作。',
    keywords: ['Mojtaba Sadatpour', '前端开发', 'WordPress 开发', 'PHP 开发', '网站开发', 'AI 网站开发', '自由职业'],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = SEO[locale] ?? SEO.en
  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Mojtaba Sadatpour', url: SITE_URL }],
    creator: 'Mojtaba Sadatpour',
    icons: { icon: '/logo.png' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    alternates: {
      canonical: `/${locale}/`,
      languages: { ...Object.fromEntries(LOCALE_CODES.map(code => [code, `/${code}/`])), 'x-default': '/fa/' },
    },
    openGraph: {
      type: 'website',
      locale,
      url: `/${locale}/`,
      siteName: 'Mojtaba Sadatpour',
      title: seo.title,
      description: seo.description,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Mojtaba Sadatpour' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/logo.png'],
    },
  }
}

function jsonLd(locale: string) {
  const seo = SEO[locale] ?? SEO.en
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mojtaba Sadatpour',
    alternateName: 'مجتبا سادات‌پور',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    jobTitle: 'Front-End Developer & Web Solutions Architect',
    description: seo.description,
    email: 'mailto:sadatpour.web@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Tehran', addressCountry: 'IR' },
    knowsLanguage: ['fa', 'en', 'de'],
    knowsAbout: ['WordPress', 'PHP', 'JavaScript', 'WooCommerce', 'Tailwind CSS', 'AI-assisted development', 'Web Performance', 'UI/UX Motion'],
    sameAs: ['https://github.com/Sadatpour', 'https://linkedin.com/in/sadatpour'],
  }
}

async function getMessages(locale: string) {
  const messages = await import(`../../../messages/${locale}.json`)
  return messages.default
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages(locale)
  const isRTL = isRTLLocale(locale)

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
      </head>
      <body>
        <I18nProvider initialLocale={locale} initialMessages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
