import { create } from 'zustand';
import { ThreadConfig } from '@/types';

interface FlowStore {
  marketId: string | null;
  selectedCards: string[];
  threadConfig: ThreadConfig[];
  selectedOption: string | null;
  setMarket: (marketId: string) => void;
  setSelections: (selections: string[]) => void;
  toggleSelection: (id: string) => void;
  setThreadConfig: (config: ThreadConfig[]) => void;
  setOption: (option: string) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowStore>((set) => ({
  marketId: null,
  selectedCards: [],
  threadConfig: [],
  selectedOption: null,
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
  reset: () =>
    set({
      marketId: null,
      selectedCards: [],
      threadConfig: [],
      selectedOption: null,
    }),
}));
