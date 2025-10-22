import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StreakVisualizationProps {
  streak: number;
}

export const StreakVisualization = ({ streak }: StreakVisualizationProps) => {
  const visualization = useMemo(() => {
    if (streak === 0) {
      return {
        emoji: '💤',
        text: 'Start Your Journey',
        color: 'from-gray-400 to-gray-600',
        particles: [],
        message: 'Complete your first task today!'
      };
    } else if (streak < 7) {
      return {
        emoji: '🔥',
        text: `${streak} Day Streak!`,
        color: 'from-orange-400 to-red-500',
        particles: ['🔥'],
        message: 'Keep the fire burning!'
      };
    } else if (streak < 14) {
      return {
        emoji: '🔥🔥',
        text: `${streak} Day Streak!`,
        color: 'from-orange-500 to-red-600',
        particles: ['🔥', '✨'],
        message: 'You\'re on fire!'
      };
    } else if (streak < 30) {
      return {
        emoji: '⚡',
        text: `${streak} Day Streak!`,
        color: 'from-yellow-400 to-orange-500',
        particles: ['⚡', '🔥', '✨'],
        message: 'Electrifying progress!'
      };
    } else if (streak < 60) {
      return {
        emoji: '🌟',
        text: `${streak} Day Streak!`,
        color: 'from-yellow-300 to-amber-500',
        particles: ['⚡', '🌟', '✨', '💫'],
        message: 'You\'re a star!'
      };
    } else if (streak < 100) {
      return {
        emoji: '💎',
        text: `${streak} Day Streak!`,
        color: 'from-cyan-400 to-blue-600',
        particles: ['💎', '✨', '🌟', '⚡'],
        message: 'Diamond level consistency!'
      };
    } else {
      return {
        emoji: '👑',
        text: `${streak} Day Streak!`,
        color: 'from-purple-500 via-pink-500 to-amber-500',
        particles: ['👑', '💎', '✨', '🌟', '⚡'],
        message: 'Legendary achievement!'
      };
    }
  }, [streak]);

  const badges = useMemo(() => {
    const earned = [];
    if (streak >= 7) earned.push({ icon: '🔥', label: '7-Day Fire' });
    if (streak >= 14) earned.push({ icon: '⚡', label: '2-Week Thunder' });
    if (streak >= 30) earned.push({ icon: '🌟', label: '1-Month Star' });
    if (streak >= 60) earned.push({ icon: '💎', label: '2-Month Diamond' });
    if (streak >= 100) earned.push({ icon: '👑', label: 'Century King' });
    return earned;
  }, [streak]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className={`relative bg-gradient-to-br ${visualization.color} p-8 text-white`}>
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {visualization.particles.map((particle, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  fontSize: `${1 + Math.random()}rem`,
                  opacity: 0.6
                }}
              >
                {particle}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            <div className="text-7xl mb-4 animate-bounce">{visualization.emoji}</div>
            <h2 className="text-4xl font-bold mb-2">{visualization.text}</h2>
            <p className="text-lg opacity-90">{visualization.message}</p>
          </div>
        </div>

        {/* Badges section */}
        {badges.length > 0 && (
          <div className="p-6 bg-card">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Achievement Badges</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, i) => (
                <Badge key={i} variant="secondary" className="text-lg py-1.5 px-3">
                  {badge.icon} {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
