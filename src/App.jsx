import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Fields from './sections/Fields'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Achievements from './sections/Achievements'
import Journey from './sections/Journey'
import Mindset from './sections/Mindset'
import Future from './sections/Future'
import Contact from './sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <Cursor />

      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onComplete={handleLoaded} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Fields />
            <Projects />
            <Skills />
            <Achievements />
            <Journey />
            <Mindset />
            <Future />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}
