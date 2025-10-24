import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Download, 
  Crown,
  Zap,
  Shield,
  Check,
  X,
  AlertCircle,
  BarChart3,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

const BillingSettings = () => {
  const [currentPlan] = useState('pro');
  
  // Mock data
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 Reddit posts per search',
        'Basic market analysis',
        'Email support',
        '1 concurrent request'
      ],
      limits: {
        apiCalls: 100,
        storage: 1,
        users: 1
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For growing businesses',
      features: [
        '25 Reddit posts per search',
        'Advanced market analysis',
        'Priority support',
        '5 concurrent requests',
        'Custom integrations',
        'Export capabilities'
      ],
      limits: {
        apiCalls: 1000,
        storage: 10,
        users: 5
      },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited Reddit posts',
        'AI-powered insights',
        '24/7 dedicated support',
        'Unlimited concurrent requests',
        'White-label solution',
        'Custom API endpoints',
        'SLA guarantee'
      ],
      limits: {
        apiCalls: 10000,
        storage: 100,
        users: 50
      }
    }
  ];

  const usage = {
    apiCalls: {
      used: 750,
      limit: 1000,
      percentage: 75
    },
    storage: {
      used: 3.2,
      limit: 10,
      percentage: 32
    },
    users: {
      used: 2,
      limit: 5,
      percentage: 40
    }
  };

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      invoice: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      invoice: 'INV-2023-012'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      invoice: 'INV-2023-011'
    }
  ];

  const handleUpgrade = (planId: string) => {
    toast.success(`Upgrading to ${plans.find(p => p.id === planId)?.name} plan!`, {
      icon: '🚀',
    });
  };

  const handleDowngrade = (planId: string) => {
    toast.success(`Downgrading to ${plans.find(p => p.id === planId)?.name} plan!`, {
      icon: '📉',
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}`, {
      icon: '📄',
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Current Plan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                plan.id === currentPlan
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-slate-700 bg-slate-900/50'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {plan.id === 'free' && <Zap className="h-5 w-5 text-blue-400" />}
                  {plan.id === 'pro' && <Crown className="h-5 w-5 text-orange-400" />}
                  {plan.id === 'enterprise' && <Shield className="h-5 w-5 text-purple-400" />}
                  <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${plan.price}
                  <span className="text-sm text-slate-400">/{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                {plan.id === currentPlan ? (
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                    Current Plan
                  </Badge>
                ) : plan.price > plans.find(p => p.id === currentPlan)?.price! ? (
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Upgrade
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDowngrade(plan.id)}
                    variant="outline"
                    className="w-full"
                  >
                    Downgrade
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Usage Statistics */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">Usage Statistics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">API Calls</h4>
              <Badge variant="secondary">
                {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
              </Badge>
            </div>
            <Progress value={usage.apiCalls.percentage} className="h-2" />
            <p className="text-sm text-slate-400">
              {usage.apiCalls.limit - usage.apiCalls.used} calls remaining this month
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Storage</h4>
              <Badge variant="secondary">
                {usage.storage.used}GB / {usage.storage.limit}GB
              </Badge>
            </div>
            <Progress value={usage.storage.percentage} className="h-2" />
            <p className="text-sm text-slate-400">
              {usage.storage.limit - usage.storage.used}GB available
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Team Members</h4>
              <Badge variant="secondary">
                {usage.users.used} / {usage.users.limit}
              </Badge>
            </div>
            <Progress value={usage.users.percentage} className="h-2" />
            <p className="text-sm text-slate-400">
              {usage.users.limit - usage.users.used} slots available
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-orange-400" />
            <h4 className="text-white font-medium">Billing Cycle</h4>
          </div>
          <p className="text-slate-400 text-sm">
            Next billing date: February 15, 2024
          </p>
          <p className="text-slate-400 text-sm">
            Usage resets on: February 1, 2024
          </p>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Billing History</h3>
          </div>
          <Button variant="outline" className="rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        <div className="space-y-4">
          {billingHistory.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <CreditCard className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{invoice.description}</h4>
                  <p className="text-sm text-slate-400">
                    {new Date(invoice.date).toLocaleDateString()} • {invoice.invoice}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-medium">${invoice.amount.toFixed(2)}</p>
                  <div className="flex items-center gap-1">
                    {invoice.status === 'paid' ? (
                      <>
                        <Check className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">Paid</span>
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-red-400">Failed</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(invoice.invoice)}
                  className="rounded-lg"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Payment Method</h3>
          </div>
          <Button variant="outline" className="rounded-xl">
            Update
          </Button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl">
          <div className="p-3 bg-slate-800 rounded-lg">
            <CreditCard className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h4 className="text-white font-medium">Visa ending in 4242</h4>
            <p className="text-sm text-slate-400">Expires 12/25</p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
            Default
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default BillingSettings;
