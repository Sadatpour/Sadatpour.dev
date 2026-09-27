'use client'

/** Packetraft-style centered section header: bold title + muted subtitle. */
export default function SectionHeader({
  title,
  subtitle,
  className = '',
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`sh-head mb-10 sm:mb-14 text-center ${className}`}>
      <h2 className="section-title mx-auto">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
