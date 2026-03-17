import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Menu, X, Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside
        className={cn(
          "bg-card border-r border-border transition-all duration-300 ease-in-out z-20",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            {isSidebarOpen && <span className="font-bold text-xl truncate">App Name</span>}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      isSidebarOpen ? "mr-3" : "mx-auto",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                    size={20}
                  />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-4">
                <span className="flex items-center"><Monitor size={12} className="mr-1" /> Desktop</span>
                <span>/</span>
                <span className="flex items-center"><Smartphone size={12} className="mr-1" /> Menubar</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto relative">
        <div className="p-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
