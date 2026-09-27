const DIGIT_MAPS: Record<string, string> = {
  fa: '۰۱۲۳۴۵۶۷۸۹',
  ar: '٠١٢٣٤٥٦٧٨٩',
}

/** Convert ASCII digits in a string to the locale's numerals (fa/ar); other locales unchanged. */
export function localizeDigits(input: string | number, locale: string): string {
  const digits = DIGIT_MAPS[locale]
  const str = String(input)
  if (!digits) return str
  return str.replace(/[0-9]/g, d => digits[Number(d)])
}
