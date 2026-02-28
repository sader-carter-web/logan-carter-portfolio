import { motion } from 'framer-motion'

// Floating engineering annotations
const annotations = [
  { x: '8%',  y: '18%', text: 'REF PLANE A',        delay: 0  },
  { x: '82%', y: '22%', text: 'Ø 24.50 ±0.02',      delay: 4  },
  { x: '6%',  y: '65%', text: 'TOL ±0.005"',         delay: 8  },
  { x: '78%', y: '72%', text: 'R 12.0 TYP',          delay: 2  },
  { x: '48%', y: '8%',  text: 'SECTION A-A',         delay: 6  },
  { x: '86%', y: '50%', text: '3× M6×1.0 THRU',     delay: 10 },
  { x: '14%', y: '85%', text: 'DRAWN: LC',           delay: 3  },
  { x: '60%', y: '90%', text: 'SCALE: 1:1',          delay: 7  },
  { x: '35%', y: '14%', text: '↑ NORTH REF',         delay: 5  },
  { x: '72%', y: '38%', text: 'MAX STRESS: 245 MPa', delay: 9  },
]

// Simple gear SVG (toothed circle)
const GearIcon = ({ r = 48, teeth = 12, color = '#0ea5e9', opacity = 0.06, speed = 22, reverse = false }) => {
  const toothW = (2 * Math.PI * r) / (teeth * 2.4)
  const paths = []
  for (let i = 0; i < teeth; i++) {
    const a1 = ((i / teeth) * 2 * Math.PI) - 0.12
    const a2 = ((i / teeth) * 2 * Math.PI) + 0.12
    const a3 = ((i / teeth) * 2 * Math.PI) + 0.28
    const a4 = ((i / teeth) * 2 * Math.PI) + 0.44
    const ro = r + 10
    const ri = r
    paths.push(
      `L${ro * Math.cos(a1)} ${ro * Math.sin(a1)}`,
      `L${ro * Math.cos(a2)} ${ro * Math.sin(a2)}`,
      `L${ri * Math.cos(a3)} ${ri * Math.sin(a3)}`,
      `L${ri * Math.cos(a4)} ${ri * Math.sin(a4)}`,
    )
  }
  const d = `M${r} 0 ${paths.join(' ')} Z`

  return (
    <motion.svg
      width={(r + 12) * 2} height={(r + 12) * 2}
      viewBox={`${-(r + 12)} ${-(r + 12)} ${(r + 12) * 2} ${(r + 12) * 2}`}
      animate={{ rotate: reverse ? [0, -360] : [0, 360] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block' }}
    >
      {/* Outer toothed ring */}
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" opacity={opacity} />
      {/* Inner hub */}
      <circle cx="0" cy="0" r={r * 0.32} fill="none" stroke={color} strokeWidth="1" opacity={opacity * 1.4} />
      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180
        return (
          <line key={i}
            x1={r * 0.34 * Math.cos(a)} y1={r * 0.34 * Math.sin(a)}
            x2={r * 0.88 * Math.cos(a)} y2={r * 0.88 * Math.sin(a)}
            stroke={color} strokeWidth="1" opacity={opacity * 1.2}
          />
        )
      })}
    </motion.svg>
  )
}

const ParticleBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

    {/* Floating annotations */}
    {annotations.map((a, i) => (
      <motion.span
        key={i}
        className="absolute font-mono text-[9px] text-blueprint-500/10 whitespace-nowrap select-none"
        style={{ left: a.x, top: a.y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{
          duration: 7,
          delay: a.delay,
          repeat: Infinity,
          repeatDelay: annotations.length * 1.4,
          ease: 'easeInOut',
        }}
      >
        {a.text}
      </motion.span>
    ))}

    {/* Origin crosshair — bottom left */}
    <div className="absolute bottom-6 left-6 opacity-[0.07]">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <line x1="22" y1="0"  x2="22" y2="44" stroke="#0ea5e9" strokeWidth="0.6" />
        <line x1="0"  y1="22" x2="44" y2="22" stroke="#0ea5e9" strokeWidth="0.6" />
        <circle cx="22" cy="22" r="2.5" fill="#0ea5e9" />
        <circle cx="22" cy="22" r="8"   fill="none" stroke="#0ea5e9" strokeWidth="0.4" />
      </svg>
    </div>

    {/* Secondary mark — top right */}
    <div className="absolute top-20 right-6 opacity-[0.05]">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <line x1="15" y1="0"  x2="15" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
        <line x1="0"  y1="15" x2="30" y2="15" stroke="#f59e0b" strokeWidth="0.5" />
        <circle cx="15" cy="15" r="1.5" fill="#f59e0b" />
      </svg>
    </div>

    {/* Rotating gear — bottom right */}
    <div className="absolute bottom-8 right-10 opacity-100">
      <GearIcon r={52} teeth={14} color="#0ea5e9" opacity={0.055} speed={28} />
    </div>

    {/* Rotating gear — top left (amber, smaller, counter-clockwise) */}
    <div className="absolute top-24 left-8 opacity-100">
      <GearIcon r={34} teeth={10} color="#f59e0b" opacity={0.05} speed={20} reverse />
    </div>

    {/* Rotating gear — mid right (purple, tiny, fast) */}
    <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-100">
      <GearIcon r={22} teeth={8} color="#8b5cf6" opacity={0.055} speed={14} />
    </div>

  </div>
)

export default ParticleBackground
