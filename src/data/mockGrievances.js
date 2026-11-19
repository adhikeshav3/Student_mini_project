import { CATEGORIES, COMMITTEES, BYLAWS_DATABASE } from '../services/triageEngine';

export const INITIAL_GRIEVANCES = [
  {
    id: 'APX-2026-GRV-8194',
    trackingPin: '7412',
    studentName: 'Aarav Sharma',
    rollNumber: '2023-BT-CSE-042',
    email: 'aarav.sharma23@apexuniv.edu.in',
    phone: '+91 98451 22891',
    department: 'Computer Science & Engineering',
    semester: '6th Semester, B.Tech',
    isAnonymous: false,
    category: CATEGORIES.EXAMINATION,
    subject: 'End-Semester Examination Hall Ticket Withheld Erroneously Despite Meeting 78% Attendance',
    statement: 'I have maintained 78% verified attendance in Course CS-602 (Distributed Systems). However, the ERP portal displays "Debarred due to Attendance Shortage". The end-semester examinations commence on Thursday. The course instructor had not uploaded the medical leave certificate approved on 14th Feb. I request urgent intervention and issuance of my provisional examination admit card.',
    incidentDate: '2026-10-22',
    submittedAt: '2026-10-22T09:30:00Z',
    status: 'Action Directed',
    priority: 'P2 - High',
    slaHours: 48,
    slaDeadline: '2026-10-24T09:30:00Z',
    isBreached: false,
    committee: COMMITTEES[CATEGORIES.EXAMINATION],
    attachments: [
      { name: 'Medical_Leave_Sanction_DeanOffice.pdf', size: '1.2 MB', type: 'application/pdf' },
      { name: 'ERP_Portal_Attendance_Screenshot.png', size: '420 KB', type: 'image/png' }
    ],
    triageInfo: {
      categoryConfidence: 94,
      urgencyScore: 5,
      detectedCategory: CATEGORIES.EXAMINATION,
      matchedBylaws: [
        BYLAWS_DATABASE[0],
        BYLAWS_DATABASE[2]
      ],
      automatedRoutingReason: 'NLP identified critical examination timeline markers ("exam commence", "hall ticket withheld", "debarred") requiring priority COE administrative action.'
    },
    timeline: [
      {
        step: 'Docket Registered',
        timestamp: '2026-10-22 09:30 AM',
        actor: 'Central Redressal Portal System',
        note: 'Grievance lodged under statutory intake protocol. Verification docket token generated.'
      },
      {
        step: 'Automated Policy Triage & Priority Scoring',
        timestamp: '2026-10-22 09:30 AM',
        actor: 'Institutional Triage Engine',
        note: 'Assigned Priority P2 (High) with 48h SLA turnaround. Flagged critical exam date constraint.'
      },
      {
        step: 'Case Assigned to Standing Committee',
        timestamp: '2026-10-22 10:15 AM',
        actor: 'Office of Controller of Examinations',
        note: 'Docket claimed by Dr. Savita Nambiar, Controller of Examinations.'
      },
      {
        step: 'Interlocutory Directive Issued',
        timestamp: '2026-10-22 02:45 PM',
        actor: 'Controller of Examinations',
        note: 'HOD CSE directed to reconcile medical attendance log within 12 hours. Provisional admit card authorized.'
      }
    ],
    resolutionOrder: {
      orderNumber: 'APX/COE/RED/2026/049',
      date: '2026-10-23',
      authorityName: 'Dr. Savita Nambiar',
      designation: 'Controller of Examinations, NICHE',
      statutoryCitation: 'Examination Ordinance Sec. 8.3 & Academic Regulations 2024',
      findingsSummary: 'Upon scrutiny of the medical sanction records endorsed by the University Health Centre on 14-Feb-2026, the aggregate attendance of student Aarav Sharma stands revised to 78.4%, which satisfies the mandatory threshold.',
      directives: [
        'The ERP Administrator is directed to update the attendance register for course CS-602 immediately.',
        'Provisional Examination Admit Card is issued and unlocked for immediate download via the student portal.',
        'Student is permitted to appear in all scheduled End-Semester examinations without hindrance.'
      ],
      complianceDeadline: '2026-10-24 10:00 AM',
      officialSeal: 'APEX_UNIVERSITY_CONTROLLER_EXAMINATIONS_SEAL'
    },
    studentSatisfaction: null
  },
  {
    id: 'APX-2026-GRV-8189',
    trackingPin: '9031',
    studentName: 'Priya Narayanan',
    rollNumber: '2024-MS-PHY-019',
    email: 'priya.phy24@apexuniv.edu.in',
    phone: '+91 97890 44123',
    department: 'Department of Physics',
    semester: '3rd Semester, M.Sc',
    isAnonymous: false,
    category: CATEGORIES.FINANCIAL,
    subject: 'Double Deduction of Semester Laboratory & Tuition Fee during NetBanking Transaction',
    statement: 'On 10th October, while remitting the semester fee of INR 32,500 via the SBI payment portal, the transaction initially failed with a timeout error. On my second attempt, the transaction succeeded. However, my bank statement shows two debits of INR 32,500 each (UTR: SBIN38291048291 and SBIN38291048305). The Finance counter has not processed the refund after 10 days.',
    incidentDate: '2026-10-10',
    submittedAt: '2026-10-20T11:15:00Z',
    status: 'Resolved',
    priority: 'P3 - Medium',
    slaHours: 120,
    slaDeadline: '2026-10-25T11:15:00Z',
    isBreached: false,
    committee: COMMITTEES[CATEGORIES.FINANCIAL],
    attachments: [
      { name: 'Bank_Statement_HDFC_Oct2026.pdf', size: '890 KB', type: 'application/pdf' },
      { name: 'Payment_Gateway_Receipt_Success.pdf', size: '340 KB', type: 'application/pdf' }
    ],
    triageInfo: {
      categoryConfidence: 97,
      urgencyScore: 3,
      detectedCategory: CATEGORIES.FINANCIAL,
      matchedBylaws: [
        BYLAWS_DATABASE[0],
        BYLAWS_DATABASE[3]
      ],
      automatedRoutingReason: 'Financial transaction keywords detected ("double deduction", "netbanking", "refund", "semester fee"). Routed to Chief Finance Officer.'
    },
    timeline: [
      {
        step: 'Docket Registered',
        timestamp: '2026-10-20 11:15 AM',
        actor: 'Central Redressal Portal System',
        note: 'Submitted with attached bank statements and gateway transaction references.'
      },
      {
        step: 'Bank Ledger Reconciled',
        timestamp: '2026-10-21 03:20 PM',
        actor: 'Finance & Accounts Division',
        note: 'SBI Gateway Nodal Officer confirmed duplicate credit into NICHE Main Collection A/c.'
      },
      {
        step: 'Formal Resolution Order Dispatched',
        timestamp: '2026-10-23 11:00 AM',
        actor: 'Chief Finance Officer',
        note: 'Refund advice note processed. Sum of INR 32,500 credited back to student source account.'
      },
      {
        step: 'Grievance Formally Closed',
        timestamp: '2026-10-24 04:30 PM',
        actor: 'Student Redressal Cell',
        note: 'Student verified credit receipt and marked grievance as resolved.'
      }
    ],
    resolutionOrder: {
      orderNumber: 'APX/FIN/REF/2026/182',
      date: '2026-10-23',
      authorityName: 'Mr. R. K. Bhattacharya',
      designation: 'Chief Finance Officer, NICHE',
      statutoryCitation: 'Finance Division Circular 2024/09, Clause 4.2 (Electronic Fee Reconciliation)',
      findingsSummary: 'Verification of electronic payment clearing logs for transaction dated 10-Oct-2026 confirms that reference SBIN38291048291 was an unintended duplicate settlement.',
      directives: [
        'Accounts Officer (Cash & Banking) has remitted INR 32,500 to student account ending in *4891 via NEFT mandate REF-NEFT-92841.',
        'Late fee / penalty records, if any associated with payment validation, are declared void ab initio.'
      ],
      complianceDeadline: 'Completed',
      officialSeal: 'APEX_UNIVERSITY_CHIEF_FINANCE_OFFICER_SEAL'
    },
    studentSatisfaction: {
      rating: 5,
      feedback: 'Very prompt resolution by the Finance Office. The refund was credited within 48 hours of filing this ticket.',
      reviewedAt: '2026-10-24T16:30:00Z'
    }
  },
  {
    id: 'APX-2026-GRV-8178',
    trackingPin: '5521',
    studentName: 'Confidential / Identity Protected',
    rollNumber: 'PROTECTED-WHISTLEBLOWER-08',
    email: 'confidential.intake@apexuniv.edu.in',
    phone: 'PROTECTED',
    department: 'School of Humanities & Social Sciences',
    semester: '1st Semester, B.A. (Hons)',
    isAnonymous: true,
    category: CATEGORIES.HARASSMENT,
    subject: 'Unlawful Late-Night Intimidation and Harassment in Brahmaputra Senior Men Hostel Block-C',
    statement: 'A group of 4 senior students from the 4th year entered rooms 304 and 306 of Brahmaputra Hostel past 11:30 PM on consecutive nights (18th and 19th October), compelling freshers to perform degrading acts and threatening academic reprisal if reported. The floor warden was informed verbally but no night roll call was initiated. I request strict statutory anti-ragging inquiry and anonymity protection.',
    incidentDate: '2026-10-19',
    submittedAt: '2026-10-21T02:10:00Z',
    status: 'Hearing Scheduled',
    priority: 'P1 - Critical',
    slaHours: 24,
    slaDeadline: '2026-10-22T02:10:00Z',
    isBreached: false,
    committee: COMMITTEES[CATEGORIES.HARASSMENT],
    attachments: [
      { name: 'Hostel_Corridor_Audio_Timestamp.m4a', size: '2.1 MB', type: 'audio/mp4' }
    ],
    triageInfo: {
      categoryConfidence: 99,
      urgencyScore: 8,
      detectedCategory: CATEGORIES.HARASSMENT,
      matchedBylaws: [
        BYLAWS_DATABASE[0],
        BYLAWS_DATABASE[4],
        BYLAWS_DATABASE[5]
      ],
      automatedRoutingReason: 'Statutory Anti-Ragging flag triggered ("intimidation", "ragging", "freshers", "threat"). Immediately elevated to Critical P1 and dispatched to ICC Presiding Officer and Proctorial Board.'
    },
    timeline: [
      {
        step: 'Critical Redressal Docket Registered',
        timestamp: '2026-10-21 02:10 AM',
        actor: 'Central Redressal Portal System',
        note: 'Protected identity docket registered under Whistleblower Protocol. Encrypted routing activated.'
      },
      {
        step: 'Immediate Statutory Alert Dispatched',
        timestamp: '2026-10-21 02:12 AM',
        actor: 'Automated Security Watchdog',
        note: 'Urgent notification sent to Vice-Chancellor, Registrar, Chief Proctor, and ICC Presiding Officer.'
      },
      {
        step: 'Proctorial Night Patrol Deployed',
        timestamp: '2026-10-21 06:00 AM',
        actor: 'Office of the Chief Proctor',
        note: 'Security personnel stationed on 3rd floor Brahmaputra Hostel. CCTV footage of 18th/19th October preserved.'
      },
      {
        step: 'Formal Inquiry Summons Issued',
        timestamp: '2026-10-21 11:00 AM',
        actor: 'Internal Complaints Committee',
        note: 'Statutory hearing scheduled for 26th October at 10:00 AM in Senate Committee Room. Interim suspension of suspected respondents from hostel premises enacted.'
      }
    ],
    resolutionOrder: null,
    studentSatisfaction: null
  },
  {
    id: 'APX-2026-GRV-8162',
    trackingPin: '3187',
    studentName: 'Kavita Deshmukh',
    rollNumber: '2022-BT-ECE-091',
    email: 'kavita.ece22@apexuniv.edu.in',
    phone: '+91 94220 81923',
    department: 'Electronics & Communication Engineering',
    semester: '7th Semester, B.Tech',
    isAnonymous: false,
    category: CATEGORIES.HOSTEL,
    subject: 'Continuous Potable Water Contamination & Non-Functional Reverse Osmosis Plant in Ganga Hostel',
    statement: 'The commercial RO water purifier installed on the 2nd and 3rd floors of Ganga Girls Hostel has been malfunctioning for past 9 days, discharging discolored water with severe sulfur odor. Multiple residents have experienced gastrointestinal distress. Maintenance complaints registered in the physical hostel logbook have elicited no response from the Estate Management section.',
    incidentDate: '2026-10-18',
    submittedAt: '2026-10-19T14:40:00Z',
    status: 'Resolved',
    priority: 'P2 - High',
    slaHours: 48,
    slaDeadline: '2026-10-21T14:40:00Z',
    isBreached: false,
    committee: COMMITTEES[CATEGORIES.HOSTEL],
    attachments: [
      { name: 'Water_Sample_Visual_Inspection.jpg', size: '1.4 MB', type: 'image/jpeg' },
      { name: 'Medical_Prescriptions_HostelResidents.pdf', size: '2.3 MB', type: 'application/pdf' }
    ],
    triageInfo: {
      categoryConfidence: 96,
      urgencyScore: 6,
      detectedCategory: CATEGORIES.HOSTEL,
      matchedBylaws: [
        BYLAWS_DATABASE[0],
        BYLAWS_DATABASE[4]
      ],
      automatedRoutingReason: 'Health and residential welfare hazard detected ("water contamination", "RO plant", "gastrointestinal distress"). P2 High SLA assigned.'
    },
    timeline: [
      {
        step: 'Docket Registered',
        timestamp: '2026-10-19 02:40 PM',
        actor: 'Central Redressal Portal System',
        note: 'Logged with health hazard tag and photographic evidence.'
      },
      {
        step: 'Site Inspection Conducted',
        timestamp: '2026-10-20 09:30 AM',
        actor: 'Dean of Student Welfare & University Engineer',
        note: 'Chief Warden personally inspected Ganga Hostel RO plant. Filter membrane rupture verified.'
      },
      {
        step: 'Emergency Relief & Filtration Replacement',
        timestamp: '2026-10-20 03:00 PM',
        actor: 'Estate Maintenance Division',
        note: 'Supplied 20-litre commercial sealed mineral water cans immediately. Replaced RO membrane and UV filtration unit.'
      },
      {
        step: 'Bacteriological Safety Clearance Issued',
        timestamp: '2026-10-22 10:00 AM',
        actor: 'University Health Officer',
        note: 'Water sample certified chemically pure and potable. Docket marked resolved.'
      }
    ],
    resolutionOrder: {
      orderNumber: 'APX/DSW/HST/2026/088',
      date: '2026-10-22',
      authorityName: 'Dr. Hemant Joshi',
      designation: 'Chief Warden & Dean of Student Welfare',
      statutoryCitation: 'Central Residential Welfare Handbook, Bylaw 11.4',
      findingsSummary: 'Physical audit revealed a ruptured filtration membrane in the Ganga Hostel water station. The failure of estate staff to act on the physical ledger within 48 hours is noted with administrative censure.',
      directives: [
        'Complete overhaul of 500 LPH RO unit completed with new multi-stage sediment and carbon filtration filters installed.',
        'Weekly microbiological water testing protocol mandated for all residential dining and living blocks.',
        'Estate Supervisor issued formal memo regarding compliance timeframes.'
      ],
      complianceDeadline: 'Completed',
      officialSeal: 'APEX_UNIVERSITY_CHIEF_WARDEN_SEAL'
    },
    studentSatisfaction: {
      rating: 5,
      feedback: 'Resolved within 48 hours. Clean water is restored and the Chief Warden personally inspected the setup.',
      reviewedAt: '2026-10-22T17:00:00Z'
    }
  },
  {
    id: 'APX-2026-GRV-8151',
    trackingPin: '6642',
    studentName: 'Rohan Mehra',
    rollNumber: '2021-BT-MECH-012',
    email: 'rohan.mech21@apexuniv.edu.in',
    phone: '+91 99112 30491',
    department: 'Department of Mechanical Engineering',
    semester: '7th Semester, B.Tech',
    isAnonymous: false,
    category: CATEGORIES.ACADEMIC,
    subject: 'Request for Independent Blind Re-evaluation in Heat Transfer (ME-701) End-Term Paper',
    statement: 'I applied for answer script inspection under University Ordinance 14-B on 5th October. Upon inspection, I noted that Question 4(b) (worth 14 marks) was left completely unassessed with zero remarks or ticks by the evaluator. My final grade dropped from an expected 8.5 SGPA to 6.2 due to this omission. I have already deposited the requisite revaluation challan.',
    incidentDate: '2026-10-05',
    submittedAt: '2026-10-18T10:00:00Z',
    status: 'Under Review',
    priority: 'P3 - Medium',
    slaHours: 120,
    slaDeadline: '2026-10-23T10:00:00Z',
    isBreached: true,
    committee: COMMITTEES[CATEGORIES.ACADEMIC],
    attachments: [
      { name: 'Inspected_Answer_Script_Copy.pdf', size: '4.8 MB', type: 'application/pdf' },
      { name: 'Revaluation_Fee_Receipt.pdf', size: '280 KB', type: 'application/pdf' }
    ],
    triageInfo: {
      categoryConfidence: 95,
      urgencyScore: 3,
      detectedCategory: CATEGORIES.ACADEMIC,
      matchedBylaws: [
        BYLAWS_DATABASE[0],
        BYLAWS_DATABASE[1]
      ],
      automatedRoutingReason: 'Academic script evaluation dispute matching Ordinance 14-B. Assigned to Board of Academic Review.'
    },
    timeline: [
      {
        step: 'Docket Registered',
        timestamp: '2026-10-18 10:00 AM',
        actor: 'Central Redressal Portal System',
        note: 'Registered with evaluated script photocopy and re-audit fee receipt.'
      },
      {
        step: 'Script Dispatched to Subject Scrutinizer',
        timestamp: '2026-10-19 02:00 PM',
        actor: 'Board of Academic Review',
        note: 'Transmitted to External Senior Examiner in Thermal Engineering for blind reassessment.'
      },
      {
        step: 'SLA Grace Threshold Warning',
        timestamp: '2026-10-23 10:00 AM',
        actor: 'Automated Redressal Watchdog',
        note: 'Case SLA (5 calendar days) breached. Escalation notice generated for the Dean of Academic Affairs.'
      }
    ],
    resolutionOrder: null,
    studentSatisfaction: null
  }
];

