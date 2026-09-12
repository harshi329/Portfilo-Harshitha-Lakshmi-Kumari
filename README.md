# Harshitha Lakshmi Kumari — Personal Portfolio

> *"Curious about how systems work. Driven to understand how they break. Focused on learning how to secure them."*

A world-class personal portfolio website built with React, Vite, and Framer Motion. Designed around a premium **Black × Gold** editorial identity with a cybersecurity theme.

**Live at:** [github.com/harshi329/Portfilo-Harshitha-Lakshmi-Kumari](https://github.com/harshi329/Portfilo-Harshitha-Lakshmi-Kumari)

---

## About

**Harshitha Lakshmi Kumari** is a 3rd-year B.Tech Computer Science & Engineering student at Vignan's Foundation for Science, Technology & Research (VFSTR), Batch 2024–2028, CGPA 7.95.

She is a Cybersecurity Enthusiast, Aspiring Ethical Hacker, and Aspiring Penetration Tester — with a long-term goal of pursuing a Master's degree in Cybersecurity in Germany.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Animations | Framer Motion 11 |
| Fonts | Playfair Display · Inter · JetBrains Mono |
| Styling | Inline styles + CSS variables |
| Intersection | react-intersection-observer |

---

## Features

- **Cinematic loading screen** — editorial intro with H · L · K initials, ambient orbs, film grain, metallic shimmer, and a smooth fade exit
- **Custom gold cursor** — dot + lagging ring, expands on hover
- **Sticky navbar** — Playfair Display serif links, active highlight, frosted glass on scroll, "Hire Me" CTA
- **Hero section** — particle network canvas reacting to mouse, two-column layout with identity panel
- **About** — editorial typography with CURIOSITY → GROWTH progression ladder, CGPA stat blocks
- **Fields** — hover-expand rows for 5 domains of interest
- **Projects** — 4 accordion case studies with system flow diagrams and tech tags
- **Skills** — 6-category grid with per-category accent colors
- **Achievements** — click-to-expand table with always-visible "View Proof" links to real certificate files
- **Journey** — staggered two-column timeline from 2024 → Future (Germany)
- **Mindset** — cinematic large quote + 5 trait tiles
- **Future** — animated canvas line India → Germany with goal cards
- **Contact** — full-screen closer with email, phone, GitHub, LinkedIn, and Resume download
- **Downloadable Resume** — premium black/gold HTML resume at `/public/Harshitha_Resume.html`

---

## Sections

| # | Section | ID |
|---|---|---|
| 01 | Hero | `#hero` |
| 02 | About | `#about` |
| 03 | Fields I'm Exploring | `#fields` |
| 04 | Projects | `#projects` |
| 05 | Skills | `#skills` |
| 06 | Achievements | `#achievements` |
| 07 | Journey | `#journey` |
| 08 | Mindset | — |
| 09 | The Road Ahead | — |
| 10 | Contact | `#contact` |

---

## Projects Featured

### 01 — Autonomous Disaster Management *(Signature Project)*
Explores intelligent technologies and autonomous decision-making for disaster response.
`Python · Intelligent Systems · Data Processing`

### 02 — SentinelShield
Full-stack cybersecurity web application. Detects SQLi, XSS, directory traversal, and command injection in real time. Includes live security dashboard, JWT auth, rate limiting, and PDF/CSV report generation.
`React.js · Node.js · Express.js · MongoDB · Helmet.js · JWT · Chart.js · Tailwind CSS`

### 03 — Fake URL & Scam Detector
Analyzes URL patterns to flag suspicious or fraudulent links before users interact with them.
`Python · Web Security · URL Analysis`

### 04 — Aurora College Website
Modern college website with clean information architecture and responsive design.
`HTML · CSS · JavaScript · Responsive Design`

---

## Certificates (Proof files in `/public/certificates/`)

| Certificate | Issuer | File |
|---|---|---|
| Python Essentials 1 | Cisco Networking Academy | `cisco-python-1.pdf` |
| Python Essentials 2 | Cisco Networking Academy | `cisco-python-2.pdf` |
| Cyber Job Simulation | Deloitte × Forage | `deloitte-cyber.pdf` |
| Solutions Architecture Simulation | AWS × Forage | `aws-architecture.pdf` |
| Full-Stack Development 101 | Simplilearn SkillUp | `simplilearn-fsd.pdf` |
| Cybersecurity Freelancing Learn & Earn | HackLearn | `hacklearn-cybersecurity.jpg` |
| PET English Proficiency | Cambridge Assessment | `cambridge-pet.pdf` |
| NPTEL Certification | NPTEL | `nptel-ms.pdf` |
| Ideathon Participation | Ideathon | `ideathon.pdf` |
| Event Coordinator | Vignan Mahotsav | `vignan-mahotsav.pdf` |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#070707` |
| Surface | `#111111` |
| Text Primary | `#F5F1E8` (Warm Ivory) |
| Text Secondary | `#C8C0B0` |
| Gold Primary | `#C9A45C` |
| Gold Secondary | `#E3C98A` |
| Accent Blue | `#6B9DC4` |
| Font Display | Playfair Display |
| Font Body | Inter |
| Font Mono | JetBrains Mono |

---

## Project Structure

```
harshitha-portfolio/
├── public/
│   ├── certificates/        # All certificate PDF/image files
│   ├── Harshitha_Resume.html
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx       # Custom gold cursor
│   │   ├── Loader.jsx       # Cinematic intro screen
│   │   └── Nav.jsx          # Sticky navigation
│   ├── hooks/
│   │   └── useInView.js     # Intersection observer hook
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Fields.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Achievements.jsx
│   │   ├── Journey.jsx
│   │   ├── Mindset.jsx
│   │   ├── Future.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## Links

- **GitHub:** [github.com/harshi329](https://github.com/harshi329)
- **LinkedIn:** [linkedin.com/in/harshitha-lakshmi-kumari-popuri-5a1689361](https://www.linkedin.com/in/harshitha-lakshmi-kumari-popuri-5a1689361/)
- **Email:** harshithalakshmikumari@gmail.com

---

*Built with React + Vite + Framer Motion · Designed for public deployment*
