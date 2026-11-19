import React from 'react';
import { CATEGORIES } from '../services/triageEngine';

export default function AnalyticsDashboard({ grievances = [] }) {
  const total = grievances.length;
  const resolved = grievances.filter(g => g.status === 'Resolved').length;
  const active = total - resolved;
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(0) : '100';

  // Category counts
  const categoryCounts = {};
  Object.values(CATEGORIES).forEach(c => { categoryCounts[c] = 0; });
  grievances.forEach(g => {
    if (categoryCounts[g.category] !== undefined) {
      categoryCounts[g.category]++;
    }
  });

  // Status counts
  const statuses = ['Resolved', 'Under Review', 'Hearing Scheduled', 'Action Directed'];
  const statusCounts = statuses.map(s => ({
    status: s,
    count: grievances.filter(g => g.status === s).length
  }));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="mb-12">
        <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          Public Statistics
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Statutory transparency disclosures under UGC Regulations, 2023.
        </p>
      </div>

      {/* KPI 4-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 block mb-2">
            Total Filed
          </span>
          <span className="font-poppins text-3xl font-bold text-white block">
            {total}
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">All dockets</span>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 block mb-2">
            Resolution Rate
          </span>
          <span className="font-poppins text-3xl font-bold text-white block">
            {resolutionRate}%
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">UGC Benchmark: 90%</span>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 block mb-2">
            Avg Turnaround
          </span>
          <span className="font-poppins text-3xl font-bold text-white block">
            48h
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">Standard SLA</span>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 block mb-2">
            Active Cases
          </span>
          <span className="font-poppins text-3xl font-bold text-white block">
            {active}
          </span>
          <span className="text-[11px] text-neutral-400 mt-1 block">In review</span>
        </div>

      </div>

      {/* Two Minimal Tables/Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h2 className="font-poppins text-base font-medium text-white mb-6">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300 font-light">{cat}</span>
                    <span className="text-neutral-400 font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/40 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h2 className="font-poppins text-base font-medium text-white mb-6">
            Status Distribution
          </h2>
          <div className="space-y-4">
            {statusCounts.map((s) => {
              const pct = total > 0 ? ((s.count / total) * 100).toFixed(0) : 0;
              return (
                <div key={s.status} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300 font-light">{s.status}</span>
                    <span className="text-neutral-400 font-mono">{s.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/40 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
