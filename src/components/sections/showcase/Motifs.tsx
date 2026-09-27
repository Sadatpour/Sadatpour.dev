import type { CSSProperties, ReactNode } from 'react'

/**
 * Line-art illustrations for project showcase cards, one per project type.
 * All shapes draw with currentColor, so the card sets the accent through `color`.
 * `.sc-draw` paths animate their stroke when the card is hovered (see globals.css).
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
      <path className="sc-draw" pathLength={1} d="M10 120C50 112 70 98 100 102S150 78 180 70 230 58 250 48 290 34 312 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="312" cy="28" r="4" fill="currentColor" />
      <circle cx="312" cy="28" r="10" fill="currentColor" fillOpacity="0.2" className="sc-pulse" />
    </>
  ),
  // Travel content: dashed route between map pins
  route: (
    <>
      <path d="M0 130c40-10 70 6 110-4s70-30 120-22 70 18 90 12" stroke="currentColor" strokeOpacity="0.08" strokeWidth="18" strokeLinecap="round" />
      <path className="sc-draw" d="M40 118C80 60 130 130 170 80S250 40 282 50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
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
      <path className="sc-draw" pathLength={1} d="M90 130a70 70 0 0 1 124-44" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.8" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i * Math.PI) / 8
        return (
          <path key={i} d={`M${160 + Math.cos(a) * 52} ${130 - Math.sin(a) * 52}L${160 + Math.cos(a) * 44} ${130 - Math.sin(a) * 44}`}
            stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        )
      })}
      <g className="sc-needle" style={{ transformOrigin: '160px 130px' }}>
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
      <path className="sc-draw" pathLength={1} d="M70 60h80l-8 76H78z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
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
      <path className="sc-draw" d="M20 120C80 110 110 60 190 44" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <g transform="translate(206 40) rotate(-14)">
        <path className="sc-float" d="M-18 0h30l12-4c4 0 4 8 0 8l-12-4M-2 0l-10-16h6l16 16M-2 0l-10 16h6l16-16M-16 0l-6-8h4l6 8" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </>
  ),
  // Beauty: droplet with sparkles and leaves
  beauty: (
    <>
      <path className="sc-draw" pathLength={1} d="M160 22c26 34 40 56 40 76a40 40 0 0 1-80 0c0-20 14-42 40-76z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
      <path d="M144 96a16 16 0 0 0 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M232 70c24-4 40 8 44 28-24 4-40-8-44-28zM88 70c-24-4-40 8-44 28 24 4 40-8 44-28z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" />
      {[[250, 30], [70, 36], [280, 130]].map(([x, y], i) => (
        <path key={i} className="sc-pulse" d={`M${x} ${y - 8}v16M${x - 8} ${y}h16`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ))}
    </>
  ),
  // Brand site named "Unique Cut": scissors on a dashed cut line
  scissors: (
    <>
      <path className="sc-draw" d="M10 110h300" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="10 8" />
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
      <path className="sc-draw" pathLength={1} d="M110 140V70h60v70M170 140V40h50v100M90 140h150" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {[80, 96, 112].map(y => <path key={y} d={`M122 ${y}h14M146 ${y}h14`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />)}
      {[52, 70, 88, 106].map(y => <path key={y} d={`M182 ${y}h26`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />)}
      <path d="M260 140V20M230 20h70M260 20l30 20M296 20v26" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <rect x="289" y="46" width="14" height="10" rx="1" fill="currentColor" fillOpacity="0.5" className="sc-float" />
    </>
  ),
  // Interior design: floor plan with door swing and sofa
  floorplan: (
    <>
      <path className="sc-draw" pathLength={1} d="M60 24h200v112H60zM160 24v44M160 96v40M60 80h56" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M116 80a24 24 0 0 1-24 24" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 4" />
      <rect x="190" y="40" width="54" height="22" rx="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="217" cy="100" r="16" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="76" y="36" width="36" height="28" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M180 124h60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  // Beauty directory: listing rows with avatars and ratings
  directory: (
    <>
      {[34, 72, 110].map((y, i) => (
        <g key={y}>
          <rect x="70" y={y} width="180" height="28" rx="8" fill="currentColor" fillOpacity={i === 0 ? 0.18 : 0.07} stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="88" cy={y + 14} r="8" fill="currentColor" fillOpacity="0.45" />
          <path d={`M104 ${y + 10}h56M104 ${y + 19}h34`} stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2].map(k => <circle key={k} cx={206 + k * 12} cy={y + 14} r="3.5" fill="currentColor" fillOpacity={k <= 2 - i ? 0.8 : 0.2} />)}
        </g>
      ))}
      <path className="sc-draw" pathLength={1} d="M270 44c0 12-14 22-14 22s-14-10-14-22a14 14 0 0 1 28 0z" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  // Hardware community: processor chip with circuit traces
  chip: (
    <>
      <rect x="120" y="40" width="80" height="80" rx="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
      <rect x="140" y="60" width="40" height="40" rx="4" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      {[56, 72, 88, 104].map(v => (
        <path key={v} d={`M120 ${v}h-14M200 ${v}h14M${v + 80} 40v-14M${v + 80} 120v14`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      ))}
      <path className="sc-draw" pathLength={1} d="M106 56H60V24M214 104h46v32M106 104H40M214 56h66" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle className="sc-pulse" cx="60" cy="24" r="4" fill="currentColor" />
      <circle className="sc-pulse" cx="260" cy="136" r="4" fill="currentColor" />
    </>
  ),
  // Health / genetics: DNA double helix
  dna: (
    <>
      <path className="sc-draw" pathLength={1} d="M40 50c40 0 40 60 80 60s40-60 80-60 40 60 80 60" stroke="currentColor" strokeWidth="2.5" />
      <path d="M40 110c40 0 40-60 80-60s40 60 80 60 40-60 80-60" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2.5" />
      {[60, 100, 140, 180, 220, 260].map((x, i) => (
        <path key={x} d={`M${x} ${i % 2 ? 64 : 72}v${i % 2 ? 32 : 16}`} stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
      ))}
      <path d="M276 22v20M266 32h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="sc-pulse" />
    </>
  ),
  // Business site built with Elementor: wireframe layout blocks
  layout: (
    <>
      <rect x="60" y="20" width="200" height="120" rx="10" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M60 38h200" stroke="currentColor" strokeOpacity="0.3" />
      {[72, 82, 92].map(x => <circle key={x} cx={x} cy="29" r="2.5" fill="currentColor" fillOpacity="0.5" />)}
      <rect className="sc-draw" pathLength={1} x="74" y="50" width="104" height="44" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="188" y="50" width="58" height="44" rx="6" fill="currentColor" fillOpacity="0.2" />
      {[74, 136, 198].map(x => <rect key={x} x={x} y="104" width="48" height="24" rx="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.3" />)}
    </>
  ),
  // Safety equipment store: shield with check and a hard hat
  shield: (
    <>
      <path className="sc-draw" pathLength={1} d="M160 18l52 18v36c0 34-22 58-52 70-30-12-52-36-52-70V36z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M138 80l16 16 30-32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 118a26 26 0 0 1 52 0M232 118h64M264 92v-6" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 128h60M40 116h40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 6" />
    </>
  ),
  // Decoration: paint palette, brush and swatches
  palette: (
    <>
      <path className="sc-draw" pathLength={1} d="M150 26c-46 0-78 30-78 62 0 26 22 44 46 40 12-2 12-16 22-18 12-2 18 10 32 4 26-10 36-30 36-44 0-26-26-44-58-44z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.08" />
      {[[112, 70, 0.9], [138, 50, 0.6], [170, 50, 0.4], [192, 72, 0.25]].map(([x, y, o], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="currentColor" fillOpacity={o} />
      ))}
      <path d="M232 132l40-80M268 44l12 6-8 12-10-6z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2].map(i => <rect key={i} x={36} y={40 + i * 26} width="22" height="18" rx="3" fill="currentColor" fillOpacity={0.2 + i * 0.25} />)}
    </>
  ),
  // Digital game store: gamepad
  gamepad: (
    <>
      <path className="sc-draw" pathLength={1} d="M110 58h100c22 0 36 20 42 46s-4 36-18 36c-12 0-18-12-30-22h-88c-12 10-18 22-30 22-14 0-24-10-18-36s20-46 42-46z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M118 78v28M104 92h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="82" r="6" fill="currentColor" />
      <circle cx="218" cy="100" r="6" fill="currentColor" fillOpacity="0.5" />
      <path d="M150 30l6 12 12 2-9 8 2 12-11-6-11 6 2-12-9-8 12-2z" fill="currentColor" fillOpacity="0.6" className="sc-float" />
    </>
  ),
  // Corporate website: briefcase and growth bars
  briefcase: (
    <>
      <rect className="sc-draw" pathLength={1} x="70" y="56" width="120" height="80" rx="10" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M110 56V44a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v12M70 88h120" stroke="currentColor" strokeWidth="2.5" />
      <rect x="122" y="80" width="16" height="16" rx="3" fill="currentColor" />
      {[[216, 110], [238, 86], [260, 60]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="14" height={136 - y} rx="3" fill="currentColor" fillOpacity={0.25 + i * 0.2} />
      ))}
    </>
  ),
  // Real-time chat: message bubbles with typing dots
  chat: (
    <>
      <path className="sc-draw" pathLength={1} d="M60 36h120a14 14 0 0 1 14 14v36a14 14 0 0 1-14 14H96l-22 18v-18H60a14 14 0 0 1-14-14V50a14 14 0 0 1 14-14z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M72 60h92M72 76h60" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <path d="M170 92h100a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12h-10v14l-18-14h-72a12 12 0 0 1-12-12v-22a12 12 0 0 1 12-12z" fill="currentColor" fillOpacity="0.3" />
      {[204, 220, 236].map(x => <circle key={x} className="sc-pulse" cx={x} cy="115" r="4" fill="currentColor" />)}
    </>
  ),
  // Fabric store: fabric bolt, draped cloth and a measuring tape
  fabric: (
    <>
      <path className="sc-draw" pathLength={1} d="M70 40h96v84H70z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
      <ellipse cx="70" cy="82" rx="14" ry="42" fill="var(--card)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M70 58a6 24 0 1 1 0 48M70 70a3 12 0 1 1 0 24" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      {[60, 76, 92, 108].map(y => <path key={y} d={`M84 ${y}h82`} stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />)}
      <path d="M166 40c30 6 40 28 58 44s36 18 50 40v12h-84c10-18 4-34-24-50z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeOpacity="0.6" strokeLinejoin="round" />
      <path d="M200 70c12 12 18 30 12 58M232 96c8 10 10 22 6 32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 146h240" stroke="currentColor" strokeWidth="8" strokeOpacity="0.25" strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${48 + i * 20} 142v${i % 2 ? 4 : 8}`} stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      ))}
    </>
  ),
  // Digital agency: megaphone with signal waves
  megaphone: (
    <>
      <path className="sc-draw" pathLength={1} d="M90 70h24l60-32v84l-60-32H90a10 10 0 0 1-10-10v0a10 10 0 0 1 10-10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M104 90l8 34h14l-6-34" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {[0, 1, 2].map(i => (
        <path key={i} className="sc-pulse" d={`M${194 + i * 18} ${58 - i * 10}a${30 + i * 18} ${30 + i * 18} 0 0 1 0 ${44 + i * 20}`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </>
  ),

  // ── Contact channels ──
  // Email: envelope with a paper plane on a dashed flight path
  mail: (
    <>
      <rect className="sc-draw" pathLength={1} x="60" y="52" width="120" height="80" rx="10" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M62 56l58 42 58-42" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 130l40-34M178 130l-40-34" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <path className="sc-draw" d="M184 78c30-4 50-24 70-44" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <g className="sc-float">
        <path d="M252 20l40 14-26 8-6 22-8-20z" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M266 42l-14-22" stroke="var(--card)" strokeWidth="1.5" />
      </g>
      {[[30, 40], [36, 120], [220, 136]].map(([x, y], i) => <circle key={i} className="sc-pulse" cx={x} cy={y} r="3" fill="currentColor" />)}
    </>
  ),
  // GitHub: commit graph with a merged branch
  git: (
    <>
      <path d="M40 110h240" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
      <path className="sc-draw" pathLength={1} d="M90 110c0-40 20-56 50-56h60c30 0 50 16 50 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {[60, 90, 170, 250].map(x => <circle key={x} cx={x} cy="110" r="8" fill="var(--card)" stroke="currentColor" strokeWidth="2.5" />)}
      {[140, 200].map(x => <circle key={x} cx={x} cy="54" r="8" fill="currentColor" fillOpacity="0.8" />)}
      <circle cx="280" cy="110" r="5" fill="currentColor" className="sc-pulse" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <rect key={i} x={40 + i * 14} y="20" width="10" height="10" rx="2" fill="currentColor" fillOpacity={[0.2, 0.5, 0.3, 0.8, 0.4, 0.9, 0.6][i]} />
      ))}
    </>
  ),
  // LinkedIn: profile card linked to a network of contacts
  network: (
    <>
      {[[40, 36], [52, 126], [270, 32], [284, 118], [160, 18]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M160 80L${x} ${y}`} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 4" />
          <circle cx={x} cy={y} r="10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx={x} cy={y - 2} r="3.5" fill="currentColor" fillOpacity="0.7" />
        </g>
      ))}
      <rect className="sc-draw" pathLength={1} x="112" y="50" width="96" height="64" rx="10" stroke="currentColor" strokeWidth="2.5" fill="var(--card)" />
      <circle cx="136" cy="76" r="10" fill="currentColor" fillOpacity="0.8" />
      <path d="M154 70h40M154 82h26M124 100h72" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
    </>
  ),

  // ── AI projects ──
  // Startup community: product cards with upvotes and a rocket
  launch: (
    <>
      {[[40, 30], [40, 72], [40, 114]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="150" height="30" rx="8" fill="currentColor" fillOpacity={i === 0 ? 0.2 : 0.08} stroke="currentColor" strokeOpacity="0.3" />
          <rect x={x + 8} y={y + 7} width="16" height="16" rx="4" fill="currentColor" fillOpacity="0.5" />
          <path d={`M${x + 32} ${y + 12}h60M${x + 32} ${y + 20}h36`} stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
          <path d={`M${x + 134} ${y + 18}l-6-6-6 6`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <g className="sc-float">
        <path className="sc-draw" pathLength={1} d="M256 24c18 14 22 36 18 58h-36c-4-22 0-44 18-58z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="256" cy="54" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M238 70l-12 14 14-2M274 70l12 14-14-2M248 90c0 10 4 16 8 22 4-6 8-12 8-22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </>
  ),
  // Language learning: speech bubbles, Austrian flag, flashcard
  lingo: (
    <>
      <path className="sc-draw" pathLength={1} d="M50 30h110a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H84l-20 16V88H50a12 12 0 0 1-12-12V42a12 12 0 0 1 12-12z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <text x="105" y="67" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor" fontFamily="system-ui, sans-serif">Hallo!</text>
      <path d="M190 78h84a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10h-12v14l-16-14h-56a10 10 0 0 1-10-10V88a10 10 0 0 1 10-10z" fill="currentColor" fillOpacity="0.25" />
      <text x="232" y="109" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" fontFamily="system-ui, sans-serif">Danke</text>
      <g transform="translate(236 20)">
        <rect width="48" height="36" rx="4" fill="currentColor" />
        <rect y="12" width="48" height="12" fill="var(--card)" />
      </g>
      <path d="M40 132h80" stroke="currentColor" strokeOpacity="0.3" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 132h48" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  // Personal portfolio: browser window with code
  browser: (
    <>
      <rect x="50" y="20" width="220" height="124" rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M50 42h220" stroke="currentColor" strokeOpacity="0.35" />
      {[64, 76, 88].map(x => <circle key={x} cx={x} cy="31" r="3.5" fill="currentColor" fillOpacity="0.6" />)}
      <rect x="104" y="26" width="120" height="10" rx="5" fill="currentColor" fillOpacity="0.15" />
      <path className="sc-draw" pathLength={1} d="M92 72l-18 16 18 16M228 72l18 16-18 16M172 64l-24 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M110 126h40M160 126h24M194 126h30" stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // Thinking analysis: compass rose over connected thought nodes
  mind: (
    <>
      <circle cx="160" cy="80" r="58" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="160" cy="80" r="44" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 5" />
      <path d="M160 14v12M160 134v12M94 80h12M214 80h12" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <g className="sc-needle" style={{ transformOrigin: '160px 80px' }}>
        <path d="M160 36l10 44h-20z" fill="currentColor" />
        <path d="M160 124l10-44h-20z" fill="currentColor" fillOpacity="0.3" />
      </g>
      <circle cx="160" cy="80" r="5" fill="var(--card)" stroke="currentColor" strokeWidth="2" />
      {[[40, 40], [62, 120], [276, 44], [258, 124]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y}L${x < 160 ? 104 : 216} 80`} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 4" />
          <circle className="sc-pulse" cx={x} cy={y} r="6" fill="currentColor" fillOpacity="0.6" />
        </g>
      ))}
    </>
  ),
  // Browser game: apple, runner path and score stars
  arcade: (
    <>
      <path d="M20 140h280" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      {[40, 110, 180, 250].map(x => <rect key={x} x={x} y="140" width="40" height="8" fill="currentColor" fillOpacity="0.15" />)}
      <path className="sc-draw" d="M40 130c30-50 60-50 90 0s60 50 90 0" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 6" />
      <g className="sc-float">
        <path d="M250 66c-10-8-30-4-30 18 0 20 14 38 24 38 5 0 6-3 10-3s5 3 10 3c10 0 24-18 24-38 0-22-20-26-30-18-3 2-5 2-8 0z" fill="currentColor" fillOpacity="0.85" />
        <path d="M254 64c0-10 4-16 12-20M256 50c8-8 18-6 20-2-6 6-14 6-20 2z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.4" />
      </g>
      <rect x="32" y="104" width="22" height="26" rx="5" fill="currentColor" fillOpacity="0.45" />
      <circle cx="43" cy="96" r="7" fill="currentColor" fillOpacity="0.45" />
      {[[120, 34], [150, 24], [180, 34]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 8}l2.5 5 5.5 1-4 4 1 5.5-5-2.6-5 2.6 1-5.5-4-4 5.5-1z`} fill="currentColor" fillOpacity="0.7" />
      ))}
    </>
  ),
  // Planner extension: calendar with checklist
  planner: (
    <>
      <rect x="60" y="28" width="110" height="110" rx="12" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" fill="currentColor" fillOpacity="0.06" />
      <path d="M60 54h110M86 20v16M144 20v16" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <rect key={i} x={74 + (i % 3) * 30} y={64 + Math.floor(i / 3) * 24} width="22" height="16" rx="4" fill="currentColor" fillOpacity={i === 4 ? 0.9 : 0.14} />
      ))}
      {[48, 80, 112].map((y, i) => (
        <g key={y}>
          <rect x="196" y={y - 10} width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill={i < 2 ? 'currentColor' : 'none'} fillOpacity="0.2" />
          {i < 2 && <path className="sc-draw" pathLength={1} d={`M200 ${y}l4 4 8-8`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          <path d={`M226 ${y}h${i === 2 ? 40 : 56}`} stroke="currentColor" strokeOpacity={i < 2 ? 0.3 : 0.6} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
    </>
  ),
}

export default function Motif({ motif, className = '', style, crop }: {
  motif: string
  className?: string
  style?: CSSProperties
  /** Fill the box and crop the sides instead of fitting the whole drawing. */
  crop?: boolean
}) {
  return (
    <svg viewBox="0 0 320 160" fill="none" direction="ltr" preserveAspectRatio={crop ? 'xMidYMid slice' : 'xMidYMid meet'} className={className} style={style} aria-hidden>
      {MOTIFS[motif] ?? MOTIFS.chart}
    </svg>
  )
}