export const UNIVERSITY_OFFICERS = [
  {
    id: 'OFF-01',
    name: 'Prof. Alok Mukherjee',
    designation: 'Dean (Academic Affairs)',
    committee: COMMITTEES[CATEGORIES.ACADEMIC].name,
    email: 'dean.academic@apexuniv.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'OFF-02',
    name: 'Dr. Savita Nambiar',
    designation: 'Controller of Examinations',
    committee: COMMITTEES[CATEGORIES.EXAMINATION].name,
    email: 'coe.desk@apexuniv.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'OFF-03',
    name: 'Mr. R. K. Bhattacharya',
    designation: 'Chief Finance Officer',
    committee: COMMITTEES[CATEGORIES.FINANCIAL].name,
    email: 'cfo.redressal@apexuniv.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'OFF-04',
    name: 'Dr. Hemant Joshi',
    designation: 'Chief Warden & Dean Student Welfare',
    committee: COMMITTEES[CATEGORIES.HOSTEL].name,
    email: 'hostel.welfare@apexuniv.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'OFF-05',
    name: 'Prof. Meenakshi Sundaram',
    designation: 'Presiding Officer (ICC & Anti-Ragging Cell)',
    committee: COMMITTEES[CATEGORIES.HARASSMENT].name,
    email: 'icc.ombudsperson@apexuniv.edu.in',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
  }
];
