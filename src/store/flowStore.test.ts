import { describe, it, expect, beforeEach } from 'vitest';
import { useFlowStore } from './flowStore';

describe('flowStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useFlowStore.getState().reset();
  });

  it('initializes with default values', () => {
    const state = useFlowStore.getState();
    
    expect(state.marketId).toBeNull();
    expect(state.selectedCards).toEqual([]);
    expect(state.threadConfig).toEqual([]);
    expect(state.selectedOption).toBeNull();
  });

  it('sets market id', () => {
    useFlowStore.getState().setMarket('market-123');
    
    expect(useFlowStore.getState().marketId).toBe('market-123');
  });

  it('sets selections', () => {
    const selections = ['card-1', 'card-2', 'card-3'];
    useFlowStore.getState().setSelections(selections);
    
    expect(useFlowStore.getState().selectedCards).toEqual(selections);
  });

  it('toggles selection on', () => {
    useFlowStore.getState().toggleSelection('card-1');
    
    expect(useFlowStore.getState().selectedCards).toContain('card-1');
  });

  it('toggles selection off', () => {
    useFlowStore.getState().setSelections(['card-1', 'card-2']);
    useFlowStore.getState().toggleSelection('card-1');
    
    expect(useFlowStore.getState().selectedCards).not.toContain('card-1');
    expect(useFlowStore.getState().selectedCards).toContain('card-2');
  });

  it('sets thread config', () => {
    const config = [
      { threadId: 'thread-1', selectedOptions: ['opt-1'] },
      { threadId: 'thread-2', selectedOptions: ['opt-2', 'opt-3'] },
    ];
    
    useFlowStore.getState().setThreadConfig(config);
    
    expect(useFlowStore.getState().threadConfig).toEqual(config);
  });

  it('sets option', () => {
    useFlowStore.getState().setOption('option-123');
    
    expect(useFlowStore.getState().selectedOption).toBe('option-123');
  });

  it('resets store to initial state', () => {
    // Set some values
    useFlowStore.getState().setMarket('market-123');
    useFlowStore.getState().setSelections(['card-1', 'card-2']);
    useFlowStore.getState().setOption('option-123');
    
    // Reset
    useFlowStore.getState().reset();
    
    // Check all values are reset
    const state = useFlowStore.getState();
    expect(state.marketId).toBeNull();
    expect(state.selectedCards).toEqual([]);
    expect(state.threadConfig).toEqual([]);
    expect(state.selectedOption).toBeNull();
  });
});

