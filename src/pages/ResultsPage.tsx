import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ChevronDown, ChevronRight, Loader2, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketIdeasResponse } from '@/types';

interface NestedTopic {
  [key: string]: NestedTopic | Record<string, never>;
}

interface CategoryData {
  name: string;
  subTopics: {
    name: string;
    children: string[];
  }[];
}

interface ParsedResult {
  mainTopic: string;
  childTopic: string;
  categories: CategoryData[];
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [parsedResults, setParsedResults] = useState<ParsedResult | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubTopics, setExpandedSubTopics] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSubTopics, setSelectedSubTopics] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Parse the nested API response
  useEffect(() => {
    try {
      const storedResults = sessionStorage.getItem('searchResults');
      const storedQuery = sessionStorage.getItem('searchQuery');

      if (storedResults && storedQuery === searchQuery) {
        const marketIdeas: MarketIdeasResponse = JSON.parse(storedResults);
        const parsed = parseMarketIdeas(marketIdeas);
        setParsedResults(parsed);
        setHasError(false);
      } else {
        setHasError(true);
        toast.error('No search results found. Please try searching again.', {
          icon: '⚠️',
        });
      }
    } catch (error) {
      console.error('Error loading search results:', error);
      setHasError(true);
      toast.error('Failed to load search results', {
        icon: '❌',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Parse the nested structure: Main Topic → Child Topic → Categories → Sub-topics
  const parseMarketIdeas = (data: MarketIdeasResponse): ParsedResult | null => {
    // Get the first main topic (e.g., "Health", "Wealth", "Relationships")
    const mainTopicKey = Object.keys(data)[0];
    if (!mainTopicKey) return null;

    const mainTopicData = data[mainTopicKey];
    
    // Get the first child topic (e.g., "Health Drinks")
    const childTopicKey = Object.keys(mainTopicData)[0];
    if (!childTopicKey) return null;

    const categories = mainTopicData[childTopicKey];
    
    // Parse categories (third level)
    const categoryList: CategoryData[] = [];
    
    Object.entries(categories).forEach(([categoryName, subTopics]) => {
      const subTopicsList: { name: string; children: string[] }[] = [];
      
      // Parse sub-topics (fourth level and beyond)
      Object.entries(subTopics as NestedTopic).forEach(([subTopicName, children]) => {
        const childrenList = Object.keys(children);
        subTopicsList.push({
          name: subTopicName,
          children: childrenList,
        });
      });
      
      categoryList.push({
        name: categoryName,
        subTopics: subTopicsList,
      });
    });

    return {
      mainTopic: mainTopicKey,
      childTopic: childTopicKey,
      categories: categoryList,
    };
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const toggleSubTopic = (subTopicId: string) => {
    setExpandedSubTopics((prev) => {
      const next = new Set(prev);
      if (next.has(subTopicId)) {
        next.delete(subTopicId);
      } else {
        next.add(subTopicId);
      }
      return next;
    });
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const handleSubTopicSelect = (categoryName: string, subTopicName: string) => {
    const id = `${categoryName}-${subTopicName}`;
    setSelectedSubTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleProceed = () => {
    const allSelected = [
      ...Array.from(selectedCategories),
      ...Array.from(selectedSubTopics).map(id => id.split('-').pop() || '')
    ].filter(Boolean);
    
    if (allSelected.length === 0) {
      toast.error('Please select at least one item', { icon: '⚠️' });
      return;
    }
    
    // Navigate to threads with all selected items as a combined query
    const query = allSelected.join(', ');
    toast.success(`Searching Reddit for ${allSelected.length} topic${allSelected.length > 1 ? 's' : ''}!`, { 
      icon: '🔍' 
    });
    
    setTimeout(() => {
      navigate(`/threads?query=${encodeURIComponent(query)}`);
    }, 300);
  };

  const handleBack = () => {
    navigate('/');
  };

  const formatTitle = (query: string) => {
    return query
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = searchQuery ? formatTitle(searchQuery) : 'Search Results';

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto space-y-6 py-8"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </motion.div>

        <Breadcrumb />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {pageTitle}
          </h1>
          {parsedResults && (
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-lg">{parsedResults.mainTopic}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-lg font-semibold text-cyan-400">
                {parsedResults.childTopic}
              </span>
            </div>
          )}
          <p className="text-slate-400 text-base">
            {parsedResults ? `${parsedResults.categories.length} categories found` : 'Loading results...'}
          </p>
          {(selectedCategories.size > 0 || selectedSubTopics.size > 0) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full border border-cyan-500/30 mt-2"
            >
              <Check className="h-4 w-4" />
              {selectedCategories.size + selectedSubTopics.size} selected
            </motion.div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
            <p className="text-slate-400 text-lg">Loading results...</p>
          </motion.div>
        )}

        {/* Error State */}
        {hasError && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-4">
              Failed to load search results
            </p>
            <Button
              onClick={handleBack}
              className="rounded-full px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Back to Search
            </Button>
          </motion.div>
        )}

        {/* Results Grid - Categories as Cards */}
        {!isLoading && !hasError && parsedResults && (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
          >
            {parsedResults.categories.map((category) => {
              const isExpanded = expandedCategories.has(category.name);
              const isSelected = selectedCategories.has(category.name);

              return (
                <motion.div
                  key={category.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="h-fit"
                >
                  <Card className={cn(
                    "bg-slate-800/50 backdrop-blur-sm transition-all h-full cursor-pointer",
                    isSelected 
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20" 
                      : "border-slate-700 hover:border-cyan-500/50"
                  )}>
                    <CardHeader 
                      onClick={() => handleCategorySelect(category.name)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-white mb-2 pr-4">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            {category.subTopics.length} sub-topic{category.subTopics.length !== 1 ? 's' : ''}
                          </CardDescription>
                        </div>
                        
                        {/* Selection Checkbox and Expand Button */}
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all',
                            isSelected
                              ? 'bg-cyan-500 border-cyan-500 text-white'
                              : 'bg-slate-700 border-slate-500 hover:border-cyan-400'
                          )}>
                            {isSelected && <Check className="h-5 w-5" />}
                          </div>
                          
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category.name);
                            }}
                            className="cursor-pointer flex-shrink-0"
                          >
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          </motion.div>
                        </div>
                      </div>
                    </CardHeader>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 space-y-3">
                            {category.subTopics.map((subTopic) => {
                              const subTopicId = `${category.name}-${subTopic.name}`;
                              const isSubTopicExpanded = expandedSubTopics.has(subTopicId);
                              const isSubTopicSelected = selectedSubTopics.has(subTopicId);

                              return (
                                <div
                                  key={subTopic.name}
                                  className="border-l-2 border-cyan-500/30 pl-4 space-y-2"
                                >
                                  {/* Sub-topic - now selectable */}
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSubTopicSelect(category.name, subTopic.name);
                                    }}
                                    className={cn(
                                      'flex items-center gap-2 font-medium group cursor-pointer p-2 rounded-lg transition-all',
                                      isSubTopicSelected 
                                        ? 'bg-cyan-500/10 text-cyan-200' 
                                        : 'text-cyan-300 hover:bg-slate-700/50'
                                    )}
                                  >
                                    <div className={cn(
                                      'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                                      isSubTopicSelected 
                                        ? 'bg-cyan-500 border-cyan-500' 
                                        : 'border-slate-500'
                                    )}>
                                      {isSubTopicSelected && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className="text-sm flex-1">{subTopic.name}</span>
                                    
                                    {subTopic.children.length > 0 && (
                                      <motion.div
                                        animate={{ rotate: isSubTopicExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleSubTopic(subTopicId);
                                        }}
                                      >
                                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                      </motion.div>
                                    )}
                                  </div>

                                  {/* Nested children */}
                                  <AnimatePresence initial={false}>
                                    {isSubTopicExpanded && subTopic.children.length > 0 && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden pl-6 space-y-1"
                                      >
                                        {subTopic.children.map((child) => (
                                          <div
                                            key={child}
                                            className="flex items-center gap-2 text-slate-400 text-sm py-1"
                                          >
                                            <span className="text-slate-600">•</span>
                                            <span className="hover:text-slate-300 transition-colors">
                                              {child}
                                            </span>
                                          </div>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !hasError && parsedResults && parsedResults.categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-400 text-lg mb-4">
              No categories found in the results
            </p>
            <Button
              onClick={handleBack}
              className="rounded-full px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Back to Search
            </Button>
          </motion.div>
        )}

        {/* Action Buttons */}
        {!isLoading && !hasError && parsedResults && parsedResults.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center pt-8 pb-4"
          >
            <Button
              onClick={handleBack}
              variant="outline"
              className="rounded-2xl px-8 py-6 bg-slate-700 hover:bg-slate-600 text-white shadow-xl border-0"
            >
              New Search
            </Button>

            <Button
              onClick={handleProceed}
              disabled={selectedCategories.size === 0 && selectedSubTopics.size === 0}
              className={cn(
                "rounded-2xl px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-xl transition-all",
                (selectedCategories.size === 0 && selectedSubTopics.size === 0) && "opacity-50 cursor-not-allowed"
              )}
            >
              Search Reddit ({selectedCategories.size + selectedSubTopics.size} selected) →
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ResultsPage;

