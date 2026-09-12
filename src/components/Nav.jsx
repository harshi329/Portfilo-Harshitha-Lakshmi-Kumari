import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Journey',      href: '#journey' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('hero')
  const [menuOpen,  setMenuOpen]  = useState(false)

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
        transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="nav-container"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(24px, 4vw, 56px)',
          height: scrolled ? '64px' : '76px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          background: scrolled ? 'rgba(7,7,7,0.95)' : 'rgba(7,7,7,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,164,92,0.1)',
          transition: 'height 0.35s ease, background 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo('#hero')}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: 0, display: 'flex', alignItems: 'baseline', gap: '1px', justifySelf: 'start' }}>
          <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.4rem', fontWeight:700, fontStyle:'italic', letterSpacing:'0.04em', color:'#F5F1E8' }}>
            Harshi
          </span>
          <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.4rem', fontWeight:700, color:'#C9A45C' }}>.</span>
        </button>

        {/* Desktop links — centered perfectly */}
        <ul style={{ display:'flex', gap:'2px', listStyle:'none', justifySelf: 'center', margin: 0, padding: 0 }} className="nav-desktop">
          {links.map(({ label, href }) => {
            const id       = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem', fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: isActive ? '#C9A45C' : 'rgba(200,192,176,0.65)',
                    background: 'none', border: 'none', cursor: 'none',
                    padding: '8px clamp(8px, 1.1vw, 16px)', position: 'relative',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#F5F1E8' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(200,192,176,0.65)' }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-line"
                      style={{
                        position: 'absolute', bottom: '2px', left: '12px', right: '12px',
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

        {/* Right actions: CTA and Hamburger */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => scrollTo('#contact')}
            className="nav-cta"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#070707',
              background: 'linear-gradient(135deg, #C9A45C, #E3C98A)',
              border: 'none', borderRadius: '2px', padding: '9px 20px',
              cursor: 'none',
              boxShadow: '0 2px 14px rgba(201,164,92,0.18)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.9'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)' }}
          >
            Hire Me
          </motion.button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} className="hamburger"
            aria-label="Toggle menu"
            style={{ display:'none', flexDirection:'column', gap:'5px', background:'none', border:'none', cursor:'pointer', padding:'8px' }}>
            {[0,1,2].map(i => (
              <motion.div key={i}
                animate={menuOpen ? i===0?{rotate:45,y:6}:i===1?{opacity:0,scaleX:0}:{rotate:-45,y:-6} : {rotate:0,y:0,opacity:1,scaleX:1}}
                transition={{ duration:0.28 }}
                style={{ width:'22px', height:'1px', background:'#C9A45C', transformOrigin:'center' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, x:'100%' }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:'100%' }}
            transition={{ duration:0.4, ease:[0.25,0.46,0.45,0.94] }}
            style={{
              position:'fixed', top:0, right:0, bottom:0, width:'75vw', maxWidth:'300px',
              background:'#080808', borderLeft:'1px solid rgba(201,164,92,0.12)',
              zIndex:99, display:'flex', flexDirection:'column', justifyContent:'center', padding:'48px 40px',
            }}
          >
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, #C9A45C, transparent)' }} />
            <ul style={{ listStyle:'none' }}>
              {links.map(({ label, href }, idx) => (
                <motion.li key={href}
                  initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:idx*0.07, duration:0.4 }}
                  style={{ marginBottom:'32px' }}>
                  <button onClick={() => scrollTo(href)}
                    style={{
                      fontFamily:'Playfair Display, serif',
                      fontSize:'1.8rem', fontWeight:active===href.replace('#','')?700:300,
                      fontStyle:active===href.replace('#','')?'italic':'normal',
                      color:active===href.replace('#','')?'#C9A45C':'#F5F1E8',
                      background:'none', border:'none', cursor:'pointer', transition:'color 0.3s',
                    }}
                  >{label}</button>
                </motion.li>
              ))}
            </ul>
            <div style={{ paddingTop:'28px', borderTop:'1px solid rgba(201,164,92,0.1)' }}>
              <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.58rem', letterSpacing:'0.18em', color:'#5A5347', margin:0 }}>
                CYBERSECURITY · CSE · VFSTR
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-container {
            display: flex !important;
            justify-content: space-between !important;
          }
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
