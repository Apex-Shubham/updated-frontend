import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import OptionCard from '@/components/OptionCard';
import { Button } from '@/components/ui/button';
import { useFlowStore } from '@/store/flowStore';
import { toast } from 'sonner';

const OptionsPage = () => {
  const navigate = useNavigate();
  const { selectedOption, setOption, reset } = useFlowStore();
  const [localSelected, setLocalSelected] = useState<string | null>(selectedOption);

  const optionData = [
    {
      id: 'option-1',
      title: 'Basic Plan',
      description: 'Perfect for small teams and startups getting started',
      gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
      icon: 'database' as const,
    },
    {
      id: 'option-2',
      title: 'Professional Plan',
      description: 'Advanced features for growing businesses',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      icon: 'zap' as const,
    },
    {
      id: 'option-3',
      title: 'Enterprise Plan',
      description: 'Full-scale solution for large organizations',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
      icon: 'globe' as const,
    },
  ];

  const handleOptionSelect = async (optionId: string) => {
    setLocalSelected(optionId);
    setOption(optionId);
    toast.success('Plan selected successfully!', {
      description: 'Your configuration has been saved.',
    });
    
    // Here you would typically submit the complete flow data
    // await apiService.submitOption({ selectedOption: optionId });
    
    // Reset the flow and navigate to dashboard or home
    setTimeout(() => {
      reset();
      navigate('/');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/threads');
  };

  const handleBackToDashboard = () => {
    reset();
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 py-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Choose Your Plan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {optionData.map((option) => (
            <OptionCard
              key={option.id}
              id={option.id}
              title={option.title}
              description={option.description}
              gradient={option.gradient}
              icon={option.icon}
              selected={localSelected === option.id}
              onClick={handleOptionSelect}
            />
          ))}
        </div>

        <div className="flex justify-between items-center pt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="rounded-2xl px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white shadow-xl border-0"
          >
            ← Back to Threads
          </Button>
          
          <Button
            onClick={handleBackToDashboard}
            className="rounded-2xl px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white shadow-xl transition-all hover:scale-105"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OptionsPage;
