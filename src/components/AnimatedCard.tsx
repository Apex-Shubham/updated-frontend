import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
}

export const AnimatedCard = ({ 
  children, 
  delay = 0, 
  hover = true,
  className,
  ...props 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.23, 1, 0.32, 1] // Custom easing
      }}
      whileHover={hover ? { 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      className={cn(
        'backdrop-blur-xl bg-white/90 border border-white/20',
        'shadow-xl hover:shadow-2xl transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = motion.button;

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

