'use client'

import { useState } from 'react'
import FeelingButton from './components/FeelingButton'
import FeelingModal from './components/FeelingModal'
import SunflowerPetals from './components/SunflowerPetals'
import SunflowerDecoration from './components/SunflowerDecoration'
import SunflowerField from './components/SunflowerField'
import AudioPlayer from './components/AudioPlayer'
import Image from 'next/image'

const feelings = [
  {
    title: 'When You Miss Me',
    message: `Sani, I miss you in the smallest moments.
The random thoughts, the things I wish I could tell you in person, the silence that would feel better if you were next to me.
But every second apart still belongs to us.
Close your eyes for a few seconds… that's me holding you tight.`,
  },
  {
    title: 'When You\'re Stressed',
    message: `I know you carry a lot sometimes, even when you don't say it.
I just want you to remember how strong, capable, and amazing you are.
And you don't have to face everything alone — you have me, always in your corner.
If I were there, I'd pull you into a hug and not let go until you smiled.`,
  },
  {
    title: 'When You Can\'t Sleep',
    message: `If I were there right now, you'd be tucked safely in my arms.
My hand holding yours, my voice telling you everything is okay.
So tonight, imagine me next to you, whispering softly:
"I'm here, Sani. You're safe. Get some rest, my love."`,
  },
  {
    title: 'When Distance Feels Hard',
    message: `Some days the distance feels heavier, I know. I feel it too.
But what we have is bigger than miles, time zones, or waiting.
We are not just loving each other — we are choosing each other, every single day.
No matter how long the road takes, it still leads me to you. And I would walk it every time.`,
  },
]

export default function Home() {
  const [openModal, setOpenModal] = useState<number | null>(null)

  return (
    <main className="min-h-screen sunflower-pattern">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 py-12 sm:py-20" style={{ overflow: 'hidden', minHeight: '100vh' }}>
        <div className="absolute inset-0 z-0">
          {/* Sunflower field background - inspired by golden hour field */}
          <SunflowerField />
          
          {/* Warm golden hour overlay - sky on top, field on bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-200/25 via-yellow-100/15 to-cream/30 z-10"></div>
          
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
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-brown mb-8 animate-fade-in-1 hero-headline">
            Hi Sani ❤️
          </h1>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-brown/90 mb-8 leading-relaxed animate-fade-in-2 hero-subtitle max-w-2xl mx-auto">
            Since I can't be there with you this Valentine's Day, I made a little place you can come to whenever you need me.
          </p>
          <p className="font-sans text-brown/80 text-sm sm:text-base italic mb-4 animate-fade-in-2 hero-signature">
            Made with all my love.
          </p>
          <p className="font-script text-brown/70 text-xs sm:text-sm italic mb-12 animate-fade-in-2 hero-whisper" style={{ opacity: 0.7, marginTop: '0.5rem' }}>
            For the girl who holds my heart, even from miles away.
          </p>
          <p className="font-sans text-brown/70 text-base sm:text-lg animate-fade-in-3 animate-float hero-cta">
            Choose how you're feeling…
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
          <div className="w-6 h-10 border-2 border-brown/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brown/30 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Couple Photo Section - Memory Moment */}
      <section className="py-20 px-4 relative bg-peach/30">
        <SunflowerDecoration position="top-center" />
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative w-full max-w-[75%] md:max-w-[70%]">
              <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden border-2 border-sunflower bg-gradient-to-br from-sunflower/20 to-blush/20" style={{ boxShadow: '0 20px 40px rgba(246,197,68,0.35)' }}>
                <img
                  src="/together.jpg"
                  alt="Us together"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    // Show placeholder if image fails to load
                    target.style.display = 'none'
                    const placeholder = target.parentElement?.querySelector('.image-placeholder')
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex'
                    }
                  }}
                />
                <div className="image-placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sunflower/20 to-blush/20" style={{ display: 'none' }}>
                  <p className="text-brown/60 font-sans text-sm text-center px-4">
                    Please add together.jpg to /public folder<br />
                    (Convert HEIC to JPG if needed)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center font-script text-xl md:text-2xl text-brown/90 italic animate-fade-in-2">
            My favorite place has always been next to you.
          </p>
        </div>
      </section>

      {/* Feelings Section */}
      <section className="py-20 px-4 relative">
        <SunflowerDecoration position="top-right" />
        <div className="max-w-4xl mx-auto">
          <h2 className="font-script text-3xl md:text-4xl text-brown text-center mb-12 animate-fade-in">
            A message for you...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
      <section className="py-20 px-4 relative">
        <SunflowerDecoration position="bottom-left" />
        <div className="max-w-xl mx-auto text-center">
          <div className="relative mb-6 animate-fade-in">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(246,197,68,0.25)] border-2 border-sunflower animate-float-photo">
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
          <p className="font-script text-3xl md:text-4xl text-brown mt-8 animate-fade-in">
            My favorite person. My forever Valentine.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-peach py-16 px-4 relative">
        <SunflowerDecoration position="bottom-right" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="font-sans text-xl md:text-2xl text-brown leading-relaxed animate-fade-in">
            No matter where we are, my heart is always with you, Sani 🌻
            <br />
            <span className="font-script text-3xl md:text-4xl mt-6 inline-block" style={{ marginTop: '1.5rem' }}>
              Happy Valentine&apos;s Day ❤️
            </span>
          </p>
        </div>
      </footer>

      {/* Audio Player - Floating Button */}
      <AudioPlayer />
    </main>
  )
}

