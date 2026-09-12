import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    num: '01',
    tag: 'SIGNATURE PROJECT',
    title: 'AUTONOMOUS DISASTER\nMANAGEMENT',
    tagline: 'Intelligence when every second matters.',
    category: 'INTELLIGENT SYSTEMS',
    desc: 'This project explores how intelligent technologies, connected systems, and autonomous decision-making can contribute to more responsive disaster management. The project focuses on a technology-driven approach to monitoring, situation understanding, decision support, and coordinated response.',
    flow: [
      { step: '01', label: 'DETECT', detail: 'Collect relevant information from multiple sources.' },
      { step: '02', label: 'ANALYZE', detail: 'Process available data intelligently.' },
      { step: '03', label: 'UNDERSTAND', detail: 'Identify meaningful patterns and situations.' },
      { step: '04', label: 'DECIDE', detail: 'Support intelligent decision-making.' },
      { step: '05', label: 'RESPOND', detail: 'Enable more coordinated response systems.' },
    ],
    tech: ['Python', 'Intelligent Systems', 'Data Processing', 'Autonomous Logic'],
    github: 'https://github.com/harshi329',
    accent: '#C9A45C',
  },
  {
    num: '02',
    tag: 'CYBERSECURITY',
    title: 'SENTINEL SHIELD',
    tagline: 'A layered approach to digital security.',
    category: 'CYBERSECURITY',
    desc: 'A full-stack cybersecurity web application for inspecting web requests and detecting common attacks in real time. Implements detection for SQL Injection, XSS, directory traversal and command injection, with a live security dashboard, alerts, and report generation.',
    flow: [
      { step: '01', label: 'INTERCEPT', detail: 'Inspect incoming web requests in real time.' },
      { step: '02', label: 'DETECT', detail: 'Flag SQLi, XSS, directory traversal & command injection.' },
      { step: '03', label: 'ALERT', detail: 'Trigger real-time dashboard alerts and logs.' },
      { step: '04', label: 'RATE LIMIT', detail: 'Enforce Helmet.js hardening & Express Rate Limit.' },
      { step: '05', label: 'REPORT', detail: 'Export security findings as PDF or CSV.' },
    ],
    tech: ['React.js', 'Tailwind CSS', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB', 'Helmet.js', 'Express Rate Limit', 'JWT'],
    github: 'https://github.com/harshi329',
    accent: '#4F7CAC',
  },
  {
    num: '03',
    tag: 'CYBERSECURITY × WEB SECURITY',
    title: 'FAKE URL &\nSCAM DETECTOR',
    tagline: 'Think before you click.',
    category: 'WEB SECURITY',
    desc: 'A project focused on helping users identify potentially suspicious or fraudulent URLs and improving awareness around online scams. The system analyzes URL patterns and structure to flag potentially malicious links before users interact with them.',
    flow: [
      { step: '01', label: 'INPUT', detail: 'User submits a URL for analysis.' },
      { step: '02', label: 'PARSE', detail: 'Extract URL components and patterns.' },
      { step: '03', label: 'ANALYZE', detail: 'Check against known indicators of fraud.' },
      { step: '04', label: 'SCORE', detail: 'Calculate a threat likelihood score.' },
      { step: '05', label: 'RESULT', detail: 'Present clear verdict to the user.' },
    ],
    tech: ['Python', 'Web Security', 'URL Analysis', 'Security Awareness'],
    github: 'https://github.com/harshi329',
    accent: '#C9A45C',
  },
  {
    num: '04',
    tag: 'WEB DEVELOPMENT',
    title: 'AURORA COLLEGE\nWEBSITE',
    tagline: 'Modern interface. Accessible information.',
    category: 'WEB DEVELOPMENT',
    desc: 'A college website built with a focus on modern interface design, user experience, digital accessibility, and clean information architecture. The project demonstrates full-stack development capabilities and design sensibility.',
    flow: [
      { step: '01', label: 'DESIGN', detail: 'User-centered interface planning.' },
      { step: '02', label: 'DEVELOP', detail: 'Build with modern web technologies.' },
      { step: '03', label: 'OPTIMIZE', detail: 'Performance and accessibility focus.' },
      { step: '04', label: 'TEST', detail: 'Cross-browser and device testing.' },
      { step: '05', label: 'DEPLOY', detail: 'Production-ready deployment.' },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UX Design'],
    github: 'https://github.com/harshi329',
    accent: '#C9A45C',
  },
]

function ProjectCard({ project, index, isActive, onClick }) {
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ marginBottom: '2px' }}
    >
      {/* Header row — always visible */}
      <div
        onClick={onClick}
        data-cursor
        style={{
          background: isActive ? '#111' : '#0A0A0A',
          border: `1px solid ${isActive ? 'rgba(201,164,92,0.2)' : 'rgba(201,164,92,0.06)'}`,
          padding: '32px 40px',
          cursor: 'none',
          transition: 'background 0.3s ease, border 0.3s ease',
          display: 'grid',
          gridTemplateColumns: '80px 1fr auto',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '1.02rem', letterSpacing: '0.1em',
          color: isActive ? project.accent : '#8A8070',
          transition: 'color 0.3s',
        }}>{project.num}</span>

        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1rem', letterSpacing: '0.22em',
            color: '#7A6840', marginBottom: '6px',
          }}>{project.tag}</div>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(22px, 3.2vw, 38px)',
            fontWeight: 300, lineHeight: 1.15,
            color: isActive ? '#F5F1E8' : '#C8C0B0',
            transition: 'color 0.3s',
            whiteSpace: 'pre-line',
          }}>{project.title}</h3>
        </div>

        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '28px', height: '28px',
            border: `1px solid ${isActive ? project.accent : 'rgba(201,164,92,0.2)'}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.accent, fontSize: '14px',
            flexShrink: 0,
            transition: 'border-color 0.3s',
          }}
        >
          +
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: '#0D0D0D',
              border: '1px solid rgba(201,164,92,0.1)',
              borderTop: 'none',
              padding: '48px 40px',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '60px',
              }}
                className="project-expand-grid"
              >
                {/* Left */}
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.02rem', fontWeight: 300,
                    color: '#B0A890', lineHeight: 1.9,
                    marginBottom: '32px',
                  }}>{project.desc}</p>

                  {/* Tech */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '1rem', letterSpacing: '0.2em',
                      color: '#7A6840', marginBottom: '12px',
                    }}>TECHNOLOGIES</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.tech.map(t => (
                        <span key={t} style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '1.05rem', letterSpacing: '0.1em',
                          color: '#C8C0B0',
                          border: '1px solid rgba(201,164,92,0.15)',
                          padding: '4px 12px',
                          background: 'rgba(201,164,92,0.03)',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.05rem', fontWeight: 500,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: project.accent,
                      border: `1px solid ${project.accent}40`,
                      padding: '12px 24px',
                      transition: 'background 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,164,92,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    View on GitHub →
                  </a>
                </div>

                {/* Right — flow */}
                <div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1rem', letterSpacing: '0.2em',
                    color: '#7A6840', marginBottom: '24px',
                  }}>SYSTEM FLOW</div>
                  <div>
                    {project.flow.map((f, fi) => (
                      <div key={f.step} style={{
                        display: 'flex', gap: '20px', alignItems: 'flex-start',
                        marginBottom: fi < project.flow.length - 1 ? '0' : '0',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{
                            width: '28px', height: '28px',
                            border: `1px solid ${fi === 0 ? project.accent : 'rgba(201,164,92,0.15)'}`,
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.97rem',
                            color: fi === 0 ? project.accent : '#7A6840',
                          }}>{f.step}</div>
                          {fi < project.flow.length - 1 && (
                            <div style={{
                              width: '1px', height: '32px',
                              background: 'linear-gradient(180deg, rgba(201,164,92,0.2), rgba(201,164,92,0.04))',
                            }} />
                          )}
                        </div>
                        <div style={{ paddingTop: '5px', paddingBottom: '20px' }}>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1.02rem', fontWeight: 500,
                            letterSpacing: '0.16em', textTransform: 'uppercase',
                            color: '#C9A45C', marginBottom: '4px',
                          }}>{f.label}</div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1.05rem', fontWeight: 300,
                            color: '#9A9080', lineHeight: 1.6,
                          }}>{f.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView()

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', background: '#070707' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
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
            04 — PROJECTS
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontWeight: 300, color: '#F5F1E8', lineHeight: 1.1,
          }}>
            Work that <em style={{ color: '#C9A45C' }}>reflects the learning.</em>
          </h2>
        </motion.div>

        <div>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.num}
              project={p}
              index={i}
              isActive={active === i}
              onClick={() => setActive(active === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .project-expand-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (max-width: 768px) {
          .project-expand-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}


