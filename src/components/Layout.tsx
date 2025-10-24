import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isSettingsPage = location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full shadow-xl">
              <h1 className="text-xl font-bold text-white tracking-wide">DBAAS</h1>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/settings">
              <Button 
                variant={isSettingsPage ? "default" : "ghost"} 
                size="sm" 
                className={`rounded-xl ${
                  isSettingsPage 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
