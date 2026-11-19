import React, { useState } from 'react';
import { CATEGORIES } from '../services/triageEngine';

export default function GrievanceForm({ onSubmitGrievance, onTrackGrievance }) {
  const [formData, setFormData] = useState({
    category: CATEGORIES.ACADEMIC,
    subject: '',
    statement: '',
    isAnonymous: false,
    attachments: []
  });

  const [submittedDocket, setSubmittedDocket] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const formatted = files.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      type: f.type || 'application/octet-stream'
    }));
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...formatted]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError('Please provide a subject.');
      return;
    }
    if (!formData.statement.trim()) {
      setError('Please provide grievance details.');
      return;
    }

    const newDocket = onSubmitGrievance({
      category: formData.category,
      subject: formData.subject.trim(),
      statement: formData.statement.trim(),
      isAnonymous: formData.isAnonymous,
      attachments: formData.attachments
    });

    setSubmittedDocket(newDocket);
  };

  if (submittedDocket) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20">
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-3">
            Grievance Registered
          </p>
          <h2 className="font-poppins text-3xl font-semibold text-white mb-6">
            Docket Generated
          </h2>

          <div className="bg-black/60 border border-white/10 rounded-xl p-5 mb-8 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Docket ID:</span>
              <span className="text-white font-bold">{submittedDocket.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Tracking PIN:</span>
              <span className="text-white font-bold">{submittedDocket.trackingPin}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Turnaround SLA:</span>
              <span className="text-white">{submittedDocket.slaHours || 48} Hours</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onTrackGrievance(submittedDocket.id)}
              className="px-6 py-2.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Track Docket →
            </button>
            <button
              onClick={() => {
                setSubmittedDocket(null);
                setFormData({
                  category: CATEGORIES.ACADEMIC,
                  subject: '',
                  statement: '',
                  isAnonymous: false,
                  attachments: []
                });
              }}
              className="px-6 py-2.5 border border-white/10 text-neutral-300 text-xs font-medium rounded-lg hover:border-white/30 hover:text-white transition-colors cursor-pointer"
            >
              File Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          File a Grievance
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Official student grievance submission under NICHE redressal regulations.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Clean Minimal Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Category */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
          >
            {Object.values(CATEGORIES).map((cat) => (
              <option key={cat} value={cat} className="bg-black text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, subject: e.target.value }));
              setError('');
            }}
            placeholder="Brief subject of your grievance"
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Details / Statement */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Details
          </label>
          <textarea
            rows={5}
            value={formData.statement}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, statement: e.target.value }));
              setError('');
            }}
            placeholder="State what occurred and the relief sought..."
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Supporting Document (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer cursor-pointer"
          />
          {formData.attachments.length > 0 && (
            <div className="mt-2 text-xs text-neutral-400 font-mono">
              Attached: {formData.attachments.map(a => a.name).join(', ')}
            </div>
          )}
        </div>

        {/* Anonymous Filing */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="w-4 h-4 rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-neutral-400">
              Submit anonymously (identity masked)
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Submit Grievance
          </button>
        </div>

      </form>
    </div>
  );
}
