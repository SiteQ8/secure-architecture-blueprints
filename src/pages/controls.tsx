import { MOCK_CONTROLS } from '@/lib/data';
import { Search, SlidersHorizontal, Download } from 'lucide-react';
import { useState } from 'react';

export default function ControlMatrix() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CONTROLS.filter(c => 
    c.id.toLowerCase().includes(search.toLowerCase()) || 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Control Matrix</h1>
          <p className="text-muted-foreground max-w-xl">
            Enterprise security controls mapped across industry frameworks (NIST, ISO, SOC2, PCI).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-md hover:bg-muted font-medium text-sm transition-colors shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shrink-0 shadow-sm">
        <div className="flex-1 w-full relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="search" 
            placeholder="Search controls by ID, name, domain..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded-md transition-all">
          <SlidersHorizontal size={16} />
          Filter Frameworks
        </button>
      </div>

      <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground font-medium border-b border-border sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 w-32 border-r border-border/50">Control ID</th>
                <th className="px-6 py-4 w-48 border-r border-border/50">Domain</th>
                <th className="px-6 py-4 min-w-[300px] border-r border-border/50">Details</th>
                <th className="px-4 py-4 w-28 text-center bg-background/50">NIST 800-53</th>
                <th className="px-4 py-4 w-28 text-center bg-background/50">ISO 27001</th>
                <th className="px-4 py-4 w-28 text-center bg-background/50">SOC2 CC</th>
                <th className="px-4 py-4 w-28 text-center bg-background/50">PCI-DSS v4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(control => (
                <tr key={control.id} className="hover:bg-muted/30 group">
                  <td className="px-6 py-4 font-mono text-xs text-primary border-r border-border/50 bg-background/50 group-hover:bg-transparent transition-colors">
                    {control.id}
                  </td>
                  <td className="px-6 py-4 font-medium border-r border-border/50">
                    {control.domain}
                  </td>
                  <td className="px-6 py-4 border-r border-border/50">
                    <div className="font-semibold text-foreground mb-1">{control.name}</div>
                    <div className="text-muted-foreground text-xs leading-relaxed max-w-lg">{control.description}</div>
                  </td>
                  <td className="px-4 py-4 text-center border-r border-border/50 border-dashed">
                    {control.frameworkMappings.nist ? (
                      <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-[11px] rounded">
                        {control.frameworkMappings.nist}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center border-r border-border/50 border-dashed">
                    {control.frameworkMappings.iso ? (
                      <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-[11px] rounded">
                        {control.frameworkMappings.iso}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center border-r border-border/50 border-dashed">
                    {control.frameworkMappings.soc2 ? (
                      <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-[11px] rounded">
                        {control.frameworkMappings.soc2}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {control.frameworkMappings.pci ? (
                      <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-[11px] rounded">
                        {control.frameworkMappings.pci}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border bg-muted/20 text-xs text-muted-foreground flex justify-between">
          <span>Showing {filtered.length} controls</span>
          <span>Last updated: Oct 12, 2024</span>
        </div>
      </div>
    </div>
  );
}
