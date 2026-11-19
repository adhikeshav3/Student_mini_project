import React, { useState } from 'react';
import { 
  FileText, Shield, User, AlertCircle, CheckCircle2, Upload, Paperclip, 
  HelpCircle, ArrowRight, ArrowLeft, Send, Lock, Calendar, Building2, Eye, EyeOff
} from 'lucide-react';
import { CATEGORIES } from '../services/triageEngine';

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil & Environmental Engineering',
  'Department of Physics',
  'Department of Chemistry',
  'Department of Mathematics',
  'School of Management & Business Studies',
  'School of Humanities & Social Sciences',
  'School of Law & Jurisprudence',
  'Directorate of Residential Facilities & Hostels',
  'Office of the Controller of Examinations',
  'Finance & Accounts Directorate'
];

export default function GrievanceForm({ onSubmitGrievance, onTrackGrievance }) {
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    email: '',
    phone: '',
    department: DEPARTMENTS[0],
    semester: '6th Semester, B.Tech',
    category: CATEGORIES.ACADEMIC,
    subject: '',
    statement: '',
    reliefSought: '',
    priorAttempts: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentLocation: '',
    declarationAccepted: false,
    attachments: []
  });

  const [validationError, setValidationError] = useState('');
  const [createdDocket, setCreatedDocket] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const addSampleAttachment = (name, size) => {
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, { name, size, type: 'application/pdf' }]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer ? e.dataTransfer.files : e.target.files);
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

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!isAnonymous) {
        if (!formData.studentName.trim()) return 'Please enter your full legal student name.';
        if (!formData.rollNumber.trim()) return 'Please enter your valid university Roll/Enrolment number.';
        if (!formData.email.trim() || !formData.email.includes('@')) return 'Please enter a valid university/personal email address.';
        if (!formData.phone.trim()) return 'Please provide an active contact telephone number.';
      } else {
        if (!formData.email.trim() || !formData.email.includes('@')) return 'An encrypted contact email is mandatory even for anonymous dockets to receive status notices.';
      }
    } else if (step === 2) {
      if (!formData.category) return 'Please select the appropriate grievance category.';
      if (!formData.department) return 'Please specify the university department or school involved.';
      if (!formData.incidentDate) return 'Please specify the date of the incident or discovery.';
    } else if (step === 3) {
      if (!formData.subject.trim() || formData.subject.length < 10) return 'Please provide a clear, descriptive subject line (at least 10 characters).';
      if (!formData.statement.trim() || formData.statement.length < 30) return 'Please state your grievance with sufficient detail (at least 30 characters).';
      if (!formData.reliefSought.trim()) return 'Please specify the specific remedy or relief requested from the university.';
    } else if (step === 5) {
      if (!formData.declarationAccepted) return 'You must affirm the statutory veracity declaration before docket registration.';
    }
    return '';
  };

  const nextStep = () => {
    const error = validateCurrentStep();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError('');
    setStep(prev => Math.min(5, prev + 1));
  };

  const prevStep = () => {
    setValidationError('');
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateCurrentStep();
    if (error) {
      setValidationError(error);
      return;
    }

    const payload = {
      ...formData,
      isAnonymous,
      statement: `${formData.statement}\n\nSpecific Relief Sought:\n${formData.reliefSought}\n\nPrior Attempts for Informal Resolution:\n${formData.priorAttempts || 'None stated'}`
    };

    const newDocket = onSubmitGrievance(payload);
    setCreatedDocket(newDocket);
  };

  // Quick fill demo buttons for testing
  const loadTemplate = (type) => {
    if (type === 'exam') {
      setFormData({
        studentName: 'Nikhil Verma',
        rollNumber: '2023-BT-IT-031',
        email: 'nikhil.it23@apexuniv.edu.in',
        phone: '+91 98765 11223',
        department: 'Computer Science & Engineering',
        semester: '5th Semester, B.Tech',
        category: CATEGORIES.EXAMINATION,
        subject: 'Hall Ticket Withheld Despite 80% Validated Attendance Certificate',
        statement: 'My end-semester examination hall ticket has been blocked on the student ERP portal citing insufficient attendance in Database Systems (IT-502). I have verified 80.5% attendance including accredited NSS camp attendance sanctioned by Dean Student Welfare on 12-Oct-2026.',
        reliefSought: 'Immediate unblocking of hall ticket and issuance of provisional examination admit card before examinations begin on Monday.',
        priorAttempts: 'Submitted written application to Course Faculty and HoD on 22nd October without resolution.',
        incidentDate: '2026-10-23',
        incidentLocation: 'Examination Cell, Block-A',
        declarationAccepted: true,
        attachments: [
          { name: 'NSS_Camp_Attendance_Sanction.pdf', size: '1.1 MB', type: 'application/pdf' },
          { name: 'ERP_Attendance_Summary.png', size: '512 KB', type: 'image/png' }
        ]
      });
    } else if (type === 'fee') {
      setFormData({
        studentName: 'Sneha Patel',
        rollNumber: '2024-MBA-FIN-088',
        email: 'sneha.mba24@apexuniv.edu.in',
        phone: '+91 97234 55678',
        department: 'School of Management & Business Studies',
        semester: '2nd Semester, MBA',
        category: CATEGORIES.FINANCIAL,
        subject: 'Excess Library Caution Deposit Deducted in Duplicate Billing',
        statement: 'During the semester clearance fee payment, an erroneous duplicate charge of INR 10,000 was debited twice under the caution deposit head (Transaction ID: APX-PAY-98124 and APX-PAY-98125).',
        reliefSought: 'Reconciliation of ledger and direct refund of excess INR 10,000 into my registered bank account.',
        priorAttempts: 'Presented bank statement to Accounts Cash Counter on 15th October.',
        incidentDate: '2026-10-15',
        incidentLocation: 'Bursar & Accounts Section',
        declarationAccepted: true,
        attachments: [
          { name: 'Bank_Statement_Duplicate_Debit.pdf', size: '780 KB', type: 'application/pdf' }
        ]
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Institutional Breadcrumb & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-crest-goldDark uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-crest-gold" />
            <span>NICHE</span>
            <span>/</span>
            <span>Statutory Grievance Filing</span>
          </div>
        </div>

        {/* Big Prominent 1-Click Demo Buttons for Easy Testing */}
        <div className="p-3.5 mb-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="text-xs text-amber-900">
            <strong className="block text-sm font-bold text-amber-950">⚡ Instant Demo Test (1-Click Fill)</strong>
            <span>Doing a quick test? Click either button to automatically fill the entire form with realistic data:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => loadTemplate('exam')}
              className="px-3 py-1.5 rounded-lg bg-crest-navy text-white hover:bg-crest-blue text-xs font-bold transition-all shadow-sm"
            >
              ⚡ Fill Exam Complaint
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('fee')}
              className="px-3 py-1.5 rounded-lg bg-crest-gold hover:bg-crest-goldLight text-crest-deep text-xs font-bold transition-all shadow-sm"
            >
              ⚡ Fill Fee Refund
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-crest-navy">
          Formal Student Grievance Lodging Form
        </h2>
        <p className="text-sm text-institutional-600 mt-1">
          File an official complaint in 5 easy steps. You will get a <strong>Docket Tracking ID</strong> and a <strong>Secret PIN</strong> immediately upon submission.
        </p>

        {/* Plain English Guide Banner */}
        <div className="mt-3 p-3 rounded-lg bg-crest-navy/5 border border-crest-navy/15 flex items-center gap-2.5 text-xs text-institutional-700">
          <HelpCircle className="w-4 h-4 text-crest-goldDark shrink-0" />
          <span>
            <strong>How this works:</strong> Fill your details, state your problem, and attach proof. Our automated policy engine routes your petition directly to the responsible Dean with a guaranteed turnaround deadline (24 to 48 hours for urgent issues).
          </span>
        </div>
      </div>

      {/* 5-Step Process Bar with Clear Plain English Sub-labels */}
      <div className="mb-8 bg-white p-4 rounded-xl border border-institutional-200 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-institutional-200 -translate-y-1/2 -z-0" />
          
          {[
            { num: 1, label: '1. Identity', sub: 'Who are you' },
            { num: 2, label: '2. Category', sub: 'What issue' },
            { num: 3, label: '3. Statement', sub: 'What happened' },
            { num: 4, label: '4. Evidence', sub: 'Attach proof' },
            { num: 5, label: '5. Verify', sub: 'Review & submit' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === s.num
                    ? 'bg-crest-navy text-white ring-4 ring-crest-navy/15 shadow-sm'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-institutional-100 text-institutional-500 border border-institutional-300'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-[11px] mt-1.5 font-bold ${
                step === s.num ? 'text-crest-navy' : 'text-institutional-700'
              }`}>
                {s.label}
              </span>
              <span className="text-[10px] text-institutional-400 hidden sm:block">
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Required Verification Missing</p>
            <p className="text-xs text-red-700 mt-0.5">{validationError}</p>
          </div>
        </div>
      )}

      {/* Main Multi-Step Form Card */}
      <div className="bg-white rounded-xl border border-institutional-200 shadow-elevated p-6 sm:p-8">
        
        {/* STEP 1: Student Particulars & Anonymity */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-institutional-200 pb-4">
              <h3 className="text-lg font-bold font-serif text-crest-navy flex items-center gap-2">
                <User className="w-5 h-5 text-crest-gold" />
                Step 1: Student Particulars & Confidentiality
              </h3>
              <p className="text-xs text-institutional-600 mt-1">
                Your credentials are kept strictly privileged. You may optionally elect confidential whistleblower protection.
              </p>
            </div>

            {/* Confidentiality / Whistleblower Toggle */}
            <div className={`p-4 rounded-lg border transition-all ${
              isAnonymous ? 'bg-amber-50/70 border-amber-300' : 'bg-institutional-50 border-institutional-200'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-md ${isAnonymous ? 'bg-amber-600 text-white' : 'bg-institutional-200 text-institutional-600'}`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-institutional-900">
                      Whistleblower Anonymity & Identity Masking
                    </h4>
                    <p className="text-xs text-institutional-600 mt-0.5">
                      Check this box if reporting sensitive grievances (ragging, victimisation, misconduct). Your name and roll number will be cryptographically redacted from department officials.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-institutional-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-institutional-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-crest-navy"></div>
                </label>
              </div>
            </div>

            {!isAnonymous ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                    Full Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    placeholder="e.g., Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                    Roll / Enrolment ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    placeholder="e.g., 2023-BT-CSE-042"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                    Official University Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="student@apexuniv.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-institutional-100 rounded-lg text-xs text-institutional-700 font-mono">
                  Identity Redaction Mode: Case will be registered under docket token <code>PROTECTED-STUDENT-***</code>.
                </div>
                <div>
                  <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                    Confidential Notification Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter an email to receive hearing summons and status notices"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                  Academic Department / School
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all bg-white"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                  Program & Semester
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => handleInputChange('semester', e.target.value)}
                  placeholder="e.g., 6th Semester, B.Tech / 2nd Year, M.Sc"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Category & Incident Particulars */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-institutional-200 pb-4">
              <h3 className="text-lg font-bold font-serif text-crest-navy flex items-center gap-2">
                <Building2 className="w-5 h-5 text-crest-gold" />
                Step 2: Grievance Classification & Incident Particulars
              </h3>
              <p className="text-xs text-institutional-600 mt-1">
                Select the jurisdictional category. The automated triage subsystem will assign the corresponding standing committee and statutory SLA.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-2">
                Grievance Classification Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(CATEGORIES).map((cat) => (
                  <div
                    key={cat}
                    onClick={() => handleInputChange('category', cat)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      formData.category === cat
                        ? 'border-crest-navy bg-crest-navy/5 text-crest-navy font-semibold ring-1 ring-crest-navy'
                        : 'border-institutional-200 hover:border-institutional-300 text-institutional-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{cat}</span>
                    {formData.category === cat && (
                      <CheckCircle2 className="w-4 h-4 text-crest-navy shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                  Date of Incident / Cause of Action <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                  Specific Location / Facility Involved
                </label>
                <input
                  type="text"
                  value={formData.incidentLocation}
                  onChange={(e) => handleInputChange('incidentLocation', e.target.value)}
                  placeholder="e.g., Central Library Room 204, Ganga Hostel 3rd Floor"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Statement & Relief Sought */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-institutional-200 pb-4">
              <h3 className="text-lg font-bold font-serif text-crest-navy flex items-center gap-2">
                <FileText className="w-5 h-5 text-crest-gold" />
                Step 3: Statement of Grievance & Relief Sought
              </h3>
              <p className="text-xs text-institutional-600 mt-1">
                Provide an objective, chronological account of events and specify the remedy requested.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                Concise Subject Line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="e.g., Erroneous Attendance Marking in Course CS-602 Debarring Examination Entry"
                className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                Detailed Statement of Grievance <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.statement}
                onChange={(e) => handleInputChange('statement', e.target.value)}
                placeholder="Detail the chronological sequence of events, persons involved, dates, and administrative failures..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                Specific Redressal / Relief Sought <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.reliefSought}
                onChange={(e) => handleInputChange('reliefSought', e.target.value)}
                placeholder="Specify the exact remedial directive requested (e.g., issuance of provisional admit card, re-checking of script, fee refund of ₹10,000)..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                Prior Steps Taken for Informal Resolution (Optional)
              </label>
              <input
                type="text"
                value={formData.priorAttempts}
                onChange={(e) => handleInputChange('priorAttempts', e.target.value)}
                placeholder="e.g., Spoke with Faculty Advisor on 20th Oct; submitted letter to Warden"
                className="w-full px-3.5 py-2.5 rounded-lg border border-institutional-300 text-sm text-institutional-900 focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy transition-all"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Evidentiary Attachments */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-institutional-200 pb-4">
              <h3 className="text-lg font-bold font-serif text-crest-navy flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-crest-gold" />
                Step 4: Documentary & Evidentiary Proof
              </h3>
              <p className="text-xs text-institutional-600 mt-1">
                Attach receipts, medical sanction forms, fee payment challans, grade cards, or photographic records.
              </p>
            </div>

            {/* Drop Zone */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-institutional-300 rounded-xl p-8 text-center bg-institutional-50/60 hover:bg-institutional-50 transition-colors"
            >
              <Upload className="w-10 h-10 text-institutional-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-institutional-800">
                Drag and drop documentary evidence here
              </p>
              <p className="text-xs text-institutional-500 mt-1">
                Supports PDF, PNG, JPG, DOCX (Max 10 MB per file)
              </p>
              
              <div className="mt-4">
                <label className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-institutional-300 shadow-sm text-xs font-semibold text-institutional-800 hover:bg-institutional-100 cursor-pointer transition-colors">
                  <span>Browse Local Device</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileDrop}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* Quick Sample Evidentiary Attachments */}
            <div className="flex items-center flex-wrap gap-2 pt-2">
              <span className="text-xs text-institutional-500 font-medium">Add Simulated Evidence:</span>
              <button
                type="button"
                onClick={() => addSampleAttachment('SBI_Gateway_Transaction_Receipt.pdf', '480 KB')}
                className="px-2.5 py-1 rounded-md bg-institutional-100 hover:bg-institutional-200 text-institutional-700 text-xs border border-institutional-200 transition-colors"
              >
                + Payment Receipt PDF
              </button>
              <button
                type="button"
                onClick={() => addSampleAttachment('Medical_Fitness_Sanction.pdf', '1.2 MB')}
                className="px-2.5 py-1 rounded-md bg-institutional-100 hover:bg-institutional-200 text-institutional-700 text-xs border border-institutional-200 transition-colors"
              >
                + Medical Certificate PDF
              </button>
              <button
                type="button"
                onClick={() => addSampleAttachment('ERP_Attendance_Log_Extract.png', '620 KB')}
                className="px-2.5 py-1 rounded-md bg-institutional-100 hover:bg-institutional-200 text-institutional-700 text-xs border border-institutional-200 transition-colors"
              >
                + Attendance Screenshot
              </button>
            </div>

            {/* Attached Files List */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-bold text-institutional-700 uppercase tracking-wider">
                  Attached Documents ({formData.attachments.length})
                </h4>
                <div className="space-y-2">
                  {formData.attachments.map((file, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-institutional-50 border border-institutional-200 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-crest-navy shrink-0" />
                        <span className="font-medium text-institutional-900 truncate">{file.name}</span>
                        <span className="text-institutional-500 text-[11px] shrink-0">({file.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="text-red-600 hover:text-red-800 font-semibold px-2 py-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Verification & Statutory Declaration */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="border-b border-institutional-200 pb-4">
              <h3 className="text-lg font-bold font-serif text-crest-navy flex items-center gap-2">
                <Shield className="w-5 h-5 text-crest-gold" />
                Step 5: Review & Statutory Veracity Affirmation
              </h3>
              <p className="text-xs text-institutional-600 mt-1">
                Please verify your grievance submission dossier prior to final transmission to the Standing Redressal Committee.
              </p>
            </div>

            {/* Docket Summary Review */}
            <div className="bg-institutional-50 rounded-xl p-5 border border-institutional-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-institutional-200 pb-3">
                <div>
                  <span className="text-institutional-500 block">Applicant:</span>
                  <strong className="text-institutional-900">
                    {isAnonymous ? 'Protected Whistleblower' : formData.studentName}
                  </strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Roll / ID:</span>
                  <strong className="text-institutional-900 font-mono">
                    {isAnonymous ? 'REDACTED' : formData.rollNumber}
                  </strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Department:</span>
                  <strong className="text-institutional-900">{formData.department}</strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Category:</span>
                  <strong className="text-institutional-900">{formData.category}</strong>
                </div>
              </div>

              <div>
                <span className="text-institutional-500 block">Subject:</span>
                <p className="text-sm font-bold text-institutional-900 mt-0.5">{formData.subject}</p>
              </div>

              <div>
                <span className="text-institutional-500 block">Remedy Sought:</span>
                <p className="text-institutional-800 mt-0.5 italic">{formData.reliefSought}</p>
              </div>

              <div className="flex items-center gap-4 pt-2 text-[11px] text-institutional-600">
                <span>Incident Date: <strong>{formData.incidentDate}</strong></span>
                <span>•</span>
                <span>Attached Files: <strong>{formData.attachments.length} document(s)</strong></span>
              </div>
            </div>

            {/* Statutory Declaration Checkbox */}
            <div className="p-4 rounded-xl bg-crest-navy/5 border border-crest-navy/20">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationAccepted}
                  onChange={(e) => handleInputChange('declarationAccepted', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-crest-navy focus:ring-crest-navy border-institutional-300 cursor-pointer"
                />
                <div className="text-xs text-institutional-800 leading-relaxed">
                  <strong className="block font-serif text-crest-navy text-sm mb-0.5">
                    Statutory Affirmation of Veracity
                  </strong>
                  I hereby solemnly affirm that the statements made above are true to the best of my knowledge and belief, and supported by valid institutional evidence. I understand that filing frivolous or demonstrably malicious allegations is subject to disciplinary action under the University Disciplinary Code.
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="mt-8 pt-4 border-t border-institutional-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2.5 rounded-lg border border-institutional-300 text-institutional-700 text-xs sm:text-sm font-semibold hover:bg-institutional-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-lg bg-crest-navy text-white text-xs sm:text-sm font-bold hover:bg-crest-blue transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Proceed to Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-7 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Register & Dispatch Docket
            </button>
          )}
        </div>

      </div>

      {/* Docket Confirmation Modal */}
      {createdDocket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-institutional-200 text-center animate-scaleIn">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-crest-goldDark bg-crest-gold/15 px-3 py-1 rounded-full border border-crest-gold/30">
              Statutory Docket Registered
            </span>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-crest-navy mt-3">
              Grievance Registered Successfully
            </h3>
            
            <p className="text-xs text-institutional-600 mt-2">
              Your petition has been validated by our automated triage engine and routed to the competent standing authority.
            </p>

            {/* Docket Details Card */}
            <div className="my-6 p-4 rounded-xl bg-institutional-50 border border-institutional-200 text-left space-y-2.5">
              <div className="flex justify-between items-center border-b border-institutional-200 pb-2">
                <span className="text-xs text-institutional-500">Docket Reference ID:</span>
                <span className="text-base font-bold font-mono text-crest-navy">{createdDocket.id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-institutional-200 pb-2">
                <span className="text-xs text-institutional-500">Confidential Tracking PIN:</span>
                <span className="text-sm font-bold font-mono text-institutional-900 bg-white px-2 py-0.5 rounded border border-institutional-300">
                  {createdDocket.trackingPin}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-institutional-200 pb-2">
                <span className="text-xs text-institutional-500">Assigned Committee:</span>
                <span className="text-xs font-semibold text-institutional-900">{createdDocket.committee.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-institutional-500">Statutory Turnaround SLA:</span>
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                  {createdDocket.priority} ({createdDocket.slaHours} Hours)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const id = createdDocket.id;
                  setCreatedDocket(null);
                  onTrackGrievance(id);
                }}
                className="flex-1 py-2.5 px-4 rounded-lg bg-crest-navy hover:bg-crest-blue text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                Track Docket Progress Now
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="py-2.5 px-4 rounded-lg bg-institutional-100 hover:bg-institutional-200 text-institutional-800 font-semibold text-xs sm:text-sm border border-institutional-300 transition-colors"
              >
                Print Receipt
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
