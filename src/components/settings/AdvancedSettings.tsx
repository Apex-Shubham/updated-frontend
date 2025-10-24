import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Key, 
  Download, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Database,
  Shield,
  Settings,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const AdvancedSettings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  
  // Mock data
  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk-prod-1234567890abcdef',
      created: '2024-01-01',
      lastUsed: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk-dev-abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-01-14',
      status: 'active'
    }
  ];

  const webhooks = [
    {
      id: '1',
      name: 'Market Analysis Complete',
      url: 'https://your-app.com/webhooks/analysis',
      events: ['analysis.completed', 'analysis.failed'],
      status: 'active',
      lastTriggered: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Usage Alerts',
      url: 'https://your-app.com/webhooks/usage',
      events: ['usage.threshold_reached'],
      status: 'inactive',
      lastTriggered: null
    }
  ];

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard!', {
      icon: '📋',
    });
  };

  const handleRegenerateApiKey = (keyId: string) => {
    toast.success('API key regenerated successfully!', {
      icon: '🔄',
    });
  };

  const handleDeleteApiKey = (keyId: string) => {
    toast.success('API key deleted successfully!', {
      icon: '🗑️',
    });
  };

  const handleExportData = () => {
    toast.success('Data export started! You will receive an email when ready.', {
      icon: '📦',
    });
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requires confirmation. Please contact support.', {
      icon: '⚠️',
    });
  };

  const handleTestWebhook = (webhookId: string) => {
    toast.success('Webhook test sent successfully!', {
      icon: '🔗',
    });
  };

  return (
    <div className="space-y-6">
      {/* API Keys */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">API Keys</h3>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            Generate New Key
          </Button>
        </div>

        <Alert className="mb-6 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            Keep your API keys secure and never share them publicly. Regenerate keys if compromised.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{apiKey.name}</h4>
                  <p className="text-sm text-slate-400">
                    Created: {new Date(apiKey.created).toLocaleDateString()} • 
                    Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                  {apiKey.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Input
                  value={apiKey.key}
                  type={showApiKey ? 'text' : 'password'}
                  readOnly
                  className="bg-slate-800/50 border-slate-600 font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="rounded-lg"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyApiKey(apiKey.key)}
                  className="rounded-lg"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateApiKey(apiKey.id)}
                  className="rounded-lg"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteApiKey(apiKey.id)}
                  className="rounded-lg text-red-400 border-red-400/30 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Webhooks */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Webhooks</h3>
          </div>
          <Button variant="outline" className="rounded-xl">
            Add Webhook
          </Button>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{webhook.name}</h4>
                  <p className="text-sm text-slate-400 font-mono">{webhook.url}</p>
                </div>
                <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                  {webhook.status}
                </Badge>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-slate-300 mb-1">Events:</p>
                <div className="flex gap-2 flex-wrap">
                  {webhook.events.map((event, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              {webhook.lastTriggered && (
                <p className="text-sm text-slate-400 mb-3">
                  Last triggered: {new Date(webhook.lastTriggered).toLocaleString()}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTestWebhook(webhook.id)}
                  className="rounded-lg"
                >
                  Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-red-400 border-red-400/30 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Export */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Download className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Data Export</h3>
        </div>

        <div className="space-y-4">
          <p className="text-slate-300">
            Export all your data including market analyses, Reddit posts, and account information.
          </p>
          
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <h4 className="text-white font-medium mb-2">Export Options</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Market Analysis Data</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Reddit Posts & Threads</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Account Settings & Preferences</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-300">Billing History</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleExportData}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              Request Export
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Database className="h-4 w-4 mr-2" />
              Download Previous Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Account Actions</h3>
        </div>

        <Alert className="mb-6 bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            These actions are irreversible. Please proceed with caution.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
            <h4 className="text-white font-medium mb-2">Reset All Settings</h4>
            <p className="text-sm text-slate-400 mb-4">
              Reset all your preferences and settings to their default values.
            </p>
            <Button variant="outline" className="rounded-xl">
              <Settings className="h-4 w-4 mr-2" />
              Reset Settings
            </Button>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-xl border border-red-500/30">
            <h4 className="text-white font-medium mb-2">Delete Account</h4>
            <p className="text-sm text-slate-400 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="rounded-xl text-red-400 border-red-400/30 hover:bg-red-400/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedSettings;
