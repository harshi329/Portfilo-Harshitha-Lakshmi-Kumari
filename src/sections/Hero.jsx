import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    })
    const COUNT = window.innerWidth < 768 ? 35 : 65
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.3, alpha: Math.random() * 0.45 + 0.1,
    }))
    let scanY = 0, scanDir = 1
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      scanY += 0.3 * scanDir
      if (scanY > canvas.height) scanDir = -1
      if (scanY < 0) scanDir = 1
      const sg = ctx.createLinearGradient(0, scanY - 70, 0, scanY + 70)
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, 'rgba(201,164,92,0.035)'); sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 70, canvas.width, 140)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y
        const d = Math.sqrt(dx*dx+dy*dy)
        if (d < 90) { p.x += (dx/d)*0.5; p.y += (dy/d)*0.5 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(201,164,92,${p.alpha*0.65})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy)
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(201,164,92,${(1-d/120)*0.1})`; ctx.lineWidth=0.5; ctx.stroke()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
}

const reveal = {
  hidden: { opacity: 0, y: 55 },
  show: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.9, delay:i*0.11, ease:[0.25,0.46,0.45,0.94] } }),
}

/* ── Right panel stat item ── */
function StatItem({ label, value, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity:0, x:30 }}
      animate={{ opacity:1, x:0 }}
      transition={{ duration:0.7, delay, ease:[0.25,0.46,0.45,0.94] }}
      style={{ borderBottom:'1px solid rgba(201,164,92,0.1)', paddingBottom:'16px', marginBottom:'16px' }}
    >
      <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.65rem', letterSpacing:'0.18em', color:'#8A8070', marginBottom:'4px', textTransform:'uppercase' }}>{label}</div>
      <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.15rem', fontWeight:300, color:'#F5F1E8', lineHeight:1.3 }}>{value}</div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'#070707' }}>
      <ParticleCanvas />

      {/* Grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(201,164,92,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(201,164,92,0.022) 1px,transparent 1px)`, backgroundSize:'80px 80px', pointerEvents:'none' }} />

      {/* Radial glow */}
      <div style={{ position:'absolute', top:'50%', left:'40%', transform:'translate(-50%,-50%)', width:'900px', height:'700px', background:'radial-gradient(ellipse, rgba(201,164,92,0.05) 0%, transparent 68%)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:2, width:'100%', padding:'0 64px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.1fr) 420px', gap:'72px', alignItems:'center', maxWidth:'1280px', margin:'0 auto' }} className="hero-grid">
          <motion.div initial="hidden" animate="show">

            {/* Label */}
            <motion.div variants={reveal} custom={0}
              style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.78rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A45C', marginBottom:'28px', display:'flex', alignItems:'center', gap:'14px' }}>
              <span style={{ display:'inline-block', width:'28px', height:'1px', background:'#C9A45C' }} />
              01 — CYBERSECURITY ENTHUSIAST
            </motion.div>

            <motion.h1 variants={reveal} custom={1}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(44px, 6.5vw, 84px)',
                fontWeight: 400, fontStyle: 'italic',
                lineHeight: 1.0, letterSpacing: '0.01em',
                color: '#F5F1E8', marginBottom: '0',
              }}>
              Harshitha
            </motion.h1>
            <motion.h1 variants={reveal} custom={2}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(44px, 6.5vw, 84px)',
                fontWeight: 400, fontStyle: 'italic',
                lineHeight: 1.0, letterSpacing: '0.01em',
                color: '#F5F1E8', marginBottom: '0',
              }}>
              Lakshmi
            </motion.h1>
            <motion.h1 variants={reveal} custom={3}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(48px, 7.2vw, 94px)',
                fontWeight: 900, fontStyle: 'normal',
                lineHeight: 0.95, letterSpacing: '0.07em',
                color: '#C9A45C', marginBottom: '0',
              }}>
              KUMARI
            </motion.h1>

            {/* Divider */}
            <motion.div variants={reveal} custom={4}
              style={{ width:'56px', height:'1px', background:'linear-gradient(90deg,#C9A45C,transparent)', margin:'24px 0 22px' }} />

            {/* Quote */}
            <motion.p variants={reveal} custom={5}
              style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(17px,2.2vw,24px)', fontWeight:300, fontStyle:'italic', color:'#C8C0B0', lineHeight:1.55, marginBottom:'20px', maxWidth:'560px' }}>
              "Curious about how systems work.
              <br />Driven to understand how they break.
              <br />Focused on learning how to secure them."
            </motion.p>

            {/* Description */}
            <motion.p variants={reveal} custom={6}
              style={{ fontFamily:'Inter, sans-serif', fontSize:'1rem', fontWeight:300, color:'#8A8070', lineHeight:1.85, maxWidth:'500px', marginBottom:'40px' }}>
              CSE student at Vignan's FSTR — exploring cybersecurity, ethical hacking, penetration testing, and intelligent technologies.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={reveal} custom={7} style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <button onClick={() => document.querySelector('#projects').scrollIntoView({behavior:'smooth'})}
                style={{ fontFamily:'Inter, sans-serif', fontSize:'0.8rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'#070707', background:'linear-gradient(135deg,#C9A45C,#E3C98A)', border:'none', padding:'15px 32px', cursor:'none', transition:'opacity 0.3s,transform 0.3s' }}
                onMouseEnter={e=>{e.target.style.opacity='0.85';e.target.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.target.style.opacity='1';e.target.style.transform='translateY(0)'}}>
                Explore My Work →
              </button>
              <button onClick={() => document.querySelector('#contact').scrollIntoView({behavior:'smooth'})}
                style={{ fontFamily:'Inter, sans-serif', fontSize:'0.8rem', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:'#C9A45C', background:'transparent', border:'1px solid rgba(201,164,92,0.4)', padding:'15px 32px', cursor:'none', transition:'border-color 0.3s,transform 0.3s' }}
                onMouseEnter={e=>{e.target.style.borderColor='rgba(201,164,92,0.85)';e.target.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.target.style.borderColor='rgba(201,164,92,0.4)';e.target.style.transform='translateY(0)'}}>
                Connect With Me
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — identity panel ── */}
          <div style={{ borderLeft:'1px solid rgba(201,164,92,0.14)', paddingLeft:'40px', paddingTop:'8px', display:'flex', flexDirection:'column', gap:'0' }} className="hero-panel">

            {/* IDENTITY CARD */}
            <motion.div
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.85, delay:0.6 }}
              style={{
                marginBottom:'2px',
                padding:'28px 28px 32px',
                background:'linear-gradient(135deg, rgba(201,164,92,0.07) 0%, rgba(201,164,92,0.02) 100%)',
                border:'1px solid rgba(201,164,92,0.22)',
                position:'relative', overflow:'hidden',
              }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, #C9A45C, rgba(201,164,92,0.15), transparent)' }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:'32px', height:'32px', borderTop:'1px solid rgba(201,164,92,0.18)', borderLeft:'1px solid rgba(201,164,92,0.18)' }} />

              <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.62rem', letterSpacing:'0.26em', color:'#C9A45C', marginBottom:'16px', display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ width:'12px', height:'1px', background:'#C9A45C', display:'inline-block' }} />
                IDENTITY
              </div>

              <div style={{
                fontFamily:'Playfair Display, serif',
                fontSize:'clamp(22px, 2.4vw, 28px)',
                fontWeight:400, fontStyle:'italic',
                color:'#F5F1E8', lineHeight:1.2, marginBottom:'16px',
              }}>
                Cybersecurity<br />Enthusiast
              </div>

              <div style={{ width:'100%', height:'1px', background:'linear-gradient(90deg, rgba(201,164,92,0.25), transparent)', marginBottom:'14px' }} />

              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {['Aspiring Ethical Hacker', 'Aspiring Pen Tester'].map((role, i) => (
                  <div key={role} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{
                      width:'5px', height:'5px', borderRadius:'50%', flexShrink:0,
                      border:'1px solid rgba(201,164,92,0.55)',
                      background: i === 0 ? 'rgba(201,164,92,0.3)' : 'transparent',
                    }} />
                    <span style={{
                      fontFamily:'Playfair Display, serif',
                      fontSize:'clamp(14px, 1.5vw, 17px)',
                      fontWeight:400, fontStyle:'italic',
                      color: i === 0 ? '#E3C98A' : '#C8C0B0',
                    }}>{role}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats grid — 2×2 to fill space */}
            <motion.div
              initial={{ opacity:0, x:20 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:0.7, delay:0.72 }}
              style={{
                display:'grid', gridTemplateColumns:'1fr 1fr',
                gap:'1px', background:'rgba(201,164,92,0.08)',
                marginBottom:'2px',
              }}
            >
              {[
                { label:'University', value:"Vignan's FSTR" },
                { label:'Degree',     value:'B.Tech CSE'   },
                { label:'Batch',      value:'2024 – 2028'  },
                { label:'CGPA',       value:'7.95'         },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background:'#0D0D0D', padding:'18px 20px',
                }}>
                  <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.58rem', letterSpacing:'0.18em', color:'#5A5347', marginBottom:'5px', textTransform:'uppercase' }}>{label}</div>
                  <div style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(16px, 1.6vw, 20px)', fontWeight:400, color:'#F5F1E8', lineHeight:1.2 }}>{value}</div>
                </div>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
              style={{
                display:'flex', alignItems:'center', gap:'10px',
                padding:'14px 16px',
                background:'rgba(201,164,92,0.03)',
                border:'1px solid rgba(201,164,92,0.08)',
              }}
            >
              <motion.div
                animate={{ opacity:[1, 0.2, 1] }} transition={{ duration:2.4, repeat:Infinity }}
                style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4CAF70', flexShrink:0 }}
              />
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.6rem', letterSpacing:'0.16em', color:'#7A7060' }}>
                OPEN TO OPPORTUNITIES
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2, duration:0.8 }}
        style={{ position:'absolute', bottom:'36px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
        <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.6rem', letterSpacing:'0.22em', color:'#9A9080', textTransform:'uppercase' }}>SCROLL TO EXPLORE</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
          style={{ width:'1px', height:'36px', background:'linear-gradient(180deg,#C9A45C,transparent)' }} />
      </motion.div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-panel { border-left: none !important; border-top: 1px solid rgba(201,164,92,0.12) !important; padding-left: 0 !important; padding-top: 32px !important; display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
        }
        @media (max-width: 600px) {
          .hero-panel { grid-template-columns: 1fr !important; }
          #hero { padding-top: 96px; }
        }
      `}</style>
    </section>
  )
}


