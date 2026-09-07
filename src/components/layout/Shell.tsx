import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { 
  Library, 
  LayoutTemplate, 
  ShieldCheck, 
  BookOpen, 
  Settings,
  Search,
  Bell,
  Hexagon
} from 'lucide-react';
import { type ReactNode } from 'react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Overview', icon: Hexagon },
  { href: '/blueprints', label: 'Blueprints', icon: LayoutTemplate },
  { href: '/controls', label: 'Control Matrix', icon: ShieldCheck },
  { href: '/resources', label: 'Resources', icon: BookOpen },
];

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
            <div className="h-8 w-8 bg-sidebar-primary rounded flex items-center justify-center text-sidebar-primary-foreground shadow-sm">
              <Library size={18} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm tracking-wide font-sans">
              BLUEPRINT STUDIO
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <div className="px-2 pb-4 text-xs font-mono text-sidebar-foreground/50 uppercase tracking-wider">
            Architecture
          </div>
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon size={18} className={cn("stroke-[2]", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors">
            <Settings size={18} className="text-sidebar-foreground/50" />
            Workspace Settings
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-border bg-card flex items-center justify-between px-6 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search blueprints, controls, resources..." 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent rounded-md text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-card"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
              JS
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}
