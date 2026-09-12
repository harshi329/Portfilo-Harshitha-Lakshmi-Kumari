import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease    = [0.25, 0.46, 0.45, 0.94]
const easeOut = [0.16, 1, 0.3, 1]

/* ── Ambient orbs ── */
function AmbientOrbs() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      <motion.div
        initial={{ opacity:0, x:-80, y:40 }}
        animate={{ opacity:0.2, x:0, y:0 }}
        transition={{ duration:3.5, ease }}
        style={{
          position:'absolute', left:'-8%', top:'18%',
          width:'58vw', height:'58vw',
          background:'radial-gradient(ellipse, rgba(201,164,92,0.24) 0%, transparent 65%)',
          filter:'blur(65px)',
        }}
      />
      <motion.div
        initial={{ opacity:0, x:80, y:-40 }}
        animate={{ opacity:0.13, x:0, y:0 }}
        transition={{ duration:4, ease, delay:0.5 }}
        style={{
          position:'absolute', right:'-6%', bottom:'12%',
          width:'46vw', height:'46vw',
          background:'radial-gradient(ellipse, rgba(79,124,172,0.2) 0%, transparent 65%)',
          filter:'blur(72px)',
        }}
      />
      <motion.div
        initial={{ opacity:0, scale:0.5 }}
        animate={{ opacity:0.1, scale:1 }}
        transition={{ duration:4.5, ease, delay:1 }}
        style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:'62vw', height:'62vw',
          background:'radial-gradient(ellipse, rgba(201,164,92,0.28) 0%, transparent 55%)',
          filter:'blur(85px)',
        }}
      />
    </div>
  )
}

/* ── Diagonal editorial texture ── */
function DiagonalLines() {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }}
      transition={{ duration:2.5, delay:1.2 }}
      style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, overflow:'hidden' }}
    >
      <svg width="100%" height="100%" style={{ position:'absolute', inset:0 }}>
        <defs>
          <pattern id="diag" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="80" x2="80" y2="0" stroke="rgba(201,164,92,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
    </motion.div>
  )
}

/* ── Film grain ── */
function Grain() {
  return (
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      opacity:0.55,
    }} />
  )
}

