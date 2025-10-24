import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/LoginModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Activity {
  id: string;
  userId: string;
  username: string;
  type: 'goal_completed' | 'streak_milestone' | 'badge_unlocked';
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface Friend {
  id: string;
  username: string;
  email: string;
  currentStreak: number;
  totalGoals: number;
  badges?: string[];
  dailyProgressRate?: number;
  weeklyProgress?: { day: string; completed: number; total: number }[];
}

export default function Social() {
  const { isAuthenticated, user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // Demo data for display
  useEffect(() => {
    const demoActivities: Activity[] = [
      {
        id: '1',
        userId: '1',
        username: 'Sarah Johnson',
        type: 'goal_completed',
        content: 'completed "Morning Exercise" 🎯',
        timestamp: '2 hours ago',
        likes: 12,
        comments: 3,
      },
      {
        id: '2',
        userId: '2',
        username: 'Mike Chen',
        type: 'streak_milestone',
        content: 'reached a 30-day streak! 🔥',
        timestamp: '5 hours ago',
        likes: 24,
        comments: 8,
      },
      {
        id: '3',
        userId: '3',
        username: 'Emily Davis',
        type: 'badge_unlocked',
        content: 'unlocked the Week Warrior badge 🏆',
        timestamp: '1 day ago',
        likes: 18,
        comments: 5,
      },
    ];

    const demoFriends: Friend[] = [
      {
        id: '1',
        username: 'Sarah Johnson',
        email: 'sarah@example.com',
        currentStreak: 15,
        totalGoals: 48,
        badges: ['🔥 Fire Starter', '📅 Week Warrior', '🎯 Goal Crusher', '⭐ Rising Star'],
        dailyProgressRate: 85,
        weeklyProgress: [
          { day: 'Mon', completed: 4, total: 5 },
          { day: 'Tue', completed: 5, total: 5 },
          { day: 'Wed', completed: 3, total: 5 },
          { day: 'Thu', completed: 5, total: 5 },
          { day: 'Fri', completed: 4, total: 5 },
          { day: 'Sat', completed: 5, total: 5 },
          { day: 'Sun', completed: 4, total: 5 },
        ],
      },
      {
        id: '2',
        username: 'Mike Chen',
        email: 'mike@example.com',
        currentStreak: 30,
        totalGoals: 125,
        badges: ['🔥 Fire Starter', '📅 Month Master', '🎯 Goal Crusher', '⭐ Rising Star', '💎 Diamond', '🏆 Champion'],
        dailyProgressRate: 92,
        weeklyProgress: [
          { day: 'Mon', completed: 5, total: 5 },
          { day: 'Tue', completed: 5, total: 5 },
          { day: 'Wed', completed: 5, total: 5 },
          { day: 'Thu', completed: 5, total: 5 },
          { day: 'Fri', completed: 5, total: 5 },
          { day: 'Sat', completed: 4, total: 5 },
          { day: 'Sun', completed: 5, total: 5 },
        ],
      },
      {
        id: '3',
        username: 'Emily Davis',
        email: 'emily@example.com',
        currentStreak: 7,
        totalGoals: 32,
        badges: ['🔥 Fire Starter', '📅 Week Warrior', '⭐ Rising Star'],
        dailyProgressRate: 68,
        weeklyProgress: [
          { day: 'Mon', completed: 3, total: 5 },
          { day: 'Tue', completed: 4, total: 5 },
          { day: 'Wed', completed: 2, total: 5 },
          { day: 'Thu', completed: 4, total: 5 },
          { day: 'Fri', completed: 3, total: 5 },
          { day: 'Sat', completed: 4, total: 5 },
          { day: 'Sun', completed: 3, total: 5 },
        ],
      },
    ];

    setActivities(demoActivities);
    setFriends(demoFriends);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'goal_completed':
        return '✅';
      case 'streak_milestone':
        return '🔥';
      case 'badge_unlocked':
        return '🏆';
      default:
        return '📌';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleViewProfile = (friend: Friend) => {
    setSelectedFriend(friend);
    setProfileDialogOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              👥 Social Features
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with friends, share progress, and stay motivated together!
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Join the Community</CardTitle>
              <CardDescription className="text-base">
                Login to access social features and connect with friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  onClick={() => setLoginOpen(true)}
                  className="w-full"
                  size="lg"
                >
                  🚀 Login to Continue
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Sign in to unlock all social features
                </p>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-3">Social Features Include:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ Activity feed from friends</li>
                  <li>✅ Like and comment on achievements</li>
                  <li>✅ Friend system and search</li>
                  <li>✅ View friend statistics</li>
                  <li>✅ Share your progress</li>
                  <li>✅ Friendly competition</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              👥 Social Hub
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email}! See what your friends are achieving. 🎉
            </p>
          </div>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Activity Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
            <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
            <TabsTrigger value="search">Find Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  See what your friends have been accomplishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback>{getInitials(activity.username)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{activity.username}</span>
                        <span className="text-sm text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-foreground mb-3">
                        {getActivityIcon(activity.type)} {activity.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="hover:text-primary transition-colors">
                          ❤️ {activity.likes}
                        </button>
                        <button className="hover:text-primary transition-colors">
                          💬 {activity.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <Card key={friend.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(friend.username)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{friend.username}</CardTitle>
                        <CardDescription className="text-xs">
                          {friend.email}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Streak</span>
                        <Badge variant="secondary">
                          🔥 {friend.currentStreak} days
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Goals</span>
                        <Badge variant="secondary">
                          🎯 {friend.totalGoals}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => handleViewProfile(friend)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 Weekly Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers this week - Keep pushing!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...friends].sort((a, b) => b.currentStreak - a.currentStreak).map((friend, index) => (
                  <div
                    key={friend.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50 border-yellow-300 shadow-lg' 
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50 border-gray-300 shadow-md'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 border-orange-300 shadow-md'
                        : 'bg-background/50'
                    }`}
                  >
                    <div className="text-3xl font-bold w-12 text-center">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">{getInitials(friend.username)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{friend.username}</div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>🔥 {friend.currentStreak} day streak</span>
                        <span>🎯 {friend.totalGoals} total goals</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{friend.totalGoals + friend.currentStreak * 10}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Your Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">-</div>
                    <div className="text-xs text-muted-foreground mt-1">Your Rank</div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</div>
                    <div className="text-xs text-muted-foreground mt-1">Current Streak</div>
                  </div>
                  <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/30">
                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">0</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Friends</CardTitle>
                <CardDescription>
                  Search for users by username or email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Search by username or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button>Search</Button>
                </div>
                <div className="text-center text-muted-foreground py-8">
                  <p>🔍 Search for friends to connect with them</p>
                  <p className="text-sm mt-2">
                    Try searching for "Sarah", "Mike", or "Emily"
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedFriend && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl">
                      {getInitials(selectedFriend.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl">{selectedFriend.username}</DialogTitle>
                    <DialogDescription>{selectedFriend.email}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        🔥 {selectedFriend.currentStreak}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Day Streak</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        🎯 {selectedFriend.totalGoals}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Total Goals</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        📈 {selectedFriend.dailyProgressRate}%
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Daily Progress</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Badges Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏆 Badges Earned
                    </CardTitle>
                    <CardDescription>
                      {selectedFriend.badges?.length || 0} badges unlocked
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedFriend.badges?.map((badge, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 text-center hover:scale-105 transition-transform"
                        >
                          <div className="text-2xl mb-1">{badge.split(' ')[0]}</div>
                          <div className="text-xs font-medium">{badge.split(' ').slice(1).join(' ')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📊 Weekly Progress
                    </CardTitle>
                    <CardDescription>
                      Daily completion rate over the last 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedFriend.weeklyProgress?.map((day, index) => {
                        const percentage = Math.round((day.completed / day.total) * 100);
                        return (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{day.day}</span>
                              <span className="text-sm text-muted-foreground">
                                {day.completed}/{day.total} goals ({percentage}%)
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Progress Rate Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎯 Overall Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Daily Progress Rate</span>
                          <span className="text-sm font-bold text-primary">
                            {selectedFriend.dailyProgressRate}%
                          </span>
                        </div>
                        <Progress value={selectedFriend.dailyProgressRate} className="h-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <div className="text-xs text-muted-foreground">Average Completion</div>
                          <div className="text-lg font-bold">
                            {selectedFriend.weeklyProgress 
                              ? Math.round(
                                  selectedFriend.weeklyProgress.reduce((acc, day) => 
                                    acc + (day.completed / day.total) * 100, 0
                                  ) / selectedFriend.weeklyProgress.length
                                )
                              : 0}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Best Day</div>
                          <div className="text-lg font-bold">
                            {selectedFriend.weeklyProgress
                              ? selectedFriend.weeklyProgress.reduce((best, day) => 
                                  (day.completed / day.total) > (best.completed / best.total) ? day : best
                                ).day
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
