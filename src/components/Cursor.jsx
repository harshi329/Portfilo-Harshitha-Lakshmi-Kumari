import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    }

    window.addEventListener('mousemove', move)
    addListeners()

    // Observe DOM for new interactive elements
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      // Ring follows with slight lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '6px' : '5px',
          height: hovering ? '6px' : '5px',
          background: '#C9A45C',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-100px, -100px)',
          marginLeft: hovering ? '-3px' : '-2.5px',
          marginTop: hovering ? '-3px' : '-2.5px',
          transition: 'width 0.25s ease, height 0.25s ease',
          mixBlendMode: 'normal',
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '42px' : '28px',
          height: hovering ? '42px' : '28px',
          border: `1px solid ${hovering ? 'rgba(201,164,92,0.7)' : 'rgba(201,164,92,0.35)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-100px, -100px)',
          marginLeft: hovering ? '-21px' : '-14px',
          marginTop: hovering ? '-21px' : '-14px',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, margin 0.3s ease',
          background: hovering ? 'rgba(201,164,92,0.04)' : 'transparent',
        }}
      />
    </>
  )
}
