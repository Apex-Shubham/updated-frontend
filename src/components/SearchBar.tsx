import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const SearchBar = ({ value, onChange, onVoiceClick, onFocus, onBlur, onSubmit }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <Search className="h-5 w-5" />
      </div>
      <Input
        id="search-input"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="pl-14 pr-14 h-14 rounded-full bg-white shadow-xl border-0 text-base transition-all hover:shadow-2xl focus:shadow-2xl focus:ring-2 focus:ring-blue-500 focus:shadow-blue-500/50"
        aria-label="Search input"
      />
      <button
        type="button"
        onClick={onVoiceClick}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-all hover:scale-110"
        aria-label="Voice search"
      >
        <Mic className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
