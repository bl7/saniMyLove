'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeelingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

export default function FeelingModal({ isOpen, onClose, title, message }: FeelingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={onClose}
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.3)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-peach rounded-3xl shadow-2xl max-w-2xl w-full p-12 relative border-2 border-blush/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brown/60 hover:text-brown transition-colors text-3xl leading-none z-10"
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <span className="text-4xl">🌻</span>
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-brown mb-8 text-center">
              {title}
            </h2>
            <p className="font-script text-brown/90 leading-relaxed text-xl md:text-2xl whitespace-pre-line text-center">
              {message}
            </p>
            <div className="mt-10 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-sunflower/20 hover:bg-sunflower/30 text-brown rounded-full transition-all duration-300 font-script text-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

