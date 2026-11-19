import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function GrievanceTracker({ 
  grievances = [], 
  selectedDocketId = null,
  onViewOrder,
  onOpenFeedback,
  onOpenAppeal
}) {
  const [searchQuery, setSearchQuery] = useState(selectedDocketId || '');
  const [activeGrievance, setActiveGrievance] = useState(null);

  useEffect(() => {
    if (selectedDocketId) {
      const found = grievances.find(g => g.id.toLowerCase() === selectedDocketId.toLowerCase());
      if (found) {
        setActiveGrievance(found);
        setSearchQuery(found.id);
        return;
      }
    }
    if (!activeGrievance && grievances.length > 0) {
      setActiveGrievance(grievances[0]);
      setSearchQuery(grievances[0].id);
    }
  }, [selectedDocketId, grievances]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = grievances.find(
      g => g.id.toLowerCase() === query || 
           (g.rollNumber && g.rollNumber.toLowerCase() === query) ||
           (g.trackingPin && g.trackingPin === query)
    );

    if (found) {
      setActiveGrievance(found);
    } else {
      alert(`No docket found matching "${searchQuery}".`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          Track Docket
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Real-time case inspection and official resolution order verification.
        </p>
      </div>

      {/* Clean Search Input */}
      <div className="mb-10">
        <form onSubmit={handleSearch} className="flex gap-2 bg-black/60 border border-white/10 rounded-xl p-1.5 focus-within:border-white/30 transition-colors">
          <div className="flex-1 flex items-center">
            <Search className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Docket ID or PIN..."
              className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        {/* Quick select pills */}
        {grievances.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px] font-mono text-neutral-400">
            <span>Dockets:</span>
            {grievances.slice(0, 4).map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setActiveGrievance(g);
                  setSearchQuery(g.id);
                }}
                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  activeGrievance?.id === g.id
                    ? 'border-white text-white bg-white/10'
                    : 'border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {g.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Docket Information Card */}
      {activeGrievance ? (
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-1">
                Docket ID: <strong className="text-white">{activeGrievance.id}</strong>
              </span>
              <span className="font-mono text-[11px] text-neutral-400">
                PIN: {activeGrievance.trackingPin}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono px-3 py-1 rounded-full border border-white/20 text-white bg-white/[0.05]">
                {activeGrievance.status}
              </span>
            </div>
          </div>

          {/* Subject & Category */}
          <div>
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 block mb-2">
              {activeGrievance.category}
            </span>
            <h2 className="font-poppins text-xl font-medium text-white leading-relaxed">
              {activeGrievance.subject}
            </h2>
          </div>

          {/* Statement snippet */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs text-neutral-300 leading-relaxed font-light">
            {activeGrievance.statement}
          </div>

          {/* Timeline / Key Milestones */}
          {activeGrievance.timeline && activeGrievance.timeline.length > 0 && (
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block mb-3">
                Latest Progress
              </span>
              <div className="space-y-2">
                {activeGrievance.timeline.slice(-3).map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs py-1.5 border-b border-white/[0.04]">
                    <div>
                      <span className="text-neutral-200 font-medium">{item.step}</span>
                      {item.note && <p className="text-[11px] text-neutral-400 mt-0.5">{item.note}</p>}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 shrink-0 ml-4">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-mono text-neutral-400">
              SLA: {activeGrievance.slaHours || 48} Hours
            </span>
            <div className="flex items-center gap-3">
              {activeGrievance.resolutionOrder && (
                <button
                  type="button"
                  onClick={() => onViewOrder(activeGrievance)}
                  className="px-4 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  View Resolution Order
                </button>
              )}
              {activeGrievance.status === 'Resolved' && onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => onOpenFeedback(activeGrievance)}
                  className="px-4 py-2 border border-white/10 text-neutral-300 text-xs font-medium rounded-lg hover:border-white/30 hover:text-white transition-colors cursor-pointer"
                >
                  Submit Feedback
                </button>
              )}
              {activeGrievance.status !== 'Resolved' && onOpenAppeal && (
                <button
                  type="button"
                  onClick={() => onOpenAppeal(activeGrievance)}
                  className="px-4 py-2 border border-white/10 text-neutral-400 hover:text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Lodge Appeal
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center text-xs text-neutral-400 border border-white/[0.08] rounded-2xl">
          No docket record selected.
        </div>
      )}

    </div>
  );
}
