export type ValentineDay = 
  | 'rose' 
  | 'propose' 
  | 'chocolate' 
  | 'teddy' 
  | 'promise' 
  | 'hug' 
  | 'kiss' 
  | 'valentines'

export interface ValentineTheme {
  day: ValentineDay
  name: string
  emoji: string
  color: string
  gradient: string
  openingTitle: string
  openingSubtitle: string
  heroGreeting: string
  footerMessage: string
}

export const valentineThemes: Record<ValentineDay, ValentineTheme> = {
  rose: {
    day: 'rose',
    name: 'Rose Day',
    emoji: '🌹',
    color: '#E91E63', // Pink/rose
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    openingTitle: 'For Sani 🌹',
    openingSubtitle: 'Today is Rose Day. Like a rose, you make every day beautiful.',
    heroGreeting: 'Hi Sani 🌹',
    footerMessage: 'Happy Rose Day 🌹',
  },
  propose: {
    day: 'propose',
    name: 'Propose Day',
    emoji: '💍',
    color: '#9C27B0', // Purple
    gradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    openingTitle: 'For Sani 💍',
    openingSubtitle: 'Today is Propose Day. Every day with you feels like a yes.',
    heroGreeting: 'Hi Sani 💍',
    footerMessage: 'Happy Propose Day 💍',
  },
  chocolate: {
    day: 'chocolate',
    name: 'Chocolate Day',
    emoji: '🍫',
    color: '#795548', // Brown
    gradient: 'linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)',
    openingTitle: 'For Sani 🍫',
    openingSubtitle: 'Today is Chocolate Day. You\'re sweeter than any chocolate.',
    heroGreeting: 'Hi Sani 🍫',
    footerMessage: 'Happy Chocolate Day 🍫',
  },
  teddy: {
    day: 'teddy',
    name: 'Teddy Day',
    emoji: '🧸',
    color: '#FF9800', // Orange
    gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    openingTitle: 'For Sani 🧸',
    openingSubtitle: 'Today is Teddy Day. You\'re my comfort, my safe place.',
    heroGreeting: 'Hi Sani 🧸',
    footerMessage: 'Happy Teddy Day 🧸',
  },
  promise: {
    day: 'promise',
    name: 'Promise Day',
    emoji: '🤝',
    color: '#2196F3', // Blue
    gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    openingTitle: 'For Sani 🤝',
    openingSubtitle: 'Today is Promise Day. I promise to love you every day.',
    heroGreeting: 'Hi Sani 🤝',
    footerMessage: 'Happy Promise Day 🤝',
  },
  hug: {
    day: 'hug',
    name: 'Hug Day',
    emoji: '🤗',
    color: '#FF5722', // Deep orange
    gradient: 'linear-gradient(135deg, #fbe9e7 0%, #ffccbc 100%)',
    openingTitle: 'For Sani 🤗',
    openingSubtitle: 'Today is Hug Day. Sending you the biggest virtual hug.',
    heroGreeting: 'Hi Sani 🤗',
    footerMessage: 'Happy Hug Day 🤗',
  },
  kiss: {
    day: 'kiss',
    name: 'Kiss Day',
    emoji: '💋',
    color: '#E91E63', // Pink
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    openingTitle: 'For Sani 💋',
    openingSubtitle: 'Today is Kiss Day. Every thought of you feels like a kiss.',
    heroGreeting: 'Hi Sani 💋',
    footerMessage: 'Happy Kiss Day 💋',
  },
  valentines: {
    day: 'valentines',
    name: 'Valentine\'s Day',
    emoji: '❤️',
    color: '#E91E63', // Pink/red
    gradient: 'linear-gradient(135deg, #f5e6d3 0%, #f7efe5 100%)',
    openingTitle: 'For Sani ❤️',
    openingSubtitle: 'Happy Valentine\'s Day, my love. I made this for you this Valentine\'s Day, for the days I can\'t hold your hand.',
    heroGreeting: 'Hi Sani ❤️',
    footerMessage: 'Happy Valentine\'s Day ❤️',
  },
}

export function getValentineDay(): ValentineDay {
  const now = new Date()
  const month = now.getMonth() // 0-11, February is 1
  const date = now.getDate() // 1-31
  
  // Valentine's week: Feb 7-14
  // If it's February and between 7-14, return the corresponding day
  if (month === 1) { // February
    if (date >= 7 && date <= 14) {
      const dayIndex = date - 7
      const days: ValentineDay[] = ['rose', 'propose', 'chocolate', 'teddy', 'promise', 'hug', 'kiss', 'valentines']
      return days[dayIndex]
    }
  }
  
  // Default to Valentine's Day if outside the week
  return 'valentines'
}

export function getValentineTheme(): ValentineTheme {
  const day = getValentineDay()
  return valentineThemes[day]
}

