export interface Market {
  id: string;
  name: string;
  hasSubMenu?: boolean;
}

export interface Selection {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface ThreadConfig {
  threadId: string;
  selectedOptions: string[];
}

export interface Option {
  id: string;
  title: string;
  description?: string;
}

export interface FlowState {
  marketId: string | null;
  selectedCards: string[];
  threadConfig: ThreadConfig[];
  selectedOption: string | null;
}

// Search API types
export interface SearchResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      text: string;
    };
    status: string;
    streaming: boolean;
  };
}

export interface MarketIdeasResponse {
  [coreMarket: string]: {
    [category: string]: {
      [subcategory: string]: {
        [niche: string]: {
          [subNiche: string]: Record<string, never>;
        };
      };
    };
  };
}

// Reddit API types
export interface RedditPost {
  id: string;
  rank: number;
  title: string;
  url: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  preview: string;
  score: number;
  created_utc: string;
}

export interface RedditSearchResponse {
  success: boolean;
  message: string;
  data: {
    market: string;
    total_urls_found: number;
    posts_scraped: number;
    posts_ranked: number;
    ranked_urls: string[];
    top_posts: RedditPost[];
  };
}

// Reddit scrape request/response types
export interface RedditScrapeRequest {
  urls: string[];
}

export interface RedditScrapeResponse {
  success: boolean;
  message: string;
  data: any; // Backend will return scraped data structure
}

// Pain points analysis types
export interface PainPointsAnalysisRequest {
  data: any; // Scraped data from reddit/scrape
}

export interface PainPointsAnalysisResponse {
  success: boolean;
  message: string;
  data: any; // Analysis results
}

// Trending topics types
export interface TrendingTopic {
  id: string;
  category: 'Health' | 'Wealth' | 'Relationships';
  trend: string;
  volume: string;
  title: string;
}

// Backend API response structure
export interface BackendTrendingTopic {
  topic: string;
  volume: string;
  growth: string;
  description: string;
  url: string;
  time_period: string;
  id: number;
  created_at: string;
}

export interface TrendingTopicsResponse {
  status: string;
  message: string;
  data: BackendTrendingTopic[];
  count: number;
  timestamp: string;
}

// Analysis Results Types
export interface PainPoint {
  heading: string;
  summary: string;
  quotes: string[];
  frequency_intensity: string;
}

export interface PainPointCategory {
  category_name: string;
  pain_points: PainPoint[];
}

export interface PainPointsData {
  summary: string;
  categories: PainPointCategory[];
  priority_ranking: Array<{
    rank: number;
    pain_point: string;
    frequency: string;
    intensity: string;
    specificity: string;
    solvability: string;
    reasoning: string;
  }>;
}

export interface Solution {
  name: string;
  explanation: string;
  key_features: string[];
  value_proposition: string;
  business_model: string;
  pain_points_addressed: string[];
}

export interface FrameworkSolution {
  framework_name: string;
  solutions: Solution[];
}

export interface OpportunityAssessment {
  rank: number;
  solution_name: string;
  market_size_potential: string;
  competitive_advantage: string;
  implementation_feasibility: string;
  category_dominance_potential: string;
}

export interface MarketGapsData {
  executive_summary: string;
  framework_solutions: FrameworkSolution[];
  opportunity_assessment: OpportunityAssessment[];
}

export interface AnalysisResults {
  pain_points: PainPointsData;
  market_gaps: MarketGapsData;
}
