import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const categories = [
  {
    id: 'programming', label: 'PROGRAMMING', num: '01', span: 1,
    accent: '#6B9DC4',
    items: ['Python', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'web', label: 'WEB DEVELOPMENT', num: '02', span: 1,
    accent: '#7AAC8A',
    items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'REST APIs', 'Full-Stack Development'],
  },
  {
    id: 'security', label: 'CYBERSECURITY', num: '03', span: 1,
    accent: '#C9A45C',
    items: [
      'Web Application Security',
      'Vulnerability Detection',
      'Security Testing',
      'Helmet.js',
      'Express Rate Limit',
      'JWT Authentication',
      'SQLi & XSS Detection',
      'Ethical Hacking (Learning)',
    ],
  },
  {
    id: 'cloud', label: 'CLOUD & ARCHITECTURE', num: '04', span: 1,
    accent: '#E3A06A',
    items: ['AWS Architecture (Learning)', 'Scalable System Concepts', 'Cloud Fundamentals'],
  },
  {
    id: 'tools', label: 'TOOLS & WORKFLOW', num: '05', span: 1,
    accent: '#A07AAC',
    items: ['Git', 'GitHub', 'VS Code', 'Linux Fundamentals'],
  },
  {
    id: 'soft', label: 'LANGUAGES', num: '06', span: 1,
    accent: '#AC8A7A',
    items: ['Telugu (Native)', 'English (Cambridge PET Certified)', 'Hindi (Conversational)'],
  },
]

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" ref={ref}
      style={{ padding: '100px 0', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle grid bg */}
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(201,164,92,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(201,164,92,0.012) 1px,transparent 1px)`,
        backgroundSize: '100px 100px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 56px', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} style={{ marginBottom: '56px' }}>

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
            letterSpacing: '0.22em', color: '#C9A45C', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
            05 — THE TOOLS BEHIND THE JOURNEY
          </div>

          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,5vw,62px)',
            fontWeight: 300, color: '#F5F1E8', lineHeight: 1.1, marginBottom: '12px' }}>
            Technologies I've been{' '}<em style={{ color: '#C9A45C' }}>working with.</em>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300,
            color: '#7A6840', margin: 0, maxWidth: '560px' }}>
            A growing toolkit — built through projects, certifications, and continuous exploration.
          </p>
        </motion.div>

        {/* Grid — 3 cols, each card sized by content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: 'rgba(201,164,92,0.07)' }} className="skills-grid">

          {categories.map((cat, ci) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: ci * 0.08 }}
              style={{ background: '#0A0A0A', padding: '36px 32px', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#111'
                e.currentTarget.querySelector('.cat-accent-bar').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0A0A0A'
                e.currentTarget.querySelector('.cat-accent-bar').style.opacity = '0'
              }}
            >
              {/* Top accent bar on hover */}
              <div className="cat-accent-bar" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${cat.accent}, transparent)`,
                opacity: 0, transition: 'opacity 0.3s',
              }} />

              {/* Corner accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '28px', height: '28px',
                borderTop: `1px solid ${cat.accent}30`, borderRight: `1px solid ${cat.accent}30` }} />

              {/* Number */}
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                letterSpacing: '0.16em', color: '#7A6840', marginBottom: '6px' }}>{cat.num}</div>

              {/* Category name */}
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: cat.accent, marginBottom: '20px', lineHeight: 1.3 }}>{cat.label}</h3>

              {/* Items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '9px' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%',
                      background: `${cat.accent}60`, flexShrink: 0, marginTop: '7px' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300,
                      color: '#C8C0B0', lineHeight: 1.45 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            letterSpacing: '0.1em', color: '#7A6840', marginTop: '28px',
            borderLeft: '2px solid rgba(201,164,92,0.2)', paddingLeft: '14px' }}>
          Skill depth varies. Some are actively used in projects; others are explored through certifications and learning.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
