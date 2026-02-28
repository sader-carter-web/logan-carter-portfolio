import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { ChevronDown, Cog, PenTool, Ruler, Wrench, Linkedin } from 'lucide-react'
import EngineerScene from './EngineerScene'

const Hero = () => {
  const { scrollY }   = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 220], [1, 0])

  // Mouse parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 60, damping: 22 }
  const sceneX = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), spring)
  const sceneY = useSpring(useTransform(rawY, [-0.5, 0.5], [-9, 9]), spring)
  const bgX    = useSpring(useTransform(rawX, [-0.5, 0.5], [10, -10]), spring)
  const bgY    = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), spring)

  const onMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - left - width  / 2) / width)
    rawY.set((e.clientY - top  - height / 2) / height)
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14 lg:pt-20"
      onMouseMove={onMouseMove}
    >
      {/* Ambient glows */}
      <motion.div style={{ x: bgX, y: bgY }}
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blueprint-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <motion.div style={{ x: bgX, y: bgY }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-10 items-center">

          {/* ── LEFT: Text content ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blueprint-500/10 border border-blueprint-500/25 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-blueprint-300 font-mono tracking-wide">
                SEEKING ENGINEERING INTERNSHIPS
              </span>
            </motion.div>

            {/* Mobile: inline photo + name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-6 lg:hidden"
            >
              <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-blueprint-500/40">
                <img src="/images/profile/logan.jpg" alt="Logan Carter" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Hi, I'm <span className="gradient-text">Logan Carter</span>
              </h1>
            </motion.div>

            {/* Desktop name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Logan Carter</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-dark-300 mb-6 font-medium"
            >
              Mechanical Engineering Student
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-dark-400 text-lg mb-8 max-w-xl leading-relaxed"
            >
              Dedicated and innovative engineering student at the University of Colorado Boulder.
              Extensive experience in SolidWorks, MATLAB, and mechanical design with a passion for
              analytical precision and creative problem solving.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/documents/Logan-Carter-Resume.pdf" target="_blank" rel="noopener noreferrer"
                className="btn-primary">
                View My Resume
              </a>
              <a href="https://www.linkedin.com/in/logan-carter-35h/" target="_blank" rel="noopener noreferrer"
                className="btn-blueprint flex items-center gap-2">
                <Linkedin size={18} />
                LinkedIn
              </a>
            </motion.div>

            {/* Core tools strip (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="hidden lg:flex items-center gap-6 mt-12"
            >
              <span className="font-mono text-[10px] text-dark-600 tracking-widest uppercase">Core Tools</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: PenTool, label: 'SolidWorks' },
                  { icon: Ruler,   label: 'MATLAB'     },
                  { icon: Cog,     label: 'Ansys FEA'  },
                  { icon: Wrench,  label: '3D Printing' },
                ].map(({ icon: Icon, label }) => (
                  <motion.div key={label} className="group relative" whileHover={{ y: -5 }}>
                    <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700/50 group-hover:border-blueprint-500/40 transition-colors">
                      <Icon size={18} className="text-dark-500 group-hover:text-blueprint-400 transition-colors" />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ opacity: scrollOpacity }}
              className="lg:hidden flex justify-center mt-8"
            >
              <motion.a
                href="#about"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-dark-600 hover:text-blueprint-400 transition-colors"
              >
                <span className="font-mono text-xs mb-1 tracking-wider">SCROLL TO EXPLORE</span>
                <ChevronDown size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: EngineerScene (desktop) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
            style={{ x: sceneX, y: sceneY }}
          >
            <EngineerScene />
          </motion.div>

        </div>
      </div>

      {/* Desktop scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-dark-600 hover:text-blueprint-400 transition-colors"
        >
          <span className="font-mono text-xs mb-2 tracking-widest">SCROLL TO EXPLORE</span>
          <ChevronDown size={22} />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero
