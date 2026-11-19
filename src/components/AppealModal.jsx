import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AppealModal({ grievance, onClose, onSubmitAppeal }) {
  const [statement, setStatement] = useState('');
  const [error, setError] = useState('');

  if (!grievance) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statement.trim() || statement.length < 15) {
      setError('Please provide grounds for appeal (at least 15 characters).');
      return;
    }

    onSubmitAppeal(grievance.id, statement, false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] rounded-2xl max-w-lg w-full border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="font-poppins text-lg font-semibold text-white">
              Lodge Statutory Appeal
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Docket {grievance.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Grounds for Appeal
            </label>
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => {
                setStatement(e.target.value);
                setError('');
              }}
              placeholder="State why the initial order or handling requires appellate review..."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 resize-none leading-relaxed"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Submit Appeal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-white/10 text-neutral-400 hover:text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
