import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Mood {
  emoji: string;
  label: string;
  value: string;
}

const moods: Mood[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '🤗', label: 'Grateful', value: 'grateful' },
  { emoji: '💪', label: 'Motivated', value: 'motivated' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
];

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void;
}

export function MoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    // Check if mood has been set today
    const lastMoodDate = localStorage.getItem('lastMoodDate');
    const today = new Date().toISOString().split('T')[0];
    
    if (lastMoodDate !== today) {
      // Show mood tracker after a short delay
      setTimeout(() => setOpen(true), 1000);
    }
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.value);
    
    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastMoodDate', today);
    localStorage.setItem('currentMood', mood.value);
    localStorage.setItem('currentMoodEmoji', mood.emoji);
    
    // Store mood history
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push({ date: today, mood: mood.value, emoji: mood.emoji });
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    
    onMoodSelect(mood.value);
    
    setTimeout(() => setOpen(false), 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/90 dark:to-pink-950/90 border-2 border-purple-200 dark:border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How are you feeling today? ✨
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Your mood helps us personalize your experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-3 py-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-110 hover:shadow-lg ${
                selectedMood === mood.value
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 ring-2 ring-purple-500 scale-105'
                  : 'bg-white/50 dark:bg-black/20 hover:bg-purple-50 dark:hover:bg-purple-900/30'
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium text-foreground">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          This helps us customize motivational messages just for you! 💜
        </p>
      </DialogContent>
    </Dialog>
  );
}
