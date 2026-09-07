import { Link } from 'wouter';
import { MOCK_BLUEPRINTS, MOCK_CONTROLS } from '@/lib/data';
import { ArrowRight, Activity, ShieldCheck, Server, AlertCircle } from 'lucide-react';

export default function Home() {
  const recentBlueprints = MOCK_BLUEPRINTS.slice(0, 3);
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Workspace Overview
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Central repository for approved security architectures, control implementations, and compliance mappings.
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-muted-foreground mb-3">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Active Blueprints</span>
          </div>
          <div className="text-3xl font-bold text-foreground font-mono">{MOCK_BLUEPRINTS.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-muted-foreground mb-3">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">Controls Mapped</span>
          </div>
          <div className="text-3xl font-bold text-foreground font-mono">{MOCK_CONTROLS.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-muted-foreground mb-3">
            <Server className="h-5 w-5 text-sidebar-primary" />
            <span className="text-sm font-medium">Infrastructure Patterns</span>
          </div>
          <div className="text-3xl font-bold text-foreground font-mono">12</div>
        </div>
        <div className="bg-card border border-destructive/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/5 rounded-bl-full"></div>
          <div className="flex items-center gap-3 text-muted-foreground mb-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium">Review Needed</span>
          </div>
          <div className="text-3xl font-bold text-foreground font-mono">2</div>
        </div>
      </section>

      {/* Recently Updated Blueprints */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Recently Updated Blueprints</h2>
          <Link href="/blueprints" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
            View Catalog <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlueprints.map((bp) => (
            <Link key={bp.id} href={`/blueprints/${bp.id}`} className="group block h-full">
              <div className="bg-card border border-border hover:border-primary/50 hover:shadow-md rounded-xl p-6 h-full flex flex-col transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                    {bp.category}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">v{bp.version}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {bp.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {bp.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {bp.compliance.slice(0,2).map(c => (
                    <span key={c} className="px-2 py-1 rounded bg-muted text-xs font-medium text-muted-foreground">
                      {c}
                    </span>
                  ))}
                  {bp.compliance.length > 2 && (
                    <span className="px-2 py-1 rounded bg-muted text-xs font-medium text-muted-foreground">
                      +{bp.compliance.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
