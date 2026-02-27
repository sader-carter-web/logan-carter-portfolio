import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { at: 0,   text: 'LOADING PROFILE DATA' },
  { at: 20,  text: 'INITIALIZING CAD MODULES' },
  { at: 45,  text: 'RENDERING SPEC SHEETS' },
  { at: 70,  text: 'CALIBRATING INSTRUMENTS' },
  { at: 90,  text: 'SYSTEM READY' },
]

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setExiting(true)
            setTimeout(onComplete, 700)
          }, 400)
          return 100
        }
        return p + 1.6
      })
    }, 28)
    return () => clearInterval(timer)
  }, [onComplete])

  const activeStep = steps.filter(s => progress >= s.at).pop()

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-dark-950 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.045) 1px, transparent 1px), linear-gradient(rgba(14,165,233,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.018) 1px, transparent 1px)',
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          }}
        >
          {/* Corner brackets */}
          {['top-8 left-8 border-l-2 border-t-2','top-8 right-8 border-r-2 border-t-2','bottom-8 left-8 border-l-2 border-b-2','bottom-8 right-8 border-r-2 border-b-2'].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * i }}
              className={`absolute w-14 h-14 ${cls} border-blueprint-500/40`}
            />
          ))}

          {/* Coordinate labels */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-blueprint-500/20 tracking-widest">
            X: 0.000 // Y: 0.000 // Z: 0.000
          </div>

          {/* Center content */}
          <div className="relative z-10 w-full max-w-xs px-8 text-center">

            {/* Emblem */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="mb-10"
            >
              <div className="relative w-28 h-28 mx-auto">
                <svg viewBox="0 0 112 112" className="w-full h-full animate-spin-slow">
                  <circle cx="56" cy="56" r="52" fill="none" stroke="#0ea5e9" strokeWidth="0.5" strokeOpacity="0.25" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const a = (i * 15 * Math.PI) / 180
                    const major = i % 6 === 0
                    const r1 = major ? 46 : 48
                    return (
                      <line
                        key={i}
                        x1={56 + 52 * Math.cos(a)} y1={56 + 52 * Math.sin(a)}
                        x2={56 + r1 * Math.cos(a)} y2={56 + r1 * Math.sin(a)}
                        stroke="#0ea5e9"
                        strokeWidth={major ? 1.5 : 0.8}
                        strokeOpacity={major ? 0.5 : 0.25}
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold font-mono text-blueprint-400 leading-none">LC</span>
                </div>
              </div>
            </motion.div>

            {/* Identity */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-mono text-[11px] text-blueprint-400/80 tracking-[0.4em] mb-1 uppercase"
            >
              Logan Carter
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-[9px] text-dark-500 tracking-[0.25em] mb-10 uppercase"
            >
              Mechanical Engineer
            </motion.p>

            {/* Status line */}
            <div className="h-5 mb-6 text-left">
              <motion.div
                key={activeStep?.text}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px]"
              >
                <span className="text-blueprint-500">▸ </span>
                <span className="text-dark-400">{activeStep?.text}</span>
                <span className="text-blueprint-400 animate-pulse ml-1">_</span>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between font-mono text-[9px] text-dark-600 mb-1.5">
                <span>PROGRESS</span>
                <span className="text-blueprint-400">{Math.min(100, Math.round(progress))}%</span>
              </div>
              <div className="h-[1px] bg-dark-800 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blueprint-700 to-blueprint-400 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Drawing number */}
            <p className="font-mono text-[8px] text-dark-700 mt-6 tracking-widest">
              DWG NO: LC-PORT-001 // REV: C // SHEET 1 OF 1
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
