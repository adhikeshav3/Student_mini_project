import React, { useState } from 'react';
import { FileText, Search, BookOpen, BarChart3, Lock, ChevronDown, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, pendingCount = 0, currentUser, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] text-white no-print">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        
        {/* Brand: Minimalist & Clean Typography (buio. style) */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Return to Overview"
        >
          <span className="font-poppins font-bold text-lg text-white tracking-wider group-hover:text-neutral-300 transition-colors">
            NICHE
          </span>
          <span className="text-white/20 font-light">/</span>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium hidden sm:inline">
            Grievance Redressal
          </span>
        </div>

        {/* Center Primary Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-neutral-400">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'home' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('submit')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'submit' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            File Grievance
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'track' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Track Status
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'policies' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Regulations
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Public Statistics
          </button>

        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-4">
          
          {/* Authenticated User & Logout */}
          {currentUser && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline tracking-wider">
                {currentUser.id}
              </span>
              <button
                onClick={onLogout}
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full"
                title="Sign out of system"
              >
                Sign Out
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
