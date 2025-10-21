import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Market, Selection, ThreadConfig, Option, SearchResponse, MarketIdeasResponse } from '@/types';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://dbaas-api.apexneural.cloud/dbas/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create separate axios instance for backend search API
const searchApi = axios.create({
  baseURL: import.meta.env.VITE_SEARCH_API_URL || 'https://dbaas-api.apexneural.cloud/dbas/api',
  timeout: 30000, // Longer timeout for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth tokens, logging, etc.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`📥 ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = (error.response.data as { message?: string })?.message || error.message;
      
      switch (status) {
        case 401:
          console.error('Unauthorized - redirecting to login');
          // Clear auth token
          localStorage.removeItem('auth_token');
          // Redirect to login or dispatch auth action
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found:', message);
          break;
        case 500:
          console.error('Server error:', message);
          break;
        default:
          console.error(`API Error (${status}):`, message);
      }
      
      return Promise.reject({
        status,
        message,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received');
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      });
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message,
        data: null,
      });
    }
  }
);

// Helper function to handle API errors
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw error.response?.data || error.message;
  }
  throw error;
};

export const apiService = {
  // Market endpoints
  getMarkets: async (): Promise<Market[]> => {
    try {
      const { data } = await api.get<Market[]>('/markets');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  searchMarkets: async (query: string): Promise<Market[]> => {
    try {
      // Sanitize query input
      const sanitizedQuery = encodeURIComponent(query.trim());
      const { data } = await api.get<Market[]>(`/search?query=${sanitizedQuery}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getMarketOptions: async (marketId: string): Promise<Selection[]> => {
    try {
      const { data } = await api.get<Selection[]>(`/market/${marketId}/options`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Selection endpoints
  getSelections: async (marketId: string): Promise<Selection[]> => {
    try {
      const { data } = await api.get<Selection[]>(`/selections?marketId=${marketId}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  submitSelections: async (marketId: string, selectedIds: string[]): Promise<void> => {
    try {
      await api.post('/selections', { marketId, selectedIds });
    } catch (error) {
      handleApiError(error);
    }
  },

  // Thread endpoints
  getThreads: async (): Promise<unknown> => {
    try {
      const { data } = await api.get('/threads');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  submitThreadConfig: async (config: ThreadConfig[]): Promise<void> => {
    try {
      await api.post('/threads/configure', { config });
    } catch (error) {
      handleApiError(error);
    }
  },

  // Options endpoints
  getOptions: async (configId?: string): Promise<Option[]> => {
    try {
      const { data } = await api.get<Option[]>(`/options${configId ? `?configId=${configId}` : ''}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  submitOption: async (submitData: {
    marketId: string;
    selectedCards: string[];
    threadConfig: ThreadConfig[];
    selectedOption: string;
  }): Promise<void> => {
    try {
      await api.post('/options/select', submitData);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Search/Generate endpoint for market ideas
  searchMarketIdeas: async (topic: string): Promise<MarketIdeasResponse> => {
    try {
      // Validate and sanitize input
      if (!topic || typeof topic !== 'string') {
        throw new Error('Invalid search topic');
      }

      const sanitizedTopic = topic.trim();
      if (sanitizedTopic.length === 0) {
        throw new Error('Search topic cannot be empty');
      }

      if (sanitizedTopic.length > 500) {
        throw new Error('Search topic is too long (max 500 characters)');
      }

      // Log the request in development
      if (import.meta.env.DEV) {
        console.log('🔍 Searching for market ideas:', sanitizedTopic);
      }

      // Call the backend pain points analysis endpoint
      const { data } = await searchApi.post<SearchResponse>('/market-ideas/generate/', {
        post: {
          title: sanitizedTopic,
          selftext: sanitizedTopic,
          author: "user",
          score: 0
        },
        comments: [],
        total_comments: 0
      });

      // Check response status
      if (!data.success) {
        throw new Error(data.message || 'Failed to generate market ideas');
      }

      // Extract the text data from the response
      const textData = data.data?.data?.text;
      
      if (!textData) {
        throw new Error('No market ideas data received from backend');
      }

      // Debug: Log the actual backend response structure
      if (import.meta.env.DEV) {
        console.log('🔍 Backend response:', data);
      }

      // Parse the JSON string from the text field
      let parsedData: MarketIdeasResponse;
      try {
        parsedData = JSON.parse(textData);
      } catch (parseError) {
        console.error('Failed to parse market ideas JSON:', parseError);
        throw new Error('Invalid market ideas format received from backend');
      }
      
      // Log success in development
      if (import.meta.env.DEV) {
        console.log('✅ Market ideas received:', parsedData);
      }

      return parsedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        console.error('Search API error:', message);
        throw new Error(message);
      }
      throw error;
    }
  },
};
