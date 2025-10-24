import { Layout } from '@/components/Layout';
import { useWorkTrackerState } from '@/hooks/useWorkTrackerState';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { StreakVisualization } from '@/components/StreakVisualization';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/components/LoginModal';
import { Link } from 'react-router-dom';

export default function Calendar() {
  const { state, completeGoal } = useWorkTrackerState();
  const { isAuthenticated } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [loginOpen, setLoginOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isGoalCompletedOnDate = (goalId: string, dateStr: string) => {
    const goal = state.goals.find(g => g.id === goalId);
    return goal?.completedDates.includes(dateStr) || false;
  };

  const getCompletionRateForDate = (dateStr: string) => {
    const completedCount = state.goals.filter(g => isGoalCompletedOnDate(g.id, dateStr)).length;
    return state.goals.length > 0 ? Math.round((completedCount / state.goals.length) * 100) : 0;
  };

  const getCompletionColor = (percentage: number, dateStr: string) => {
    const isPast = dateStr < today;
    const isFuture = dateStr > today;
    
    if (isFuture) return 'bg-muted/30 border-border/50';
    if (percentage === 0) return 'bg-muted border-border';
    
    // Vibrant gradients for past days with activity
    if (isPast || dateStr === today) {
      if (percentage === 100) return 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 border-emerald-400 dark:from-emerald-500 dark:via-emerald-600 dark:to-green-700 shadow-lg shadow-emerald-500/50';
      if (percentage >= 75) return 'bg-gradient-to-br from-emerald-300 via-green-400 to-green-500 border-emerald-300 dark:from-emerald-600 dark:via-green-700 dark:to-green-800 shadow-md shadow-emerald-400/40';
      if (percentage >= 50) return 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 border-yellow-300 dark:from-yellow-600 dark:via-amber-600 dark:to-orange-700 shadow-md shadow-yellow-400/40';
      if (percentage >= 25) return 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 border-orange-300 dark:from-orange-600 dark:via-orange-700 dark:to-red-700 shadow-md shadow-orange-400/40';
      return 'bg-gradient-to-br from-red-300 via-red-400 to-red-500 border-red-300 dark:from-red-600 dark:via-red-700 dark:to-red-800 shadow-sm shadow-red-400/30';
    }
    
    return 'bg-muted border-border';
  };

  const getGoalsForDate = (dateStr: string) => {
    return state.goals.filter(g => isGoalCompletedOnDate(g.id, dateStr));
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const today = new Date().toISOString().split('T')[0];

  // Calculate overall streak
  const overallStreak = useMemo(() => {
    let currentStreak = 0;
    const sortedDates = new Set<string>();
    
    state.goals.forEach(goal => {
      goal.completedDates.forEach(date => sortedDates.add(date));
    });
    
    const dates = Array.from(sortedDates).sort().reverse();
    let checkDate = new Date();
    
    for (const dateStr of dates) {
      const date = new Date(dateStr);
      const dayDiff = Math.floor((checkDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff <= currentStreak + 1) {
        currentStreak++;
        checkDate = date;
      } else {
        break;
      }
    }
    
    return currentStreak;
  }, [state.goals]);

  // Calculate today's stats
  const todayStats = useMemo(() => {
    const completedToday = state.goals.filter(g => isGoalCompletedOnDate(g.id, today)).length;
    const totalGoals = state.goals.length;
    const percentage = totalGoals > 0 ? Math.round((completedToday / totalGoals) * 100) : 0;
    
    return { completedToday, totalGoals, percentage };
  }, [state.goals, today]);

  // Calculate weekly history (last 7 days)
  const weeklyHistory = useMemo(() => {
    const history = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const completed = state.goals.filter(g => isGoalCompletedOnDate(g.id, dateStr)).length;
      const total = state.goals.length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      history.push({
        date: dateStr,
        dayName: date.toLocaleDateString('default', { weekday: 'short' }),
        completed,
        total,
        percentage
      });
    }
    return history;
  }, [state.goals]);

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    const daysWithData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const completed = state.goals.filter(g => isGoalCompletedOnDate(g.id, dateStr)).length;
      if (completed > 0) daysWithData.push({ completed, total: state.goals.length });
    }
    
    const totalCompletions = daysWithData.reduce((sum, day) => sum + day.completed, 0);
    const averageCompletion = daysWithData.length > 0 
      ? Math.round(daysWithData.reduce((sum, day) => sum + (day.completed / day.total) * 100, 0) / daysWithData.length)
      : 0;
    
    return {
      totalCompletions,
      activeDays: daysWithData.length,
      averageCompletion
    };
  }, [state.goals, selectedMonth, daysInMonth]);

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const handleToday = () => {
    setSelectedMonth(new Date());
  };

  const handleDayClick = (dateStr: string) => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    
    // Toggle completion for all goals on this day
    state.goals.forEach(goal => {
      const isCompleted = isGoalCompletedOnDate(goal.id, dateStr);
      if (!isCompleted && dateStr <= today) {
        completeGoal(goal.id);
      }
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Visualize your consistency and track daily progress across all your goals.
          </p>
        </div>

        {/* Streak Visualization - Only for authenticated users */}
        {isAuthenticated && <StreakVisualization streak={overallStreak} />}

        {!isAuthenticated && (
          <Card className="border-primary">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Login to Track Your Progress</h3>
              <p className="text-muted-foreground mb-4">
                Sign in to view detailed statistics and track your daily achievements
              </p>
              <Button onClick={() => setLoginOpen(true)}>
                Login to Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards: Today's progress / 7-day history / Monthly summary - Only show when logged in */}
        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
                <CardDescription className="text-sm">Tasks completed today across all goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">{todayStats.completedToday}</div>
                    <div className="text-sm text-muted-foreground">of {todayStats.totalGoals} goals</div>
                  </div>
                  <div className="w-36">
                    <Progress value={todayStats.percentage} />
                    <div className="text-sm text-right text-muted-foreground mt-1">{todayStats.percentage}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last 7 Days</CardTitle>
                <CardDescription className="text-sm">Daily completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-40">
                  <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="none" className="overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="280" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                    <line x1="0" y1="60" x2="280" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                    <line x1="0" y1="90" x2="280" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                    
                    {/* Gradient fill under line */}
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under line */}
                    <path
                      d={`M 0 120 ${weeklyHistory.map((day, i) => {
                        const x = (i / (weeklyHistory.length - 1)) * 280;
                        const y = 120 - (day.percentage * 0.9);
                        return `L ${x} ${y}`;
                      }).join(' ')} L 280 120 Z`}
                      fill="url(#lineGradient)"
                    />
                    
                    {/* Main line */}
                    <polyline
                      points={weeklyHistory.map((day, i) => {
                        const x = (i / (weeklyHistory.length - 1)) * 280;
                        const y = 120 - (day.percentage * 0.9);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all"
                    />
                    
                    {/* Data points */}
                    {weeklyHistory.map((day, i) => {
                      const x = (i / (weeklyHistory.length - 1)) * 280;
                      const y = 120 - (day.percentage * 0.9);
                      const isHovered = hoveredPoint === i;
                      
                      return (
                        <g key={day.date}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 6 : 4}
                            fill="hsl(var(--primary))"
                            stroke="hsl(var(--background))"
                            strokeWidth="2"
                            className="cursor-pointer transition-all"
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                          {isHovered && (
                            <circle
                              cx={x}
                              cy={y}
                              r="8"
                              fill="hsl(var(--primary))"
                              opacity="0.3"
                              className="animate-pulse"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Day labels */}
                  <div className="flex justify-between mt-2">
                    {weeklyHistory.map((day, i) => (
                      <div 
                        key={day.date} 
                        className="text-xs text-muted-foreground font-medium flex-1 text-center"
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        {day.dayName.substring(0, 2)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover tooltip */}
                  {hoveredPoint !== null && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-50">
                      <div className="bg-popover border border-border rounded-lg shadow-lg px-3 py-2 whitespace-nowrap">
                        <div className="text-xs font-semibold">{weeklyHistory[hoveredPoint].dayName}</div>
                        <div className="text-xs text-muted-foreground">
                          {weeklyHistory[hoveredPoint].completed}/{weeklyHistory[hoveredPoint].total} goals
                        </div>
                        <div className="text-xs font-bold text-primary">{weeklyHistory[hoveredPoint].percentage}%</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription className="text-sm">Overview for {monthName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active days</span>
                    <span className="font-medium">{monthlyStats.activeDays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total completions</span>
                    <span className="font-medium">{monthlyStats.totalCompletions}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Average completion</span>
                    <div className="mt-2">
                      <Progress value={monthlyStats.averageCompletion} />
                      <div className="text-sm text-right text-muted-foreground mt-1">{monthlyStats.averageCompletion}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calendar Navigation */}
        <div className="bg-card border border-border rounded-lg p-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
            >
              ← Previous
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">{monthName}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToday}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-xs text-muted-foreground py-1.5">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty cells for days before month starts */}
            {emptyDays.map(i => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {days.map(day => {
              const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const percentage = getCompletionRateForDate(dateStr);
              const isToday = dateStr === today;
              const completedGoals = getGoalsForDate(dateStr);
              const isHovered = hoveredDay === dateStr;

              return (
                <div
                  key={day}
                  className="relative"
                  onMouseEnter={() => setHoveredDay(dateStr)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    onClick={() => handleDayClick(dateStr)}
                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all ${
                      isAuthenticated ? 'cursor-pointer hover:scale-110 hover:shadow-xl' : 'cursor-default'
                    } ${getCompletionColor(percentage, dateStr)} ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    title={`${day}: ${percentage}% completed${!isAuthenticated ? ' (Login to track)' : ''}`}
                  >
                    <div className="text-sm font-bold" style={{ color: percentage > 0 && dateStr <= today ? 'white' : 'inherit' }}>{day}</div>
                    {isAuthenticated && percentage > 0 && (
                      <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{percentage}%</div>
                    )}
                  </div>

                  {/* Hover Tooltip */}
                  {isAuthenticated && isHovered && (dateStr < today || completedGoals.length > 0) && (
                    <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/90 dark:to-pink-950/90 border-2 border-purple-200 dark:border-purple-700 rounded-lg shadow-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-bold text-purple-900 dark:text-purple-100">
                            {new Date(dateStr).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
                            {percentage}%
                          </div>
                        </div>
                        
                        {completedGoals.length > 0 ? (
                          <div className="space-y-2 mb-3">
                            <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">✓ Completed Tasks:</div>
                            {completedGoals.map(goal => (
                              <div key={goal.id} className="flex items-center gap-2 text-xs bg-white/50 dark:bg-black/20 rounded px-2 py-1">
                                <span className="text-green-500">✓</span>
                                <span className="truncate text-foreground">{goal.title}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground mb-3 italic">No tasks completed</div>
                        )}
                        
                        {dateStr < today && (
                          <div className="pt-3 border-t border-purple-200 dark:border-purple-800 space-y-2">
                            <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">📊 Productivity Metrics:</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white/50 dark:bg-black/20 rounded px-2 py-1.5">
                                <div className="text-[10px] text-muted-foreground">Energy</div>
                                <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
                                  {percentage > 0 ? (percentage >= 75 ? 'High ⚡' : percentage >= 50 ? 'Medium ⚡' : 'Low ⚡') : 'N/A'}
                                </div>
                              </div>
                              <div className="bg-white/50 dark:bg-black/20 rounded px-2 py-1.5">
                                <div className="text-[10px] text-muted-foreground">Sessions</div>
                                <div className="text-xs font-bold text-pink-600 dark:text-pink-400">
                                  {percentage > 0 ? `${completedGoals.length} 🍅` : 'N/A'}
                                </div>
                              </div>
                              <div className="bg-white/50 dark:bg-black/20 rounded px-2 py-1.5">
                                <div className="text-[10px] text-muted-foreground">Efficiency</div>
                                <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
                                  {percentage > 0 ? `${percentage}%` : 'N/A'}
                                </div>
                              </div>
                              <div className="bg-white/50 dark:bg-black/20 rounded px-2 py-1.5">
                                <div className="text-[10px] text-muted-foreground">Focus Time</div>
                                <div className="text-xs font-bold text-pink-600 dark:text-pink-400">
                                  {percentage > 0 ? `${Math.floor(completedGoals.length * 25 / 60)}h ${(completedGoals.length * 25) % 60}m` : 'N/A'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">📋 Completion Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted border-2 border-border shadow-sm" />
                <span className="text-xs text-muted-foreground">No activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-300 to-red-500 border-2 border-red-300 shadow-sm" />
                <span className="text-xs text-muted-foreground">1-24%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-orange-300 shadow-md" />
                <span className="text-xs text-muted-foreground">25-49%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-yellow-300 shadow-md" />
                <span className="text-xs text-muted-foreground">50-74%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-emerald-400 shadow-lg" />
                <span className="text-xs text-muted-foreground">75-100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats & Mood History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  � Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Goals</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{state.goals.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{overallStreak} 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">{monthlyStats.activeDays} days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  😊 Mood This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around items-center">
                  {(() => {
                    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
                    const last7Days = moodHistory.slice(-7);
                    if (last7Days.length === 0) {
                      return <p className="text-sm text-muted-foreground text-center w-full">Track your mood daily to see patterns! ✨</p>;
                    }
                    return last7Days.map((entry: any, i: number) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-3xl">{entry.emoji}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('default', { weekday: 'short' }).substring(0, 2)}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>            {/* Productivity Tip */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Click any date</strong> to quickly mark all goals as complete for that day. Perfect for catching up on past achievements!
                  </p>
                  <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Streak Building:</strong> Consistency is key! Even completing just one goal daily keeps your streak alive.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/goals" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        + Add Goal
                      </Button>
                    </Link>
                    <Link to="/pomodoro" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        🍅 Focus
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Goals Summary */}
        {isAuthenticated && state.goals.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Goals Tracked</h2>
            <div className="grid gap-3">
              {state.goals.map(goal => {
                const streak = state.streaks[goal.id];
                return (
                  <div key={goal.id} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">{goal.title}</p>
                      <p className="text-sm text-muted-foreground">{goal.completedDates.length} times completed</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground">🔥 {streak?.currentStreak || 0}</span>
                      <span className="text-muted-foreground">🏆 {streak?.longestStreak || 0}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isAuthenticated && state.goals.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No goals to track yet</h3>
            <p className="text-muted-foreground">
              Create goals to start seeing your progress on the calendar.
            </p>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </Layout>
  );
}
