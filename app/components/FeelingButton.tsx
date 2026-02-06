'use client'

interface FeelingButtonProps {
  title: string
  onClick: () => void
}

export default function FeelingButton({ title, onClick }: FeelingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-8 bg-peach/50 hover:bg-sunflower/20 rounded-2xl transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(246,197,68,0.3)] border-2 border-blush/20 hover:border-sunflower/40 transform hover:-translate-y-1"
    >
      <span className="font-script text-2xl text-brown group-hover:text-brown transition-colors relative z-10">
        {title}
      </span>
      <div className="absolute inset-0 rounded-2xl bg-sunflower/0 group-hover:bg-sunflower/10 transition-all duration-300"></div>
    </button>
  )
}

