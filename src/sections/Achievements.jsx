import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const certs = [
  {
    year: '2025', month: 'APR',
    org: 'Cisco Networking Academy', title: 'Python Essentials 1',
    field: 'PROGRAMMING', fieldColor: '#6B9DC4', status: 'COMPLETED',
    desc: 'Foundational Python — syntax, data structures, functions, and core programming concepts.',
    proof: '/certificates/cisco-python-1.pdf',
  },
  {
    year: '2025', month: 'APR',
    org: 'Cisco Networking Academy', title: 'Python Essentials 2',
    field: 'PROGRAMMING', fieldColor: '#6B9DC4', status: 'COMPLETED',
    desc: 'Advanced Python — OOP, modules, exceptions, file handling, and real-world applications.',
    proof: '/certificates/cisco-python-2.pdf',
  },
  {
    year: '2025', month: 'JUN',
    org: 'Deloitte × Forage', title: 'Cyber Job Simulation',
    field: 'CYBERSECURITY', fieldColor: '#C9A45C', status: 'COMPLETED',
    desc: 'Real-world cybersecurity simulation — security analysis, threat assessment, and professional practices.',
    proof: '/certificates/deloitte-cyber.pdf',
  },
  {
    year: '2025', month: 'SEP',
    org: 'AWS × Forage', title: 'Solutions Architecture Simulation',
    field: 'CLOUD', fieldColor: '#E3A06A', status: 'COMPLETED',
    desc: 'Designing a simple, scalable hosting architecture using AWS services and cloud best practices.',
    proof: '/certificates/aws-architecture.pdf',
  },
  {
    year: '2025', month: 'DEC',
    org: 'Simplilearn SkillUp', title: 'Full-Stack Development 101',
    field: 'WEB DEV', fieldColor: '#7AAC8A', status: 'COMPLETED',
    desc: 'Comprehensive full-stack development — HTML, CSS, JS, React, Node.js, and beyond.',
    proof: '/certificates/simplilearn-fsd.pdf',
  },
  {
    year: '2025', month: '',
    org: 'HackLearn', title: 'Cybersecurity Freelancing Learn & Earn',
    field: 'CYBERSECURITY', fieldColor: '#C9A45C', status: 'APPRECIATION',
    desc: "Recognition for participation and contribution in HackLearn's cybersecurity freelancing program.",
    proof: '/certificates/hacklearn-cybersecurity.jpg',
  },
  {
    year: '2025', month: '',
    org: 'Ideathon', title: 'Ideathon Participation',
    field: 'INNOVATION', fieldColor: '#A07AAC', status: 'PARTICIPATION',
    desc: 'Presented innovative ideas and solutions at a competitive ideathon event.',
    proof: '/certificates/ideathon.pdf',
  },
  {
    year: '2025', month: '',
    org: 'Cambridge Assessment English', title: 'PET English Proficiency',
    field: 'LANGUAGE', fieldColor: '#A07AAC', status: 'CERTIFIED',
    desc: 'Certified English language proficiency through the Cambridge Preliminary English Test (PET) examination.',
    proof: '/certificates/cambridge-pet.pdf',
  },
  {
    year: '2025', month: '',
    org: 'NPTEL', title: 'NPTEL Certification',
    field: 'ACADEMICS', fieldColor: '#7AAC8A', status: 'COMPLETED',
    desc: 'Completed an NPTEL online certification course through IIT/IISc national programme.',
    proof: '/certificates/nptel-ms.pdf',
  },
  {
    year: '2025', month: '',
    org: 'Vignan Mahotsav', title: 'Event Coordinator',
    field: 'LEADERSHIP', fieldColor: '#AC8A7A', status: 'APPRECIATION',
    desc: 'Recognized for coordinating and contributing to Vignan Mahotsav, a university-level annual event.',
    proof: '/certificates/vignan-mahotsav.pdf',
  },
]

