import React, { useState } from 'react';
import { CATEGORIES } from '../services/triageEngine';

// 5 Core Academic Departments at NICHE
export const ACADEMIC_DEPARTMENTS = [
  'Department of Computer Science & Engineering',
  'Department of Electronics & Communication Engineering',
  'Department of Mechanical Engineering',
  'Department of Civil & Environmental Engineering',
  'Faculty of Management Studies (MBA/BBA)'
];

// Degree / Program Specifications
export const DEGREE_PROGRAMS = [
  'Bachelor of Engineering (B.E. / B.Tech)',
  'Master of Engineering (M.E. / M.Tech)',
  'Master of Business Administration (MBA)',
  'Master of Computer Applications (MCA)',
  'Doctor of Philosophy (Ph.D.)'
];

// Academic Semesters
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

// 10 Statutory Grievance Categories (Accurate to UGC SGRMS System)
export const GRIEVANCE_CATEGORIES = [
  { label: 'Examination & Hall Ticket Withholding', category: CATEGORIES.EXAMINATION },
  { label: 'Evaluation, Re-evaluation & Script Inspection', category: CATEGORIES.EXAMINATION },
  { label: 'Attendance Shortage & Medical Condonation', category: CATEGORIES.ACADEMIC },
  { label: 'Tuition Fee, Payment & Duplicate Debit Refund', category: CATEGORIES.FINANCIAL },
  { label: 'Scholarship, Freeship & Caution Deposit Refund', category: CATEGORIES.FINANCIAL },
  { label: 'Hostel Maintenance, Potable Water & Amenities', category: CATEGORIES.HOSTEL },
  { label: 'Mess Food Hygiene & Dining Facility', category: CATEGORIES.HOSTEL },
  { label: 'Faculty Instruction, Labs & Course Delivery', category: CATEGORIES.ACADEMIC },
  { label: 'Original Certificates, Transcripts & Records', category: CATEGORIES.ADMINISTRATIVE },
  { label: 'Anti-Ragging, Harassment & Campus Safety', category: CATEGORIES.HARASSMENT }
];

// Statutory Turnaround SLAs
export const PRIORITY_SLAS = [
  { label: 'Standard Resolution (72 Hours)', value: 'P3 - Medium', hours: 72 },
  { label: 'High Priority (48 Hours)', value: 'P2 - High', hours: 48 },
  { label: 'Urgent / Critical (24 Hours)', value: 'P1 - Critical', hours: 24 }
];

export default function GrievanceForm({ currentUser, onSubmitGrievance, onTrackGrievance }) {
  const [formData, setFormData] = useState({
    // Student Information
    studentName: currentUser?.name || 'ADHIKESHAV A S',
    rollNumber: currentUser?.id || '1123237031',
    email: currentUser?.email || '1123237031@niuniv.com',
    phone: currentUser?.phone || '+91 94431 82940',

    // 5 Academic & Case Dropdowns
    department: ACADEMIC_DEPARTMENTS[0],
    program: DEGREE_PROGRAMS[0],
    semester: 'Semester 7',
    categoryOption: GRIEVANCE_CATEGORIES[0].label,
    priorityOption: PRIORITY_SLAS[1].label,

    // Case Particulars
    subject: 'End-Semester Examination Hall Ticket Withheld Erroneously Despite Meeting 78% Attendance',
    incidentDate: new Date().toISOString().split('T')[0],
    reliefSought: 'I have maintained 78% verified attendance in Course CS-602 (Distributed Systems). However, the ERP portal displays "Debarred due to Attendance Shortage". The end-semester examinations commence on Thursday. The medical leave certificate approved by the Dean\'s office on 14th Feb was not reconciled into the system. I request immediate issuance of my provisional examination hall ticket and authorization to appear in all scheduled end-semester examinations under Examination Ordinance Sec. 8.3.',
    isAnonymous: false
  });

  const [submittedDocket, setSubmittedDocket] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
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

    // Match selected category object
    const matchedCategory = GRIEVANCE_CATEGORIES.find(c => c.label === formData.categoryOption);
    const selectedCategory = matchedCategory ? matchedCategory.category : CATEGORIES.EXAMINATION;

    const subjectText = formData.subject.trim() || 'Examination and Hall Ticket Issue';
    const fullStatement = formData.reliefSought.trim() || subjectText;

    const newDocket = onSubmitGrievance({
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      department: formData.department,
      semester: `${formData.semester}, ${formData.program}`,
      category: selectedCategory,
      priority: formData.priorityOption,
      subject: subjectText,
      statement: fullStatement,
      incidentDate: formData.incidentDate,
      isAnonymous: formData.isAnonymous,
      attachments: []
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
                  reliefSought: ''
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
          Noorul Islam Centre for Higher Education • Statutory Student Redressal Portal
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Structured Minimal Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Student Particulars & Contact */}
        <div className="space-y-4">
          <div className="border-b border-white/[0.08] pb-2">
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
              01 / Student Identity & Contact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Student Full Name <span className="text-white/40">*</span>
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="e.g. ADHIKESHAV A S"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Register Number */}
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

            {/* Contact Phone Number - PROMINENTLY VISIBLE */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-2">
                Contact Phone Number <span className="text-white/60">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="e.g. +91 94431 82940"
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* Email Address */}
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

          </div>
        </div>

        {/* Section 2: 5 Structured Dropdown Boxes */}
        <div className="space-y-4">
          <div className="border-b border-white/[0.08] pb-2">
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
              02 / Academic Affiliation & Classification (5 Options)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Academic Department */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Academic Department
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
                Degree / Program
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

            {/* 3. Current Semester */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Current Semester
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

            {/* 4. Grievance Category (10 Accurate Statutory Options) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Grievance Category
              </label>
              <select
                value={formData.categoryOption}
                onChange={(e) => handleInputChange('categoryOption', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                {GRIEVANCE_CATEGORIES.map((cat) => (
                  <option key={cat.label} value={cat.label} className="bg-black text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* 5. Priority / SLA */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Statutory Urgency & SLA Turnaround
            </label>
            <select
              value={formData.priorityOption}
              onChange={(e) => handleInputChange('priorityOption', e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
            >
              {PRIORITY_SLAS.map((p) => (
                <option key={p.label} value={p.label} className="bg-black text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Section 3: Grievance Details & Relief Sought */}
        <div className="space-y-4">
          <div className="border-b border-white/[0.08] pb-2">
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
              03 / Grievance Particulars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Subject (2 Columns) */}
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Subject <span className="text-white/40">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="e.g. Examination and Hall Ticket Issue"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Date of Incident (1 Column) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                Date of Incident
              </label>
              <input
                type="date"
                value={formData.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>

          </div>

          {/* Specific Remedy / Relief Sought */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
              Specific Remedy / Relief Sought <span className="text-white/40">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.reliefSought}
              onChange={(e) => handleInputChange('reliefSought', e.target.value)}
              placeholder="e.g. Issue provisional examination hall ticket and reconcile attendance records..."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
            />
          </div>

        </div>

        {/* Section 4: Privacy & Submission */}
        <div className="pt-2 border-t border-white/[0.08] space-y-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
              className="w-4 h-4 rounded bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-neutral-400">
              Confidential Whistleblower Filing (cryptographically redact student identity from department officers)
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Submit Grievance Petition
          </button>
        </div>

      </form>
    </div>
  );
}
