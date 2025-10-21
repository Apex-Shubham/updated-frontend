import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import OptionCard from '@/components/OptionCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useFlowStore } from '@/store/flowStore';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const OptionsPage = () => {
  const navigate = useNavigate();
  const { selectedOption, setOption, reset, analysisResults, selectedThreads } = useFlowStore();
  const [localSelected, setLocalSelected] = useState<string | null>(selectedOption);
  const [hasAnalysisResults, setHasAnalysisResults] = useState(false);

  useEffect(() => {
    setHasAnalysisResults(!!analysisResults);
  }, [analysisResults]);

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

  // Render analysis results if available
  const renderAnalysisResults = () => {
    if (!analysisResults) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No analysis results available</p>
          <p className="text-slate-500 text-sm mt-2">Please select threads from the previous page</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Analysis Complete!</h3>
          </div>
          <p className="text-slate-300 ml-11">
            Successfully analyzed {selectedThreads.length} Reddit thread{selectedThreads.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Analysis Results Card */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            📊 Analysis Results
          </h3>
          
          <div className="space-y-4">
            {/* Render the analysis data */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-x-auto max-h-[600px] overflow-y-auto">
                {JSON.stringify(analysisResults, null, 2)}
              </pre>
            </div>
          </div>
        </Card>

        {/* Selected Threads Info */}
        {selectedThreads.length > 0 && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Analyzed Threads</h4>
            <div className="space-y-3">
              {selectedThreads.map((thread, index) => (
                <div
                  key={thread.id}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">{index + 1}.</span>
                    <div className="flex-1">
                      <h5 className="text-white font-medium line-clamp-2">{thread.title}</h5>
                      <p className="text-slate-400 text-sm mt-1">r/{thread.subreddit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            {hasAnalysisResults ? 'Pain Points Analysis' : 'Choose Your Plan'}
          </h2>
          {hasAnalysisResults && (
            <p className="text-center text-slate-400">
              Review the analysis results from your selected Reddit threads
            </p>
          )}
        </motion.div>
        
        {hasAnalysisResults ? (
          renderAnalysisResults()
        ) : (
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
        )}

        <div className="flex justify-between items-center pt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-2xl px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white shadow-xl border-0 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Threads
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBackToDashboard}
              className="rounded-2xl px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl transition-all"
            >
              {hasAnalysisResults ? 'New Analysis' : 'Back to Dashboard'}
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OptionsPage;
