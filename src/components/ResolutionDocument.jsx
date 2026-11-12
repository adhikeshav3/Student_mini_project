import React from 'react';
import { Printer, X, Download, ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';

export default function ResolutionDocument({ grievance, onClose }) {
  if (!grievance || !grievance.resolutionOrder) return null;

  const order = grievance.resolutionOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative bg-white max-w-4xl w-full my-8 rounded-xl shadow-2xl border border-institutional-300 overflow-hidden print-page">
        
        {/* Floating Top Control Bar (Hidden when printing) */}
        <div className="bg-crest-deep text-white px-6 py-3 flex items-center justify-between border-b border-crest-gold/40 no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-crest-goldLight" />
            <span className="text-xs font-bold uppercase tracking-wider text-crest-goldLight font-mono">
              Certified Statutory Redressal Decree • Docket {grievance.id}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-crest-gold hover:bg-crest-goldLight text-crest-deep text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Legal Document Content */}
        <div className="p-8 sm:p-14 text-institutional-950 font-serif leading-relaxed bg-white">
          
          {/* Official Letterhead & Crest */}
          <div className="text-center border-b-2 border-crest-navy pb-6 mb-8 relative">
            <div className="w-16 h-16 mx-auto mb-3 text-crest-navy">
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

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-crest-navy uppercase">
              Noorul Islam Centre for Higher Education
            </h1>
            <p className="text-xs font-sans font-semibold tracking-wider text-institutional-600 uppercase mt-1">
              (Deemed to be University under section 3 of UGC Act 1956) • Kumaracoil, Thuckalay
            </p>
            <p className="text-[11px] font-sans text-institutional-500 mt-0.5">
              Accredited by NAAC • Statutory Student Grievance Redressal Committee
            </p>

            <div className="inline-block mt-4 px-4 py-1 border-t border-b border-crest-gold text-crest-navy font-bold text-xs uppercase tracking-widest font-sans">
              Formal Redressal Resolution Order
            </div>
          </div>

          {/* Reference Particulars */}
          <div className="grid grid-cols-2 text-xs font-sans mb-8 gap-4 border-b border-institutional-200 pb-4">
            <div>
              <p><span className="text-institutional-500 font-semibold">ORDER REFERENCE NO:</span> <strong className="font-mono text-crest-navy">{order.orderNumber}</strong></p>
              <p className="mt-1"><span className="text-institutional-500 font-semibold">ORIGINAL DOCKET ID:</span> <strong className="font-mono text-crest-navy">{grievance.id}</strong></p>
              <p className="mt-1"><span className="text-institutional-500 font-semibold">JURISDICTION:</span> <strong>{grievance.committee.name}</strong></p>
            </div>
            <div className="text-right">
              <p><span className="text-institutional-500 font-semibold">DATE OF PRONOUNCEMENT:</span> <strong>{order.date}</strong></p>
              <p className="mt-1"><span className="text-institutional-500 font-semibold">STATUTORY CITATION:</span> <strong>{order.statutoryCitation}</strong></p>
              <p className="mt-1"><span className="text-institutional-500 font-semibold">DISPOSAL CLASSIFICATION:</span> <strong className="text-emerald-800">Final Binding Order</strong></p>
            </div>
          </div>

          {/* Parties to the Grievance */}
          <div className="bg-institutional-50 p-4 rounded-lg border border-institutional-200 text-xs font-sans mb-8">
            <p className="font-bold text-institutional-800 uppercase tracking-wider mb-2">Parties on Record:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-institutional-500 block">Applicant / Petitioner:</span>
                <strong className="text-institutional-900 text-sm">{grievance.studentName}</strong>
                <span className="block text-institutional-600">Roll No: {grievance.rollNumber}</span>
                <span className="block text-institutional-600">{grievance.department}</span>
              </div>
              <div>
                <span className="text-institutional-500 block">Respondent Authority:</span>
                <strong className="text-institutional-900 text-sm">{grievance.committee.name}</strong>
                <span className="block text-institutional-600">Presided by: {order.authorityName}</span>
                <span className="block text-institutional-600">{order.designation}</span>
              </div>
            </div>
          </div>

          {/* Grievance Statement Summary */}
          <div className="mb-8">
            <h3 className="text-xs font-sans font-bold text-institutional-800 uppercase tracking-wider border-b border-institutional-200 pb-1 mb-2">
              1. Matter in Controversy & Petition Recital:
            </h3>
            <p className="text-sm text-institutional-900 italic pl-3 border-l-2 border-institutional-300">
              "{grievance.statement.split('\n\n')[0]}"
            </p>
          </div>

          {/* Findings of the Standing Redressal Committee */}
          <div className="mb-8">
            <h3 className="text-xs font-sans font-bold text-institutional-800 uppercase tracking-wider border-b border-institutional-200 pb-1 mb-2">
              2. Findings of Fact & Committee Deliberations:
            </h3>
            <p className="text-sm text-institutional-900 leading-relaxed text-justify">
              {order.findingsSummary}
            </p>
          </div>

          {/* Operative Directives & Remedial Orders */}
          <div className="mb-10">
            <h3 className="text-xs font-sans font-bold text-institutional-800 uppercase tracking-wider border-b border-institutional-200 pb-1 mb-2">
              3. Operative Directives & Mandatory Orders:
            </h3>
            <p className="text-xs text-institutional-600 font-sans mb-3">
              In exercise of statutory powers conferred under University Statues and UGC Student Grievance Regulations, 2023, the undersigned authority hereby decrees:
            </p>
            
            <ol className="list-decimal pl-6 space-y-2.5 text-sm text-institutional-950 font-medium">
              {order.directives.map((dir, idx) => (
                <li key={idx} className="pl-1">
                  {dir}
                </li>
              ))}
            </ol>

            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-sans text-emerald-900 flex items-center justify-between">
              <span>MANDATORY COMPLIANCE TIMELINE: <strong>{order.complianceDeadline}</strong></span>
              <span>SUPERVISING OFFICER: <strong>Joint Registrar (Compliance)</strong></span>
            </div>
          </div>

          {/* Execution & Digital Seal Stamp */}
          <div className="pt-8 border-t-2 border-institutional-200 grid grid-cols-2 items-end">
            
            {/* Seal Graphic */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-crest-gold p-1 flex items-center justify-center text-crest-goldDark text-center font-sans text-[8.5px] font-bold uppercase leading-tight">
                <div>
                  <Award className="w-5 h-5 mx-auto text-crest-gold" />
                  Noorul Islam<br/>Official Seal<br/>NICHE 2026
                </div>
              </div>
              <div className="text-[10px] font-sans text-institutional-500 space-y-0.5">
                <p>DIGITALLY SIGNED & SEALED</p>
                <p className="font-mono">HASH: 7f9a2b8e4d1c920</p>
                <p>VERIFIED ON NICHE SENATE LEDGER</p>
              </div>
            </div>

            {/* Officer Signature Block */}
            <div className="text-right font-sans">
              <div className="inline-block border-b border-institutional-400 pb-1 w-48 text-center">
                <p className="font-serif italic text-base text-crest-navy font-bold">
                  {order.authorityName}
                </p>
              </div>
              <p className="font-bold text-xs text-institutional-900 mt-1">{order.authorityName}</p>
              <p className="text-[11px] text-institutional-600">{order.designation}</p>
              <p className="text-[10px] text-institutional-400">Authorized Signatory • NICHE</p>
            </div>

          </div>

          {/* Appellate Note */}
          <div className="mt-10 pt-4 border-t border-institutional-200 text-[10px] font-sans text-institutional-500 text-center">
            Notice: If aggrieved by this order, a statutory first appeal may be submitted before the University Ombudsperson within 15 calendar days pursuant to UGC Grievance Redressal Regulations.
          </div>

        </div>

      </div>

    </div>
  );
}