export default function Achievements() {
  const [expanded, setExpanded] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section id="achievements" ref={ref}
      style={{ padding: '100px 0', background: '#070707', position: 'relative' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 56px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
            letterSpacing: '0.22em', color: '#C9A45C', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
            06 — LEARNING IN PUBLIC
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,5vw,64px)',
            fontWeight: 300, color: '#F5F1E8', lineHeight: 1.1, marginBottom: '16px' }}>
            Certifications &{' '}<em style={{ color: '#C9A45C' }}>Achievements.</em>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic',
            color: '#8A8070', lineHeight: 1.7, maxWidth: '560px', marginBottom: 0 }}>
            "Every certificate represents a step forward — but the real achievement is what comes next."
          </p>
        </motion.div>

        {/* Table header */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: '80px 180px 1fr 110px 140px 130px',
            gap: '16px', padding: '12px 24px',
            borderBottom: '1px solid rgba(201,164,92,0.18)', marginBottom: '4px' }}
          className="cert-row-head">
          {['YEAR', 'ISSUER', 'CERTIFICATION', 'FIELD', 'STATUS', 'PROOF'].map(h => (
            <span key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
              letterSpacing: '0.16em', color: '#8A8070', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </motion.div>

        {/* Rows */}
        {certs.map((cert, i) => {
          const isOpen = expanded === i
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}>

              {/* Main row — click to expand description */}
              <div
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{ display: 'grid', gridTemplateColumns: '80px 180px 1fr 110px 140px 130px',
                  gap: '16px', padding: '20px 24px',
                  borderBottom: isOpen ? 'none' : '1px solid rgba(201,164,92,0.08)',
                  background: isOpen ? 'rgba(201,164,92,0.05)' : 'transparent',
                  cursor: 'pointer', alignItems: 'center', position: 'relative',
                  transition: 'background 0.3s' }}
                className="cert-row-head"
                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(201,164,92,0.03)' }}
                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
              >
                {/* Gold left accent when open */}
                {isOpen && (
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                    background: `linear-gradient(180deg, transparent, ${cert.fieldColor}, transparent)` }} />
                )}

                {/* Year */}
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem',
                    fontWeight: 300, color: isOpen ? '#C9A45C' : '#C8C0B0', lineHeight: 1 }}>
                    {cert.year}
                  </div>
                  {cert.month && (
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
                      letterSpacing: '0.1em', color: '#8A8070', marginTop: '2px' }}>{cert.month}</div>
                  )}
                </div>

                {/* Org */}
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500,
                  color: isOpen ? '#E3C98A' : '#C8C0B0', transition: 'color 0.3s' }}>{cert.org}</div>

                {/* Title */}
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400,
                  color: isOpen ? '#F5F1E8' : '#C8C0B0', transition: 'color 0.3s' }}>{cert.title}</div>

                {/* Field badge */}
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                  letterSpacing: '0.08em', color: cert.fieldColor,
                  border: `1px solid ${cert.fieldColor}55`, padding: '4px 9px',
                  background: `${cert.fieldColor}15`, whiteSpace: 'nowrap',
                  display: 'inline-block' }}>{cert.field}</span>

                {/* Status */}
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: cert.status === 'COMPLETED' ? '#4CAF70'
                    : cert.status === 'APPRECIATION' ? '#C9A45C' : '#8A8070' }}>
                  {cert.status === 'COMPLETED' ? '✓ ' : '◆ '}{cert.status}
                </span>

                {/* ── ALWAYS VISIBLE "View Proof" button ── */}
                <a
                  href={cert.proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                    color: '#C9A45C', border: '1px solid rgba(201,164,92,0.45)',
                    padding: '8px 16px', whiteSpace: 'nowrap',
                    background: 'rgba(201,164,92,0.06)',
                    transition: 'background 0.25s, border-color 0.25s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,164,92,0.16)'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.85)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,164,92,0.06)'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.45)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  View Proof
                </a>
              </div>

              {/* Expanded description (click row to show) */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: 'rgba(201,164,92,0.03)',
                    borderBottom: '1px solid rgba(201,164,92,0.1)',
                    padding: '16px 24px 18px 108px', overflow: 'hidden' }}
                >
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
                    color: '#C8C0B0', lineHeight: 1.8, margin: 0, maxWidth: '600px' }}>
                    {cert.desc}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Hint */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            letterSpacing: '0.12em', color: '#5A5347', marginTop: '20px', textAlign: 'right' }}>
          ↑ Click any row to read details
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .cert-row-head { grid-template-columns: 64px 1fr 1fr 120px !important; }
          .cert-row-head > *:nth-child(4),
          .cert-row-head > *:nth-child(5) { display: none; }
        }
        @media (max-width: 640px) {
          .cert-row-head { grid-template-columns: 56px 1fr 110px !important; }
          .cert-row-head > *:nth-child(3),
          .cert-row-head > *:nth-child(4),
          .cert-row-head > *:nth-child(5) { display: none; }
        }
      `}</style>
    </section>
  )
}
