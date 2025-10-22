import axios from 'axios';
import { RedditSearchResponse, RedditPost } from '@/types';

// Create axios instance for Reddit API
const redditApi = axios.create({
  baseURL: import.meta.env.VITE_REDDIT_API_URL || 'https://dbaas-api.apexneural.cloud/dbas/api',
  timeout: 300000, // 300 seconds for Reddit scraping
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
redditApi.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`🔍 Reddit API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('Reddit API Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
redditApi.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ Reddit API Response: ${response.status}`, response.data);
    }
    return response;
  },
  (error) => {
    console.error('Reddit API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const redditApiService = {
  /**
   * Search Reddit for posts related to a query
   */
  searchReddit: async (query: string, maxResults: number = 10): Promise<RedditPost[]> => {
    try {
      // Validate input
      if (!query || typeof query !== 'string') {
        throw new Error('Invalid search query');
      }

      const sanitizedQuery = query.trim();
      if (sanitizedQuery.length === 0) {
        throw new Error('Search query cannot be empty');
      }

      if (sanitizedQuery.length > 200) {
        throw new Error('Search query is too long (max 200 characters)');
      }

      // Call the Reddit API
      const { data } = await redditApi.post<RedditSearchResponse>('/reddit/complete-research', {
        market: sanitizedQuery,
        num_results: Math.min(maxResults, 100), // Cap at 100
        top_n: 10
      });

      // Check response status
      if (!data.success) {
        throw new Error(data.message || 'Failed to search Reddit');
      }

      // Debug: Log the actual Reddit API response structure
      console.log('🔍 Reddit API response data:', JSON.stringify(data.data, null, 2));
      
      // Return the top_posts from the complete research response
      const posts = data.data.top_posts || [];
      
      // Transform the posts to match the expected frontend format
      const transformedPosts = posts.map((post, index) => ({
        id: post.id || `post_${index}`,
        rank: post.rank || index + 1,
        title: post.title || 'No title',
        url: post.url || '#',
        subreddit: post.subreddit || 'unknown',
        upvotes: post.upvotes || post.score || 0,
        comments: post.comments || post.num_comments || 0,
        preview: post.preview || post.selftext || 'No preview available',
        score: post.score || post.upvotes || 0,
        created_utc: post.created_utc || Date.now() / 1000
      }));
      
      return transformedPosts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        console.error('Reddit search error:', message);
        throw new Error(message);
      }
      throw error;
    }
  },

  /**
   * Check if Reddit API is healthy
   */
  healthCheck: async (): Promise<boolean> => {
    try {
      const { data } = await redditApi.get('/health');
      return data.status === 'success';
    } catch (error) {
      console.error('Reddit API health check failed:', error);
      return false;
    }
  },
};

