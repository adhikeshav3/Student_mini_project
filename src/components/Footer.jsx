import React from 'react';

export default function Footer({ onResetData }) {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-black py-8 px-6 text-xs text-neutral-400 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-poppins font-semibold text-white tracking-wider">NICHE</span>
          <span className="text-white/20">•</span>
          <span className="text-neutral-400">Noorul Islam Centre for Higher Education</span>
        </div>
        <div className="text-neutral-400 text-center sm:text-left">
          UGC (Redressal of Grievances of Students) Regulations, 2023
        </div>
        <div>
          <button 
            onClick={onResetData} 
            className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </footer>
  );
}