/* ── Corner brackets ── */
function CornerMarks({ show }) {
  const mk = (t, r, b, l) => ({
    position:'absolute',
    ...(t!==undefined&&{top:t}), ...(r!==undefined&&{right:r}),
    ...(b!==undefined&&{bottom:b}), ...(l!==undefined&&{left:l}),
    width:'22px', height:'22px',
    borderTop:    t!==undefined?'1px solid rgba(201,164,92,0.4)':'none',
    borderBottom: b!==undefined?'1px solid rgba(201,164,92,0.4)':'none',
    borderLeft:   l!==undefined?'1px solid rgba(201,164,92,0.4)':'none',
    borderRight:  r!==undefined?'1px solid rgba(201,164,92,0.4)':'none',
  })
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity:0, scale:1.12 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, transition:{ duration:0.5 } }}
          transition={{ duration:1.0, ease }}
          style={{ position:'absolute', inset:'-22px', pointerEvents:'none' }}
        >
          <div style={mk(0,undefined,undefined,0)} />
          <div style={mk(0,0,undefined,undefined)} />
          <div style={mk(undefined,undefined,0,0)} />
          <div style={mk(undefined,0,0,undefined)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────
   MAIN
───────────────────────────────── */
export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0)
  // 0=black  1=H alone  2=HLK spread  3=HLK compress  4=full name  5=shimmer  6=tagline  7=exit

  useEffect(() => {
    const t = [
      [1,  350],
      [2, 1000],
      [4, 2600],   // skip step 3 — go straight from spread to name
      [5, 3700],
      [6, 4500],
      [7, 5300],
    ]
    const ids = t.map(([s, d]) => setTimeout(() => setStep(s), d))
    const done = setTimeout(() => onComplete(), 6600)
    return () => { ids.forEach(clearTimeout); clearTimeout(done) }
  }, [onComplete])

  const exiting = step >= 7

  // Letter positions — only spread, no compress phase
  const hx = step === 1 ? 0 : -118
  const lx = 0
  const kx = 118

  return (
    <AnimatePresence>
      {step < 8 && (
        <motion.div
          key="loader"
          initial={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:1.4, ease }}
          style={{
            position:'fixed', inset:0, zIndex:10000,
            background:'#050505',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            overflow:'hidden',
          }}
        >
          <AmbientOrbs />
          <DiagonalLines />
          <Grain />

          <div style={{ position:'relative', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center' }}>

            {/* ── INITIALS — one wrapper, exit as one clean unit ── */}
            <AnimatePresence mode="wait">
              {step >= 1 && step < 4 && (
                <motion.div
                  key="initials-group"
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit={{ opacity:0, y:-20, filter:'blur(14px)' }}
                  transition={{ duration:0.9, ease }}
                  style={{
                    position:'relative',
                    width:'380px',
                    height:'clamp(72px, 11vw, 116px)',
                    display:'flex', alignItems:'flex-start', justifyContent:'center',
                    marginBottom:'32px',
                  }}
                >
                  {/* H */}
                  <motion.div
                    animate={{ x: hx }}
                    transition={{ duration:1.2, ease }}
                    style={{ position:'absolute', display:'flex', flexDirection:'column', alignItems:'center', gap:'5px' }}
                  >
                    <motion.span
                      initial={{ opacity:0, filter:'blur(22px)', y:10 }}
                      animate={{ opacity:1, filter:'blur(0px)', y:0 }}
                      transition={{ duration:1.5, ease }}
                      style={{
                        fontFamily:'Playfair Display, serif',
                        fontSize:'clamp(42px, 7vw, 76px)',
                        fontWeight:400, color:'#F5F1E8', lineHeight:1,
                        textShadow:'0 0 60px rgba(245,241,232,0.12)',
                      }}
                    >H</motion.span>
                    <motion.span
                      animate={{ opacity: step >= 2 ? 0.5 : 0 }}
                      transition={{ duration:0.8, delay:0.25 }}
                      style={{
                        fontFamily:'Inter, sans-serif', fontSize:'clamp(6px,0.65vw,9px)',
                        letterSpacing:'0.32em', textTransform:'uppercase',
                        color:'rgba(201,164,92,0.75)',
                      }}
                    >Harshitha</motion.span>
                  </motion.div>

                  {/* L */}
                  <motion.div
                    initial={{ opacity:0, x:0, filter:'blur(16px)' }}
                    animate={{ opacity: step >= 2 ? 1 : 0, x: lx, filter:'blur(0px)' }}
                    transition={{ duration:1.1, ease }}
                    style={{ position:'absolute', display:'flex', flexDirection:'column', alignItems:'center', gap:'5px' }}
                  >
                    <span style={{
                      fontFamily:'Playfair Display, serif',
                      fontSize:'clamp(42px, 7vw, 76px)',
                      fontWeight:400, color:'#C9A45C', lineHeight:1,
                      textShadow:'0 0 50px rgba(201,164,92,0.35)',
                    }}>L</span>
                    <motion.span
                      animate={{ opacity: step >= 2 ? 0.5 : 0 }}
                      transition={{ duration:0.8, delay:0.3 }}
                      style={{
                        fontFamily:'Inter, sans-serif', fontSize:'clamp(6px,0.65vw,9px)',
                        letterSpacing:'0.32em', textTransform:'uppercase',
                        color:'rgba(201,164,92,0.75)',
                      }}
                    >Lakshmi</motion.span>
                  </motion.div>

                  {/* K */}
                  <motion.div
                    initial={{ opacity:0, x:0, filter:'blur(16px)' }}
                    animate={{ opacity: step >= 2 ? 1 : 0, x: kx, filter:'blur(0px)' }}
                    transition={{ duration:1.1, ease }}
                    style={{ position:'absolute', display:'flex', flexDirection:'column', alignItems:'center', gap:'5px' }}
                  >
                    <span style={{
                      fontFamily:'Playfair Display, serif',
                      fontSize:'clamp(42px, 7vw, 76px)',
                      fontWeight:400, color:'#F5F1E8', lineHeight:1,
                      textShadow:'0 0 60px rgba(245,241,232,0.1)',
                    }}>K</span>
                    <motion.span
                      animate={{ opacity: step >= 2 ? 0.5 : 0 }}
                      transition={{ duration:0.8, delay:0.35 }}
                      style={{
                        fontFamily:'Inter, sans-serif', fontSize:'clamp(6px,0.65vw,9px)',
                        letterSpacing:'0.32em', textTransform:'uppercase',
                        color:'rgba(201,164,92,0.75)',
                      }}
                    >Kumari</motion.span>
                  </motion.div>

                  {/* Connector line at spread */}
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div key="line"
                        initial={{ scaleX:0, opacity:0 }}
                        animate={{ scaleX:1, opacity:1 }}
                        exit={{ scaleX:0, opacity:0 }}
                        transition={{ duration:0.85, ease }}
                        style={{
                          position:'absolute', top:'40%',
                          width:'220px', height:'1px',
                          background:'linear-gradient(90deg, transparent, rgba(201,164,92,0.28), rgba(201,164,92,0.5), rgba(201,164,92,0.28), transparent)',
                          transformOrigin:'center',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FULL NAME ── */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div key="nameblock"
                  initial={{ opacity:0, y:22 }}
                  animate={{ opacity: exiting ? 0 : 1, y:0 }}
                  transition={{
                    opacity: exiting ? { duration:1.2, ease } : { duration:1.3, ease },
                    y: { duration:1.3, ease },
                  }}
                  style={{ textAlign:'center', position:'relative' }}
                >
                  <CornerMarks show={step >= 4 && !exiting} />

                  {/* Harshitha */}
                  <div style={{ overflow:'hidden', padding:'0 48px' }}>
                    <motion.div
                      initial={{ y:'105%', opacity:0 }}
                      animate={{ y:0, opacity:1 }}
                      transition={{ duration:1.1, ease:easeOut, delay:0.05 }}
                      style={{
                        fontFamily:'Playfair Display, serif',
                      fontSize:'clamp(32px, 5vw, 60px)',
                        fontWeight:400, fontStyle:'italic',
                        letterSpacing:'0.02em',
                        color:'#F5F1E8', lineHeight:1.05, whiteSpace:'nowrap',
                        position:'relative',
                      }}
                    >
                      Harshitha
                      {step >= 5 && (
                        <motion.div
                          initial={{ x:'-115%' }} animate={{ x:'215%' }}
                          transition={{ duration:1.9, ease:easeOut }}
                          style={{
                            position:'absolute', inset:0, pointerEvents:'none',
                            background:'linear-gradient(105deg, transparent 15%, rgba(245,241,232,0.1) 38%, rgba(227,201,138,0.3) 50%, rgba(245,241,232,0.1) 62%, transparent 85%)',
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Lakshmi Kumari */}
                  <div style={{ overflow:'hidden', padding:'0 48px' }}>
                    <motion.div
                      initial={{ y:'105%', opacity:0 }}
                      animate={{ y:0, opacity:1 }}
                      transition={{ duration:1.1, ease:easeOut, delay:0.2 }}
                      style={{
                        fontFamily:'Playfair Display, serif',
                        fontSize:'clamp(32px, 5vw, 60px)',
                        fontWeight:700, fontStyle:'normal',
                        letterSpacing:'0.08em',
                        color:'#C9A45C', lineHeight:1.0, whiteSpace:'nowrap',
                        textShadow:'0 0 80px rgba(201,164,92,0.22)',
                        position:'relative',
                      }}
                    >
                      Lakshmi Kumari
                      {step >= 5 && (
                        <motion.div
                          initial={{ x:'-115%' }} animate={{ x:'215%' }}
                          transition={{ duration:1.9, ease:easeOut, delay:0.2 }}
                          style={{
                            position:'absolute', inset:0, pointerEvents:'none',
                            background:'linear-gradient(105deg, transparent 15%, rgba(227,201,138,0.08) 38%, rgba(227,201,138,0.28) 50%, rgba(227,201,138,0.08) 62%, transparent 85%)',
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Gold line */}
                  <motion.div
                    initial={{ scaleX:0, opacity:0 }}
                    animate={{ scaleX:1, opacity:1 }}
                    transition={{ scaleX:{ duration:1.6, ease, delay:0.3 }, opacity:{ duration:0.9 } }}
                    style={{
                      height:'1px', width:'240px', margin:'22px auto 0',
                      background:'linear-gradient(90deg, transparent, #C9A45C 25%, #E3C98A 50%, #C9A45C 75%, transparent)',
                      transformOrigin:'center',
                    }}
                  />

                  {/* Tagline */}
                  <AnimatePresence>
                    {step >= 6 && !exiting && (
                      <motion.div key="tag"
                        initial={{ opacity:0, y:8 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        transition={{ duration:1.0, ease }}
                        style={{
                          marginTop:'20px',
                          fontFamily:'Inter, sans-serif',
                          fontSize:'clamp(7px, 0.85vw, 10px)',
                          fontWeight:400, letterSpacing:'0.42em',
                          textTransform:'uppercase',
                          color:'rgba(201,164,92,0.38)',
                          whiteSpace:'nowrap',
                        }}
                      >
                        CURIOSITY &nbsp;·&nbsp; TECHNOLOGY &nbsp;·&nbsp; SECURITY
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
