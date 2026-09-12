import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const traits = [
  { word: 'CURIOUS', desc: 'I ask questions.' },
  { word: 'DRIVEN', desc: 'I explore answers.' },
  { word: 'LEARNING', desc: 'I build knowledge.' },
  { word: 'BUILDING', desc: 'I apply what I learn.' },
  { word: 'GROWING', desc: 'I keep moving forward.' },
]

export default function Mindset() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      style={{
        padding: '100px 0',
        background: '#070707',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large ghost text background */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(80px, 16vw, 220px)',
          fontWeight: 300,
          color: 'rgba(201,164,92,0.02)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          textAlign: 'center',
          userSelect: 'none',
        }}>MINDSET</div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative' }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.02rem', letterSpacing: '0.25em',
            color: '#C9A45C', marginBottom: '60px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
          08 — MY MINDSET
        </motion.div>

        {/* Large statement */}
        <div style={{ marginBottom: '100px' }}>
          {[
            '"THE MORE I LEARN,',
            'THE MORE I REALIZE',
            'THERE IS TO EXPLORE."',
          ].map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(32px, 6vw, 80px)',
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: i === 2 ? '#C9A45C' : i === 0 ? '#F5F1E8' : '#C8C0B0',
              }}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Traits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1px',
          background: 'rgba(201,164,92,0.06)',
        }}
          className="traits-grid"
        >
          {traits.map((t, i) => (
            <motion.div
              key={t.word}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
              style={{
                background: '#070707',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#0E0E0E'
                e.currentTarget.querySelector('.trait-word').style.color = '#C9A45C'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#070707'
                e.currentTarget.querySelector('.trait-word').style.color = '#F5F1E8'
              }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.97rem', letterSpacing: '0.15em',
                color: '#8A8070',
                marginBottom: '16px',
              }}>0{i + 1}</div>

              {/* Word */}
              <div
                className="trait-word"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: '#F5F1E8',
                  marginBottom: '12px',
                  transition: 'color 0.3s ease',
                }}
              >{t.word}</div>

              {/* Connector to next */}
              {i < traits.length - 1 && (
                <div style={{
                  position: 'absolute', right: '-8px', top: '50%',
                  width: '16px', height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,164,92,0.2), transparent)',
                  zIndex: 2,
                }} />
              )}

              {/* Desc */}
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.02rem', fontWeight: 300,
                color: '#7A6840', lineHeight: 1.5,
              }}>{t.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .traits-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .traits-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}


