import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Globe, Users, Briefcase } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Portfolios Built' },
  { value: '2',  label: 'Partners'         },
  { value: '1',  label: 'Live Showcase'    },
]

const WebDev = () => {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="webdev" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section identifier */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cu-gold/60" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-cu-gold/60" />
            <span className="font-mono text-[10px] text-cu-gold/60 tracking-[0.35em] uppercase px-3">
              Side Venture
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cu-gold/30 to-transparent" />
          <span className="font-mono text-[9px] text-dark-700 tracking-widest hidden sm:block">
            DWG: LC-WEB-001
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Beyond Engineering —{' '}
              <span className="gradient-text">Building the Web</span>
            </h2>

            <p className="text-dark-400 leading-relaxed mb-6">
              Alongside my engineering studies, I co-founded{' '}
              <span className="text-cu-gold font-semibold">603 Websites</span>{' '}
              with my partner Louis Sader. We design and develop custom portfolio websites for
              professionals who want a polished online presence — without the agency price tag.
            </p>

            <p className="text-dark-400 leading-relaxed mb-8">
              This portfolio you're looking at right now? Built entirely in-house using{' '}
              <span className="text-white font-medium">React, Vite, and Tailwind CSS</span> — the
              same stack we use for every client. Every animation, color, and layout decision
              was made from scratch to reflect the engineer behind it.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mb-8 pb-8 border-b border-dark-800/60">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-4xl font-bold font-mono gradient-text leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="font-mono text-[10px] text-dark-600 tracking-[0.2em] uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="https://portfolio-showcase-ebon.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-cu-gold text-black font-bold text-sm tracking-[0.15em] uppercase hover:bg-cu-gold-light transition-colors duration-200 group"
            >
              <Globe size={16} />
              VIEW OUR PORTFOLIO SHOWCASE
              <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>

          {/* Right: feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: Globe,
                title: 'Custom Portfolio Sites',
                desc: 'Every site is designed from scratch — tailored to the individual, not from a template. Clean, fast, and built to impress.',
                color: '#CFB87C',
              },
              {
                icon: Users,
                title: '603 Websites',
                desc: 'Named after the NH area code where it all started. Logan Carter & Louis Sader, two students building real products.',
                color: '#A2A4A3',
              },
              {
                icon: Briefcase,
                title: 'React + Tailwind Stack',
                desc: 'Modern tech stack with Vite, Framer Motion animations, and Vercel deployment — professional results every time.',
                color: '#CFB87C',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
                className="relative glass rounded-xl p-5 card-hover overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${card.color}18`, border: `1px solid ${card.color}35` }}>
                    <card.icon size={18} style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{card.title}</h3>
                    <p className="text-dark-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default WebDev
