// src/pages/SettingsPage.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import useLocalStorage from '@/hooks/useLocalStorage';
import { electronService } from '@/services/electron.service';

/**
 * Settings page with common app settings
 */
export const SettingsPage: React.FC = () => {
  const [appName, setAppName] = useLocalStorage('settings-app-name', 'My App');
  const [darkMode, setDarkMode] = useLocalStorage('settings-dark-mode', false);
  const [notifications, setNotifications] = useLocalStorage('settings-notifications', true);
  const [autoSave, setAutoSave] = useLocalStorage('settings-auto-save', true);
  const [language, setLanguage] = useLocalStorage('settings-language', 'en');
  const [volume, setVolume] = useLocalStorage('settings-volume', 75);
  const [compactMode, setCompactMode] = useLocalStorage('settings-compact-mode', false);
  const [showTrayIcon, setShowTrayIcon] = useLocalStorage('settings-show-tray', true);
  const [startMinimized, setStartMinimized] = useLocalStorage('settings-start-minimized', false);
  const [appVersion, setAppVersion] = React.useState('1.0.0');
  const [platform, setPlatform] = React.useState<string>('');

  React.useEffect(() => {
    // Get app info from Electron
    electronService.getAppVersion().then(setAppVersion);
    electronService.getPlatform().then(setPlatform);
  }, []);

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', { appName, darkMode, notifications, autoSave, language, volume });
  };

  const handleReset = () => {
    setAppName('My App');
    setDarkMode(false);
    setNotifications(true);
    setAutoSave(true);
    setLanguage('en');
    setVolume(75);
    setCompactMode(false);
    setShowTrayIcon(true);
    setStartMinimized(false);
  };

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Configure general application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Application Name"
            value={appName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppName(e.target.value)}
            placeholder="Enter app name"
          />
          <Select
            label="Language"
            options={languageOptions}
            value={language}
            onChange={setLanguage}
            placeholder="Select language"
          />
          <Toggle
            label="Dark Mode"
            description="Enable dark theme for the application"
            checked={darkMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDarkMode(e.target.checked)}
          />
          <Toggle
            label="Compact Mode"
            description="Use compact UI layout"
            checked={compactMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompactMode(e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Audio</CardTitle>
          <CardDescription>Configure audio and notification sounds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            label="Volume"
            min={0}
            max={100}
            value={volume}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value))}
            minLabel="Mute"
            maxLabel="Max"
            valueDisplay={(val: number) => `${val}%`}
          />
          <Toggle
            label="Enable Notifications"
            description="Receive notifications for important updates"
            checked={notifications}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* Data & Storage */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Storage</CardTitle>
          <CardDescription>Configure data storage options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toggle
            label="Auto-save"
            description="Automatically save changes"
            checked={autoSave}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoSave(e.target.checked)}
          />
          <RadioGroup
            label="Auto-save Interval"
            name="auto-save-interval"
            options={[
              { label: 'Every 30 seconds', value: '30' },
              { label: 'Every minute', value: '60' },
              { label: 'Every 5 minutes', value: '300' },
              { label: 'Every 10 minutes', value: '600' },
            ]}
            value="60"
            onChange={(val: string) => console.log('Auto-save interval:', val)}
            orientation="horizontal"
          />
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System</CardTitle>
          <CardDescription>Configure system integration options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Checkbox
            label="Show in system tray"
            description="Keep app running in background when closed"
            checked={showTrayIcon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowTrayIcon(e.target.checked)}
          />
          <Checkbox
            label="Start minimized"
            description="Start app minimized to system tray"
            checked={startMinimized}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartMinimized(e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Application information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Version</span>
            <span className="font-medium">{appVersion}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Platform</span>
            <span className="font-medium">{platform || 'Web (Dev Mode)'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Electron</span>
            <span className="font-medium">{electronService.isElectron() ? 'Yes' : 'No'}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
