import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const steps = ['CURIOSITY', 'EXPLORATION', 'EXPERIMENTATION', 'UNDERSTANDING', 'GROWTH']

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '100px 0',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Side gold accent */}
      <div style={{
        position: 'absolute', left: 0, top: '15%', bottom: '15%',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201,164,92,0.18), transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'start',
        }}
          className="about-grid"
        >
          {/* Left — Editorial text */}
          <div>
            <motion.div
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={0}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.02rem',
                letterSpacing: '0.25em',
                color: '#C9A45C',
                marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
              02 — ABOUT ME
            </motion.div>

            <motion.h2
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={1}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(38px, 5vw, 66px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#F5F1E8',
                marginBottom: '36px',
              }}
            >
              Curiosity is where<br />
              <em style={{ color: '#C9A45C' }}>my journey begins.</em>
            </motion.h2>

            <motion.p
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={2}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.05rem', fontWeight: 300,
                color: '#C8C0B0', lineHeight: 1.9,
                marginBottom: '20px',
              }}
            >
              I am <span style={{ fontFamily:'Playfair Display, serif', fontStyle:'italic', fontWeight:700, color:'#E3C98A' }}>Harshitha Lakshmi Kumari</span>, a 3rd-year Computer Science and Engineering
              student at <span style={{ color: '#E3C98A' }}>Vignan's Foundation for Science, Technology & Research</span> (Batch 2024–2028),
              with a CGPA of <span style={{ color: '#C9A45C' }}>7.95</span>. I have a strong interest in cybersecurity and emerging technologies.
            </motion.p>

            <motion.p
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={3}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.05rem', fontWeight: 300,
                color: '#C8C0B0', lineHeight: 1.9,
                marginBottom: '20px',
              }}
            >
              I am particularly fascinated by understanding how digital systems work — from
              their architecture and functionality to the security challenges they face.
              My growing interest in cybersecurity has led me toward exploring ethical hacking,
              penetration testing, secure systems, authentication, cryptography, and digital security.
            </motion.p>

            <motion.p
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={4}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.15rem', fontWeight: 300,
                fontStyle: 'italic',
                color: '#C9A45C', lineHeight: 1.7,
                marginBottom: '20px',
                borderLeft: '1px solid rgba(201,164,92,0.3)',
                paddingLeft: '20px',
              }}
            >
              "I don't just want to understand technology. I want to understand how it works,
              where it breaks, and how to make it stronger."
            </motion.p>

            <motion.p
              initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={fadeUp} custom={5}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.05rem', fontWeight: 300,
                color: '#9A9080', lineHeight: 1.9,
              }}
            >
              My goal is to continue developing my technical skills and eventually pursue a{' '}
              <span style={{ color: '#C8C0B0' }}>Master's degree in Cybersecurity in Germany.</span>
            </motion.p>
          </div>

          {/* Right — Visual journey ladder */}
          <div style={{ paddingTop: '48px' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'flex', alignItems: 'stretch', gap: '24px' }}
                >
                  {/* Left line + dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '24px' }}>
                    <div style={{
                      width: '7px', height: '7px',
                      borderRadius: '50%',
                      background: i === 0 ? '#C9A45C' : i === steps.length - 1 ? '#C9A45C' : '#7A6840',
                      border: `1px solid ${i === 0 || i === steps.length - 1 ? '#C9A45C' : '#9A9080'}`,
                      flexShrink: 0,
                      marginTop: '18px',
                      transition: 'background 0.3s',
                    }} />
                    {i < steps.length - 1 && (
                      <div style={{
                        flex: 1,
                        width: '1px',
                        background: 'linear-gradient(180deg, rgba(201,164,92,0.25), rgba(201,164,92,0.06))',
                        minHeight: '40px',
                      }} />
                    )}
                  </div>
                  {/* Text */}
                  <div style={{ paddingTop: '10px', paddingBottom: '32px' }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.02rem',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: i === 0 || i === steps.length - 1 ? '#C9A45C' : '#9A9080',
                    }}>{step}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subtle stat blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.7 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '1px', marginTop: '40px',
                border: '1px solid rgba(201,164,92,0.08)',
              }}
            >
              {[
                { val: '7.95', label: 'CGPA' },
                { val: '2028', label: 'Graduation Year' },
                { val: 'CSE', label: 'Branch' },
                { val: 'VFSTR', label: 'University' },
              ].map(({ val, label }) => (
                <div key={label} style={{
                  padding: '20px 24px',
                  background: '#111',
                  borderBottom: '1px solid rgba(201,164,92,0.05)',
                }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.8rem', fontWeight: 300,
                    color: '#C9A45C', lineHeight: 1,
                    marginBottom: '4px',
                  }}>{val}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.02rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: '#7A6840',
                  }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
        @media (max-width: 480px) {
          .about-grid { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}


