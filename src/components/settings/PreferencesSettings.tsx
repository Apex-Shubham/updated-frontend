import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Palette, 
  Clock, 
  Zap, 
  Database,
  Monitor,
  Moon,
  Sun,
  Languages,
  Save,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState({
    // General Preferences
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    
    // Display Preferences
    theme: 'dark',
    fontSize: 14,
    compactMode: false,
    showAnimations: true,
    
    // API Preferences
    defaultTimeout: 30,
    retryAttempts: 3,
    autoRefresh: true,
    cacheEnabled: true,
    
    // Performance
    maxConcurrentRequests: 5,
    enableAnalytics: true,
    debugMode: false
  });

  const handleSave = () => {
    toast.success('Preferences saved successfully!', {
      icon: '✅',
    });
  };

  const handleReset = () => {
    toast.success('Preferences reset to defaults!', {
      icon: '🔄',
    });
  };

  return (
    <div className="space-y-6">
      {/* General Preferences */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">General Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-slate-300">Language</Label>
            <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-slate-300">Timezone</Label>
            <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFormat" className="text-slate-300">Date Format</Label>
            <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-slate-300">Currency</Label>
            <Select value={preferences.currency} onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger className="bg-slate-900/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="CAD">CAD (C$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Display Preferences */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Display Preferences</h3>
        </div>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-4">
            <Label className="text-slate-300">Theme</Label>
            <div className="flex gap-3">
              <Button
                variant={preferences.theme === 'light' ? 'default' : 'outline'}
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={preferences.theme === 'system' ? 'default' : 'outline'}
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'system' }))}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Font Size</Label>
              <Badge variant="secondary">{preferences.fontSize}px</Badge>
            </div>
            <Slider
              value={[preferences.fontSize]}
              onValueChange={([value]) => setPreferences(prev => ({ ...prev, fontSize: value }))}
              max={20}
              min={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          {/* Display Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Compact Mode</h4>
                <p className="text-sm text-slate-400">Reduce spacing and padding for a more compact interface</p>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactMode: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Show Animations</h4>
                <p className="text-sm text-slate-400">Enable smooth transitions and animations</p>
              </div>
              <Switch
                checked={preferences.showAnimations}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showAnimations: checked }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* API Preferences */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">API Preferences</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timeout" className="text-slate-300">Default Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                value={preferences.defaultTimeout}
                onChange={(e) => setPreferences(prev => ({ ...prev, defaultTimeout: parseInt(e.target.value) }))}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retry" className="text-slate-300">Retry Attempts</Label>
              <Input
                id="retry"
                type="number"
                value={preferences.retryAttempts}
                onChange={(e) => setPreferences(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Auto Refresh</h4>
                <p className="text-sm text-slate-400">Automatically refresh data at regular intervals</p>
              </div>
              <Switch
                checked={preferences.autoRefresh}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoRefresh: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Enable Caching</h4>
                <p className="text-sm text-slate-400">Cache API responses for better performance</p>
              </div>
              <Switch
                checked={preferences.cacheEnabled}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, cacheEnabled: checked }))}
              />
            </div>
          </div>

          {/* Performance Settings */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Performance Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Max Concurrent Requests</Label>
                <Badge variant="secondary">{preferences.maxConcurrentRequests}</Badge>
              </div>
              <Slider
                value={[preferences.maxConcurrentRequests]}
                onValueChange={([value]) => setPreferences(prev => ({ ...prev, maxConcurrentRequests: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Enable Analytics</h4>
                <p className="text-sm text-slate-400">Help improve the service by sharing usage analytics</p>
              </div>
              <Switch
                checked={preferences.enableAnalytics}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, enableAnalytics: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <h4 className="text-white font-medium">Debug Mode</h4>
                <p className="text-sm text-slate-400">Enable detailed logging for troubleshooting</p>
              </div>
              <Switch
                checked={preferences.debugMode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, debugMode: checked }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset} className="rounded-xl">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
