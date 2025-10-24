import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Key,
  Bell,
  BellOff,
  Save,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2024',
    avatar: '',
    twoFactorEnabled: true,
    notifications: {
      email: true,
      push: false,
      sms: true,
      marketing: false
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      icon: '✅',
    });
  };

  const handlePasswordChange = () => {
    toast.success('Password updated successfully!', {
      icon: '🔒',
    });
  };

  const handleTwoFactorToggle = () => {
    setUserData(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    toast.success(
      userData.twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled',
      { icon: '🔐' }
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Profile Information</h3>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="rounded-xl"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" className="rounded-xl">
                <Upload className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
              <p className="text-sm text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-300">Location</Label>
              <Input
                id="location"
                value={userData.location}
                onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                className="bg-slate-900/50 border-slate-600"
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">Member since</p>
                <p className="text-white font-medium">{userData.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">Timezone</p>
                <p className="text-white font-medium">Pacific Standard Time</p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-orange-500 to-red-500">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Security Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-orange-400" />
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={userData.twoFactorEnabled ? "default" : "secondary"}>
                {userData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Switch
                checked={userData.twoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-300">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    className="bg-slate-900/50 border-slate-600 pr-10"
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    className="bg-slate-900/50 border-slate-600 pr-10"
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <Button onClick={handlePasswordChange} className="bg-gradient-to-r from-orange-500 to-red-500">
              Update Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(userData.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                {value ? <Bell className="h-4 w-4 text-green-400" /> : <BellOff className="h-4 w-4 text-slate-400" />}
                <div>
                  <h4 className="text-white font-medium capitalize">{key} Notifications</h4>
                  <p className="text-sm text-slate-400">
                    {key === 'email' && 'Receive notifications via email'}
                    {key === 'push' && 'Receive push notifications in browser'}
                    {key === 'sms' && 'Receive SMS notifications'}
                    {key === 'marketing' && 'Receive marketing and promotional emails'}
                  </p>
                </div>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setUserData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [key]: checked }
                  }))
                }
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AccountSettings;
