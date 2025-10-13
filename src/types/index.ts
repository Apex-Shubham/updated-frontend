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
  message: string;
  data: {
    text: string;
  };
  status: 'success' | 'error';
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
  message: string;
  data: {
    posts: RedditPost[];
    total: number;
    query: string;
  };
  status: 'success' | 'error';
}
