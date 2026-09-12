import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fields = [
  {
    num: '01',
    title: 'CYBERSECURITY',
    sub: 'The Foundation',
    desc: 'Ethical hacking, secure systems, authentication, cryptography, and digital security — understanding how to protect what matters.',
  },
  {
    num: '02',
    title: 'ETHICAL HACKING',
    sub: 'The Methodology',
    desc: 'Understanding vulnerabilities, security weaknesses, and how systems can be strengthened through responsible disclosure and testing.',
  },
  {
    num: '03',
    title: 'PENETRATION TESTING',
    sub: 'The Practice',
    desc: 'Exploring security testing methodologies and defensive security practices to identify and address potential entry points.',
  },
  {
    num: '04',
    title: 'INTELLIGENT SYSTEMS',
    sub: 'The Application',
    desc: 'Building technology solutions that respond intelligently to real-world challenges — from disaster management to smart automation.',
  },
  {
    num: '05',
    title: 'WEB & FULL-STACK',
    sub: 'The Craft',
    desc: 'Creating modern digital applications and interactive web experiences using contemporary development tools and frameworks.',
  },
]

export default function Fields() {
  const [hovered, setHovered] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section
      id="fields"
      ref={ref}
      style={{
        padding: '100px 0',
        background: '#070707',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201,164,92,0.12), transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '80px' }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.02rem', letterSpacing: '0.25em',
            color: '#C9A45C', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
            03 — FIELDS I'M EXPLORING
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontWeight: 300, color: '#F5F1E8',
            lineHeight: 1.1,
          }}>
            Domains that{' '}
            <em style={{ color: '#C9A45C' }}>define the direction.</em>
          </h2>
        </motion.div>

        {/* Field rows */}
        <div>
          {fields.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: i === 0 ? '1px solid rgba(201,164,92,0.1)' : 'none',
                borderBottom: '1px solid rgba(201,164,92,0.1)',
                padding: hovered === i ? '32px 0 36px' : '26px 0 30px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '40px',
                alignItems: 'center',
                cursor: 'default',
                transition: 'padding 0.4s ease',
                position: 'relative',
              }}
            >
              {/* Gold hover line */}
              <motion.div
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                style={{
                  position: 'absolute', left: 0, right: 0, top: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, #C9A45C, rgba(201,164,92,0.2), transparent)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Number */}
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.05rem', letterSpacing: '0.1em',
                color: hovered === i ? '#C9A45C' : '#8A8070',
                transition: 'color 0.3s ease',
              }}>
                {f.num}
              </span>

              {/* Title + desc */}
              <div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(22px, 3vw, 34px)',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  color: hovered === i ? '#F5F1E8' : '#C8C0B0',
                  transition: 'color 0.3s ease',
                  marginBottom: hovered === i ? '10px' : '0',
                }}>
                  {f.title}
                </h3>
                <motion.p
                  animate={{ opacity: hovered === i ? 1 : 0, height: hovered === i ? 'auto' : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem', fontWeight: 300,
                    color: '#9A9080', lineHeight: 1.7,
                    overflow: 'hidden',
                    marginBottom: 0,
                  }}
                >
                  {f.desc}
                </motion.p>
              </div>

              {/* Sub label */}
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.02rem', letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: hovered === i ? '#C9A45C' : '#8A8070',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              }}>
                {f.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


