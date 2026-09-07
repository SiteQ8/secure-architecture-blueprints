import { useParams } from 'wouter';
import { MOCK_BLUEPRINTS, MOCK_CONTROLS } from '@/lib/data';
import { cn, formatDate } from '@/lib/utils';
import { 
  ArrowLeft, Download, Copy, LayoutTemplate, Shield, 
  Code2, Share2, Layers, GitCommit, CheckCircle2 
} from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function BlueprintDetail() {
  const { id } = useParams<{ id: string }>();
  const blueprint = MOCK_BLUEPRINTS.find(b => b.id === id);
  const [activeTab, setActiveTab] = useState<'architecture' | 'controls' | 'resources'>('architecture');

  if (!blueprint) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-2">Blueprint not found</h2>
        <Link href="/blueprints" className="text-primary hover:underline">Return to catalog</Link>
      </div>
    );
  }

  const controls = MOCK_CONTROLS.filter(c => blueprint.controlIds.includes(c.id));

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
              <Link href="/blueprints" className="hover:text-foreground flex items-center gap-1 transition-colors">
                <ArrowLeft size={16} /> Catalog
              </Link>
              <span>/</span>
              <span className="text-primary font-mono">{blueprint.id}</span>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                {blueprint.title}
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider translate-y-0.5">
                  {blueprint.category}
                </span>
              </h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                {blueprint.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <GitCommit size={16} className="text-muted-foreground" />
                <span className="font-mono text-foreground">v{blueprint.version}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Updated {formatDate(blueprint.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>By <span className="text-foreground font-medium">{blueprint.author}</span></span>
              </div>
              <div className="flex gap-2">
                {blueprint.compliance.map(c => (
                  <span key={c} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide bg-secondary px-2 py-0.5 rounded text-secondary-foreground border border-border">
                    <CheckCircle2 size={12} className="text-primary" /> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 bg-background border border-border rounded-md hover:bg-muted text-foreground transition-colors shadow-sm" title="Share">
              <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-md hover:bg-muted text-foreground font-medium text-sm transition-colors shadow-sm">
              <Copy size={16} /> Clone
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:brightness-110 font-medium text-sm transition-colors shadow-sm">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        
        {/* Tabs */}
        <div className="border-b border-border px-8 bg-background shrink-0">
          <div className="max-w-7xl mx-auto flex gap-8">
            {[
              { id: 'architecture', label: 'Architecture', icon: LayoutTemplate },
              { id: 'controls', label: 'Control Mappings', icon: Shield },
              { id: 'resources', label: 'Implementation', icon: Code2 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 py-4 text-sm font-semibold border-b-2 transition-all",
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <div className="max-w-7xl mx-auto p-8 h-full">
            
            {activeTab === 'architecture' && (
              <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Trust Zones & Data Flow</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive"></div> External</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent"></div> DMZ</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div> Internal</span>
                  </div>
                </div>
                
                {/* Visualizer Mock */}
                <div className="flex-1 bg-card border border-border rounded-xl shadow-inner overflow-hidden blueprint-grid relative min-h-[400px] flex items-stretch p-4 gap-4">
                  
                  {blueprint.architecture.zones.map((zone, idx) => (
                    <div key={zone.id} className="flex-1 flex flex-col border border-border/50 rounded-lg bg-background/60 backdrop-blur-sm relative overflow-hidden">
                      <div className={cn(
                        "p-3 border-b border-border/50 font-semibold text-sm flex justify-between items-center",
                        zone.level === 0 ? "bg-destructive/10 text-destructive" :
                        zone.level === 1 ? "bg-accent/10 text-accent" :
                        "bg-primary/10 text-primary"
                      )}>
                        {zone.name}
                        <span className="font-mono text-xs opacity-70">L{zone.level}</span>
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col gap-4">
                        {blueprint.architecture.nodes
                          .filter(n => n.zoneId === zone.id)
                          .map(node => (
                            <div key={node.id} className="bg-card border border-border shadow-sm rounded-md p-3 hover:border-primary transition-colors cursor-default relative z-10">
                              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">{node.type}</div>
                              <div className="font-medium">{node.label}</div>
                            </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Mock edges connecting them visually (simplified for DOM representation) */}
                  <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20">
                     {/* In a real app, use react-flow or xarrow. Here we just show a background texture. */}
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-0 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                      <tr>
                        <th className="px-6 py-3">Source</th>
                        <th className="px-6 py-3">Target</th>
                        <th className="px-6 py-3">Protocol/Auth</th>
                        <th className="px-6 py-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {blueprint.architecture.edges.map((edge, i) => {
                        const sourceNode = blueprint.architecture.nodes.find(n => n.id === edge.source);
                        const targetNode = blueprint.architecture.nodes.find(n => n.id === edge.target);
                        return (
                          <tr key={i} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 font-medium">{sourceNode?.label || edge.source}</td>
                            <td className="px-6 py-4 font-medium">{targetNode?.label || edge.target}</td>
                            <td className="px-6 py-4 font-mono text-xs text-primary">{edge.protocol}</td>
                            <td className="px-6 py-4 text-muted-foreground">{edge.label}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'controls' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Shield size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-mono">{controls.length}</div>
                      <div className="text-sm text-muted-foreground">Total Controls</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Layers size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-mono">{new Set(controls.map(c=>c.domain)).size}</div>
                      <div className="text-sm text-muted-foreground">Security Domains</div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                      <tr>
                        <th className="px-6 py-3 w-32">Control ID</th>
                        <th className="px-6 py-3 w-48">Domain</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3 w-48">Frameworks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {controls.map(control => (
                        <tr key={control.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 font-mono text-xs text-primary">{control.id}</td>
                          <td className="px-6 py-4 font-medium">{control.domain}</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold mb-1">{control.name}</div>
                            <div className="text-muted-foreground text-xs leading-relaxed">{control.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(control.frameworkMappings).map(([fw, val]) => (
                                <span key={fw} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-mono rounded border border-border">
                                  {fw.toUpperCase()}: {val}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {blueprint.resources.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
                    <Code2 size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-foreground mb-1">No Implementation Resources</h3>
                    <p className="max-w-md mx-auto">This blueprint does not have attached terraform modules, policies, or runbooks yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {blueprint.resources.map(res => (
                      <div key={res.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
                        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded",
                              res.type === 'terraform' ? "bg-purple-500/10 text-purple-600" :
                              res.type === 'policy' ? "bg-blue-500/10 text-blue-600" :
                              "bg-orange-500/10 text-orange-600"
                            )}>{res.type}</span>
                            <span className="font-semibold text-sm">{res.title}</span>
                          </div>
                          <button className="text-muted-foreground hover:text-foreground">
                            <Copy size={14} />
                          </button>
                        </div>
                        <div className="p-4 flex-1 flex flex-col gap-4">
                          <p className="text-sm text-muted-foreground">{res.description}</p>
                          <div className="bg-sidebar rounded-md p-4 flex-1 overflow-auto border border-sidebar-border">
                            <pre className="text-xs font-mono text-sidebar-foreground/90 whitespace-pre-wrap">
                              {res.content}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
