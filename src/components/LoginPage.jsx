import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Building, Award, CheckCircle2, HelpCircle } from 'lucide-react';
import { UNIVERSITY_OFFICERS } from '../data/mockGrievances';

export default function LoginPage({ onLogin }) {
  const [loginRole, setLoginRole] = useState('student'); // 'student' | 'officer'
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerNumber.trim()) {
      setError(loginRole === 'student' ? 'Please enter your Student Register / Roll Number.' : 'Please enter your Staff / Faculty ID.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Please enter a valid password (minimum 4 characters).');
      return;
    }

    // Successful login
    const user = {
      role: loginRole,
      id: registerNumber.trim().toUpperCase(),
      name: loginRole === 'student' ? (registerNumber.includes('1123237031') || registerNumber.includes('CS101') ? 'ADHIKESHAV A S' : 'Registered Student') : 'Dr. B. Ben Sujitha',
      department: loginRole === 'student' ? 'Computer Science & Engineering' : 'Department of Computer Science & Engineering',
      semester: '7th Semester, B.E.',
      email: `${registerNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}@niuniv.com`,
      loggedInAt: new Date().toISOString()
    };

    onLogin(user);
  };

  // Instant 1-Click Demo Login for Evaluators & Students
  const handleQuickDemoLogin = (type) => {
    if (type === 'student') {
      const studentUser = {
        role: 'student',
        id: '1123237031',
        name: 'ADHIKESHAV A S',
        department: 'Computer Science & Engineering',
        semester: '7th Semester, B.E.',
        email: 'adhikeshav.cse@niuniv.com',
        loggedInAt: new Date().toISOString()
      };
      onLogin(studentUser);
    } else if (type === 'officer') {
      const officer = UNIVERSITY_OFFICERS[0] || {
        id: 'OFF-CSE-HOD',
        name: 'Dr. B. Ben Sujitha',
        designation: 'Head of the Department (CSE)',
        committee: 'Departmental Student Grievance Redressal Sub-Committee',
        email: 'hod.cse@niuniv.com',
        avatar: 'BS'
      };
      const officerUser = {
        role: 'officer',
        id: officer.id,
        name: officer.name,
        designation: officer.designation,
        committee: officer.committee,
        email: officer.email,
        avatar: officer.avatar,
        loggedInAt: new Date().toISOString()
      };
      onLogin(officerUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#071326] text-institutional-900 font-sans flex flex-col justify-between relative overflow-hidden selection:bg-crest-gold/20">
      
      {/* Background Architectural Canvas with Deep Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071326]/95 via-[#0d1f3c]/90 to-[#071326]/95 pointer-events-none" />

      {/* Top University Strip */}
      <header className="relative z-10 py-3 px-6 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-crest-gold/20 text-crest-goldLight font-bold text-[10px] uppercase border border-crest-gold/30">
              NAAC ACCREDITED • DEEMED UNIVERSITY
            </span>
            <span className="text-institutional-300 hidden sm:inline">
              Noorul Islam Centre for Higher Education (NICHE) • UGC Section 3
            </span>
          </div>
          <div className="text-institutional-300 text-[11px]">
            Statutory Helpline: <strong className="text-white">04651-205800</strong>
          </div>
        </div>
      </header>

      {/* Main Login Card Centerpiece */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-institutional-200 overflow-hidden animate-scaleIn">
          
          {/* Card Top Header */}
          <div className="bg-crest-navy text-white p-6 text-center relative border-b border-crest-gold/40">
            {/* University Emblem SVG */}
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white/10 border border-crest-gold/30 text-crest-goldLight flex items-center justify-center p-2.5 shadow-md">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-current">
                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M24 7L10 14V17H38V14L24 7Z" fill="currentColor" />
                <rect x="13" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                <rect x="20" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                <rect x="25" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                <rect x="32" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                <rect x="8" y="34" width="32" height="3" rx="0.5" fill="currentColor" />
                <path d="M24 41L21 38H27L24 41Z" fill="#c59b27" />
              </svg>
            </div>

            <h1 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight leading-snug">
              NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
            </h1>
            <p className="text-[11px] text-crest-goldLight font-semibold mt-1">
              (Deemed to be University under section 3 of UGC Act 1956)
            </p>
            <p className="text-xs text-institutional-200 font-medium mt-0.5">
              Kumaracoil, Thuckalay • Student Grievance Redressal Portal
            </p>
            <p className="text-[11px] text-institutional-300 mt-2">
              Enter your Register Number & Password to continue
            </p>
          </div>

          {/* Role Switcher Tabs (Student vs Officer) */}
          <div className="grid grid-cols-2 bg-institutional-100 border-b border-institutional-200 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginRole('student');
                setError('');
              }}
              className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginRole === 'student'
                  ? 'bg-white text-crest-navy shadow-sm'
                  : 'text-institutional-600 hover:text-institutional-900'
              }`}
            >
              <User className="w-4 h-4 text-crest-goldDark" />
              Student Portal
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginRole('officer');
                setError('');
              }}
              className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginRole === 'officer'
                  ? 'bg-crest-navy text-white shadow-sm'
                  : 'text-institutional-600 hover:text-institutional-900'
              }`}
            >
              <Lock className="w-4 h-4 text-crest-gold" />
              Staff / Committee
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            
            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Register Number Input */}
            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                {loginRole === 'student' ? 'Student Register / Roll Number' : 'Staff / Faculty ID'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-institutional-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={registerNumber}
                  onChange={(e) => {
                    setRegisterNumber(e.target.value);
                    setError('');
                  }}
                  placeholder={loginRole === 'student' ? 'e.g. 2023-BT-CSE-042' : 'e.g. OFF-02'}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy uppercase font-mono"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-institutional-400">
                  Default: any password (min 4 chars)
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-institutional-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-institutional-300 text-sm focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-institutional-400 hover:text-institutional-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-institutional-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-crest-navy focus:ring-crest-navy border-institutional-300"
                />
                <span>Remember on this computer</span>
              </label>

              <button
                type="button"
                onClick={() => alert("For this demonstration, you can type any register number (e.g. 2023-BT-CSE-042) and password, or use the 1-click Quick Demo buttons below!")}
                className="text-crest-navy hover:underline font-semibold text-[11px]"
              >
                Need Help?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-crest-navy hover:bg-crest-blue text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 1-Click Fast Demo Login for Supervisors & Examiners */}
            <div className="pt-4 border-t border-institutional-200 text-center">
              <span className="text-[11px] font-bold text-institutional-500 uppercase tracking-wider block mb-2">
                ⚡ Quick Demo Login (1-Click Access):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student')}
                  className="py-2 px-2.5 rounded-lg bg-institutional-100 hover:bg-crest-gold hover:text-crest-deep text-institutional-800 text-[11px] font-bold transition-all border border-institutional-200"
                  title="Log in immediately as student ADHIKESHAV A S (1123237031)"
                >
                  🎓 Student Demo (Adhikeshav)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('officer')}
                  className="py-2 px-2.5 rounded-lg bg-institutional-100 hover:bg-crest-navy hover:text-white text-institutional-800 text-[11px] font-bold transition-all border border-institutional-200"
                  title="Log in immediately as Dr. B. Ben Sujitha (HOD - CSE)"
                >
                  🏛️ Staff Demo (HOD - CSE)
                </button>
              </div>
            </div>

          </form>

          {/* Card Footer */}
          <div className="p-3 bg-institutional-50 border-t border-institutional-200 text-center text-[10px] text-institutional-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Session • Verified pursuant to UGC Regulations 2023</span>
          </div>

        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 py-3 px-6 text-center text-[11px] text-institutional-400 border-t border-white/10">
        © 2026 Noorul Islam Centre for Higher Education (NICHE). Directorate of Student Grievance Redressal. All rights reserved.
      </footer>

    </div>
  );
}
