'use client'

import { useState, useRef, useEffect } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Replace this with your YouTube video ID
  // For example, if the URL is https://www.youtube.com/watch?v=2Vv-BfVoq4g
  // The video ID is: 2Vv-BfVoq4g
  const youtubeVideoId = '2Vv-BfVoq4g' // Ed Sheeran - Perfect (Official Audio)

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        if (containerRef.current) {
          playerRef.current = new window.YT.Player(containerRef.current, {
            videoId: youtubeVideoId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              showinfo: 0,
              loop: 1,
              playlist: youtubeVideoId,
            },
            events: {
              onReady: () => {
                setIsReady(true)
              },
              onStateChange: (event: any) => {
                // YT.PlayerState.PLAYING = 1
                // YT.PlayerState.PAUSED = 2
                if (event.data === 1) {
                  setIsPlaying(true)
                } else if (event.data === 2) {
                  setIsPlaying(false)
                }
              },
            },
          })
        }
      }
    } else if (window.YT && window.YT.Player && containerRef.current && !playerRef.current) {
      // API already loaded, create player immediately
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: youtubeVideoId,
        },
        events: {
          onReady: () => {
            setIsReady(true)
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true)
            } else if (event.data === 2) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [youtubeVideoId])

  const togglePlay = () => {
    if (playerRef.current && isReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        // Set volume to 40% and play with fade-in effect
        playerRef.current.setVolume(0)
        playerRef.current.playVideo()
        
        // Fade in volume over 2 seconds (40% max volume)
        let currentVolume = 0
        const targetVolume = 40
        const steps = 20 // 20 steps over 2 seconds = 100ms per step
        const volumeIncrement = targetVolume / steps
        
        const fadeInterval = setInterval(() => {
          currentVolume += volumeIncrement
          if (currentVolume >= targetVolume) {
            currentVolume = targetVolume
            clearInterval(fadeInterval)
          }
          try {
            if (playerRef.current) {
              playerRef.current.setVolume(Math.round(currentVolume))
            }
          } catch (e) {
            clearInterval(fadeInterval)
          }
        }, 100)
      }
    }
  }

  return (
    <>
      {/* Hidden YouTube player for audio playback */}
      <div
        ref={containerRef}
        className="fixed opacity-0 pointer-events-none w-1 h-1 -z-50"
        style={{ position: 'absolute', left: '-9999px' }}
      />
      
      <button
        onClick={togglePlay}
        disabled={!isReady}
        className="group fixed bottom-6 right-6 z-50 bg-sunflower text-brown rounded-[50px] p-4 shadow-2xl hover:shadow-[0_0_30px_rgba(246,197,68,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 px-6 py-3 border-2 border-brown/20 hover:border-brown/40 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? 'Pause song' : 'Play our song'}
      >
        {!isReady ? (
          <>
            <div className="w-5 h-5 border-2 border-brown/30 border-t-brown rounded-full animate-spin"></div>
            <span className="font-script text-base hidden sm:inline">Loading...</span>
          </>
        ) : isPlaying ? (
          <>
            <span className="text-lg">⏸</span>
            <span className="font-script text-base hidden sm:inline">Pause Our Song</span>
          </>
        ) : (
          <>
            <span className="text-lg">🎵</span>
            <span className="font-script text-base hidden sm:inline">Play Our Song</span>
          </>
        )}
      </button>
    </>
  )
}
