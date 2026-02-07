'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FeelingButton from './components/FeelingButton'
import FeelingModal from './components/FeelingModal'
import SunflowerPetals from './components/SunflowerPetals'
import SunflowerDecoration from './components/SunflowerDecoration'
import SunflowerField from './components/SunflowerField'
import AudioPlayer from './components/AudioPlayer'
import ScrollDots from './components/ScrollDots'
import EnforceSnap from './components/EnforceSnap'
import OpeningLetterOverlay from './components/OpeningLetterOverlay'
import FloatingHearts from './components/FloatingHearts'
import Timeline from './components/Timeline'
import ValentineWeekDecorations from './components/ValentineWeekDecorations'
import Image from 'next/image'
import { getValentineTheme } from './utils/valentinesWeek'

const feelings = [
  {
    title: 'When You Miss Me',
    message: `If you miss me...
close your eyes for a second.
I'm somewhere in the world thinking about you too.
Distance is just geography.
You are still my home.`,
  },
  {
    title: 'When You\'re Stressed',
    message: `Breathe. Slow down.
You don't have to carry the world alone.
I'm always on your team.`,
  },
  {
    title: 'When You Can\'t Sleep',
    message: `If the night feels quiet...
imagine my arms around you.
You are safe. You are loved.`,
  },
  {
    title: 'When Distance Feels Hard',
    message: `This distance is temporary.
You and I are permanent.`,
  },
]

export default function Home() {
  const [openModal, setOpenModal] = useState<number | null>(null)
  const [letterOpened, setLetterOpened] = useState(false)
  const theme = getValentineTheme()

  return (
    <>
      {!letterOpened && (
        <OpeningLetterOverlay onOpen={() => setLetterOpened(true)} />
      )}
      {letterOpened && <FloatingHearts />}
      {letterOpened && <ValentineWeekDecorations />}
      <main className={`sunflower-pattern snap-scroll-container ${!letterOpened ? 'overflow-hidden' : ''}`}>
      {/* Hero Section */}
      <section className="snap-section relative flex items-center justify-center px-4" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <div className="absolute inset-0 z-0">
          {/* Sunflower field background - inspired by golden hour field */}
          <SunflowerField />
          
          {/* Warm golden hour overlay - sky on top, field on bottom - animated gradient */}
          {letterOpened && (
            <motion.div
              className="absolute inset-0 z-10 hero-animated-gradient"
              animate={{
                background: [
                  'linear-gradient(to bottom, rgba(251, 191, 36, 0.25), rgba(254, 240, 138, 0.15), rgba(255, 239, 229, 0.3))',
                  'linear-gradient(to bottom, rgba(251, 191, 36, 0.28), rgba(254, 240, 138, 0.18), rgba(255, 239, 229, 0.32))',
                  'linear-gradient(to bottom, rgba(251, 191, 36, 0.25), rgba(254, 240, 138, 0.15), rgba(255, 239, 229, 0.3))',
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.25), rgba(254, 240, 138, 0.15), rgba(255, 239, 229, 0.3))',
              }}
            />
          )}
          
          {/* Background image - add hero-bg.jpg to /public folder */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-8 blur-3xl scale-110"
            style={{
              backgroundImage: "url('/hero-bg.jpg')",
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4 hero-text-container">
          {letterOpened && (
            <>
              {/* Day indicator badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-block mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-brown/20 shadow-md"
              >
                <span className="font-script text-sm md:text-base text-brown">
                  {theme.name} {theme.emoji}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-script text-5xl sm:text-6xl md:text-7xl text-brown mb-8 hero-headline"
              >
                {theme.heroGreeting}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                className="font-sans text-lg sm:text-xl md:text-2xl text-brown/90 mb-8 leading-relaxed hero-subtitle max-w-2xl mx-auto"
              >
                Since I can't be there with you this Valentine's Day, I made a little place you can come to whenever you need me.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                className="font-sans text-brown/80 text-sm sm:text-base italic mb-4 hero-signature"
              >
                Made with all my love.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                className="font-script text-brown/70 text-xs sm:text-sm italic mb-12 hero-whisper"
                style={{ opacity: 0.7, marginTop: '0.5rem' }}
              >
                For the girl who holds my heart, even from miles away.
              </motion.p>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
          <div className="w-6 h-10 border-2 border-brown/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brown/30 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="snap-section relative flex items-center justify-center px-2 sm:px-4 bg-cream overflow-hidden" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <Timeline />
      </section>

      {/* Feelings Section */}
      <section className="snap-section relative flex items-center justify-center px-4 sm:px-6" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <SunflowerDecoration position="top-right" />
        <div className="max-w-4xl mx-auto w-full py-8">
          <h2 className="font-script text-2xl sm:text-3xl md:text-4xl text-brown text-center mb-8 sm:mb-12 px-4 animate-fade-in">
            A message for you...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
            {feelings.map((feeling, index) => (
              <FeelingButton
                key={index}
                title={feeling.title}
                onClick={() => setOpenModal(index)}
              />
            ))}
          </div>
        </div>

        {/* Modals */}
        {feelings.map((feeling, index) => (
          <FeelingModal
            key={index}
            isOpen={openModal === index}
            onClose={() => setOpenModal(null)}
            title={feeling.title}
            message={feeling.message}
          />
        ))}
      </section>

      {/* Photo Section */}
      <section className="snap-section relative flex items-center justify-center px-4 sm:px-6" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <SunflowerDecoration position="bottom-left" />
        <div className="max-w-xl mx-auto text-center w-full py-8">
          <div className="relative mb-4 sm:mb-6 animate-fade-in px-4">
            <div className="relative w-full max-w-[280px] sm:max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(246,197,68,0.25)] border-2 border-sunflower animate-float-photo">
              <Image
                src="/sani.JPG"
                alt="Sani"
                fill
                className="object-cover"
                priority
              />
            </div>
            <SunflowerPetals />
          </div>
          <p className="font-script text-2xl sm:text-3xl md:text-4xl text-brown mt-6 sm:mt-8 px-4 animate-fade-in">
            My favorite person. My forever Valentine.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="snap-section relative flex items-center justify-center px-4 sm:px-6 bg-peach" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <SunflowerDecoration position="bottom-right" />
        <div className="max-w-3xl mx-auto text-center relative z-10 w-full py-8">
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-brown leading-relaxed animate-fade-in px-4">
            No matter where we are, my heart is always with you, Sani 🌻
            <br />
            <span className="font-script text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6 inline-block" style={{ marginTop: '1rem' }}>
              {theme.footerMessage}
            </span>
          </p>
        </div>
      </footer>

      {/* Audio Player - Floating Button */}
      {letterOpened && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
        >
          <AudioPlayer onLetterOpen={letterOpened} />
        </motion.div>
      )}
      
      {/* Scroll Navigation Dots */}
      <ScrollDots />
      
      {/* Enforce snap behavior */}
      <EnforceSnap />
    </main>
    </>
  )
}

