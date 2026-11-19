import React, { useState } from 'react';
import { BookOpen, Shield, Scale, FileText, CheckCircle2, ChevronDown, ChevronRight, Download } from 'lucide-react';
import { BYLAWS_DATABASE } from '../services/triageEngine';

export default function PolicyDirectory() {
  const [openPolicy, setOpenPolicy] = useState(0);

  const detailedPolicies = [
    {
      code: 'UGC-REG-2023',
      title: 'UGC (Redressal of Grievances of Students) Regulations, 2023',
      authority: 'University Grants Commission (Statutory Notification)',
      effectiveDate: 'April 11, 2023',
      summary: 'Mandates creation of Collegiate & University Student Grievance Redressal Committees (SGRC) and appointment of an Ombudsperson. Establishes a 15-day strict ceiling for petition disposal and appellate guarantees.',
      provisions: [
        'Establishment of Central and Departmental Student Grievance Redressal Committees with student representatives.',
        'Appointment of a retired District Judge or eminent academician of Professor rank as independent Ombudsperson.',
        'Mandatory online portal for transparent lodgment, tracking, and tracking PIN generation.',
        'Strict prohibition against institutional victimisation of students filing legitimate petitions.'
      ]
    },
    {
      code: 'ORD-14B-EVAL',
      title: 'University Ordinance 14-B: Answer Script Inspection & Re-evaluation',
      authority: 'Academic Council & Board of Examinations',
      effectiveDate: 'Academic Session 2024-25',
      summary: 'Governs the rights of students to inspect evaluated end-semester answer scripts and apply for independent reassessment in cases of computational omission or marking variance.',
      provisions: [
        'Right to receive digitized photocopy of evaluated answer script within 7 calendar days of results declaration.',
        'Zero-fee automatic correction for unassessed answers or computational addition errors.',
        'Referral to external senior examiner where student demonstrates prima facie discrepancy exceeding 10% of total course marks.'
      ]
    },
    {
      code: 'FIN-CIR-2024-09',
      title: 'University Finance & Bursar Manual: Fee Reconciliation & Caution Deposit',
      authority: 'Finance Division & Comptroller of Accounts',
      effectiveDate: 'July 1, 2024',
      summary: 'Regulates payment gateway settlements, accidental duplicate fee remittances, hostel caution money refunds, and late-fee waiver parameters.',
      provisions: [
        'Duplicate banking debits to be reconciled and refunded within 72 banking hours of validated statement.',
        'Full caution deposit clearance to be remitted via Direct Benefit Transfer within 14 days of final semester no-dues clearance.',
        'Automatic waiver of late semester fee fines where server downtime is documented by University IT cell.'
      ]
    },
    {
      code: 'HOSTEL-MANUAL-11',
      title: 'Central Residential Welfare Code & Living Standards Manual',
      authority: 'Directorate of Student Welfare & Proctorial Council',
      effectiveDate: 'August 15, 2024',
      summary: 'Defines statutory living standards for campus halls of residence, potable water quality, electrical maintenance response SLAs, and dining mess hygiene inspections.',
      provisions: [
        'Potable reverse-osmosis water supply with mandatory monthly certified bacteriological laboratory testing.',
        'Emergency hostel maintenance response time: maximum 24 hours for water/electrical outages.',
        'Establishment of student-elected Mess Committees with executive authority to reject sub-standard vendor rations.'
      ]
    },
    {
      code: 'STATUTORY-RAGGING-ACT',
      title: 'Supreme Court & UGC Mandate on Curbing the Menace of Ragging',
      authority: 'Statutory Anti-Ragging Cell & Internal Complaints Committee',
      effectiveDate: 'Mandatory Standing Statutory Enactment',
      summary: 'Enforces zero-tolerance against harassment, ragging, physical hazing, and psychological abuse. Enacts immediate 24-hour statutory inquiry and physical protective orders.',
      provisions: [
        'Immediate 24-hour preliminary fact-finding upon receipt of petition, with interim hostel suspension for named respondents.',
        'Absolute confidentiality and identity shielding under Whistleblower Protocol.',
        'Criminal lodging of First Information Report (FIR) under Indian Penal Code for cognizable harassment offenses.'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-institutional-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-crest-gold/20 text-crest-goldDark font-bold text-xs uppercase tracking-wider border border-crest-gold/30 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Statutory Regulatory Repository
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-crest-navy">
          University Grievance Charter & Statutory Bylaws
        </h2>
        <p className="text-sm text-institutional-600 mt-1 max-w-3xl leading-relaxed">
          Comprehensive legal provisions, rights of appeal, and statutory operational standards governing student welfare, examination evaluations, and residential facilities at Noorul Islam Centre for Higher Education (NICHE).
        </p>
      </div>

      {/* Policies Accordion */}
      <div className="space-y-4 mb-12">
        {detailedPolicies.map((pol, idx) => {
          const isOpen = openPolicy === idx;
          return (
            <div 
              key={pol.code}
              className="bg-white rounded-xl border border-institutional-200 shadow-sm overflow-hidden transition-all"
            >
              <div
                onClick={() => setOpenPolicy(isOpen ? -1 : idx)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-institutional-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-crest-navy text-crest-goldLight flex items-center justify-center font-bold text-xs shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-crest-navy bg-institutional-100 px-2 py-0.5 rounded border border-institutional-200">
                        {pol.code}
                      </span>
                      <span className="text-[11px] text-institutional-500 font-medium">
                        {pol.authority}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-serif text-institutional-900 mt-1">
                      {pol.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-institutional-400">
                  {isOpen ? <ChevronDown className="w-5 h-5 text-crest-navy" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-institutional-100 text-xs text-institutional-800 space-y-4 bg-institutional-50/40">
                  <div className="p-3.5 bg-white rounded-lg border border-institutional-200 text-institutional-700 leading-relaxed italic">
                    "{pol.summary}"
                  </div>

                  <div>
                    <h4 className="font-bold text-institutional-900 uppercase tracking-wider mb-2">
                      Key Operative Rights & Standard Operating Procedures:
                    </h4>
                    <ul className="space-y-2 pl-4 list-disc text-institutional-700 leading-relaxed">
                      {pol.provisions.map((prov, i) => (
                        <li key={i}>{prov}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-institutional-200 text-[11px] text-institutional-500">
                    <span>Effective Date: <strong>{pol.effectiveDate}</strong></span>
                    <button
                      type="button"
                      onClick={() => alert(`Simulating download of certified gazette copy: ${pol.code}`)}
                      className="text-crest-navy hover:underline font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Official Gazette Notification (PDF)
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Escalation Hierarchy Diagram */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-institutional-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold font-serif text-crest-navy mb-1 flex items-center gap-2">
          <Shield className="w-5 h-5 text-crest-gold" />
          Three-Tier Statutory Escalation Matrix
        </h3>
        <p className="text-xs text-institutional-600 mb-6">
          Institutional redressal protocol as mandated by the University Grants Commission:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-institutional-50 border border-institutional-200 relative">
            <span className="text-[10px] font-bold text-crest-navy bg-crest-navy/10 px-2 py-0.5 rounded uppercase block w-max mb-2">
              Tier 1 • Primary Intake
            </span>
            <h4 className="font-bold text-institutional-900 text-sm">
              Departmental Redressal Sub-Committee
            </h4>
            <p className="text-institutional-600 mt-1 leading-relaxed">
              Headed by Course Faculty Advisor & Head of Department. Resolves evaluation queries, attendance shortages, and syllabus grievances within 48 hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-institutional-50 border border-institutional-200 relative">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase block w-max mb-2">
              Tier 2 • Standing Committee
            </span>
            <h4 className="font-bold text-institutional-900 text-sm">
              Central Student Grievance Committee (SGRC)
            </h4>
            <p className="text-institutional-600 mt-1 leading-relaxed">
              Presided by Deans of Academic Affairs, Student Welfare, Controller of Examinations, or ICC. Issues legally binding formal resolution orders.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-crest-navy/5 border border-crest-navy/20 relative">
            <span className="text-[10px] font-bold text-crest-goldDark bg-crest-gold/20 px-2 py-0.5 rounded uppercase block w-max mb-2">
              Tier 3 • Appellate Jurisdiction
            </span>
            <h4 className="font-bold text-crest-navy text-sm">
              Office of the Independent Ombudsperson
            </h4>
            <p className="text-institutional-700 mt-1 leading-relaxed">
              Appointed pursuant to UGC Regulations. Hears appeals against Tier 2 decrees. Final arbiter of university student justice.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
