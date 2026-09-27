import type { CSSProperties, ReactNode } from 'react'

/**
 * Line-art illustrations for WordPress project cards, one per project type.
 * All shapes draw with currentColor, so the card sets the accent through `color`.
 * `.wp-draw` paths animate their stroke when the card is hovered (see globals.css).
 */
const MOTIFS: Record<string, ReactNode> = {
  // Financial data: candlesticks under a trend line
  chart: (
    <>
      <path d="M0 40h320M0 80h320M0 120h320" stroke="currentColor" strokeOpacity="0.08" />
      {[
        [30, 100, 118, 92, 124], [60, 88, 104, 80, 110], [90, 96, 108, 88, 114], [120, 74, 92, 66, 98],
        [150, 80, 90, 70, 96], [180, 60, 78, 52, 84], [210, 66, 74, 58, 80], [240, 46, 64, 38, 70], [270, 36, 52, 28, 58],
      ].map(([x, top, bottom, wickTop, wickBottom]) => (
        <g key={x}>
          <path d={`M${x} ${wickTop}V${wickBottom}`} stroke="currentColor" strokeOpacity="0.35" />
          <rect x={x - 6} y={top} width="12" height={bottom - top} rx="2" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.5" />
        </g>
      ))}
      <path className="wp-draw" pathLength={1} d="M10 120C50 112 70 98 100 102S150 78 180 70 230 58 250 48 290 34 312 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="312" cy="28" r="4" fill="currentColor" />
      <circle cx="312" cy="28" r="10" fill="currentColor" fillOpacity="0.2" className="wp-pulse" />
    </>
  ),
  // Travel content: dashed route between map pins
  route: (
    <>
      <path d="M0 130c40-10 70 6 110-4s70-30 120-22 70 18 90 12" stroke="currentColor" strokeOpacity="0.08" strokeWidth="18" strokeLinecap="round" />
      <path className="wp-draw" d="M40 118C80 60 130 130 170 80S250 40 282 50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
      {[[40, 118], [170, 80], [282, 50]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0c-9-12-14-18-14-25a14 14 0 0 1 28 0c0 7-5 13-14 25z" fill="currentColor" fillOpacity={i === 2 ? 0.9 : 0.25} stroke="currentColor" strokeWidth="1.5" transform="translate(0 -2)" />
          <circle cy="-27" r="4.5" fill={i === 2 ? 'var(--card)' : 'currentColor'} />
        </g>
      ))}
      <path d="M110 30h40M120 42h24" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // Automotive: speedometer, needle swings on hover
  gauge: (
    <>
      <path d="M90 130a70 70 0 0 1 140 0" stroke="currentColor" strokeOpacity="0.12" strokeWidth="14" strokeLinecap="round" />
      <path className="wp-draw" pathLength={1} d="M90 130a70 70 0 0 1 124-44" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.8" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i * Math.PI) / 8
        return (
          <path key={i} d={`M${160 + Math.cos(a) * 52} ${130 - Math.sin(a) * 52}L${160 + Math.cos(a) * 44} ${130 - Math.sin(a) * 44}`}
            stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        )
      })}
      <g className="wp-needle" style={{ transformOrigin: '160px 130px' }}>
        <path d="M160 130L196 96" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="160" cy="130" r="7" fill="currentColor" />
      <path d="M20 146h80M220 146h80" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="10 8" />
    </>
  ),
  // E-commerce: shopping bag with product tiles
  store: (
    <>
      {[[196, 30], [246, 30], [196, 80], [246, 80]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="40" height="40" rx="8" fill="currentColor" fillOpacity={0.08 + i * 0.04} stroke="currentColor" strokeOpacity="0.3" />
      ))}
      <path className="wp-draw" pathLength={1} d="M70 60h80l-8 76H78z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
      <path d="M92 60V50a18 18 0 0 1 36 0v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M96 96l10 10 20-22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Travel agency: plane over globe arcs
  plane: (
    <>
      <circle cx="220" cy="150" r="90" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <ellipse cx="220" cy="150" rx="40" ry="90" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      <path d="M130 120h180M142 90h156" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      <path className="wp-draw" d="M20 120C80 110 110 60 190 44" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <g transform="translate(206 40) rotate(-14)">
        <path className="wp-float" d="M-18 0h30l12-4c4 0 4 8 0 8l-12-4M-2 0l-10-16h6l16 16M-2 0l-10 16h6l16-16M-16 0l-6-8h4l6 8" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </>
  ),
  // Beauty: droplet with sparkles and leaves
  beauty: (
    <>
      <path className="wp-draw" pathLength={1} d="M160 22c26 34 40 56 40 76a40 40 0 0 1-80 0c0-20 14-42 40-76z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
      <path d="M144 96a16 16 0 0 0 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M232 70c24-4 40 8 44 28-24 4-40-8-44-28zM88 70c-24-4-40 8-44 28 24 4 40-8 44-28z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" />
      {[[250, 30], [70, 36], [280, 130]].map(([x, y], i) => (
        <path key={i} className="wp-pulse" d={`M${x} ${y - 8}v16M${x - 8} ${y}h16`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ))}
    </>
  ),
  // Brand site named "Unique Cut": scissors on a dashed cut line
  scissors: (
    <>
      <path className="wp-draw" d="M10 110h300" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="10 8" />
      <g transform="translate(160 80)">
        <circle cx="-34" cy="30" r="14" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="-34" cy="-30" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M-22 22L60-12M-22-22L60 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle r="3.5" cx="6" fill="currentColor" />
      </g>
    </>
  ),
  // Construction: building on a blueprint grid with a crane
  blueprint: (
    <>
      <path d="M0 30h320M0 60h320M0 90h320M0 120h320M40 0v160M80 0v160M120 0v160M160 0v160M200 0v160M240 0v160M280 0v160" stroke="currentColor" strokeOpacity="0.07" />
      <path className="wp-draw" pathLength={1} d="M110 140V70h60v70M170 140V40h50v100M90 140h150" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {[80, 96, 112].map(y => <path key={y} d={`M122 ${y}h14M146 ${y}h14`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />)}
      {[52, 70, 88, 106].map(y => <path key={y} d={`M182 ${y}h26`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />)}
      <path d="M260 140V20M230 20h70M260 20l30 20M296 20v26" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <rect x="289" y="46" width="14" height="10" rx="1" fill="currentColor" fillOpacity="0.5" className="wp-float" />
    </>
  ),
  // Interior design: floor plan with door swing and sofa
  floorplan: (
    <>
      <path className="wp-draw" pathLength={1} d="M60 24h200v112H60zM160 24v44M160 96v40M60 80h56" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M116 80a24 24 0 0 1-24 24" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 4" />
      <rect x="190" y="40" width="54" height="22" rx="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="217" cy="100" r="16" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="76" y="36" width="36" height="28" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M180 124h60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
}

export default function WpMotif({ motif, className = '', style, crop }: {
  motif: string
  className?: string
  style?: CSSProperties
  /** Fill the box and crop the sides instead of fitting the whole drawing. */
  crop?: boolean
}) {
  return (
    <svg viewBox="0 0 320 160" fill="none" preserveAspectRatio={crop ? 'xMidYMid slice' : 'xMidYMid meet'} className={className} style={style} aria-hidden>
      {MOTIFS[motif] ?? MOTIFS.chart}
    </svg>
  )
}
