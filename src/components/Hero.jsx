import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Cog, PenTool, Ruler, Wrench, Linkedin } from 'lucide-react'
import { useState } from 'react'

const ImageWithLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative">
      {!loaded && <div className={`${className} bg-dark-800 animate-pulse`} />}
      <img
        src={src} alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

// Technical Specification Sheet — replaces the JSON code block
const SpecSheet = () => {
  const rows = [
    { label: 'ENGINEER',     value: 'Logan Carter',                      highlight: false },
    { label: 'INSTITUTION',  value: 'University of Colorado Boulder',     highlight: false },
    { label: 'MAJOR',        value: 'Mechanical Engineering',             highlight: false },
    { label: 'MINORS',       value: 'Mathematics  |  Aerospace Eng.',     highlight: false },
    { label: 'GPA',          value: '3.6 / 4.0',                         mono: true       },
    { label: 'CLASS',        value: 'Junior — Expected Dec. 2027',        highlight: false },
    { divider: true },
    { label: 'STATUS',       value: '⬤  SEEKING INTERNSHIP',             green: true      },
    { divider: true },
    { label: 'CAD',          value: 'SolidWorks · Pro-E / Creo',         mono: true       },
    { label: 'ANALYSIS',     value: 'MATLAB · Ansys FEA · 3D Printing',  mono: true       },
    { label: 'DOMAINS',      value: 'Design · Manufacturing · Aerospace', highlight: false },
  ]

  return (
    <div className="relative glass-blueprint rounded-xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-blueprint-950/40 border-b border-blueprint-500/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="font-mono text-[10px] text-blueprint-400/60 ml-2 tracking-wider">
          TECHNICAL SPECIFICATION // DWG NO: LC-001-A
        </span>
        <span className="ml-auto font-mono text-[9px] text-dark-600">REV: C</span>
      </div>

      {/* Spec rows */}
      <div className="relative p-4 space-y-[3px]">
        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-400/40 to-transparent pointer-events-none"
          initial={{ top: 10, opacity: 0.8 }}
          animate={{ top: 180, opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.6, ease: 'linear' }}
        />

        {rows.map((row, i) => {
          if (row.divider) {
            return (
              <motion.div
                key={`div-${i}`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                className="my-1.5 border-t border-dark-700/40 origin-left"
              />
            )
          }
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="flex items-baseline gap-2"
            >
              <span className="spec-label">{row.label}</span>
              <span className="font-mono text-[10px] text-dark-600 shrink-0">:</span>
              <span className={
                row.green
                  ? 'font-mono text-xs text-green-400'
                  : row.mono
                  ? 'font-mono text-xs text-blueprint-300'
                  : 'text-sm text-dark-200'
              }>
                {row.value}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Footer title block */}
      <div className="px-4 py-2 bg-dark-900/60 border-t border-dark-700/30 flex items-center justify-between">
        <span className="font-mono text-[8px] text-dark-700 tracking-wider">DRAWN BY: LC // DATE: 2025 // SCALE: N/A</span>
        <span className="font-mono text-[8px] text-dark-700 tracking-wider">SHEET 1 OF 1</span>
      </div>

      {/* Corner brackets */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  )
}

const Hero = () => {
  const { scrollY }    = useScroll()
  const scrollOpacity  = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14 lg:pt-20">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blueprint-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT SIDE ── */}
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
              <span className="text-sm text-blueprint-300 font-mono tracking-wide">SEEKING ENGINEERING INTERNSHIPS</span>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/documents/Logan-Carter-Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View My Resume
              </a>
              <a
                href="https://www.linkedin.com/in/logan-carter-35h/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blueprint flex items-center gap-2"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </motion.div>

            {/* Core tools strip */}
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

          {/* ── RIGHT SIDE ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex flex-col gap-6 -mt-6"
          >
            {/* Profile photo */}
            <div className="relative w-[58%] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blueprint-500/15 to-primary-500/15 rounded-2xl blur-xl" />
              <div className="relative glass-blueprint rounded-2xl overflow-hidden p-2">
                <ImageWithLoader
                  src="/images/profile/logan.jpg"
                  alt="Logan Carter — Mechanical Engineering Student"
                  className="w-full h-auto rounded-xl object-cover"
                />
                {/* Corner brackets on photo */}
                <div className="absolute top-3.5 left-3.5 w-5 h-5 border-l border-t border-blueprint-400/50" />
                <div className="absolute top-3.5 right-3.5 w-5 h-5 border-r border-t border-blueprint-400/50" />
                <div className="absolute bottom-3.5 left-3.5 w-5 h-5 border-l border-b border-blueprint-400/50" />
                <div className="absolute bottom-3.5 right-3.5 w-5 h-5 border-r border-b border-blueprint-400/50" />
              </div>
              {/* GPA callout */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -top-3 -right-3 px-3 py-1.5 glass-blueprint rounded-lg"
              >
                <span className="font-mono text-xs text-blueprint-300">GPA: 3.6</span>
              </motion.div>
            </div>

            {/* Technical Spec Sheet */}
            <SpecSheet />
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
