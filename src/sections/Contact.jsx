import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

function GoldLines() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const lines = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      len: 40 + Math.random() * 80, angle: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.005, alpha: 0.05 + Math.random() * 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lines.forEach(l => {
        l.angle += l.speed
        const ex = l.x + Math.cos(l.angle) * l.len
        const ey = l.y + Math.sin(l.angle) * l.len
        const grad = ctx.createLinearGradient(l.x, l.y, ex, ey)
        grad.addColorStop(0, 'rgba(201,164,92,0)')
        grad.addColorStop(0.5, `rgba(201,164,92,${l.alpha})`)
        grad.addColorStop(1, 'rgba(201,164,92,0)')
        ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(ex, ey)
        ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

const btn = {
  gold: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontFamily: 'Inter, sans-serif', fontSize: '0.97rem', fontWeight: 500,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#070707', background: 'linear-gradient(135deg, #C9A45C, #E3C98A)',
    padding: '16px 32px', textDecoration: 'none',
    transition: 'opacity 0.3s, transform 0.3s',
  },
  outline: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontFamily: 'Inter, sans-serif', fontSize: '0.97rem', fontWeight: 400,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#C9A45C', border: '1px solid rgba(201,164,92,0.3)',
    padding: '16px 32px', textDecoration: 'none',
    transition: 'border-color 0.3s, transform 0.3s, background 0.3s',
  },
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section id="contact" ref={ref} style={{
      padding: '100px 0 80px', background: '#070707',
      position: 'relative', overflow: 'hidden',
      minHeight: '80vh', display: 'flex', alignItems: 'center',
    }}>
      <GoldLines />
      <div style={{ position: 'absolute', top: 0, left: '48px', right: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,164,92,0.2), transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.02rem', letterSpacing: '0.25em', color: '#C9A45C', marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
          10 — CONTACT
          <span style={{ width: '20px', height: '1px', background: '#C9A45C', display: 'inline-block' }} />
        </motion.div>

        {/* Headline */}
        {["Let's connect, learn,", 'and build something meaningful.'].map((line, i) => (
          <motion.h2 key={i}
            initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 6vw, 78px)', fontWeight: 300, lineHeight: 1.2, color: i === 1 ? '#C9A45C' : '#F5F1E8', marginBottom: i === 0 ? '4px' : '40px' }}>
            {line}
          </motion.h2>
        ))}

        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 300, color: '#9A9080', lineHeight: 1.9, maxWidth: '520px', margin: '0 auto 48px' }}>
          Whether it's cybersecurity, technology, innovation, collaboration, or simply an interesting idea — I'm always open to meaningful conversations and opportunities to learn.
        </motion.p>

        {/* Contact chips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          <a href="mailto:harshithalakshmikumari@gmail.com" data-cursor
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.05rem', letterSpacing: '0.08em', color: '#C8C0B0', border: '1px solid rgba(201,164,92,0.2)', padding: '12px 22px', textDecoration: 'none', transition: 'color 0.3s, border-color 0.3s, background 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C9A45C'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.5)'; e.currentTarget.style.background = 'rgba(201,164,92,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#C8C0B0'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.2)'; e.currentTarget.style.background = 'transparent' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            harshithalakshmikumari@gmail.com
          </a>
          <a href="tel:+919492081816" data-cursor
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.05rem', letterSpacing: '0.08em', color: '#9A9080', border: '1px solid rgba(201,164,92,0.08)', padding: '12px 22px', textDecoration: 'none', transition: 'color 0.3s, border-color 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C8C0B0'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9A9080'; e.currentTarget.style.borderColor = 'rgba(201,164,92,0.08)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91 9492081816
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.55 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '80px' }}>

          {/* Download Resume — PRIMARY */}
          <a href="/Harshitha_Resume.html" target="_blank" rel="noopener noreferrer" data-cursor
            style={{ ...btn.gold }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>

          {/* GitHub */}
          <a href="https://github.com/harshi329" target="_blank" rel="noopener noreferrer" data-cursor
            style={{ ...btn.outline }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,164,92,0.7)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(201,164,92,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,164,92,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub →
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/harshitha-lakshmi-kumari-popuri-5a1689361/" target="_blank" rel="noopener noreferrer" data-cursor
            style={{ ...btn.outline }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,164,92,0.7)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(201,164,92,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,164,92,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn →
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          style={{ borderTop: '1px solid rgba(201,164,92,0.06)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, fontStyle: 'italic', color: 'rgba(201,164,92,0.45)' }}>
            Harshi
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#8A8070' }}>
            HARSHITHA LAKSHMI KUMARI © 2025
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8A8070' }}>
            CYBERSECURITY ENTHUSIAST · CSE · VFSTR
          </div>
        </motion.div>
      </div>
    </section>
  )
}


