import { useState } from 'react';
import { Link } from 'wouter';
import { MOCK_BLUEPRINTS } from '@/lib/data';
import { Search, Filter, Layers, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BlueprintCatalog() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_BLUEPRINTS.map(b => b.category)))];

  const filtered = MOCK_BLUEPRINTS.filter(bp => {
    const matchesSearch = bp.title.toLowerCase().includes(search.toLowerCase()) || 
                          bp.description.toLowerCase().includes(search.toLowerCase()) ||
                          bp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || bp.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Architecture Catalog</h1>
          <p className="text-muted-foreground max-w-xl">
            Browse and clone approved security architectures for your projects. All blueprints map directly to enterprise controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all shadow-sm">
            Create Blueprint
          </button>
        </div>
      </header>

      {/* Filters & Search Bar */}
      <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shrink-0 shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="search" 
            placeholder="Search by name, tag, or compliance standard..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="flex items-center bg-background border border-border rounded-md p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === cat 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-border hidden md:block"></div>

          <div className="flex items-center bg-background border border-border rounded-md p-1 hidden md:flex">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1.5 rounded", view === 'grid' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 rounded", view === 'list' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto pb-12">
        {filtered.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <Layers size={48} className="mb-4 text-border" />
            <p className="text-lg font-medium text-foreground">No blueprints found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className={cn(
            "grid gap-6",
            view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filtered.map(bp => (
              <Link key={bp.id} href={`/blueprints/${bp.id}`} className="group block">
                <div className={cn(
                  "bg-card border border-border hover:border-primary/50 hover:shadow-md rounded-xl transition-all duration-200",
                  view === 'grid' ? "p-6 flex flex-col h-full" : "p-4 flex items-center gap-6"
                )}>
                  <div className={cn("flex justify-between items-start", view === 'grid' ? "mb-4" : "w-1/4 shrink-0 flex-col gap-2")}>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider mb-2 inline-block">
                        {bp.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {bp.title}
                      </h3>
                    </div>
                    {view === 'grid' && (
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-semibold",
                        bp.complexity === 'High' ? "bg-destructive/10 text-destructive" :
                        bp.complexity === 'Medium' ? "bg-accent/10 text-accent" :
                        "bg-green-500/10 text-green-600"
                      )}>
                        {bp.complexity}
                      </span>
                    )}
                  </div>
                  
                  <p className={cn(
                    "text-sm text-muted-foreground",
                    view === 'grid' ? "line-clamp-3 mb-6 flex-1" : "flex-1 line-clamp-2"
                  )}>
                    {bp.description}
                  </p>
                  
                  <div className={cn(
                    "flex flex-wrap gap-2",
                    view === 'grid' ? "mt-auto" : "w-1/4 shrink-0 justify-end"
                  )}>
                    {view === 'list' && (
                      <div className="w-full flex justify-end mb-2">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          bp.complexity === 'High' ? "bg-destructive/10 text-destructive" :
                          bp.complexity === 'Medium' ? "bg-accent/10 text-accent" :
                          "bg-green-500/10 text-green-600"
                        )}>
                          {bp.complexity}
                        </span>
                      </div>
                    )}
                    {bp.tags.slice(0, view === 'grid' ? 3 : 2).map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-[11px] font-medium font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
