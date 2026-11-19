import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import nicheCampus from '../assets/niche_highres.png';

export default function HeroBanner({ onSearchDocket, onNavigate, grievances = [] }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchDocket(searchInput.trim().toUpperCase());
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden py-12">
      
      {/* Right Side 50-60% Faded NICHE College Campus Photo */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 bg-cover bg-center pointer-events-none opacity-45"
        style={{
          backgroundImage: `url(${nicheCampus})`,
          maskImage: 'linear-gradient(to right, transparent, rgba(0,0,0,0.85) 45%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, rgba(0,0,0,0.85) 45%, black 100%)'
        }}
      />
      {/* Seamless blend gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060A12] via-transparent to-[#060A12]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060A12] via-[#060A12]/80 to-transparent pointer-events-none md:w-1/2" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-2xl mb-12">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono font-medium mb-4">
          NICHE • Student Grievance Redressal
        </p>
        <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] mb-5">
          Student rights protected.
          <span className="block text-neutral-400 font-normal mt-2">Transparent resolution.</span>
        </h1>
        <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
          Direct university statutory redressal under UGC regulations. Lodge petitions, inspect investigation progress, and access official orders.
        </p>
      </div>

      {/* The Two Minimal Classic Options: File a Grievance & Track Docket */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        
        {/* Option 1: File a Grievance */}
        <div 
          onClick={() => onNavigate('submit')}
          className="group p-8 sm:p-9 rounded-2xl bg-black/60 backdrop-blur-md border border-white/[0.08] hover:border-white/25 hover:bg-black/80 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">01 / Petition</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/30 transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <h2 className="font-poppins text-2xl font-semibold text-white mb-2">
              File a Grievance
            </h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Lodge academic, examination, hostel, or fee issues. Whistleblower identity protection supported.
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <span>24–72 Hour Turnaround</span>
            <span className="text-white font-medium group-hover:underline">Proceed →</span>
          </div>
        </div>

        {/* Option 2: Track Docket */}
        <div className="p-8 sm:p-9 rounded-2xl bg-black/60 backdrop-blur-md border border-white/[0.08] flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">02 / Investigation</span>
              <span className="text-xs text-neutral-400 font-mono">Live Status</span>
            </div>
            <h2 className="font-poppins text-2xl font-semibold text-white mb-2">
              Track Docket
            </h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
              Enter reference number to view case status and resolution orders.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-2">
            <div className="flex items-center gap-2 bg-black/80 border border-white/10 rounded-xl p-1.5 focus-within:border-white/30 transition-colors">
              <Search className="w-4 h-4 text-neutral-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Docket ID..."
                className="w-full bg-transparent px-2 py-1.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
              >
                Track
              </button>
            </div>
            {grievances.length > 0 && (
              <div className="mt-2.5 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
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
