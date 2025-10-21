import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useFlowStore } from '@/store/flowStore';
import { TrendingUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';

interface TrendingTopic {
  id: string;
  category: 'Health' | 'Wealth' | 'Relationships';
  trend: string;
  title: string;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const { setMarket, setSearchQuery: setStoredQuery } = useFlowStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      category: 'Health',
      trend: '+245%',
      title: 'AI Ethics in Healthcare',
    },
    {
      id: '2',
      category: 'Wealth',
      trend: '+189%',
      title: 'Crypto Tax Planning 2025',
    },
    {
      id: '3',
      category: 'Relationships',
      trend: '+167%',
      title: 'Remote Relationship Building',
    },
    {
      id: '4',
      category: 'Health',
      trend: '+134%',
      title: 'Biohacking for Longevity',
    },
    {
      id: '5',
      category: 'Wealth',
      trend: '+128%',
      title: 'Sustainable Investing',
    },
    {
      id: '6',
      category: 'Relationships',
      trend: '+112%',
      title: 'Digital Dating Safety',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'Wealth':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'Relationships':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query', {
        icon: '⚠️',
      });
      return;
    }

    // Show loading state
    setIsLoading(true);
    const loadingToast = toast.loading('Generating market ideas...', {
      icon: '🔍',
    });

    try {
      // Call the backend API to generate market ideas
      const marketIdeas = await apiService.searchMarketIdeas(searchQuery);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success(`Results ready for: ${searchQuery}`, {
        icon: '✅',
        style: {
          background: '#10b981',
          color: '#fff',
        },
        duration: 2000,
      });

      // Store the results in sessionStorage to pass to CategoriesPage
      sessionStorage.setItem('searchResults', JSON.stringify(marketIdeas));
      sessionStorage.setItem('searchQuery', searchQuery);
      setStoredQuery(searchQuery);

      // Navigate to results page with the search query
      setTimeout(() => {
        navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
      }, 300);

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate market ideas. Please try again.';
      
      toast.error(errorMessage, {
        icon: '❌',
        duration: 4000,
      });

      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (topic: TrendingTopic) => {
    // Map category to market ID
    const marketIdMap: Record<string, string> = {
      'Health': '1',
      'Wealth': '2',
      'Relationships': '3',
    };
    
    setMarket(marketIdMap[topic.category]);
    toast.success(`Exploring: ${topic.title}`, {
      icon: '🔥',
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
    
    setTimeout(() => {
      navigate(`/categories?category=${topic.category}`);
    }, 300);
  };

  const handleVoiceSearch = () => {
    toast('Voice search coming soon!', {
      icon: '🎤',
      duration: 2000,
    });
  };

  const handleViewMore = () => {
    toast('Loading more topics...', {
      icon: '📊',
      duration: 2000,
    });
  };

  // Add keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchFocused) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSearchFocused]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto space-y-8 py-8"
      >
        <Breadcrumb />
        
        
        {/* Title with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome to DBAAS
          </h1>
          <p className="text-slate-400 text-lg">
            Discover trending topics and choose your category
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div 
            className={cn(
              'transition-all duration-300',
              isSearchFocused && 'scale-[1.02]'
            )}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onVoiceClick={handleVoiceSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Loading indicator below search bar */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 right-0 top-full mt-4 flex items-center justify-center gap-3 text-cyan-400"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Generating market ideas with AI...</span>
            </motion.div>
          )}
        </motion.div>

        {/* Exploding Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 pt-8"
        >
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-white">Exploding Topics</h2>
          </div>

          {/* Topic Cards Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {trendingTopics.map((topic) => (
              <motion.div
                key={topic.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTopicClick(topic)}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 cursor-pointer transition-all hover:border-slate-600 group"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    getCategoryColor(topic.category)
                  )}>
                    {topic.category}
                  </span>
                  
                  {/* Trend Percentage */}
                  <span className="text-2xl font-bold text-green-400">
                    {topic.trend}
                  </span>
                </div>

                {/* Topic Title */}
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {topic.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center pt-4"
          >
            <Button
              onClick={handleViewMore}
              className="rounded-full px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              View More
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default SearchPage;