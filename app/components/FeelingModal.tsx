'use client'

import { useEffect } from 'react'

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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in modal-overlay"
      onClick={onClose}
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.25)' }}
    >
      <div
        className="bg-peach rounded-3xl shadow-2xl max-w-lg w-full p-8 relative border-2 border-blush/30 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brown/60 hover:text-brown transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-center mb-4">
          <span className="text-3xl">🌻</span>
        </div>
        <h2 className="font-script text-3xl text-brown mb-6 text-center">
          {title}
        </h2>
        <p className="font-sans text-brown/90 leading-relaxed text-lg whitespace-pre-line">
          {message}
        </p>
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-sunflower/20 hover:bg-sunflower/30 text-brown rounded-full transition-all duration-300 font-sans"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

