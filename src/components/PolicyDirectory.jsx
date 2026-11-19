import React from 'react';

export default function PolicyDirectory() {
  const regulations = [
    {
      code: 'UGC-REG-2023',
      title: 'UGC Student Grievance Redressal Regulations',
      authority: 'University Grants Commission',
      points: [
        'Mandatory Student Grievance Redressal Committee (SGRC) with student representation.',
        'Appointment of an independent Ombudsperson (retired District Judge or Senior Professor).',
        'Strict 15-day statutory turnaround ceiling for petition disposal and formal decree issuance.',
        'Absolute legal prohibition against any form of institutional victimisation.'
      ]
    },
    {
      code: 'ORD-14B-EVAL',
      title: 'Examination Evaluation & Re-assessment Code',
      authority: 'Board of Examinations, NICHE',
      points: [
        'Right to inspect digitized photocopies of evaluated answer scripts within 7 days.',
        'Zero-fee automatic reconciliation for unassessed answers or calculation errors.',
        'Independent reassessment by external examiners for discrepancies exceeding 10%.'
      ]
    },
    {
      code: 'FIN-CIR-2024',
      title: 'Fee Reconciliation & Refund Norms',
      authority: 'Finance & Accounts Directorate, NICHE',
      points: [
        'Duplicate online payment deductions refunded within 72 banking hours.',
        'Caution money clearance remitted via Direct Benefit Transfer within 14 days of clearance.',
        'Automatic waiver of late semester fee fines for documented portal downtime.'
      ]
    },
    {
      code: 'ANTI-RAG-2023',
      title: 'Statutory Anti-Ragging & Safety Charter',
      authority: 'Proctorial Council & ICC, NICHE',
      points: [
        'Zero-tolerance policy enforced with immediate 24-hour inquiry upon petition.',
        'Whistleblower identity masking and total confidentiality guaranteed.',
        'Direct referral for legal proceedings under applicable statutory provisions.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="mb-12">
        <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          Regulations
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Statutory student rights, institutional frameworks, and operational standards.
        </p>
      </div>

      {/* Minimalist Cards Grid */}
      <div className="space-y-6">
        {regulations.map((reg) => (
          <div 
            key={reg.code}
            className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="font-mono text-xs text-neutral-400">
                {reg.code}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {reg.authority}
              </span>
            </div>

            <h2 className="font-poppins text-xl font-medium text-white mb-4">
              {reg.title}
            </h2>

            <ul className="space-y-2 text-xs text-neutral-300 font-light leading-relaxed">
              {reg.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 select-none">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
