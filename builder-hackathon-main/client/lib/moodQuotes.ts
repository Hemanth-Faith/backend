// Mood-based motivational messages
export const getMoodBasedQuote = (mood: string | null): { text: string; author: string } => {
  const quotes = {
    happy: [
      { text: "Your positive energy is contagious! Keep spreading those good vibes.", author: "Universe" },
      { text: "Joy is the simplest form of gratitude. Share it with the world today!", author: "Karl Barth" },
      { text: "Happiness is not by chance, but by choice. You chose well today!", author: "Jim Rohn" },
    ],
    calm: [
      { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
      { text: "Calmness is the cradle of power. Use this tranquility wisely.", author: "Josiah Gilbert Holland" },
      { text: "The quieter you become, the more you can hear. Listen to yourself.", author: "Ram Dass" },
    ],
    sad: [
      { text: "Every storm runs out of rain. This feeling will pass, and you'll be stronger.", author: "Maya Angelou" },
      { text: "It's okay to not be okay. Small steps forward still count as progress.", author: "Unknown" },
      { text: "The darkest nights produce the brightest stars. Your light will shine again.", author: "Unknown" },
    ],
    anxious: [
      { text: "You've survived 100% of your worst days. You're stronger than you think.", author: "Unknown" },
      { text: "Anxiety is a sign you're about to do something brave. Take it one step at a time.", author: "Unknown" },
      { text: "Breathe. You've got this. Focus on what you can control right now.", author: "Unknown" },
    ],
    frustrated: [
      { text: "Obstacles don't block the path, they ARE the path to growth.", author: "Unknown" },
      { text: "Your frustration means you care. Channel that energy into action.", author: "Unknown" },
      { text: "Every setback is a setup for a comeback. Keep pushing forward.", author: "Unknown" },
    ],
    lazy: [
      { text: "Even on low-energy days, showing up counts. One small step is enough.", author: "Unknown" },
      { text: "It's okay to take it slow. Rest is part of productivity, not the opposite.", author: "Unknown" },
      { text: "Low energy doesn't mean low value. Be kind to yourself today.", author: "Unknown" },
    ],
    motivated: [
      { text: "Your motivation today will be your success tomorrow. Harness this energy!", author: "Unknown" },
      { text: "The only limit to your impact is your imagination. Dream big, act bigger!", author: "Unknown" },
      { text: "Motivation gets you started, discipline keeps you going. You've got both!", author: "Jim Ryun" },
    ],
    tired: [
      { text: "Rest is not quitting. Even small progress today is still progress.", author: "Unknown" },
      { text: "Self-care is not selfish. Do what you can, and that's enough.", author: "Unknown" },
      { text: "Listen to your body. Sometimes the most productive thing is to rest.", author: "Unknown" },
    ],
  };

  const moodQuotes = quotes[mood as keyof typeof quotes] || [
    { text: "Every day is a fresh start. Make today count!", author: "Unknown" },
    { text: "Progress, not perfection. Keep moving forward.", author: "Unknown" },
    { text: "You're capable of amazing things. Believe in yourself!", author: "Unknown" },
  ];

  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
};

// Get motivational tips based on mood
export const getMoodBasedTips = (mood: string | null): string[] => {
  const tips = {
    happy: [
      "🌟 Ride this wave! Happy moods boost creativity and problem-solving.",
      "💫 Share your positivity with others - it creates a ripple effect!",
      "🎨 This is a great time for creative tasks and brainstorming.",
    ],
    calm: [
      "🧘 Perfect state for deep work and focused tasks.",
      "📚 Great time for learning something new or reading.",
      "🎯 Your clarity makes this ideal for planning and strategy.",
    ],
    sad: [
      "🤝 Reach out to someone - connection helps heal.",
      "🎵 Music or gentle movement might help shift your energy.",
      "📝 Journaling your feelings can provide relief and clarity.",
    ],
    anxious: [
      "🫁 Try 4-7-8 breathing: breathe in for 4, hold for 7, out for 8.",
      "🚶 A short walk can help reset your nervous system.",
      "✅ Focus on one tiny task at a time - break it down smaller.",
    ],
    frustrated: [
      "⏸️ Take a 5-minute break before tackling the problem again.",
      "💪 Your frustration shows you care - use it as fuel!",
      "🎯 Sometimes a different approach is all you need.",
    ],
    lazy: [
      "�️ Start with the easiest task - just one thing to build momentum.",
      "☕ A short walk or stretching can help shift your energy gently.",
      "📱 Set a timer for 5 minutes and see what you can do - no pressure!",
    ],
    motivated: [
      "🚀 Strike while the iron is hot - tackle your biggest goal!",
      "📊 This energy is perfect for challenging tasks.",
      "🎯 Set a stretch goal for today while you're feeling powerful!",
    ],
    tired: [
      "😴 A 20-minute power nap can work wonders.",
      "💧 Hydration and a healthy snack might boost your energy.",
      "🎵 Gentle tasks and self-compassion are your friends today.",
    ],
  };

  return tips[mood as keyof typeof tips] || [
    "💪 You've got this! Start with your easiest task to build momentum.",
    "🎯 Focus on progress, not perfection.",
    "✨ Every small step counts toward your bigger goals.",
  ];
};
