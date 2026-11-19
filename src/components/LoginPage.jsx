import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Scale, Clock, Lock, User } from 'lucide-react';
import { UNIVERSITY_OFFICERS } from '../data/mockGrievances';
import highResCampusPhoto from '../assets/niche_highres.png';

export default function LoginPage({ onLogin }) {
  // 'gateway' (Starting Page with Black & White Campus) | 'login' (Minimalist Login Card)
  const [viewMode, setViewMode] = useState('gateway');
  
  // Login Form States
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

    // Successful login object
    const user = {
      role: loginRole,
      id: registerNumber.trim().toUpperCase(),
      name: loginRole === 'student' 
        ? (registerNumber.includes('1123237031') || registerNumber.includes('CS101') ? 'ADHIKESHAV A S' : 'Registered Student') 
        : 'Dr. B. Ben Sujitha',
      department: loginRole === 'student' ? 'Computer Science & Engineering' : 'Department of Computer Science & Engineering',
      semester: '7th Semester, B.E.',
      email: `${registerNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}@niuniv.com`,
      loggedInAt: new Date().toISOString()
    };

    onLogin(user);
  };

  // Instant 1-Click Fast Demo Login for Evaluators & Students
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
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* ============================================================== */}
      {/* 4K ULTRA-HD CAMPUS BACKGROUND WITH 5% ENHANCED BLACK DEPTH     */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
        <img 
          src={highResCampusPhoto} 
          alt="Noorul Islam Centre for Higher Education Campus" 
          className="w-full h-full object-cover object-center opacity-65 filter brightness-[0.75] contrast-125 scale-100 transition-all duration-700"
        />
        {/* Preserved Dark Fadeness & Atmospheric Vignette (5% Deeper Black Tone) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.70)_100%)]" />
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: STARTING PAGE (EXACT REPLICA OF LAPTOP SCREEN REFERENCE) */}
      {/* ============================================================== */}
      {viewMode === 'gateway' ? (
        <div className="relative z-10 min-h-screen flex flex-col justify-between p-6 sm:p-10 animate-fadeIn">
          
          {/* Top Bar */}
          <header className="flex items-center justify-between text-xs tracking-wider">
            <div className="flex items-center">
              <span className="font-poppins uppercase tracking-[0.2em] text-[11px] text-neutral-300 font-semibold">
                NICHE | Deemed to be University
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px] tracking-widest uppercase">
              <span>NAAC Accredited</span>
              <span>•</span>
              <span>UGC Section 3</span>
              <span>•</span>
              <span>Helpline: 04651-205800</span>
            </div>
          </header>

          {/* Centerpiece Hero (Matching Reference Image) */}
          <main className="my-auto py-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
            
            {/* University Name in Poppins Font */}
            <h1 className="font-poppins font-bold uppercase tracking-[0.22em] text-white text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] drop-shadow-2xl">
              Noorul Islam Centre For
              <span className="block mt-2 sm:mt-3">Higher Education</span>
            </h1>

            {/* Subtitle in Professional Uppercase Tracked Font */}
            <p className="font-sans uppercase tracking-[0.35em] text-xs sm:text-sm md:text-base font-medium text-neutral-300 mt-5 sm:mt-6 drop-shadow-md max-w-2xl">
              Student Grievance Redressal Portal
            </p>

            {/* Outlined "SIGN IN" Button (Exact Match to Reference Photo) */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setViewMode('login')}
                className="px-10 sm:px-12 py-3 sm:py-3.5 border border-white/90 hover:border-white bg-black/40 hover:bg-white text-white hover:text-black uppercase tracking-[0.3em] text-xs font-semibold transition-all duration-300 shadow-2xl backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            </div>

          </main>

          {/* Footer Bar without dividing line or switch button */}
          <footer className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 tracking-wider gap-2">
            <div>
              Kumaracoil, Thuckalay, Kanyakumari District, Tamil Nadu - 629 180
            </div>
            <div>
              UGC (Redressal of Grievances of Students) Regulations, 2023
            </div>
          </footer>

        </div>
      ) : (

        /* ============================================================== */
        /* VIEW 2: MINIMALIST LOGIN CARD (INSPIRED BY REFERENCE IMAGE 1)  */
        /* ============================================================== */
        <div className="relative z-10 min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 animate-fadeIn">
          
          {/* Top Bar with Back Button */}
          <header className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs py-2">
            <button
              type="button"
              onClick={() => {
                setViewMode('gateway');
                setError('');
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal Home</span>
            </button>
            <div className="text-neutral-400 text-[11px] hidden sm:block tracking-wider uppercase">
              Noorul Islam Centre for Higher Education
            </div>
          </header>

          {/* Main Login Card Centerpiece */}
          <main className="my-auto flex items-center justify-center py-6">
            <div className="w-full max-w-[410px] bg-white text-neutral-900 rounded-[2.5rem] border border-neutral-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.5)] p-7 sm:p-9 relative transition-all">
              
              {/* Sleek Dynamic Island / Phone Mockup Element (From Ref Image 1) */}
              <div className="w-16 h-3.5 bg-neutral-900 rounded-full mx-auto mb-6 opacity-90"></div>

              {/* Minimalist Circular University Emblem / Monogram */}
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
                  <path d="M12 3v18" strokeLinecap="round" />
                  <path d="M3 12h18" strokeLinecap="round" />
                  <path d="M7 7l10 10" strokeLinecap="round" />
                </svg>
              </div>

              {/* University Title in Poppins Font */}
              <h2 className="font-poppins font-bold text-[15px] sm:text-base text-neutral-900 tracking-tight text-center leading-snug">
                Noorul Islam Centre For Higher Education
              </h2>

              {/* Subtitle in Professional Font */}
              <p className="font-sans text-[10.5px] uppercase tracking-[0.22em] font-semibold text-neutral-400 text-center mt-1">
                Student Grievance Redressal Portal
              </p>

              {/* Welcome Back & Subtitle from Reference Image 1 */}
              <div className="text-center mt-5 mb-5">
                <h1 className="font-poppins text-2xl font-bold text-neutral-900 tracking-tight">
                  Welcome Back !
                </h1>
                <p className="text-xs text-neutral-400 font-normal mt-1">
                  Please enter your details.
                </p>
              </div>

              {/* Minimal Role Switcher Toggle */}
              <div className="grid grid-cols-2 bg-neutral-100 p-1 rounded-xl text-xs font-medium text-neutral-600 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('student');
                    setError('');
                  }}
                  className={`py-2 rounded-lg transition-all ${
                    loginRole === 'student'
                      ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('officer');
                    setError('');
                  }}
                  className={`py-2 rounded-lg transition-all ${
                    loginRole === 'officer'
                      ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  Staff / Officer
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Register Number / Staff ID Input */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                    {loginRole === 'student' ? 'Register / Roll Number' : 'Staff / Faculty ID'}
                  </label>
                  <input
                    type="text"
                    value={registerNumber}
                    onChange={(e) => {
                      setRegisterNumber(e.target.value);
                      setError('');
                    }}
                    placeholder={loginRole === 'student' ? 'e.g. 1123237031' : 'e.g. OFF-CSE-HOD'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all uppercase font-mono"
                    autoFocus
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="••••••••"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Help */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-neutral-900 focus:ring-0 border-neutral-300 accent-neutral-900"
                    />
                    <span className="text-[11.5px]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("For demonstration purposes, you can use any password (min 4 chars) or click the 1-Click Demo buttons below.")}
                    className="text-[11.5px] text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Minimalist Dark Pill Button matching Reference Image 1 */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#18181b] hover:bg-black text-white text-sm font-medium transition-all shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Legal Disclaimer */}
                <p className="text-[10px] text-neutral-400 text-center leading-relaxed pt-1">
                  By logging in, you agree to our{' '}
                  <span className="text-neutral-700 underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-neutral-700 underline cursor-pointer">Privacy Policy</span>.
                </p>

                {/* 1-Click Fast Demo Shortcuts */}
                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block text-center mb-2">
                    ⚡ Quick 1-Click Demo Access
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('student')}
                      className="py-1.5 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-medium transition-colors"
                      title="Sign in as student ADHIKESHAV A S (1123237031)"
                    >
                      🎓 Student Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('officer')}
                      className="py-1.5 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-[11px] font-medium transition-colors"
                      title="Sign in as Dr. B. Ben Sujitha (HOD - CSE)"
                    >
                      🏛️ Staff Demo
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </main>

          {/* Bottom Footer */}
          <footer className="w-full py-2 text-center text-[11px] text-neutral-400">
            © 2026 Noorul Islam Centre for Higher Education (NICHE). Directorate of Student Grievance Redressal.
          </footer>

        </div>
      )}

    </div>
  );
}
