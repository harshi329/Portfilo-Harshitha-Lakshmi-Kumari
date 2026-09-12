import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Journey',      href: '#journey' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('hero')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = href => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 56px',
          height: scrolled ? '68px' : '84px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(5,5,5,0.88)'
            : 'linear-gradient(180deg, rgba(5,5,5,0.6) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,164,92,0.08)' : 'none',
          transition: 'height 0.4s ease, background 0.5s ease, border 0.4s ease',
        }}
      >
        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo('#hero')}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}
        >
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem', fontWeight: 700, fontStyle: 'italic',
            letterSpacing: '0.04em', color: '#F5F1E8',
          }}>Harshi</span>
          <span style={{ color: '#C9A45C', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>.</span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '4px', listStyle: 'none' }} className="nav-desktop">
          {links.map(({ label, href }) => {
            const id       = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 400,
                    fontStyle: isActive ? 'italic' : 'normal',
                    letterSpacing: '0.06em',
                    color: isActive ? '#C9A45C' : 'rgba(200,192,176,0.8)',
                    background: isActive ? 'rgba(201,164,92,0.07)' : 'none',
                    border: isActive ? '1px solid rgba(201,164,92,0.2)' : '1px solid transparent',
                    cursor: 'none',
                    padding: '8px 18px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#F5F1E8'
                      e.currentTarget.style.fontStyle = 'italic'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(200,192,176,0.8)'
                      e.currentTarget.style.fontStyle = 'normal'
                    }
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute', bottom: '4px', left: '18px', right: '18px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #C9A45C, transparent)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── CTA pill — desktop only ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => scrollTo('#contact')}
          className="nav-cta"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#070707',
            background: 'linear-gradient(135deg, #C9A45C, #E3C98A)',
            border: 'none', padding: '9px 22px',
            cursor: 'none',
            transition: 'opacity 0.3s, transform 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Hire Me
        </motion.button>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger"
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 6 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  : { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.28 }}
              style={{ width: '22px', height: '1px', background: '#C9A45C', transformOrigin: 'center' }}
            />
          ))}
        </button>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '75vw', maxWidth: '300px',
              background: '#080808',
              borderLeft: '1px solid rgba(201,164,92,0.12)',
              zIndex: 99,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '48px 40px',
            }}
          >
            {/* Close line at top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9A45C, transparent)' }} />

            <ul style={{ listStyle: 'none' }}>
              {links.map(({ label, href }, idx) => (
                <motion.li key={href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                  style={{ marginBottom: '32px' }}
                >
                  <button
                    onClick={() => scrollTo(href)}
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.8rem', fontWeight: active === href.replace('#','') ? 700 : 300,
                      fontStyle: active === href.replace('#','') ? 'italic' : 'normal',
                      color: active === href.replace('#','') ? '#C9A45C' : '#F5F1E8',
                      background: 'none', border: 'none', cursor: 'pointer',
                      transition: 'color 0.3s',
                    }}
                  >{label}</button>
                </motion.li>
              ))}
            </ul>

            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(201,164,92,0.1)' }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5A5347', marginBottom: 0 }}>
                CYBERSECURITY · CSE · VFSTR
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
