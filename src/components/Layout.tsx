import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="py-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full shadow-xl">
            <h1 className="text-xl font-bold text-white tracking-wide">DBAAS</h1>
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
