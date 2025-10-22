import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SettingsMenu = () => {
  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('sound_enabled') !== 'false';
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notifications_enabled') !== 'false';
  });

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('sound_enabled', String(enabled));
  };

  const handleNotificationsToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('notifications_enabled', String(enabled));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your Work Tracker experience
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>

          <Separator />

          {/* Accessibility */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Accessibility</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <Label htmlFor="sound">Sound Effects</Label>
              </div>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={handleSoundToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationsToggle}
              />
            </div>
          </div>

          <Separator />

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Help & Info</h3>
            <Link to="/how-it-works">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <span className="mr-2">❓</span>
                How It Works
              </Button>
            </Link>
          </div>

          <Separator />

          {/* Keyboard Shortcuts */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toggle Dark Mode</span>
                <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl+D</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Settings</span>
                <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl+,</kbd>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
