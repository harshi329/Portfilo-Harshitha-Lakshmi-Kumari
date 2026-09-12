import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

function ConnectionLine({ inView }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let progress = 0
    let animId

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height

      // Gradient line from left (INDIA) to right (GERMANY)
      const p = Math.min(progress / 100, 1)
      const sx = 80, sy = h / 2
      const ex = w - 80, ey = h / 2
      const mx = w / 2, my = h * 0.28  // arc control point

      const grad = ctx.createLinearGradient(sx, 0, ex * p + sx * (1 - p), 0)
      grad.addColorStop(0, 'rgba(201,164,92,0.6)')
      grad.addColorStop(1, 'rgba(227,201,138,0.3)')

      ctx.beginPath()
      ctx.moveTo(sx, sy)

      // Quadratic arc
      const cx1 = sx + (mx - sx) * p * 2
      const cy1 = sy + (my - sy) * Math.min(p * 2, 1)
      const ex1 = sx + (ex - sx) * p
      const ey1 = sy + (ey - sy) * p

      ctx.quadraticCurveTo(
        sx + (mx - sx) * p, sy + (my - sy) * Math.min(p * 1.5, 1),
        ex1, ey1
      )

      ctx.strokeStyle = grad
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      ctx.stroke()

      // Dot at front of line
      if (p > 0.05) {
        ctx.beginPath()
        ctx.arc(ex1, ey1, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,164,92,${p})`
        ctx.setLineDash([])
        ctx.fill()
      }

      if (progress < 100) {
        progress += 0.7
        animId = requestAnimationFrame(draw)
      }
    }

    setTimeout(() => { animId = requestAnimationFrame(draw) }, 200)
    return () => cancelAnimationFrame(animId)
  }, [inView])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '120px', display: 'block' }}
    />
  )
}

export default function Future() {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      style={{
        padding: '100px 0',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(201,164,92,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.02rem', letterSpacing: '0.25em',
            color: '#C9A45C', marginBottom: '32px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
          09 — THE ROAD AHEAD
        </motion.div>

        {/* Large headline */}
        <div style={{ marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.05rem', letterSpacing: '0.22em',
              color: '#7A6840', marginBottom: '12px',
            }}
          >MY NEXT CHAPTER:</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(44px, 8vw, 100px)',
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#F5F1E8', marginBottom: '8px',
            }}
          >CYBERSECURITY.</motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(44px, 8vw, 100px)',
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: '-0.02em',
              WebkitTextStroke: '1px rgba(201,164,92,0.4)',
              color: 'transparent',
            }}
          >GERMANY.</motion.h2>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem', fontWeight: 300,
            color: '#B0A890', lineHeight: 1.9,
            maxWidth: '560px', marginBottom: '80px',
          }}
        >
          My journey in technology is continuously evolving, but cybersecurity has become
          one of the fields I am most passionate about exploring. My long-term goal is to
          continue developing my knowledge in ethical hacking, penetration testing, and
          cybersecurity — while pursuing advanced education in Germany.
        </motion.p>

        {/* Journey visual — INDIA → GERMANY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ position: 'relative', marginBottom: '60px' }}
        >
          {/* Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem', fontWeight: 300, color: '#C9A45C',
              }}>INDIA</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.97rem', letterSpacing: '0.15em', color: '#7A6840',
              }}>ORIGIN</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem', fontWeight: 300, color: '#E3C98A',
              }}>GERMANY</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.97rem', letterSpacing: '0.15em', color: '#7A6840',
              }}>DESTINATION</div>
            </div>
          </div>

          <ConnectionLine inView={inView} />

          {/* Milestone labels on line */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.97rem', letterSpacing: '0.12em', color: '#8A8070',
            }}>B.TECH CSE — 2024</span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.97rem', letterSpacing: '0.12em', color: '#C9A45C',
            }}>M.SC CYBERSECURITY — TBD</span>
          </div>
        </motion.div>

        {/* Target cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,164,92,0.06)' }}
          className="future-cards"
        >
          {[
            { label: 'DEGREE', value: "Master's", sub: 'in Cybersecurity' },
            { label: 'LOCATION', value: 'Germany', sub: 'European Education' },
            { label: 'FOCUS', value: 'Security', sub: 'Ethical Hacking & Pen Testing' },
          ].map(({ label, value, sub }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              style={{ background: '#0A0A0A', padding: '36px 32px' }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.97rem', letterSpacing: '0.18em',
                color: '#8A8070', marginBottom: '8px',
              }}>{label}</div>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem', fontWeight: 300,
                color: '#C9A45C', lineHeight: 1, marginBottom: '4px',
              }}>{value}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.02rem', fontWeight: 300,
                color: '#7A6840',
              }}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .future-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}


