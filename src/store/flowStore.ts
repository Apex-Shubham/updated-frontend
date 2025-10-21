import { create } from 'zustand';
import { ThreadConfig, RedditPost } from '@/types';

interface FlowStore {
  marketId: string | null;
  selectedCards: string[];
  threadConfig: ThreadConfig[];
  selectedOption: string | null;
  selectedThreads: RedditPost[];
  analysisResults: any;
  searchQuery: string | null;
  redditPosts: RedditPost[];
  setMarket: (marketId: string) => void;
  setSelections: (selections: string[]) => void;
  toggleSelection: (id: string) => void;
  setThreadConfig: (config: ThreadConfig[]) => void;
  setOption: (option: string) => void;
  setSelectedThreads: (threads: RedditPost[]) => void;
  setAnalysisResults: (results: any) => void;
  setSearchQuery: (query: string) => void;
  setRedditPosts: (posts: RedditPost[]) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowStore>((set) => ({
  marketId: null,
  selectedCards: [],
  threadConfig: [],
  selectedOption: null,
  selectedThreads: [],
  analysisResults: null,
  searchQuery: null,
  redditPosts: [],
  setMarket: (marketId) => set({ marketId }),
  setSelections: (selections) => set({ selectedCards: selections }),
  toggleSelection: (id) =>
    set((state) => ({
      selectedCards: state.selectedCards.includes(id)
        ? state.selectedCards.filter((cardId) => cardId !== id)
        : [...state.selectedCards, id],
    })),
  setThreadConfig: (config) => set({ threadConfig: config }),
  setOption: (option) => set({ selectedOption: option }),
  setSelectedThreads: (threads) => set({ selectedThreads: threads }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setRedditPosts: (posts) => set({ redditPosts: posts }),
  reset: () =>
    set({
      marketId: null,
      selectedCards: [],
      threadConfig: [],
      selectedOption: null,
      selectedThreads: [],
      analysisResults: null,
      searchQuery: null,
      redditPosts: [],
    }),
}));
