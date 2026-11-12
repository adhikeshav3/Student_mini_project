import React, { useState } from 'react';
import { Building, FileText, Search, BookOpen, BarChart3, Lock, ChevronDown, PhoneCall, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, pendingCount = 0, currentUser, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-institutional-200 shadow-sm no-print">
      {/* Top Statutory / Accreditation Strip */}
      <div className="bg-crest-deep text-white text-[11px] font-medium tracking-wide py-1.5 px-4 sm:px-8 border-b border-institutional-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-crest-gold/20 text-crest-goldLight font-semibold text-[10px] tracking-wider uppercase border border-crest-gold/30">
              NAAC ACCREDITED • DEEMED TO BE UNIVERSITY
            </span>
            <span className="text-institutional-300">
              UGC Act 1956 Section 3 • Noorul Islam Centre for Higher Education (NICHE)
            </span>
          </div>
          <div className="flex items-center gap-4 text-institutional-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-crest-goldLight" />
              Helpline: <strong className="text-white">04651-205800</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main University Header: Streamlined, Clean & Limited Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* University Crest & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home"
        >
          <div className="w-11 h-11 rounded-lg bg-crest-navy text-crest-goldLight flex items-center justify-center shadow-seal border border-crest-gold/30 p-2 group-hover:border-crest-gold transition-colors shrink-0">
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
              <h1 className="text-sm sm:text-base md:text-lg font-bold font-serif text-crest-navy tracking-tight group-hover:text-crest-blue transition-colors leading-tight">
                NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
              </h1>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-institutional-100 text-institutional-700 border border-institutional-200">
                NICHE
              </span>
            </div>
            <p className="text-[11px] text-institutional-500 font-medium">
              Kumaracoil, Thuckalay • Central Student Grievance Redressal Portal
            </p>
          </div>
        </div>

        {/* Streamlined Primary Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            Home
          </button>

          {/* 2. File Complaint */}
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'submit'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'bg-crest-gold hover:bg-crest-goldLight text-crest-deep shadow-sm'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>File Complaint</span>
          </button>

          {/* 3. Track Status */}
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Track Status</span>
          </button>

          {/* 4. More Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 text-institutional-700 hover:bg-institutional-100 ${
                activeTab === 'policies' || activeTab === 'analytics' ? 'bg-institutional-100 text-crest-navy font-bold' : ''
              }`}
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-institutional-500" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-institutional-200 py-1.5 z-50 animate-scaleIn"
                onClick={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setActiveTab('policies')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-institutional-800 hover:bg-institutional-50 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-crest-goldDark" />
                  University Rules & Rights
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-institutional-800 hover:bg-institutional-50 flex items-center gap-2"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-crest-navy" />
                  Public Statistics
                </button>
              </div>
            )}
          </div>

          {/* 5. Staff Portal */}
          <button
            onClick={() => setActiveTab('workbench')}
            className={`ml-1 sm:ml-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border ${
              activeTab === 'workbench'
                ? 'bg-crest-maroon text-white border-crest-maroon shadow-sm'
                : 'bg-institutional-50 text-institutional-700 border-institutional-300 hover:bg-institutional-100'
            }`}
            title="Restricted portal for University Deans & Examination Controllers"
          >
            <Lock className="w-3.5 h-3.5 text-crest-maroon" />
            <span>Staff Portal</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Authenticated User Profile & Logout */}
          {currentUser && (
            <div className="ml-2 pl-2 border-l border-institutional-200 flex items-center gap-2">
              <span 
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-institutional-100 text-institutional-800 text-xs font-bold font-mono border border-institutional-200"
                title={`Signed in as ${currentUser.name}`}
              >
                <User className="w-3.5 h-3.5 text-crest-navy" />
                {currentUser.id}
              </span>
              <button
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50 border border-red-200 transition-colors flex items-center gap-1"
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
