import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SearchBar value="test query" onChange={vi.fn()} />);
    
    const input = screen.getByDisplayValue('test query');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when text is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'new search');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders voice search button', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    
    const voiceButton = screen.getByRole('button');
    expect(voiceButton).toBeInTheDocument();
  });

  it('calls onVoiceClick when voice button is clicked', async () => {
    const user = userEvent.setup();
    const handleVoiceClick = vi.fn();
    
    render(<SearchBar value="" onChange={vi.fn()} onVoiceClick={handleVoiceClick} />);
    
    const voiceButton = screen.getByRole('button');
    await user.click(voiceButton);
    
    expect(handleVoiceClick).toHaveBeenCalledOnce();
  });
});

