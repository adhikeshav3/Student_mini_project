import React, { useState } from 'react';
import { UNIVERSITY_OFFICERS } from '../data/mockGrievances';

export default function OfficerWorkbench({ 
  grievances = [], 
  onUpdateStatus, 
  onIssueOrder,
  onViewDocket 
}) {
  const [selectedOfficer, setSelectedOfficer] = useState(UNIVERSITY_OFFICERS[0]);
  const [activeCase, setActiveCase] = useState(null);
  const [statusInput, setStatusInput] = useState('');
  const [statusNote, setStatusNote] = useState('');

  // Order Form
  const [orderDirective, setOrderDirective] = useState('');
  const [complianceDeadline, setComplianceDeadline] = useState('Within 48 Hours');

  const handleSelectCase = (g) => {
    setActiveCase(g);
    setStatusInput(g.status);
    setStatusNote('');
    setOrderDirective(`Direct the department to address the grievance filed by ${g.studentName}.`);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!activeCase || !statusInput) return;
    onUpdateStatus(activeCase.id, statusInput, selectedOfficer.name, statusNote || `Status changed to ${statusInput}`);
    setActiveCase(prev => ({ ...prev, status: statusInput }));
    alert(`Docket ${activeCase.id} updated to "${statusInput}".`);
  };

  const handleIssueDecree = (e) => {
    e.preventDefault();
    if (!activeCase || !orderDirective.trim()) return;

    onIssueOrder(activeCase.id, {
      authorityName: selectedOfficer.name,
      designation: selectedOfficer.designation,
      statutoryCitation: 'UGC Student Grievance Regulations, 2023',
      findingsSummary: `The competent authority has reviewed records for Docket ${activeCase.id} and issued statutory directions.`,
      directives: [orderDirective.trim()],
      complianceDeadline
    });

    alert(`Formal Resolution Order issued for Docket ${activeCase.id}.`);
    setActiveCase(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      
      {/* Title & Officer Persona Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-poppins text-3xl font-semibold text-white tracking-tight mb-1">
            Staff Portal
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Authorized committee review and resolution desk.
          </p>
        </div>

        {/* Officer Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-mono">Officer:</span>
          <select
            value={selectedOfficer.id}
            onChange={(e) => {
              const off = UNIVERSITY_OFFICERS.find(o => o.id === e.target.value);
              if (off) setSelectedOfficer(off);
            }}
            className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30 font-mono"
          >
            {UNIVERSITY_OFFICERS.map((off) => (
              <option key={off.id} value={off.id} className="bg-black text-white">
                {off.name} ({off.designation.split(',')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Case Management Modal / View when activeCase selected */}
      {activeCase ? (
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-1">
                Docket {activeCase.id}
              </span>
              <h2 className="font-poppins text-xl font-medium text-white">
                {activeCase.subject}
              </h2>
            </div>
            <button
              onClick={() => setActiveCase(null)}
              className="text-xs text-neutral-400 hover:text-white font-mono cursor-pointer"
            >
              ← Back to Queue
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Update Status */}
            <form onSubmit={handleUpdate} className="space-y-4">
              <h3 className="font-poppins text-sm font-medium text-white uppercase tracking-wider">
                Update Status
              </h3>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-mono">Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                >
                  <option value="Under Review" className="bg-black text-white">Under Review</option>
                  <option value="Hearing Scheduled" className="bg-black text-white">Hearing Scheduled</option>
                  <option value="Action Directed" className="bg-black text-white">Action Directed</option>
                  <option value="Resolved" className="bg-black text-white">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-mono">Remarks</label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Optional note for timeline..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Apply Status
              </button>
            </form>

            {/* Issue Resolution Order */}
            <form onSubmit={handleIssueDecree} className="space-y-4 md:border-l md:border-white/[0.08] md:pl-8">
              <h3 className="font-poppins text-sm font-medium text-white uppercase tracking-wider">
                Issue Resolution Decree
              </h3>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-mono">Directive</label>
                <textarea
                  rows={3}
                  value={orderDirective}
                  onChange={(e) => setOrderDirective(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-mono">Compliance Deadline</label>
                <input
                  type="text"
                  value={complianceDeadline}
                  onChange={(e) => setComplianceDeadline(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 border border-white/20 text-white hover:bg-white/10 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Issue Order
              </button>
            </form>

          </div>
        </div>
      ) : (
        /* Dockets Queue Table */
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-poppins text-sm font-medium text-white uppercase tracking-wider">
              Pending Docket Queue ({grievances.length})
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">
              Active Session
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {grievances.map((g) => (
              <div 
                key={g.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium text-neutral-300">
                      {g.id}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-white/10 text-neutral-400">
                      {g.status}
                    </span>
                  </div>
                  <h3 className="text-sm text-white font-medium">
                    {g.subject}
                  </h3>
                  <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-3">
                    <span>{g.studentName}</span>
                    <span>•</span>
                    <span>{g.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSelectCase(g)}
                    className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => onViewDocket(g.id)}
                    className="px-3 py-1.5 border border-white/10 text-neutral-400 hover:text-white text-xs font-mono rounded-lg transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
