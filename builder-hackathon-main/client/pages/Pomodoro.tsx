import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useWorkTrackerState } from '@/hooks/useWorkTrackerState';

export default function Pomodoro() {
  const { state } = useWorkTrackerState();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');
  const [todaySessions, setTodaySessions] = useState(0);
  const [thirtySecondWarningShown, setThirtySecondWarningShown] = useState(false);

  // Load today's sessions from localStorage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const sessionData = JSON.parse(localStorage.getItem('pomodoroSessions') || '{}');
    setTodaySessions(sessionData[today] || 0);
  }, []);

  const durations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      // Check for 30 second warning
      if (timeLeft === 30 && !thirtySecondWarningShown) {
        playThirtySecondWarning();
        setThirtySecondWarningShown(true);
      }
      
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, thirtySecondWarningShown]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    setThirtySecondWarningShown(false);
    if (mode === 'work') {
      setSessionsCompleted((prev) => prev + 1);
      
      // Save session to localStorage
      const today = new Date().toISOString().split('T')[0];
      const sessionData = JSON.parse(localStorage.getItem('pomodoroSessions') || '{}');
      sessionData[today] = (sessionData[today] || 0) + 1;
      localStorage.setItem('pomodoroSessions', JSON.stringify(sessionData));
      setTodaySessions(sessionData[today]);
      
      const shouldLongBreak = (sessionsCompleted + 1) % 4 === 0;
      setMode(shouldLongBreak ? 'longBreak' : 'shortBreak');
      setTimeLeft(durations[shouldLongBreak ? 'longBreak' : 'shortBreak']);
    } else {
      setMode('work');
      setTimeLeft(durations.work);
    }
    playNotificationSound();
  };

  const playNotificationSound = () => {
    // Encouraging completion notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const encouragingMessages = {
        work: [
          '🎉 Incredible focus! You just crushed 25 minutes of deep work!',
          '💪 That\'s how it\'s done! Another session in the books!',
          '🌟 Awesome job! You\'re building amazing focus habits!',
          '🚀 Productivity champion! Time to recharge and come back stronger!',
          '✨ Brilliant work! You\'re proving what consistent effort looks like!',
          '🔥 On fire! That focus session was pure dedication!',
        ],
        break: [
          '⚡ Break over! You\'re recharged and ready to dominate!',
          '💼 Let\'s go! Bring that refreshed energy to your next session!',
          '🎯 Back to it! Your momentum is building!',
          '🌊 Ready to ride the next wave of productivity!',
        ],
      };

      const messages = mode === 'work' ? encouragingMessages.work : encouragingMessages.break;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      new Notification('Pomodoro Timer Complete! 🎉', {
        body: randomMessage,
        icon: mode === 'work' ? '🍅' : '☕',
        requireInteraction: false,
      });
    }
  };

  const playThirtySecondWarning = () => {
    // 30-second warning notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const warningMessages = {
        work: [
          '⏰ 30 seconds left! Finish strong!',
          '🏃 Final push! 30 seconds to go!',
          '💫 Almost there! 30 seconds remaining!',
          '🎯 Home stretch! 30 seconds left!',
        ],
        break: [
          '⏰ 30 seconds left! Get ready to focus!',
          '🔔 Wrapping up! 30 seconds until work time!',
          '⚡ Last 30 seconds! Prep for productivity!',
        ],
      };

      const messages = mode === 'work' ? warningMessages.work : warningMessages.break;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      new Notification('Pomodoro Timer - 30 Seconds!', {
        body: randomMessage,
        icon: '⏰',
        requireInteraction: false,
      });
    }
  };

  const toggleTimer = () => {
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
    setThirtySecondWarningShown(false);
  };

  const changeMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsRunning(false);
    setThirtySecondWarningShown(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getModeEmoji = () => {
    switch (mode) {
      case 'work':
        return '🍅';
      case 'shortBreak':
        return '☕';
      case 'longBreak':
        return '🌴';
    }
  };

  const progressPercentage = ((durations[mode] - timeLeft) / durations[mode]) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {getModeEmoji()} Pomodoro Timer
          </h1>
          <p className="text-muted-foreground">
            Stay focused with the Pomodoro technique. 25 minutes of work, 5 minutes of break.
          </p>
        </div>

        {/* Main Timer Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{getModeLabel()}</CardTitle>
            <CardDescription className="text-center">
              Session {sessionsCompleted + 1} {mode === 'work' ? '• Focus on your task' : '• Take a break'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-8xl font-bold text-primary mb-4 font-mono">
                {formatTime(timeLeft)}
              </div>
              <Progress value={progressPercentage} className="w-full max-w-md h-3" />
            </div>

            {/* Mode Selection */}
            <div className="flex justify-center gap-3 mb-4">
              <Button
                variant={mode === 'work' ? 'default' : 'outline'}
                onClick={() => changeMode('work')}
                disabled={isRunning}
              >
                🍅 Work (25min)
              </Button>
              <Button
                variant={mode === 'shortBreak' ? 'default' : 'outline'}
                onClick={() => changeMode('shortBreak')}
                disabled={isRunning}
              >
                ☕ Short Break (5min)
              </Button>
              <Button
                variant={mode === 'longBreak' ? 'default' : 'outline'}
                onClick={() => changeMode('longBreak')}
                disabled={isRunning}
              >
                🌴 Long Break (15min)
              </Button>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={toggleTimer}
                className="w-32"
              >
                {isRunning ? '⏸️ Pause' : '▶️ Start'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={resetTimer}
                className="w-32"
              >
                🔄 Reset
              </Button>
            </div>

            {/* Link to Goal */}
            {mode === 'work' && (
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Link to a goal (optional):
                </label>
                <select
                  value={selectedGoalId}
                  onChange={(e) => setSelectedGoalId(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                  disabled={isRunning}
                >
                  <option value="">No goal selected</option>
                  {state.goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200">
            <CardHeader>
              <CardTitle className="text-lg">🍅 Today's Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">{todaySessions}</p>
              <p className="text-sm text-muted-foreground mt-1">Pomodoros completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">⏱️ Focus Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{todaySessions * 25}</p>
              <p className="text-sm text-muted-foreground mt-1">minutes today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">🎯 Current Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{getModeEmoji()}</p>
              <p className="text-sm text-muted-foreground mt-1">{getModeLabel()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg">📈 This Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{sessionsCompleted}</p>
              <p className="text-sm text-muted-foreground mt-1">in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Pomodoro Technique Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Work for 25 minutes without interruption</li>
              <li>✅ Take a 5-minute break after each session</li>
              <li>✅ After 4 sessions, take a longer 15-minute break</li>
              <li>✅ Eliminate distractions during focus time</li>
              <li>✅ Use breaks to rest your eyes and stretch</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
