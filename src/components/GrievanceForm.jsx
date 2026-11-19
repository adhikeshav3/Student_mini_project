import React, { useState } from 'react';

// Exactly 5 Primary Academic Departments at NICHE
export const ACADEMIC_DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'School of Management & Business Studies'
];

// Degree / Program Options
export const DEGREE_PROGRAMS = [
  'B.E. / B.Tech (Undergraduate)',
  'M.E. / M.Tech (Postgraduate)',
  'MBA (Master of Business Administration)',
  'MCA (Master of Computer Applications)',
  'Ph.D. / Research Scholar'
];

// Semester Options
export const SEMESTERS = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8'
];

// Exactly 10 Clear, Structured Grievance Options (Max 10 Options)
export const GRIEVANCE_OPTIONS = [
  '1. Examination & Hall Ticket Withheld',
  '2. Re-evaluation & Answer Script Verification',
  '3. Attendance Shortage & Medical Condonation',
  '4. Fee Payment & Double Deduction Refund',
  '5. Scholarship & Caution Deposit Refund',
  '6. Hostel Facilities, Potable Water & Maintenance',
  '7. Mess Food Quality & Dining Services',
  '8. Faculty Instruction & Laboratory Equipment',
  '9. Degree Certificate, Transcript & Bonafide',
  '10. Anti-Ragging, Safety & Misconduct (Confidential)'
];

// Priority / Urgency Options
export const PRIORITY_OPTIONS = [
  'Normal (Standard 72-Hour SLA)',
  'High Priority (48-Hour SLA)',
  'Urgent / Emergency (24-Hour SLA)'
];

export default function GrievanceForm({ currentUser, onSubmitGrievance, onTrackGrievance }) {
  const [formData, setFormData] = useState({
    // Student Particulars
    studentName: currentUser?.name || 'ADHIKESHAV A S',
    rollNumber: currentUser?.id || '1123237031',
    email: currentUser?.email || '1123237031@niuniv.com',
    phone: currentUser?.phone || '+91 94431 82940',

    // 5 Structured Dropdown Boxes
    department: ACADEMIC_DEPARTMENTS[0],
    program: DEGREE_PROGRAMS[0],
    semester: 'Semester 7',
    category: GRIEVANCE_OPTIONS[0],
    priority: PRIORITY_OPTIONS[0],

    // Subject & Details
    subject: '',
    statement: '',
    isAnonymous: false,
    attachment: null
  });

  const [submittedDocket, setSubmittedDocket] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: file.type || 'application/octet-stream'
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName.trim() && !formData.isAnonymous) {
      setError('Please provide your student name.');
      return;
    }
    if (!formData.phone.trim() && !formData.isAnonymous) {
      setError('Please provide your contact phone number.');
      return;
    }
    if (!formData.subject.trim()) {
      setError('Please provide a brief subject for your grievance.');
      return;
    }
    if (!formData.statement.trim()) {
      setError('Please describe your grievance in detail.');
      return;
    }

    const newDocket = onSubmitGrievance({
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      department: formData.department,
      semester: `${formData.semester}, ${formData.program}`,
      category: formData.category,
      priority: formData.priority,
      subject: formData.subject.trim(),
      statement: formData.statement.trim(),
      isAnonymous: formData.isAnonymous,
      attachments: formData.attachment ? [formData.attachment] : []
    });

    setSubmittedDocket(newDocket);
  };

  if (submittedDocket) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20">
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-3">
            Grievance Registered Successfully
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
              <span className="text-neutral-400">Secret PIN:</span>
              <span className="text-white font-bold">{submittedDocket.trackingPin}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Department:</span>
              <span className="text-neutral-200">{formData.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Contact Phone:</span>
              <span className="text-neutral-200">{formData.isAnonymous ? 'Protected' : formData.phone}</span>
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
                setFormData(prev => ({
                  ...prev,
                  subject: '',
                  statement: '',
                  attachment: null
                }));
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
    <div className="max-w-3xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="font-poppins text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          File a Grievance
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Noorul Islam Centre for Higher Education (NICHE) • Statutory Student Redressal
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Structured Minimal Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Student Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Student Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Full Student Name <span className="text-white/40">*</span>
            </label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              placeholder="e.g. ADHIKESHAV A S"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Register / Roll Number */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Register / Roll Number <span className="text-white/40">*</span>
            </label>
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) => handleInputChange('rollNumber', e.target.value)}
              placeholder="e.g. 1123237031"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white/30 transition-colors uppercase"
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Email Address <span className="text-white/40">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="student@niuniv.com"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Contact Phone Number - PROMINENTLY VISIBLE */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Contact Phone Number <span className="text-white/40">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="e.g. +91 94431 82940"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

        </div>

        {/* 5 Structured Dropdown Boxes Section */}
        <div className="pt-2 border-t border-white/[0.06] space-y-4">
          <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-neutral-400 block pt-2">
            Academic & Grievance Particulars (5 Specifications)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Academic Department (5 Choices) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                1. Academic Department (5 Options)
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                {ACADEMIC_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="bg-black text-white">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Degree / Program */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                2. Degree / Program
              </label>
              <select
                value={formData.program}
                onChange={(e) => handleInputChange('program', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                {DEGREE_PROGRAMS.map((prog) => (
                  <option key={prog} value={prog} className="bg-black text-white">
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Semester */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                3. Semester / Year
              </label>
              <select
                value={formData.semester}
                onChange={(e) => handleInputChange('semester', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                {SEMESTERS.map((sem) => (
                  <option key={sem} value={sem} className="bg-black text-white">
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Grievance Option (Max 10 Options) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                4. Grievance Type (Max 10 Options)
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                {GRIEVANCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-black text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* 5. Urgency / Priority Level */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              5. Priority & Statutory SLA
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p} className="bg-black text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Subject */}
        <div className="pt-2 border-t border-white/[0.06]">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Subject Summary <span className="text-white/40">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Brief headline of the grievance"
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Details / Statement */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Detailed Statement of Grievance <span className="text-white/40">*</span>
          </label>
          <textarea
            rows={4}
            value={formData.statement}
            onChange={(e) => handleInputChange('statement', e.target.value)}
            placeholder="State the facts, dates, and relief sought..."
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Single Simple Supporting Document Upload (No cluttered buttons) */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
            Supporting Document (Optional Single File)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer cursor-pointer"
          />
          {formData.attachment && (
            <div className="mt-2 text-xs text-neutral-300 font-mono">
              Attached: {formData.attachment.name} ({formData.attachment.size})
            </div>
          )}
        </div>

        {/* Whistleblower / Anonymous option */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
              className="w-4 h-4 rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-neutral-400">
              Submit confidentially (mask student name and contact details from department)
            </span>
          </label>
        </div>

        {/* Single Submit Button */}
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
