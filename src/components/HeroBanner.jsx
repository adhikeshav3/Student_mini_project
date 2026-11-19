import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';

export default function HeroBanner({ onSearchDocket, onNavigate, grievances = [] }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchDocket(searchInput.trim().toUpperCase());
    }
  };

  return (
    <div className="relative py-14 sm:py-20 px-6 max-w-7xl mx-auto">
      {/* Hero Headline - Minimal, confident, Poppins */}
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">
          Statutory Student Grievance Redressal
        </p>
        <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-5">
          Student rights protected.
          <span className="block text-neutral-400 mt-2 font-normal">Transparent resolution.</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
          Direct institutional redressal under official UGC regulations. Submit petitions, monitor real-time review status, and receive legally certified resolution orders.
        </p>
      </div>

      {/* Two Action Cards - buio minimal aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: File Grievance */}
        <div 
          onClick={() => onNavigate('submit')}
          className="group relative p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">01 / Petition</span>
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/30 transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <h2 className="font-poppins text-2xl sm:text-3xl font-medium text-white mb-3">
              File a Grievance
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Submit issues regarding academics, examinations, fee structures, or campus facilities. Identity protection and anonymous filing available.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <span>SLA: 24–72 Hour Turnaround</span>
            <span className="text-white font-medium group-hover:underline">Proceed →</span>
          </div>
        </div>

        {/* Card 2: Track Status */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">02 / Investigation</span>
              <span className="text-xs text-neutral-400 font-mono">Live SLA Clock</span>
            </div>
            <h2 className="font-poppins text-2xl sm:text-3xl font-medium text-white mb-3">
              Track Docket
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
              Enter your tracking reference number to inspect case timeline, officer notes, hearing schedules, and authorized orders.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-2">
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl p-1.5 focus-within:border-white/30 transition-colors">
              <Search className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Docket ID (e.g. NICHE-2025-0104)"
                className="w-full bg-transparent px-2 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
              >
                Track
              </button>
            </div>
            {grievances.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                <span>Recent:</span>
                <button
                  type="button"
                  onClick={() => onSearchDocket(grievances[0].id)}
                  className="text-neutral-300 hover:text-white underline cursor-pointer"
                >
                  {grievances[0].id}
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
