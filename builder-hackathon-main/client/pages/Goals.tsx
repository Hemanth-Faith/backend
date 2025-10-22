import { Layout } from '@/components/Layout';
import { useWorkTrackerState } from '@/hooks/useWorkTrackerState';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EffortLevel } from '@shared/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/LoginModal';
import { Card, CardContent } from '@/components/ui/card';

export default function Goals() {
  const { state, addGoal, deleteGoal } = useWorkTrackerState();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    effort: 'medium' as EffortLevel,
    frequency: 'daily' as 'once' | 'daily' | 'weekly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addGoal({
      title: formData.title,
      description: formData.description,
      effort: formData.effort,
      frequency: formData.frequency,
    });

    setFormData({
      title: '',
      description: '',
      effort: 'medium',
      frequency: 'daily',
    });
    setIsFormOpen(false);
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'light':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'medium':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'heavy':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortEmoji = (effort: string) => {
    switch (effort) {
      case 'light':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'heavy':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getFrequencyEmoji = (freq: string) => {
    switch (freq) {
      case 'once':
        return '1️⃣';
      case 'daily':
        return '📅';
      case 'weekly':
        return '📆';
      default:
        return '⏰';
    }
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-2xl w-full border-2">
            <CardContent className="p-12 text-center">
              <div className="text-8xl mb-6 animate-bounce">🎯</div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Goals Await You!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Login to create and manage your goals. Track your progress, build streaks, and achieve greatness!
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="font-semibold">Create Unlimited Goals</h3>
                    <p className="text-sm text-muted-foreground">Set daily, weekly, or one-time objectives</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                  <div className="text-3xl">🔥</div>
                  <div>
                    <h3 className="font-semibold">Build Your Streaks</h3>
                    <p className="text-sm text-muted-foreground">Track consistency and watch your progress grow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="font-semibold">Visualize Progress</h3>
                    <p className="text-sm text-muted-foreground">See your achievements with detailed analytics</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="text-lg px-10 py-6" onClick={() => setLoginOpen(true)}>
                🚀 Login to Start Setting Goals
              </Button>
            </CardContent>
          </Card>
        </div>
        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your Goals</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your goals. Track your progress towards your objectives. 🎯
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(!isFormOpen)}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isFormOpen ? '✕ Cancel' : '✨ New Goal'}
          </Button>
        </div>

        {/* Achievement Summary */}
        {state.goals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{state.goals.length}</div>
                <div className="text-xs text-muted-foreground">Total Goals</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {state.goals.filter(g => g.completedDates.length > 0).length}
                </div>
                <div className="text-xs text-muted-foreground">Active Streaks</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.max(...Object.values(state.streaks).map(s => s.currentStreak), 0)}
                </div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {state.goals.reduce((sum, g) => sum + g.completedDates.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Completions</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Goal Creation Form */}
        {isFormOpen && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Create a New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Morning Meditation"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details about this goal..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Effort Level
                  </label>
                  <select
                    value={formData.effort}
                    onChange={(e) => setFormData({ ...formData, effort: e.target.value as EffortLevel })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="default">
                  Create Goal
                </Button>
                <Button type="button" onClick={() => setIsFormOpen(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Goals List */}
        {state.goals.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No goals created yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating your first goal to begin tracking your progress.
            </p>
            <Button onClick={() => setIsFormOpen(true)}>Create Your First Goal</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {state.goals.map(goal => {
              const streak = state.streaks[goal.id];
              return (
                <div
                  key={goal.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getEffortColor(goal.effort)}`}>
                          {getEffortEmoji(goal.effort)} {goal.effort}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                          {getFrequencyEmoji(goal.frequency)} {goal.frequency}
                        </span>
                      </div>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      )}
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>🔥 {streak?.currentStreak || 0} day streak</span>
                        <span>🏆 {streak?.longestStreak || 0} best</span>
                        <span>✅ {goal.completedDates.length} times completed</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteGoal(goal.id)}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
