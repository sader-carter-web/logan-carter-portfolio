import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Linkedin, Cog, TreePine, Globe, Play } from 'lucide-react'

// Lazy-loaded YouTube embed
const YouTubeEmbed = ({ videoId }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded,  setHasLoaded]  = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasLoaded) { setIsVisible(true); setHasLoaded(true) } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasLoaded])

  return (
    <div ref={ref} className="relative w-full aspect-[9/16] max-w-[260px] mx-auto rounded-xl overflow-hidden bg-dark-800 border border-blueprint-500/15">
      {!isVisible ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900">
          <div className="w-14 h-14 rounded-full bg-blueprint-500/15 flex items-center justify-center mb-3">
            <Play size={24} className="text-blueprint-400 ml-1" />
          </div>
          <p className="font-mono text-[10px] text-dark-500 tracking-wider">SCROLL TO LOAD</p>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
          title="GEEN 1400 Engineering Design Project"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  )
}

// Engineering drawing title block badge
const TitleBlock = ({ dwgNo, rev, date }) => (
  <div className="flex items-stretch border border-dark-700/60 rounded overflow-hidden font-mono text-[8px] text-dark-600">
    <div className="px-2 py-1 border-r border-dark-700/60 flex flex-col gap-0.5">
      <span>DWG: {dwgNo}</span>
      <span>REV: {rev}</span>
    </div>
    <div className="px-2 py-1 flex flex-col gap-0.5">
      <span>DATE: {date}</span>
      <span>DRAWN: LC</span>
    </div>
  </div>
)

const Projects = () => {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title:        'GEEN 1400 — Engineering Design Project',
      description:  'Multi-phase engineering design project at CU Boulder encompassing concept development, CAD modeling, fabrication, and testing of working prototypes with iterative design improvements.',
      icon:         Cog,
      highlights:   ['Full design lifecycle execution', 'CAD modeling & prototyping', 'Testing & validation process', 'Design Expo final presentation'],
      technologies: ['SolidWorks', 'Prototyping', '3D Printing', 'Team Collaboration', 'Testing'],
      featured:     true,
      accent:       '#0ea5e9',
      dwgNo:        'LC-001',
      rev:          'B',
      date:         '2025',
      videoId:      'sggqbIs09tU',
    },
    {
      title:        'Trail Design & Construction',
      description:  'Led a team of track athletes to plan, design, and construct a major trail renovation project through wooded terrain using structural engineering principles.',
      icon:         TreePine,
      highlights:   ['Project planning & leadership', 'Technical structural designs', 'Gravel path engineering', 'Team coordination & execution'],
      technologies: ['Project Management', 'Structural Design', 'Leadership', 'Construction'],
      featured:     true,
      accent:       '#f59e0b',
      dwgNo:        'LC-002',
      rev:          'A',
      date:         '2024',
      videoId:      null,
    },
    {
      title:        'Website Creation for Small Businesses',
      description:  'Building modern websites for small companies that lack an online presence or have outdated sites, helping businesses establish their digital footprint.',
      icon:         Globe,
      highlights:   ['Client requirement gathering', 'Modern responsive design', 'Full-stack development', 'Business impact delivery'],
      technologies: ['Web Development', 'Design', 'Client Relations', 'Problem Solving'],
      featured:     false,
      accent:       '#8b5cf6',
      dwgNo:        'LC-003',
      rev:          'A',
      date:         '2024',
      videoId:      null,
    },
  ]

  return (
    <section id="projects" className="py-24 relative bg-dark-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-12 bg-blueprint-500/40" />
            <span className="font-mono text-[10px] text-blueprint-400/60 tracking-[0.35em] uppercase">Project Archive</span>
            <div className="h-[1px] w-12 bg-blueprint-500/40" />
          </div>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto">
            Engineering projects showcasing design thinking, technical execution, and leadership.
          </p>
        </motion.div>

        {/* ── GEEN 1400 — Featured with video ── */}
        {(() => {
          const FeaturedIcon = projects[0].icon
          return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative mb-8 group"
        >
          <div className="relative glass rounded-2xl overflow-hidden card-hover border-blueprint-500/15">
            {/* Accent bar */}
            <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${projects[0].accent}, transparent)` }} />

            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${projects[0].accent}20`, border: `1px solid ${projects[0].accent}40` }}>
                  <FeaturedIcon size={22} style={{ color: projects[0].accent }} />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-dark-600 tracking-widest block">PROJECT — {projects[0].dwgNo}</span>
                  <h3 className="text-base font-semibold text-white group-hover:text-blueprint-300 transition-colors">
                    {projects[0].title}
                  </h3>
                </div>
              </div>
              <TitleBlock dwgNo={projects[0].dwgNo} rev={projects[0].rev} date={projects[0].date} />
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-dark-400 text-sm mb-5 leading-relaxed">{projects[0].description}</p>

                  <div className="grid sm:grid-cols-2 gap-2 mb-5">
                    {projects[0].highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 text-xs text-dark-300">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: projects[0].accent }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-700/40">
                    {projects[0].technologies.map(tech => (
                      <span key={tech} className="blueprint-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                <YouTubeEmbed videoId={projects[0].videoId} />
              </div>
            </div>
          </div>

          {/* APPROVED stamp */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="border-2 border-green-500/40 rounded px-2 py-0.5 rotate-[-12deg]">
              <span className="font-mono text-[9px] text-green-500/60 tracking-widest font-bold">APPROVED</span>
            </div>
          </div>
        </motion.div>
          )
        })()}

        {/* ── Remaining projects ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.slice(1).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              className="relative group"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                {/* Accent bar */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-dark-700/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${project.accent}20`, border: `1px solid ${project.accent}40` }}>
                      <project.icon size={18} style={{ color: project.accent }} />
                    </div>
                    <span className="font-mono text-[9px] text-dark-600 tracking-widest">{project.dwgNo}</span>
                  </div>
                  <TitleBlock dwgNo={project.dwgNo} rev={project.rev} date={project.date} />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blueprint-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-400 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>

                  <div className="grid sm:grid-cols-2 gap-1.5 mb-4">
                    {project.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 text-xs text-dark-300">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.accent }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-dark-700/40">
                    {project.technologies.map(tech => (
                      <span key={tech} className="blueprint-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.linkedin.com/in/logan-carter-35h/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-blueprint"
          >
            <Linkedin size={18} />
            View More on LinkedIn
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Projects
