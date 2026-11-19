import React, { useState } from 'react';
import { Building, FileText, Search, BookOpen, BarChart3, Lock, ChevronDown, PhoneCall, LogOut, User } from 'lucide-react';
import nicheLogo from '../assets/niche_logo.png';

export default function Navbar({ activeTab, setActiveTab, pendingCount = 0, currentUser, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#090E17]/95 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl no-print">
      {/* Top Statutory / Accreditation Strip */}
      <div className="bg-[#03060C] text-neutral-400 text-[11px] font-medium tracking-wide py-1.5 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-crest-gold/15 text-crest-goldLight font-semibold text-[10px] tracking-wider uppercase border border-crest-gold/30">
              NAAC ACCREDITED • DEEMED TO BE UNIVERSITY
            </span>
            <span className="text-neutral-400">
              UGC Act 1956 Section 3 • Noorul Islam Centre for Higher Education (NICHE)
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-crest-gold" />
              Helpline: <strong className="text-neutral-200">04651-205800</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main University Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* University Crest & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home"
        >
          <div className="w-11 h-11 rounded-xl bg-white/10 text-crest-goldLight flex items-center justify-center border border-white/15 p-2 group-hover:border-crest-gold transition-colors shrink-0 backdrop-blur-md">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-current">
              <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M24 7L10 14V17H38V14L24 7Z" fill="currentColor" opacity="0.9" />
              <rect x="13" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="20" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="25" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="32" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="8" y="34" width="32" height="3" rx="0.5" fill="currentColor" />
              <path d="M24 41L21 38H27L24 41Z" fill="#c59b27" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base md:text-lg font-bold font-serif text-white tracking-tight group-hover:text-crest-goldLight transition-colors leading-tight">
                NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
              </h1>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white/10 text-neutral-300 border border-white/15">
                NICHE
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">
              Kumaracoil, Thuckalay • Central Student Grievance Redressal Portal
            </p>
          </div>
        </div>

        {/* Streamlined Primary Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </button>

          {/* 2. File Complaint */}
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'submit'
                ? 'bg-crest-goldLight text-crest-deep shadow-md'
                : 'bg-crest-gold hover:bg-crest-goldLight text-crest-deep shadow-md'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>File Complaint</span>
          </button>

          {/* 3. Track Status */}
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'track'
                ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Track Status</span>
          </button>

          {/* 4. More Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 text-neutral-300 hover:text-white hover:bg-white/10 cursor-pointer ${
                activeTab === 'policies' || activeTab === 'analytics' ? 'bg-white/15 text-white border border-white/20 font-bold' : ''
              }`}
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-1.5 w-48 bg-[#0F1728] rounded-xl shadow-2xl border border-white/15 py-1.5 z-50 animate-scaleIn backdrop-blur-xl"
                onClick={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setActiveTab('policies')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-crest-gold" />
                  University Rules & Rights
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  Public Statistics
                </button>
              </div>
            )}
          </div>

          {/* 5. Staff Portal */}
          <button
            onClick={() => setActiveTab('workbench')}
            className={`ml-1 sm:ml-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
              activeTab === 'workbench'
                ? 'bg-red-600 text-white border-red-500 shadow-md'
                : 'bg-red-950/40 text-red-300 border-red-500/30 hover:bg-red-900/50'
            }`}
            title="Restricted portal for University Deans & Examination Controllers"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span>Staff Portal</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Authenticated User Profile & Logout */}
          {currentUser && (
            <div className="ml-2 pl-2 border-l border-white/15 flex items-center gap-2">
              <span 
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-neutral-200 text-xs font-bold font-mono border border-white/15"
                title={`Signed in as ${currentUser.name}`}
              >
                <User className="w-3.5 h-3.5 text-crest-gold" />
                {currentUser.id}
              </span>
              <button
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 border border-red-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                title="Sign out of the portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
}
