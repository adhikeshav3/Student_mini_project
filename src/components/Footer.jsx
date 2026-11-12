import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Building2, Scale, RefreshCw } from 'lucide-react';

export default function Footer({ onResetData }) {
  return (
    <footer className="bg-crest-deep text-white border-t-2 border-crest-gold/40 mt-16 no-print">
      
      {/* Upper Information Deck */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: University Seal & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-crest-navy text-crest-goldLight flex items-center justify-center border border-crest-gold/30 p-1.5">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-current">
                  <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M24 7L10 14V17H38V14L24 7Z" fill="currentColor" />
                  <rect x="13" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                  <rect x="20" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                  <rect x="25" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                  <rect x="32" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
                  <rect x="8" y="34" width="32" height="3" rx="0.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white tracking-tight">
                  NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
                </h3>
                <p className="text-[10px] text-crest-goldLight font-semibold tracking-wider uppercase">
                  Statutory Student Grievance Redressal Directorate
                </p>
              </div>
            </div>

            <p className="text-xs text-institutional-300 leading-relaxed font-normal">
              Deemed to be University under section 3 of UGC Act 1956. Kumaracoil, Thuckalay, Kanyakumari District, Tamil Nadu, India - 629180. Accredited by NAAC.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold text-crest-goldLight bg-crest-gold/15 px-2.5 py-1 rounded border border-crest-gold/30">
                NAAC Accredited
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2.5 py-1 rounded border border-emerald-500/30">
                UGC Section 3 Validated
              </span>
            </div>
          </div>

          {/* Col 2: Statutory Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-crest-goldLight uppercase tracking-wider font-mono">
              Statutory Support Desks
            </h4>
            <div className="space-y-2.5 text-xs text-institutional-200">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-crest-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">NICHE Campus Helpline:</p>
                  <p className="text-crest-goldLight font-mono">04651-205800 / 205801</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Internal Complaints Committee (ICC):</p>
                  <p className="text-institutional-300">icc@niuniv.com</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central Ombudsperson Desk:</p>
                  <p className="text-institutional-300">ombudsperson@niuniv.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: University Governance & Ordinances */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-crest-goldLight uppercase tracking-wider font-mono">
              Regulatory Framework
            </h4>
            <ul className="space-y-2 text-xs text-institutional-300">
              <li className="hover:text-white transition-colors cursor-pointer">
                • UGC Student Grievance Regulations, 2023
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                • University Ordinance 14-B (Evaluation Code)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                • Residential Welfare & Hostel Living Manual
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                • Finance Circular on Tuition Fee Reconciliation
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                • Whistleblower & Anonymity Shield Policy
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Headquarters & Reset */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-crest-goldLight uppercase tracking-wider font-mono">
              Directorate Headquarters
            </h4>
            <div className="space-y-2 text-xs text-institutional-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-crest-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Office of the University Ombudsperson<br />
                  Administrative Complex, Ground Floor<br />
                  Noorul Islam Centre for Higher Education<br />
                  Kumaracoil, Thuckalay, Pin 629180
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onResetData}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-crest-goldLight text-[11px] font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
                  title="Reload default sample university dockets"
                >
                  <RefreshCw className="w-3 h-3" />
                  Restore Institutional Demo Seeds
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="border-t border-white/10 py-4 px-4 sm:px-8 text-center text-xs text-institutional-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Noorul Islam Centre for Higher Education (NICHE). All Statutory Rights Reserved.</p>
          <p className="text-[11px] text-institutional-400">
            Intelligent Student Grievance Redressal System • Directorate of Student Affairs
          </p>
        </div>
      </div>

    </footer>
  );
}
