import { MOCK_BLUEPRINTS } from '@/lib/data';
import { Terminal, FileText, Code, Box, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Resources() {
  // Extract all resources from blueprints
  const allResources = MOCK_BLUEPRINTS.flatMap(bp => 
    bp.resources.map(r => ({ ...r, blueprintId: bp.id, blueprintTitle: bp.title }))
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'terraform': return <Terminal size={18} className="text-purple-500" />;
      case 'policy': return <Code size={18} className="text-blue-500" />;
      case 'runbook': return <FileText size={18} className="text-orange-500" />;
      default: return <Box size={18} className="text-primary" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col space-y-8">
      <header className="shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Resource Library</h1>
        <p className="text-muted-foreground max-w-xl">
          Reusable terraform modules, security policies as code, and operational runbooks extracted from approved blueprints.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allResources.map(resource => (
          <div key={resource.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all shadow-sm group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                {getIcon(resource.type)}
              </div>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded">
                {resource.type}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
              {resource.description}
            </p>
            
            <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>Origin Blueprint:</span>
                <Link href={`/blueprints/${resource.blueprintId}`} className="text-foreground font-medium hover:text-primary truncate ml-2">
                  {resource.blueprintTitle}
                </Link>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground rounded-md text-sm font-medium transition-colors">
                View Source <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Empty placeholder for UI balance */}
        <div className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center text-center text-muted-foreground min-h-[250px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer hover:border-primary/50 hover:bg-primary/5">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
            <span className="text-xl">+</span>
          </div>
          <h3 className="font-medium text-foreground mb-1">Submit Resource</h3>
          <p className="text-sm">Contribute a module to the library</p>
        </div>
      </div>
    </div>
  );
}
