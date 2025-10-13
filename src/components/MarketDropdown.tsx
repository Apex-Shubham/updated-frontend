import { Heart, Wallet, Users, ChevronRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Badge {
  text: string;
  icon: LucideIcon;
  color: string;
}

interface MarketItem {
  id: string;
  label: string;
  icon: 'health' | 'wealth' | 'relationships';
  hasArrow?: boolean;
  badge?: Badge;
}

interface MarketDropdownProps {
  items: MarketItem[];
  onSelect: (id: string) => void;
  selectedId?: string;
  badge?: Badge;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'health':
      return Heart;
    case 'wealth':
      return Wallet;
    case 'relationships':
      return Users;
    default:
      return Heart;
  }
};

const MarketDropdown = ({ items, onSelect, selectedId, badge }: MarketDropdownProps) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        const isSelected = selectedId === item.id;
        const BadgeIcon = badge?.icon;
        
        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all shadow-xl relative overflow-hidden group',
              isSelected
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
            )}
            whileHover={{ 
              scale: 1.02,
              boxShadow: isSelected 
                ? '0 0 30px rgba(59, 130, 246, 0.5)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient overlay on hover */}
            {!isSelected && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center relative z-10',
                isSelected ? 'bg-white/20' : 'bg-blue-500/10'
              )}
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className={cn('h-6 w-6', isSelected ? 'text-white' : 'text-blue-500')} />
            </motion.div>
            
            <span className="flex-1 text-left font-semibold relative z-10">{item.label}</span>
            
            {/* Badge */}
            {badge && BadgeIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 relative z-10',
                  'bg-gradient-to-r', badge.color, 'text-white shadow-lg'
                )}
              >
                <BadgeIcon className="h-3 w-3" />
                {badge.text}
              </motion.div>
            )}
            
            <ChevronRight 
              className={cn(
                'h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1',
                isSelected ? 'text-white' : 'text-slate-400'
              )} 
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default MarketDropdown;
