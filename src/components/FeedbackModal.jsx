import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export default function FeedbackModal({ grievance, onClose, onSubmitFeedback }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  if (!grievance) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFeedback(grievance.id, rating, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] rounded-2xl max-w-md w-full border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="font-poppins text-lg font-semibold text-white">
              Resolution Feedback
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-3">
              Satisfaction Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      star <= rating 
                        ? 'fill-white text-white' 
                        : 'text-neutral-600'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Comments (Optional)
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Confirm that the remedial action was satisfactorily executed..."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 resize-none leading-relaxed"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Submit Feedback
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
