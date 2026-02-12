import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Cog, PenTool, Ruler, Wrench, Linkedin } from 'lucide-react'

const Hero = () => {
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14 lg:pt-20">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-primary-400 font-medium">Seeking Engineering Internships</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mb-8 items-start"
            >
              <p className="text-dark-400 text-lg max-w-xl leading-relaxed flex-1">
                Dedicated and innovative engineering student at the University of Colorado Boulder.
                Extensive experience in SolidWorks, MATLAB, and mechanical design with a passion for
                analytical precision and creative problem solving.
              </p>
              <div className="relative shrink-0 lg:hidden w-28 sm:w-36">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-orange-500/20 rounded-2xl blur-xl" />
                <div className="relative glass rounded-2xl overflow-hidden p-1.5">
                  <img
                    src="/images/profile/logan.jpg"
                    alt="Logan Carter - Mechanical Engineering Student"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2 px-2 py-1 glass rounded-lg"
                >
                  <span className="text-primary-400 font-mono text-[10px]">3.6 GPA</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="/documents/Logan-Carter-Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View My Resume
              </a>
              <a href="https://www.linkedin.com/in/logan-carter-35h/" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 relative z-10">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 sm:gap-6 mt-8 sm:mt-12"
            >
              <span className="text-dark-500 text-sm hidden sm:inline">Core Tools:</span>
              <div className="flex items-center gap-3 sm:gap-4">
                {[
                  { icon: PenTool, label: 'SolidWorks' },
                  { icon: Ruler, label: 'MATLAB' },
                  { icon: Cog, label: 'Ansys FEA' },
                  { icon: Wrench, label: '3D Printing' },
                ].map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    className="group relative"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700/50 group-hover:border-primary-500/50 transition-colors">
                      <Icon size={20} className="text-dark-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mobile scroll indicator - inline next to core tools */}
              <motion.a
                href="#about"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: scrollOpacity }}
                className="lg:hidden flex flex-col items-center text-dark-500 hover:text-primary-400 transition-colors ml-auto"
              >
                <span className="text-xs mb-1">Scroll</span>
                <ChevronDown size={16} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Desktop - Profile Image & Engineering Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block -mt-10"
          >
            <div className="relative flex flex-col gap-6">
              <div className="relative w-[60%] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-orange-500/20 rounded-2xl blur-xl" />
                <div className="relative glass rounded-2xl overflow-hidden p-2">
                  <img
                    src="/images/profile/logan.jpg"
                    alt="Logan Carter - Mechanical Engineering Student"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3 px-3 py-1.5 glass rounded-lg"
                >
                  <span className="text-primary-400 font-mono text-xs">3.6 GPA</span>
                </motion.div>
              </div>

              {/* Engineering Spec Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-orange-500/10 rounded-2xl blur-xl" />
                <div className="relative glass rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/80 border-b border-dark-700/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-dark-500 text-sm font-mono ml-2">engineer.spec</span>
                  </div>

                  <div className="p-6 font-mono text-sm">
                    <pre className="text-dark-300 leading-relaxed">
                      <code>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-yellow-400">logan</span>{' '}
                        <span className="text-primary-400">=</span>{' '}
                        <span className="text-dark-300">{'{'}</span>
                        {'\n'}
                        {'  '}<span className="text-orange-400">role</span>:{' '}
                        <span className="text-green-400">"Mechanical Engineer"</span>,
                        {'\n'}
                        {'  '}<span className="text-orange-400">tools</span>:{' '}
                        <span className="text-dark-300">[</span>
                        <span className="text-green-400">"SolidWorks"</span>,{' '}
                        <span className="text-green-400">"MATLAB"</span>,{' '}
                        <span className="text-green-400">"Ansys"</span>
                        <span className="text-dark-300">]</span>,
                        {'\n'}
                        {'  '}<span className="text-orange-400">passion</span>:{' '}
                        <span className="text-green-400">"Design & Innovation"</span>,
                        {'\n'}
                        {'  '}<span className="text-orange-400">status</span>:{' '}
                        <span className="text-green-400">"Seeking Internships"</span>
                        {'\n'}
                        <span className="text-dark-300">{'};'}</span>
                      </code>
                    </pre>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 glass rounded-lg"
                >
                  <span className="text-orange-400 font-mono text-sm">CU Boulder '27</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-dark-500 hover:text-primary-400 transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero
