'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { getValentineTheme } from '../utils/valentinesWeek'

interface OpeningLetterOverlayProps {
  onOpen: () => void
}

export default function OpeningLetterOverlay({ onOpen }: OpeningLetterOverlayProps) {
  const theme = getValentineTheme()
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: theme.gradient,
        }}
      >
        <div className="text-center px-4 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-script text-5xl md:text-6xl text-brown mb-6"
          >
            {theme.openingTitle}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-sans text-lg md:text-xl text-brown/80 mb-4"
          >
            {theme.openingSubtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-script text-sm md:text-base text-brown/70 mb-12 italic"
          >
            {theme.name} {theme.emoji}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            onClick={onOpen}
            className="px-8 py-4 bg-sunflower/30 hover:bg-sunflower/40 text-brown rounded-full font-script text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Click to open
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

