import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFlowStore } from '@/store/flowStore';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle2, Rocket, TrendingUp, Target, Zap } from 'lucide-react';
import { OpportunityAssessment } from '@/types';

const LandingPageCreationPage = () => {
  const navigate = useNavigate();
  const { analysisResults, reset } = useFlowStore();
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);

  if (!analysisResults || !analysisResults.market_gaps?.opportunity_assessment) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-20 text-center">
          <p className="text-slate-400 text-lg">No opportunities available</p>
          <Button onClick={() => navigate('/options')} className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  const opportunities = analysisResults.market_gaps.opportunity_assessment.slice(0, 3);

  const handleSelectOpportunity = (index: number) => {
    setSelectedOpportunity(index);
    const selectedOpp = opportunities[index];
    toast.success(`Selected: ${selectedOpp.solution_name}`, {
      icon: '🎯',
    });
  };

  const handleProceed = () => {
    if (selectedOpportunity === null) {
      toast.error('Please select an opportunity first');
      return;
    }
    
    toast.success('Creating your landing page...', {
      icon: '🚀',
    });
    
    // Here you would call the API to create the landing page
    // await apiService.createLandingPage(opportunities[selectedOpportunity]);
    
    // For now, navigate to next page or reset
    setTimeout(() => {
      reset();
      navigate('/');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/options');
  };

  const getCardIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Target className="h-8 w-8 text-yellow-400" />;
      case 2:
        return <TrendingUp className="h-8 w-8 text-blue-400" />;
      case 3:
        return <Zap className="h-8 w-8 text-purple-400" />;
      default:
        return <Rocket className="h-8 w-8 text-green-400" />;
    }
  };

  const getCardGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500';
      case 2:
        return 'from-blue-500 to-cyan-500';
      case 3:
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Landing Page Creation
          </h2>
          <p className="text-center text-slate-400 text-lg">
            Select an opportunity to create your landing page
          </p>
        </motion.div>

        {/* Three Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map((opportunity: OpportunityAssessment, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`relative p-6 rounded-2xl cursor-pointer transition-all h-full ${
                  selectedOpportunity === index
                    ? 'border-2 border-orange-500 bg-slate-800/70 shadow-lg shadow-orange-500/20'
                    : 'border border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
                onClick={() => handleSelectOpportunity(index)}
              >
                {/* Selection Badge */}
                {selectedOpportunity === index && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`bg-gradient-to-r ${getCardGradient(opportunity.rank)} text-white border-0`}>
                    Rank #{opportunity.rank}
                  </Badge>
                  {getCardIcon(opportunity.rank)}
                </div>

                {/* Solution Name */}
                <h3 className="text-xl font-bold text-white mb-4 min-h-[56px]">
                  {opportunity.solution_name}
                </h3>

                {/* Key Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Market Size</p>
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {opportunity.market_size_potential}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Implementation</p>
                    <p className="text-white text-sm font-medium">
                      {opportunity.implementation_feasibility}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Advantage</p>
                    <p className="text-white text-sm line-clamp-2">
                      {opportunity.competitive_advantage}
                    </p>
                  </div>
                </div>

                {/* Potential Badge */}
                <div className="border-t border-slate-700 pt-3">
                  <p className="text-slate-400 text-xs mb-1">Category Potential</p>
                  <Badge variant="outline" className="text-xs line-clamp-1">
                    {opportunity.category_dominance_potential}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-2xl px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white shadow-xl border-0 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Analysis
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleProceed}
              disabled={selectedOpportunity === null}
              className="rounded-2xl px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Rocket className="h-4 w-4" />
              Create Landing Page
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPageCreationPage;

