import React, { useState } from 'react';
import { Search, FileText, ArrowRight, ShieldCheck, CheckCircle2, Clock, Lock } from 'lucide-react';

export default function HeroBanner({ onSearchDocket, onNavigate, grievances = [] }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchDocket(searchInput.trim().toUpperCase());
    }
  };

  const sampleDockets = grievances.slice(0, 3).map(g => g.id);

  return (
    <div className="relative bg-[#060A14] text-white overflow-hidden border-b border-white/10 py-10 md:py-14">
      {/* Background Architectural Subtle Texture & Gradients */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04070D] via-[#070D18]/95 to-[#04070D] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,45,77,0.2)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Clean Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crest-gold/15 text-crest-goldLight text-xs font-bold uppercase tracking-wider border border-crest-gold/30 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-crest-gold" />
            Official University Student Grievance Portal
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
            How can we help you today?
          </h1>
          
          <p className="text-neutral-300 text-sm sm:text-base mt-2 font-normal leading-relaxed">
            Report academic, examination, hostel, or fee issues. Petitions are automatically triaged under UGC regulations with legally binding resolution orders.
          </p>
        </div>

        {/* The Two Main Action Cards: Sleek Dark Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          
          {/* Card 1: Lodge Complaint */}
          <div 
            onClick={() => onNavigate('submit')}
            className="bg-[#0E1626]/85 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border-2 border-crest-gold/40 hover:border-crest-gold hover:shadow-[0_0_35px_rgba(197,155,39,0.25)] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-crest-gold/15 text-crest-goldLight flex items-center justify-center mb-4 border border-crest-gold/30 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-crest-gold" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-crest-goldLight transition-colors">
                1. File a New Complaint
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                Facing an issue with exams, admit cards, fees, hostels, or faculty? Submit in 2 minutes. You can also hide your name completely for safety.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">
                🔒 Identity Protection Available
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-crest-gold text-crest-deep text-xs font-bold hover:bg-crest-goldLight transition-all shadow-md">
                Start Complaint
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Track Complaint */}
          <div className="bg-[#0E1626]/85 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border-2 border-white/15 hover:border-white/35 hover:shadow-[0_0_35px_rgba(255,255,255,0.1)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <Search className="w-6 h-6 text-emerald-400" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                2. Track Existing Complaint
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                Enter your Docket Tracking ID to check live progress, see your deadline timer, or download your official signed resolution order.
              </p>
            </div>

            {/* Quick Track Input Bar */}
            <form onSubmit={handleSearch} className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. NICHE-2026-GRV-8194"
                  className="flex-1 px-3 py-2 rounded-lg border border-white/20 bg-[#152033] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white hover:bg-neutral-200 text-black rounded-lg text-xs font-bold shrink-0 transition-colors shadow-md cursor-pointer"
                >
                  Check Status
                </button>
              </div>

              {/* Sample 1-Click Test Button */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Quick demo test:</span>
                <button
                  type="button"
                  onClick={() => onSearchDocket(sampleDockets[0] || 'NICHE-2026-GRV-8194')}
                  className="text-crest-goldLight font-bold hover:underline font-mono cursor-pointer"
                >
                  ⚡ Open Demo Case →
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* 3-Step Simple Process Banner */}
        <div className="max-w-4xl mx-auto bg-white/[0.04] border border-white/10 rounded-xl p-4 text-xs backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
            <div className="flex items-center sm:items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <div>
                <strong className="text-white block">Submit in 2 Minutes</strong>
                <span className="text-neutral-400 text-[11px]">Attach proof & state what happened</span>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <div>
                <strong className="text-white block">24h – 48h Strict Deadline</strong>
                <span className="text-neutral-400 text-[11px]">System routes straight to Dean</span>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <div>
                <strong className="text-white block">Signed Official Order</strong>
                <span className="text-neutral-400 text-[11px]">Download printable decree with seals</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
