import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react';
import highResCampusPhoto from '../assets/niche_highres.png';
import nicheLogo from '../assets/niche_logo.png';

export default function LoginPage({ onLogin }) {
  // 'gateway' (Starting Page with 4K HD Campus) | 'portal_select' (Student Sign-In Form Page)
  const [viewMode, setViewMode] = useState('gateway');

  // Login Form States (Prefilled for smooth presentation demo)
  const [registerNumber, setRegisterNumber] = useState('1123237031');
  const [password, setPassword] = useState('student@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerNumber.trim()) {
      setError('Please enter your Student Register / Roll Number.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Please enter a valid password (minimum 4 characters).');
      return;
    }

    const user = {
      role: 'student',
      id: registerNumber.trim().toUpperCase(),
      name: registerNumber.includes('1123237031') || registerNumber.includes('CS101') ? 'ADHIKESHAV A S' : 'Registered Student',
      department: 'Department of Computer Science & Engineering',
      semester: '7th Semester, B.E.',
      email: `${registerNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}@niuniv.com`,
      loggedInAt: new Date().toISOString()
    };
    onLogin(user);
  };

  // Instant 1-Click Quick Demo Login for Student
  const handleQuickDemoLogin = () => {
    const studentUser = {
      role: 'student',
      id: '1123237031',
      name: 'ADHIKESHAV A S',
      department: 'Department of Computer Science & Engineering',
      semester: '7th Semester, B.E.',
      email: 'adhikeshav.cse@niuniv.com',
      loggedInAt: new Date().toISOString()
    };
    onLogin(studentUser);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* ============================================================== */}
      {/* VIEW 1: STARTING PAGE (4K HD BACKGROUND & CINEMATIC THEME)     */}
      {/* ============================================================== */}
      {viewMode === 'gateway' ? (
        <div className="relative z-10 min-h-screen flex flex-col justify-between p-6 sm:p-10 animate-fadeIn">
          
          {/* Background Image with Dark Vignette */}
          <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
            <img 
              src={highResCampusPhoto} 
              alt="Noorul Islam Centre for Higher Education Campus" 
              className="w-full h-full object-cover object-center opacity-65 filter brightness-[0.75] contrast-125 scale-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/65" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.70)_100%)]" />
          </div>

          {/* Top Bar */}
          <header className="relative z-10 flex items-center justify-between text-xs tracking-wider">
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

          {/* Centerpiece Hero */}
          <main className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
            
            {/* University Name in Poppins Font */}
            <h1 className="font-poppins font-bold uppercase tracking-[0.22em] text-white text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] drop-shadow-2xl">
              Noorul Islam Centre For
              <span className="block mt-2 sm:mt-3">Higher Education</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans uppercase tracking-[0.35em] text-xs sm:text-sm md:text-base font-medium text-neutral-300 mt-5 sm:mt-6 drop-shadow-md max-w-2xl">
              Student Grievance Redressal Portal
            </p>

            {/* "SIGN IN" Button */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setViewMode('portal_select')}
                className="px-10 sm:px-12 py-3 sm:py-3.5 border border-white/90 hover:border-white bg-black/40 hover:bg-white text-white hover:text-black uppercase tracking-[0.3em] text-xs font-semibold transition-all duration-300 shadow-2xl backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            </div>

          </main>

          {/* Footer Bar */}
          <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 tracking-wider gap-2">
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
        /* VIEW 2: STUDENT SIGN-IN PAGE                                   */
        /* ============================================================== */
        <div className="relative z-10 min-h-screen flex flex-col justify-between p-6 sm:p-10 bg-[#0A101D] animate-fadeIn overflow-hidden">
          
          {/* Subtle Ambient Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A101D] via-[#0E1626] to-[#080D18] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,45,77,0.18)_0%,transparent_75%)] pointer-events-none" />

          {/* Giant "N I C H E" Watermark */}
          <div className="absolute inset-0 flex items-center justify-around pointer-events-none select-none overflow-hidden z-0 px-4 sm:px-12 opacity-60">
            <span className="font-poppins font-black text-[15vw] text-white/[0.045] leading-none">N</span>
            <span className="font-poppins font-black text-[15vw] text-white/[0.045] leading-none">I</span>
            <span className="font-poppins font-black text-[15vw] text-white/[0.045] leading-none">C</span>
            <span className="font-poppins font-black text-[15vw] text-white/[0.045] leading-none">H</span>
            <span className="font-poppins font-black text-[15vw] text-white/[0.045] leading-none">E</span>
          </div>

          {/* Top Bar with Back button and Logo */}
          <header className="relative z-10 flex items-center justify-between text-xs py-1">
            <button
              type="button"
              onClick={() => {
                setViewMode('gateway');
                setError('');
              }}
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white uppercase tracking-[0.2em] text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            <div className="font-poppins uppercase tracking-[0.22em] text-xs sm:text-[13px] text-neutral-200 font-semibold text-center hidden sm:block">
              NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
            </div>

            {/* Official NICHE University Logo */}
            <div className="flex items-center justify-end">
              <img 
                src={nicheLogo} 
                alt="Noorul Islam Centre for Higher Education" 
                className="h-8 sm:h-9 md:h-10 object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.30)] hover:scale-105 transition-transform"
              />
            </div>
          </header>

          {/* Centerpiece: Student Sign-In Card */}
          <main className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
            
            <div className="w-full max-w-[440px] rounded-3xl border border-white/15 bg-white/[0.035] backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative">
              
              {/* Student Monogram Badge */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4 shadow-md border border-white/15">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <span className="font-sans uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-semibold text-neutral-400 block mb-1">
                  INSTITUTIONAL ACCESS
                </span>
                <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white tracking-wide">
                  STUDENT PORTAL
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Sign in with your university register / roll number
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Register / Roll Number
                  </label>
                  <input
                    type="text"
                    value={registerNumber}
                    onChange={(e) => {
                      setRegisterNumber(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. 1123237031"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm text-white placeholder:text-neutral-500 focus:bg-white/10 focus:border-white focus:outline-none transition-all uppercase font-mono"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5 uppercase tracking-wider">
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
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm text-white placeholder:text-neutral-500 focus:bg-white/10 focus:border-white focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-95"
                >
                  <span>Sign In as Student</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 1-Click Fast Demo Login Button */}
                <div className="pt-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white border border-white/20 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>⚡ Instant 1-Click Access (Adhikeshav A S)</span>
                  </button>
                </div>

              </form>

            </div>

          </main>

          {/* Bottom Footer */}
          <footer className="relative z-10 text-center py-2">
            <span className="font-sans uppercase tracking-[0.25em] text-[11px] text-neutral-400 font-medium">
              STUDENT GRIEVANCE REDRESSAL PORTAL OF NICHE
            </span>
          </footer>

        </div>
      )}

    </div>
  );
}
