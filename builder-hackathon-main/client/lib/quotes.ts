import { MotivationalQuote } from '@shared/types';

export const motivationalQuotes: MotivationalQuote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery"
  },
  {
    text: "Your limitation—it's only your imagination. Push beyond it.",
    author: "Unknown"
  },
  {
    text: "Excellence is not a destination; it is a continuous journey that never ends.",
    author: "Brian Tracy"
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Stephen Richards"
  },
  {
    text: "Every accomplishment starts with the decision to try.",
    author: "John F. Kennedy"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
];

export const getDailyQuote = (): MotivationalQuote => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};
