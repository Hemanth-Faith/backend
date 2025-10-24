import { useTheme } from '@/contexts/ThemeContext';

export const useWorkMode = () => {
  const { workMode } = useTheme();

  // Helper to conditionally show emoji based on work mode
  const emoji = (emojiChar: string) => workMode ? '' : emojiChar;

  // Helper to get professional icon alternatives
  const professionalIcon = (type: string): string => {
    if (!workMode) return '';
    
    const icons: Record<string, string> = {
      goal: '●',
      streak: '▪',
      fire: '▸',
      chart: '■',
      calendar: '▫',
      check: '✓',
      star: '★',
      diamond: '◆',
      trophy: '▲',
      heart: '♦',
      energy: '▶',
    };
    
    return icons[type] || '•';
  };

  return { workMode, emoji, professionalIcon };
};
