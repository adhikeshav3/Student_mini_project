import { INITIAL_GRIEVANCES } from '../data/mockGrievances';
import { analyzeGrievanceText } from './triageEngine';

const STORAGE_KEY = 'niche_university_grievances_v1';

export function getStoredGrievances() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GRIEVANCES));
      return INITIAL_GRIEVANCES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Storage read error, using defaults:', err);
    return INITIAL_GRIEVANCES;
  }
}

export function saveGrievances(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

export function createNewGrievance(formData) {
  const currentList = getStoredGrievances();

  // Run the Automated Triage & Policy Engine
  const triage = analyzeGrievanceText(formData.subject, formData.statement, formData.category);

  const now = new Date();
  const idNumber = Math.floor(1000 + Math.random() * 9000);
  const docketId = `NICHE-2026-GRV-${idNumber}`;
  const pin = Math.floor(1000 + Math.random() * 9000).toString();

  // Compute SLA deadline
  const deadline = new Date(now.getTime() + triage.slaHours * 60 * 60 * 1000);

  const newGrievance = {
    id: docketId,
    trackingPin: pin,
    studentName: formData.isAnonymous ? 'Confidential / Identity Protected' : formData.studentName,
    rollNumber: formData.isAnonymous ? `PROTECTED-STUDENT-${Math.floor(10 + Math.random() * 89)}` : formData.rollNumber,
    email: formData.email,
    phone: formData.isAnonymous ? 'PROTECTED' : formData.phone,
    department: formData.department,
    semester: formData.semester,
    isAnonymous: Boolean(formData.isAnonymous),
    category: triage.detectedCategory,
    subject: formData.subject,
    statement: formData.statement,
    incidentDate: formData.incidentDate || now.toISOString().split('T')[0],
    submittedAt: now.toISOString(),
    status: 'Submitted',
    priority: triage.priority,
    slaHours: triage.slaHours,
    slaDeadline: deadline.toISOString(),
    isBreached: false,
    committee: triage.committee,
    attachments: formData.attachments || [],
    triageInfo: {
      categoryConfidence: triage.categoryConfidence,
      urgencyScore: triage.urgencyScore,
      detectedCategory: triage.detectedCategory,
      matchedBylaws: triage.matchedBylaws,
      automatedRoutingReason: `Automated intake analysis categorized under ${triage.detectedCategory} with ${triage.priority} SLA.`
    },
    timeline: [
      {
        step: 'Docket Registered',
        timestamp: formatTimestamp(now),
        actor: 'Central Redressal Portal System',
        note: `Grievance registered. Tracking PIN: ${pin}. Case file dispatched to ${triage.committee.name}.`
      },
      {
        step: 'Automated Policy Triage & Priority Scoring',
        timestamp: formatTimestamp(now),
        actor: 'Institutional Triage Engine',
        note: `Assigned Priority: ${triage.priority} (Turnaround SLA: ${triage.slaHours} Hours). Cross-referenced ${triage.matchedBylaws.length} statutory university bylaws.`
      }
    ],
    resolutionOrder: null,
    studentSatisfaction: null
  };

  const updatedList = [newGrievance, ...currentList];
  saveGrievances(updatedList);
  return newGrievance;
}

export function updateGrievanceStatus(docketId, newStatus, officerName, note = '') {
  const list = getStoredGrievances();
  const index = list.findIndex(g => g.id === docketId);
  if (index === -1) return null;

  const now = new Date();
  const grievance = { ...list[index] };
  grievance.status = newStatus;

  grievance.timeline.push({
    step: `Status Updated: ${newStatus}`,
    timestamp: formatTimestamp(now),
    actor: officerName || 'Designated Standing Committee',
    note: note || `Docket status transitioned to ${newStatus}.`
  });

  list[index] = grievance;
  saveGrievances(list);
  return grievance;
}

export function issueResolutionOrder(docketId, orderDetails) {
  const list = getStoredGrievances();
  const index = list.findIndex(g => g.id === docketId);
  if (index === -1) return null;

  const now = new Date();
  const grievance = { ...list[index] };

  const orderNumber = `NICHE/${grievance.category.substring(0, 3).toUpperCase()}/ORD/2026/${Math.floor(100 + Math.random() * 900)}`;

  grievance.status = 'Action Directed';
  grievance.resolutionOrder = {
    orderNumber,
    date: now.toISOString().split('T')[0],
    authorityName: orderDetails.authorityName,
    designation: orderDetails.designation,
    statutoryCitation: orderDetails.statutoryCitation,
    findingsSummary: orderDetails.findingsSummary,
    directives: orderDetails.directives || [],
    complianceDeadline: orderDetails.complianceDeadline || 'Within 48 Hours',
    officialSeal: 'NOORUL_ISLAM_CENTRE_FOR_HIGHER_EDUCATION_OFFICIAL_STATUTORY_SEAL'
  };

  grievance.timeline.push({
    step: 'Official Formal Resolution Order Issued',
    timestamp: formatTimestamp(now),
    actor: orderDetails.authorityName,
    note: `Order No: ${orderNumber} enacted. Official directives communicated to relevant academic/administrative desks at NICHE.`
  });

  list[index] = grievance;
  saveGrievances(list);
  return grievance;
}

export function closeGrievanceWithFeedback(docketId, rating, feedback) {
  const list = getStoredGrievances();
  const index = list.findIndex(g => g.id === docketId);
  if (index === -1) return null;

  const now = new Date();
  const grievance = { ...list[index] };
  grievance.status = 'Resolved';
  grievance.studentSatisfaction = {
    rating,
    feedback,
    reviewedAt: now.toISOString()
  };

  grievance.timeline.push({
    step: 'Grievance Formally Closed by Student',
    timestamp: formatTimestamp(now),
    actor: grievance.studentName,
    note: `Student confirmed satisfaction (${rating}/5 Stars): "${feedback || 'Satisfactorily resolved.'}"`
  });

  list[index] = grievance;
  saveGrievances(list);
  return grievance;
}

export function lodgeAppealToOmbudsperson(docketId, appealReason, additionalEvidence) {
  const list = getStoredGrievances();
  const index = list.findIndex(g => g.id === docketId);
  if (index === -1) return null;

  const now = new Date();
  const grievance = { ...list[index] };
  grievance.status = 'Appealed to Ombudsperson';
  grievance.priority = 'P1 - Critical';

  grievance.timeline.push({
    step: 'Statutory First Appeal Lodged to University Ombudsperson',
    timestamp: formatTimestamp(now),
    actor: 'Appellant (Student)',
    note: `Appeal Grounds: ${appealReason}. Docket elevated directly to the Vice-Chancellor's Ombudsperson Bench.`
  });

  if (additionalEvidence) {
    grievance.attachments.push({
      name: `Appeal_Evidence_${Date.now()}.pdf`,
      size: '1.5 MB',
      type: 'application/pdf'
    });
  }

  list[index] = grievance;
  saveGrievances(list);
  return grievance;
}

export function resetToDefaults() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GRIEVANCES));
  return INITIAL_GRIEVANCES;
}

function formatTimestamp(d) {
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
