import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Building, Scale, Clock, Sparkles } from 'lucide-react';
import { UNIVERSITY_OFFICERS } from '../data/mockGrievances';
import campusPhoto from '../assets/niche_campus.jpg';

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
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      
      {/* Top Minimal Strip */}
      <header className="w-full py-3 px-6 border-b border-neutral-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-poppins font-medium text-neutral-800 text-[11px] tracking-tight">
              NICHE Official Grievance Redressal Gateway
            </span>
            <span className="text-neutral-400 hidden sm:inline">•</span>
            <span className="text-neutral-500 hidden sm:inline text-[11px]">
              NAAC 'A' Grade • UGC Section 3
            </span>
          </div>
          <div className="text-neutral-500 text-[11px] font-sans">
            Statutory Helpline: <strong className="text-neutral-900 font-medium">04651-205800</strong>
          </div>
        </div>
      </header>

      {/* Main Container - Responsive Minimal Split Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-auto">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Campus Architectural Showcase (Image 2) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between h-full space-y-6">
            
            {/* Campus Image Frame */}
            <div className="relative rounded-[2rem] overflow-hidden border border-neutral-200 shadow-xl bg-neutral-900 group">
              <img 
                src={campusPhoto} 
                alt="Noorul Islam Centre for Higher Education Campus" 
                className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              {/* Overlay University Badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border border-white/30 text-white mb-2">
                  Campus Kumaracoil • Thuckalay
                </span>
                <h3 className="font-poppins text-lg font-bold text-white tracking-tight leading-snug">
                  Noorul Islam Centre for Higher Education
                </h3>
                <p className="font-sans text-xs text-neutral-300 mt-1">
                  Empowering Students through Transparent, Autonomous & AI-Augmented Grievance Redressal.
                </p>
              </div>
            </div>

            {/* 3 Minimal Statutory Feature Chips */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <Scale className="w-4 h-4 text-neutral-800 mb-2" />
                <div>
                  <div className="font-poppins text-xs font-bold text-neutral-900">7 Jurisdictions</div>
                  <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">UGC 2023 Statutory</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <Clock className="w-4 h-4 text-neutral-800 mb-2" />
                <div>
                  <div className="font-poppins text-xs font-bold text-neutral-900">24h / 48h SLA</div>
                  <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">Autonomous Watchdog</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <ShieldCheck className="w-4 h-4 text-neutral-800 mb-2" />
                <div>
                  <div className="font-poppins text-xs font-bold text-neutral-900">Human in Loop</div>
                  <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">Official Decree</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Ultra-Minimal Login Card (Reference Image 1) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] border border-neutral-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-7 sm:p-9 relative transition-all">
              
              {/* Minimal Dynamic Pill / Phone Mockup Element */}
              <div className="w-16 h-3.5 bg-neutral-900 rounded-full mx-auto mb-6 opacity-90"></div>

              {/* Minimalist Circular University Emblem / Monogram */}
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md">
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

              {/* Sub-Title in Professional Font */}
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
                
                {/* Email Address / Register Number Input */}
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

                {/* Remember Me & Forgot Password / Need Help */}
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
                  className="w-full py-3 px-4 rounded-xl bg-[#18181b] hover:bg-black text-white text-sm font-medium transition-all shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Legal Disclaimer matching Reference Image 1 */}
                <p className="text-[10px] text-neutral-400 text-center leading-relaxed pt-1">
                  By logging in, you agree to our{' '}
                  <span className="text-neutral-700 underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-neutral-700 underline cursor-pointer">Privacy Policy</span>.
                </p>

                {/* 1-Click Fast Demo Credentials */}
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
          </div>

        </div>
      </main>

      {/* Minimal Bottom Strip */}
      <footer className="w-full py-3 px-6 text-center text-[11px] text-neutral-400 border-t border-neutral-200/80 bg-white/50">
        © 2026 Noorul Islam Centre for Higher Education (NICHE). Directorate of Student Grievance Redressal.
      </footer>

    </div>
  );
}
