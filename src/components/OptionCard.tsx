import { Database, Zap, Globe, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  id: string;
  title: string;
  description: string;
  gradient: string;
  icon: 'database' | 'zap' | 'globe';
  selected: boolean;
  onClick: (id: string) => void;
  className?: string;
}

const getIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'database':
      return Database;
    case 'zap':
      return Zap;
    case 'globe':
      return Globe;
    default:
      return Database;
  }
};

const OptionCard = ({ id, title, description, gradient, icon, selected, onClick, className }: OptionCardProps) => {
  const Icon = getIcon(icon);
  
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'bg-white rounded-3xl p-8 min-h-[400px] cursor-pointer transition-all duration-300 shadow-2xl',
        'hover:scale-105 flex flex-col',
        selected && 'ring-4 ring-blue-300 ring-offset-4',
        className
      )}
    >
      {/* Icon Area with Gradient */}
      <div className={cn(
        'aspect-square w-full rounded-2xl flex items-center justify-center mb-6',
        gradient
      )}>
        <Icon className="h-20 w-20 text-white" />
      </div>
      
      {/* Card Info */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default OptionCard;
