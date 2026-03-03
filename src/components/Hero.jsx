import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

const photos = [
  '/images/ski-lift.jpg',
  '/images/profile/logan.jpg',
]

const Hero = () => {
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 220], [1, 0])
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex(i => (i + 1) % photos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Crossfading background photos */}
      <div className="absolute inset-0">
        {photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms]"
            style={{ opacity: i === photoIndex ? 1 : 0 }}
          />
        ))}
        {/* Gradient overlay — heavy on left for readability, light on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/25" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full pt-20">

          {/* Role tag */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cu-gold font-mono tracking-[0.25em] text-xs sm:text-sm uppercase mb-4"
          >
            MECHANICAL ENGINEERING · UNIVERSITY OF COLORADO BOULDER
          </motion.p>

          {/* Big first name */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h1 className="text-[7rem] sm:text-[10rem] lg:text-[13rem] font-black leading-none tracking-tighter text-white uppercase">
              LOGAN
            </h1>
          </motion.div>

          {/* Gold accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-5 -mt-4 mb-2"
          >
            <div className="h-px w-14 bg-cu-gold" />
            <span className="text-cu-gold font-mono tracking-[0.25em] text-base sm:text-lg uppercase">
              CU BOULDER
            </span>
            <div className="h-px w-14 bg-cu-gold" />
          </motion.div>

          {/* Ghost last name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="overflow-hidden -mt-4 mb-6"
          >
            <span className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter text-white/[0.07] uppercase select-none">
              CARTER
            </span>
          </motion.div>

          {/* Info line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-white/60 text-base sm:text-lg mb-10 font-light tracking-wide"
          >
            Mechanical Engineering · Math &amp; Aerospace Minors · Boulder, CO
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-cu-gold text-black font-bold text-sm tracking-[0.15em] uppercase hover:bg-cu-gold-light transition-colors duration-200"
            >
              EXPLORE WORK
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-cu-gold text-cu-gold font-bold text-sm tracking-[0.15em] uppercase hover:bg-cu-gold/10 transition-colors duration-200"
            >
              GET IN TOUCH
            </a>
            <a
              href="https://www.linkedin.com/in/logan-carter-35h/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 text-white/70 font-bold text-sm tracking-[0.15em] uppercase hover:border-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Linkedin size={16} />
              LINKEDIN
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — vertical on right */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-3"
      >
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-cu-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
