import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [pos, setPos]           = useState({ x: -200, y: -200 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const onMove  = e => setPos({ x: e.clientX, y: e.clientY })
    const onOver  = e => setIsHovering(!!e.target.closest('a, button, [role="button"], input, textarea, select'))
    const onDown  = () => setIsClicking(true)
    const onUp    = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  const color  = isHovering ? '#f59e0b' : '#0ea5e9'
  const size   = isClicking ? 24 : isHovering ? 36 : 28
  const center = size / 2
  const gap    = 6
  const arm    = center - gap

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
      animate={{ x: pos.x - center, y: pos.y - center }}
      transition={{ type: 'spring', stiffness: 600, damping: 32, mass: 0.08 }}
    >
      <svg
        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="transition-all duration-150"
        style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
      >
        {/* Top arm */}
        <line x1={center} y1={0}       x2={center} y2={gap}       stroke={color} strokeWidth="1.2" />
        {/* Bottom arm */}
        <line x1={center} y1={center + gap} x2={center} y2={size} stroke={color} strokeWidth="1.2" />
        {/* Left arm */}
        <line x1={0}       y1={center}  x2={gap}       y2={center} stroke={color} strokeWidth="1.2" />
        {/* Right arm */}
        <line x1={center + gap} y1={center} x2={size} y2={center} stroke={color} strokeWidth="1.2" />
        {/* Center circle */}
        <circle
          cx={center} cy={center}
          r={isHovering ? 4 : 2.5}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Center dot */}
        <circle cx={center} cy={center} r="1" fill={color} />
      </svg>
    </motion.div>
  )
}

export default CustomCursor
