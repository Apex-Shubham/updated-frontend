import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const routeNames: Record<string, string> = {
  '/': 'Search',
  '/categories': 'Categories',
  '/results': 'Results',
  '/threads': 'Configure Threads',
  '/options': 'Choose Plan',
};

export const Breadcrumb = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Get dynamic breadcrumb name for categories/results pages
  const getDynamicName = (route: string) => {
    if (route === '/categories') {
      const category = searchParams.get('category');
      return category || 'Categories';
    }
    if (route === '/results') {
      const query = searchParams.get('q');
      return query || 'Results';
    }
    return routeNames[route];
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        to="/"
        className="flex items-center text-slate-400 hover:text-white transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {pathnames.map((_, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <motion.div
            key={routeTo}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
            {isLast ? (
              <span className="text-white font-medium">{getDynamicName(routeTo)}</span>
            ) : (
              <Link
                to={routeTo}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {getDynamicName(routeTo)}
              </Link>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
};

