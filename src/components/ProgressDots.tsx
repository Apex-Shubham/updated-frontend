import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps?: number;
}

const stepLabels = ['Search', 'Select', 'Configure', 'Choose'];

const ProgressDots = ({ currentStep, totalSteps = 4 }: ProgressDotsProps) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex flex-col items-center gap-2 group">
            <motion.div
              initial={false}
              animate={{
                width: isActive ? 32 : 8,
                backgroundColor: isActive || isCompleted ? '#3b82f6' : '#475569',
              }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1]
              }}
              className={cn(
                'h-2 rounded-full relative overflow-hidden',
                (isActive || isCompleted) && 'shadow-lg shadow-blue-500/50'
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'linear',
                  }}
                />
              )}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
              className={cn(
                'text-xs font-medium transition-colors',
                isActive ? 'text-blue-400' : 'text-slate-500'
              )}
            >
              {stepLabels[index]}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressDots;

