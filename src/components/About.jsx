import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, Target, Users } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    {
      icon: GraduationCap,
      title: "B.S. Mechanical Engineering",
      description: "University of Colorado Boulder",
      detail: "Minors: Math & Aerospace"
    },
    {
      icon: Award,
      title: "Dean's List",
      description: "Fall 2024 / Spring 2025",
      detail: "Honors College | 3.6 GPA"
    },
    {
      icon: Target,
      title: "Naval Academy Accepted",
      description: "Class of 2028",
      detail: "Medical disqualification"
    },
    {
      icon: Users,
      title: "Leadership & Service",
      description: "Engineers for a Sustainable World",
      detail: "Leaders in Action"
    }
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading mx-auto">
            An ambitious engineer driven by creativity, analytical precision, and a passion for solving complex problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-dark-300 leading-relaxed">
              <p>
                I'm a <span className="text-primary-400 font-medium">Mechanical Engineering student</span> at
                the University of Colorado Boulder with minors in Math and Aerospace Engineering. My engineering
                journey is fueled by a deep curiosity for how things work and a drive to design innovative solutions.
              </p>
              <p>
                Before transferring to CU Boulder, I completed coursework at{' '}
                <span className="text-primary-400 font-medium">UMass Lowell</span> where
                I made Dean's List and was part of the Honors College. I was also accepted into the{' '}
                <span className="text-primary-400 font-medium">United States Naval Academy</span> Class
                of 2028, demonstrating my commitment to discipline and service.
              </p>
              <p>
                I bring a unique combination of{' '}
                <span className="text-primary-400 font-medium">technical expertise and leadership</span> to
                every project. Whether it's executing multi-phase design projects, leading construction
                initiatives, or building websites for small businesses, I thrive on challenges that push
                me to grow.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8">
              {[
                { value: "3.6", label: "GPA" },
                { value: "2", label: "Universities" },
                { value: "4+", label: "Years Experience" }
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 sm:p-4 glass rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-dark-500 text-xs sm:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group p-4 sm:p-6 glass rounded-xl card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <item.icon className="text-primary-400" size={24} />
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-dark-400 text-sm mb-1">{item.description}</p>
                <p className="text-dark-500 text-xs">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
