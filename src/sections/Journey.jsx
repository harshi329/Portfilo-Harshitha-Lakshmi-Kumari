import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const milestones = [
  {
    year: '2024', period: 'PRESENT',
    title: 'B.TECH CSE',
    org: "Vignan's Foundation for Science, Technology & Research",
    desc: 'Building a strong foundation in computer science and technology. CGPA: 7.95 · Batch 2024–2028.',
    status: 'ONGOING', accent: '#C9A45C',
  },
  {
    year: '2025', period: 'APR',
    title: 'PYTHON DEVELOPMENT',
    org: 'Cisco Networking Academy',
    desc: 'Completed Python Essentials 1 & 2. Built foundational programming skills and logic.',
    status: 'COMPLETED', accent: '#6B9DC4',
  },
  {
    year: '2025', period: 'JUN',
    title: 'CYBERSECURITY EXPLORATION',
    org: 'Deloitte × Forage',
    desc: 'Completed the Deloitte Cyber Job Simulation. Deepened understanding of real-world cybersecurity.',
    status: 'COMPLETED', accent: '#C9A45C',
  },
  {
    year: '2025', period: 'SEP',
    title: 'CLOUD & ARCHITECTURE',
    org: 'AWS × Forage',
    desc: 'Explored scalable hosting architecture through the AWS Solutions Architecture job simulation.',
    status: 'COMPLETED', accent: '#E3A06A',
  },
  {
    year: '2025', period: 'DEC',
    title: 'FULL-STACK DEVELOPMENT',
    org: 'Simplilearn SkillUp',
    desc: 'Completed Full-Stack Development 101, expanding web development capabilities.',
    status: 'COMPLETED', accent: '#7AAC8A',
  },
  {
    year: '2025', period: '',
    title: 'ENGLISH PROFICIENCY',
    org: 'Cambridge PET Exam',
    desc: 'Certified English language proficiency through the Cambridge PET examination.',
    status: 'COMPLETED', accent: '#A07AAC',
  },
  {
    year: '2025', period: 'ONGOING',
    title: 'BUILDING PROJECTS',
    org: 'Independent',
    desc: 'Developing web apps, cybersecurity tools, and intelligent technology solutions — applying learning to real-world problems.',
    status: 'ONGOING', accent: '#C9A45C',
  },
  {
    year: 'FUTURE', period: '',
    title: "MASTER'S IN CYBERSECURITY",
    org: 'Germany',
    desc: 'Planning to pursue advanced education in cybersecurity — ethical hacking, penetration testing, and security research.',
    status: 'UPCOMING', accent: '#E3C98A',
  },
]

function MilestoneItem({ item, index, inView }) {
  const isLast = index === milestones.length - 1
  const isUpcoming = item.status === 'UPCOMING'
  const isOngoing = item.status === 'ONGOING'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '14px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.08, duration: 0.35, type: 'spring' }}
          style={{
            width: isUpcoming ? '11px' : '8px',
            height: isUpcoming ? '11px' : '8px',
            borderRadius: '50%',
            background: isOngoing ? item.accent : isUpcoming ? 'transparent' : 'transparent',
            border: `1.5px solid ${item.accent}`,
            boxShadow: isUpcoming ? `0 0 10px ${item.accent}50` : isOngoing ? `0 0 8px ${item.accent}60` : 'none',
            flexShrink: 0, marginTop: '5px',
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
            style={{
              flex: 1, width: '1px', minHeight: '48px',
              background: isUpcoming
                ? `linear-gradient(180deg, ${item.accent}80, transparent)`
                : 'linear-gradient(180deg, rgba(201,164,92,0.25), rgba(201,164,92,0.05))',
              transformOrigin: 'top',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : '40px', flex: 1 }}>
        {/* Year row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: isUpcoming ? '1.5rem' : '1.2rem',
            fontWeight: 300, color: item.accent, lineHeight: 1,
          }}>{item.year}</span>
          {item.period && (
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8A8070',
            }}>{item.period}</span>
          )}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: item.status === 'UPCOMING' ? item.accent
              : item.status === 'ONGOING' ? '#C9A45C' : '#5A6860',
            border: `1px solid ${item.status === 'UPCOMING' ? item.accent + '50'
              : item.status === 'ONGOING' ? 'rgba(201,164,92,0.35)' : 'rgba(90,104,96,0.35)'}`,
            padding: '1px 7px', background: 'transparent',
          }}>{item.status}</span>
        </div>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(18px, 2.4vw, 26px)',
          fontWeight: 300,
          color: isUpcoming ? '#F5F1E8' : '#D8D0C0',
          marginBottom: '3px', lineHeight: 1.2,
        }}>{item.title}</h3>

        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem', fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: '#7A6840', marginBottom: '8px',
        }}>{item.org}</div>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.95rem', fontWeight: 300,
          color: '#9A9080', lineHeight: 1.75, maxWidth: '480px', margin: 0,
        }}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const [ref, inView] = useInView()

  return (
    <section id="journey" ref={ref}
      style={{ padding: '100px 0', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(201,164,92,0.03) 0%, transparent 70%)',
        pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 56px' }}>

        {/* ── Header row — compact, not half-page sticky ── */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              letterSpacing: '0.22em', color: '#C9A45C', marginBottom: '14px',
              display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
              07 — MY JOURNEY
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,5vw,62px)',
              fontWeight: 300, color: '#F5F1E8', lineHeight: 1.05 }}>
              The path <em style={{ color: '#C9A45C' }}>so far.</em>
            </h2>
          </div>

          {/* Legend — right side of header */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingBottom: '6px' }}>
            {[
              { label: 'ONGOING',   color: '#C9A45C' },
              { label: 'COMPLETED', color: '#5A6860' },
              { label: 'UPCOMING',  color: '#E3C98A' },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', border: `1.5px solid ${color}` }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                  letterSpacing: '0.14em', color: '#8A8070' }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline — single full-width column ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }} className="journey-cols">
          <div>
            {milestones.filter((_, i) => i % 2 === 0).map((m, i) => (
              <MilestoneItem key={m.title} item={m} index={i * 2} inView={inView} />
            ))}
          </div>
          <div style={{ paddingTop: '60px' }}>
            {milestones.filter((_, i) => i % 2 === 1).map((m, i) => (
              <MilestoneItem key={m.title} item={m} index={i * 2 + 1} inView={inView} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .journey-cols { grid-template-columns: 1fr !important; gap: 0 !important; }
          .journey-cols > div:last-child { padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
