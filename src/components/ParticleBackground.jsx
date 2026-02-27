import { motion } from 'framer-motion'

// Floating engineering annotations — very subtle, drift in and out
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

const ParticleBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
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
    <div className="absolute bottom-6 left-6 opacity-[0.08]">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <line x1="22" y1="0"  x2="22" y2="44" stroke="#0ea5e9" strokeWidth="0.6" />
        <line x1="0"  y1="22" x2="44" y2="22" stroke="#0ea5e9" strokeWidth="0.6" />
        <circle cx="22" cy="22" r="2.5" fill="#0ea5e9" />
        <circle cx="22" cy="22" r="8"   fill="none" stroke="#0ea5e9" strokeWidth="0.4" />
      </svg>
    </div>

    {/* Secondary mark — top right */}
    <div className="absolute top-20 right-6 opacity-[0.06]">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <line x1="15" y1="0"  x2="15" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
        <line x1="0"  y1="15" x2="30" y2="15" stroke="#f59e0b" strokeWidth="0.5" />
        <circle cx="15" cy="15" r="1.5" fill="#f59e0b" />
      </svg>
    </div>
  </div>
)

export default ParticleBackground
