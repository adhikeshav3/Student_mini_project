# Complete System Documentation
## Project: Intelligent Student Grievance Resolution Agent (SGRMS)
### *Apex University — Central Directorate of Student Affairs & Office of the University Ombudsperson*

---

## 1. Introduction: What is this Project?

The **Intelligent Student Grievance Resolution Agent (SGRMS)** is an institutional web platform designed for universities and higher educational institutions. It provides a formal, fair, and legally accountable way for students to report academic, financial, infrastructural, and behavioral complaints.

Instead of leaving complaints in a paper register or sending untracked emails to professors, this system acts as an **Intelligent Resolution Agent**. It automatically reads the complaint, identifies the exact department responsible, calculates how urgent it is, matches it with official university regulations, and helps university officers draft formal, legally binding resolution orders with official university seals.

The system is built to comply 100% with the **University Grants Commission (Redressal of Grievances of Students) Regulations, 2023**.

---

## 2. The Existing System & Why It Fails (In Simple Points)

In most colleges and universities today, the existing grievance system works through physical complaint boxes, informal emails, or basic online forms. Here is how the existing system works and why it fails:

* **1. Paper Registers and Physical Complaint Boxes:**
  * *How it works:* Students write complaints on a sheet of paper and drop them in a box outside the Dean's or Principal's office.
  * *Problem:* The box is opened only once every few weeks. Urgent issues (like an examination hall ticket blocked for an exam tomorrow) are discovered long after the exam is already over.

* **2. Unstructured Email Chains:**
  * *How it works:* The student emails the course professor, who forwards it to the Head of Department (HOD), who forwards it to the Dean, who forwards it to the Exam Controller.
  * *Problem:* There is no tracking token, no deadline, and no accountability. Emails easily get lost, ignored, or buried in faculty inboxes.

* **3. The FIFO Bottleneck (First-In, First-Out Queue):**
  * *How it works:* If a basic web portal exists, it processes tickets in the exact order they arrive.
  * *Problem:* A life-threatening hostel water contamination or ragging issue gets stuck behind routine requests for duplicate identity cards or bus passes.

* **4. Fear of Retaliation (No Real Whistleblower Protection):**
  * *How it works:* Existing portals force students to provide their Roll Number and Name before submitting.
  * *Problem:* If a student reports harassment or marks manipulation by a professor, that professor immediately sees who reported them. Due to fear of failing internal exams, students remain silent.

* **5. Informal Chat Messages Instead of Enforceable Orders:**
  * *How it works:* An officer simply types a comment like *"Informed the department"* or *"Issue closed"*.
  * *Problem:* Departmental staff frequently ignore informal comments because there is no official paper order, no legal reference number, and no signed mandate.

---

## 3. Where and How "AI / Intelligent Agent" is Used in this App

Many people think "AI" only means a chatbot like ChatGPT with glowing neon buttons. In high-stakes institutional and quasi-judicial settings (like courts or universities), unconstrained chatbots cannot be used because they can **hallucinate fake regulations**, **leak confidential data**, and **give unpredictable answers**.

In this web application, the **Intelligent Agent** works behind the scenes as a **Deterministic Natural Language Processing (NLP) Policy Triage & Decision Support Engine**.

Here is exactly where and how the intelligent engine operates:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WHERE AI / INTELLIGENCE IS USED                 │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Natural Language Intent & Department Classifier (NLP)               │
│ 2. Severity & Sentiment Urgency Scoring Matrix (1 to 10 Scale)         │
│ 3. Statutory Bylaws & Ordinance Relational Cross-Matcher               │
│ 4. Automated Legal Resolution Decree & Directive Recommender           │
│ 5. Real-Time Turnaround SLA Countdown & Breach Escalation Watchdog     │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Breakdown of the AI / Intelligence Modules:

### A. Automated Natural Language Triage (Category Classification)
* **What it does:** When a student types their grievance statement, the engine scans the vocabulary using weighted semantic lexicons across 7 institutional jurisdictions:
  * *Examinations & Hall Tickets* (keywords: admit card, debarred, revaluation, answer script, SGPA).
  * *Fee & Financial Disputes* (keywords: double deduction, NetBanking, refund, caution deposit, challan).
  * *Hostel & Infrastructure* (keywords: RO water, food poisoning, mess hygiene, electricity, warden).
  * *Harassment & Anti-Ragging (ICC)* (keywords: ragging, intimidation, threat, abuse, senior, mental agony).
  * *Academic & Evaluation* (keywords: syllabus coverage, internal assessment, project guide, faculty).
* **Intelligence Factor:** It computes a **Confidence Score** (e.g., 96% Deterministic Match) and routes the docket directly to the competent officer without requiring manual human sorting.

### B. Urgency & Distress Scoring Matrix (Severity Triage)
* **What it does:** It checks for temporal constraint words (*"tomorrow"*, *"exam in 2 days"*, *"deadline"*) and extreme distress markers (*"poisoning"*, *"hospital"*, *"threat"*, *"suicidal"*).
* **Intelligence Factor:** It calculates an **Urgency Weight from 1 to 10**. If the urgency score is 6 or higher, or if anti-ragging keywords are detected, the agent automatically overrides normal priority and elevates the case to **P1 Critical (24-Hour Turnaround SLA)** or **P2 High (48-Hour SLA)**.

### C. Statutory Bylaws Cross-Referencing Engine
* **What it does:** The agent connects to a codified database of university laws:
  * *UGC Redressal of Grievances Regulations, 2023*
  * *University Academic Ordinance 14-B (Re-evaluation & Script Inspection)*
  * *Central Hostel Living Standards Manual Bylaw 11.4*
  * *Finance Circular 2024/09 (Tuition Fee Refund & Duplicate Reconciliation)*
  * *Supreme Court Anti-Ragging Statutory Mandate (Section 6.3)*
* **Intelligence Factor:** The agent automatically extracts the exact legal clauses that apply to the student's factual statement and attaches them to the case file for the committee officer.

### D. Automated Resolution Recommendation (Decision Support)
* **What it does:** Instead of forcing the Dean or Controller of Examinations to write a legal order from scratch, the intelligent agent pre-assembles:
  * A formal **Summary of Findings**.
  * Specific **Operative Directives** (e.g., *"Direct ERP admin to issue provisional admit card within 24 hours"*).
  * A mandatory **Compliance Deadline**.
* **Intelligence Factor:** The committee officer can review, modify, or approve the recommended directive with a single click.

### E. SLA Countdown Watchdog (Automatic Escalation)
* **What it does:** A background watchdog timer counts down the exact hours remaining in the statutory SLA.
* **Intelligence Factor:** If an officer fails to act before the deadline expires, the watchdog changes the case status to **"SLA Breached"** and automatically escalates the petition directly to the **Vice-Chancellor's Secretariat and the University Ombudsperson**.

---

## 4. End-to-End Working of the Web Application: Starting to Ending Procedure

Here is the step-by-step procedure of how the website works from the moment a student opens the page to the final closure of the case:

```
[Student Visits Site] ──► [Fills 5-Step Wizard] ──► [AI Triage & Docket Generated]
                                                               │
                                                               ▼
[Legal Decree Issued] ◄── [Committee Reviews & Orders] ◄── [Assigned to Officer Desk]
        │
        ├──► [Student Accepts & Gives 5-Star Rating] ──► [Case Closed]
        │
        └──► [Student Dissatisfied] ──► [Appeals to Ombudsperson] ──► [Appellate Bench]
```

### Phase 1: Accessing the Portal
* The user opens the web application at `http://localhost:3000` (Production) or `http://localhost:5173` (Development).
* The user is greeted by the institutional home banner, featuring NAAC accreditation notices, toll-free statutory helplines, quick docket search, and active grievance cards.

### Phase 2: Student Lodging Procedure (5-Step Intake)
1. **Step 1: Student Particulars & Whistleblower Shield:**
   * The student inputs their legal name, roll number, department, semester, email, and phone.
   * **Optional Whistleblower Mode:** If reporting sensitive misconduct or ragging, the student turns on the **"Whistleblower Anonymity"** toggle. The system masks their identity as `PROTECTED-STUDENT-***` so that departmental faculty cannot see who filed the complaint.
2. **Step 2: Grievance Classification & Incident Particulars:**
   * The student selects the general category (Academic, Exams, Fees, Hostel, Harassment) and specifies the date and location of the incident.
3. **Step 3: Statement & Specific Relief Sought:**
   * The student types a concise subject line, a detailed chronological narrative, and the exact remedy they want the university to provide (e.g., *"Issue provisional admit card"* or *"Refund excess charge of ₹10,000"*).
4. **Step 4: Documentary Proof Upload:**
   * The student uploads supporting files (PDF, PNG, JPG) such as fee receipts, medical fitness certificates, or ERP attendance screenshots.
5. **Step 5: Statutory Veracity Affirmation:**
   * The student checks the legal declaration confirming that the statements are true and not malicious.
6. **Transmission & Receipt:**
   * Upon submission, the intelligent triage engine runs instantly.
   * A pop-up modal generates a unique **Docket ID** (e.g., `APX-2026-GRV-8194`) and a private **4-Digit Tracking PIN**.

### Phase 3: Real-Time Docket Tracking Procedure
* At any time, the student or public can enter their Docket ID into the search bar.
* The system displays:
  * The **5-Stage Visual Stepper**: *Intake Registered ➔ Policy Triaged ➔ Committee Review ➔ Resolution Enacted ➔ Redressal Closed*.
  * The **Live SLA Countdown Timer**: Shows remaining hours (e.g., *"38 Hours Remaining in Statutory SLA"*).
  * **4 Case Tabs**: Full student statement, automated policy analysis, uploaded evidence files, and the chronological audit trail.

### Phase 4: Administrative & Committee Officer Procedure (Officer Workbench)
1. University officers click **"Officer Desk"** in the top navigation bar.
2. They select their official persona (e.g., *Dr. Savita Nambiar, Controller of Examinations* or *Mr. R. K. Bhattacharya, Chief Finance Officer*).
3. The queue displays all incoming tickets filtered by status: *New Intake*, *Under Review*, *Hearings Scheduled*, *Orders Issued*, or *Overdue SLA*.
4. The officer clicks **"Review Docket"** on a case to open the full dossier.
5. The officer can:
   * Change status to **"Under Review"**.
   * Click **"Schedule Formal Hearing"** to summon parties to a committee session.
   * Click **"Compose Official Resolution Order"** to launch the decision support generator.

### Phase 5: Issuing the Certified Legal Resolution Order
1. The decision support generator automatically drafts the resolution text with relevant university bylaws.
2. The officer reviews the directives, sets the mandatory compliance deadline (e.g., *"Within 24 Hours"*), and clicks **"Issue & Enforce Statutory Order"**.
3. The system generates a formal legal resolution document with:
   * Official University Letterhead and Emblem.
   * Order Reference Number (e.g., `APX/COE/RED/2026/049`).
   * Statutory citations and factual findings.
   * Numbered legal directives for university staff to execute.
   * Authorized Officer Digital Signature, verification hash, and gold embossed seal.
4. Anyone viewing the docket can click **"View Certified Resolution Order"** and use the **"Print / Save PDF"** button to print an official single-page legal document.

### Phase 6: Case Closure or Statutory Appeal
* **Scenario A (Student Satisfied):**
  * The student clicks **"Mark Resolved & Review"**, provides a 1-to-5 star rating, submits feedback, and formally closes the docket.
* **Scenario B (Student Dissatisfied):**
  * If the student believes the committee order was unfair or deficient, they click **"Lodge Appeal to Ombudsperson"**.
  * They select their legal grounds of appeal, type their justification, and submit.
  * The docket is immediately elevated directly to the **Vice-Chancellor's Independent Ombudsperson Bench** with Priority P1 Critical.

### Phase 7: Public Transparency & Governance Reporting
* Any visitor can click **"Transparency"** to inspect live institutional governance metrics:
  * Overall Redressal Rate (96.4%).
  * Average Turnaround Speed (2.6 Days vs. the statutory 15-day limit).
  * Departmental volume distribution bars.
  * Urgency tier breakdowns (P1 Critical through P4 Routine).
  * Click **"Export Institutional Report"** to print an annual compliance report.

---

## 5. Technology Stack Used in this Project

The application is built using a modern, fast, full-stack JavaScript architecture:

| Tier | Technology | Version | Purpose in this Project |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React.js** | v18.3.1 | Modular user interface, reactive state management, multi-step wizards, and modal dialogues. |
| **Build Tool & Bundler** | **Vite** | v6.0.3 | Ultra-fast local development server, instant Hot Module Replacement (HMR), and optimized production bundling. |
| **CSS Styling Engine** | **Tailwind CSS** | v3.4.16 | Institutional design system, custom Oxford Navy/Gold color tokens, responsive flex/grid layouts, and `@media print` legal stylesheets. |
| **Vector Iconography** | **Lucide-React** | v0.460.0 | Clean institutional iconography (scales of justice, building, shields, clock, check-circles). |
| **Web Typography** | **Google Fonts** | CDN | *Plus Jakarta Sans* (interface), *Merriweather Serif* (legal decrees), and *JetBrains Mono* (docket IDs/hashes). |
| **Backend API Server** | **Node.js + Express** | v4.21.2 | Full-stack server running on port 3000, serving compiled static assets and system health check endpoints (`/api/health`). |
| **Intelligent Engine** | **Deterministic NLP Subsystem** | Custom ES Module | Custom natural language parsing, weighted keyword lexicons, urgency formulas, and decision-support draft assembly. |
| **Data Persistence** | **Browser LocalStorage + In-Memory Seeds** | HTML5 Standard | Persistent client-side data layer storing grievances, timelines, orders, and feedback without external cloud database failures. |
| **Security & Hashing** | **Token Generation & Hash Simulation** | JavaScript Crypto | Unique docket tokenization (`APX-2026-GRV-****`), 4-digit PIN authentication, and SHA-256 seal verification. |

---

## 6. Glossary of Key Technical Terms (In Simple English)

* **1. Natural Language Processing (NLP):**
  * *Simple definition:* The ability of computer software to read and understand human language. In our app, NLP reads the student's complaint and detects what department it belongs to.
* **2. Deterministic Algorithm:**
  * *Simple definition:* An algorithm that always produces the exact same, predictable, and verifiable result for the same input, with zero random guessing or hallucination.
* **3. Service Level Agreement (SLA):**
  * *Simple definition:* A strict promised deadline by which an organization must resolve an issue. In our app, P1 issues have a 24-hour SLA, while P4 issues have a 10-day SLA.
* **4. FIFO (First-In, First-Out):**
  * *Simple definition:* Serving people in the exact order they arrived in line. Our app replaces plain FIFO with **Intelligent Urgency Triage** so emergencies jump to the front of the line.
* **5. Whistleblower Anonymity Shield:**
  * *Simple definition:* A privacy mechanism that hides the identity of a person reporting misconduct so they cannot be targeted or punished by the accused person.
* **6. University Ordinance:**
  * *Simple definition:* The official internal laws and statutory rules enacted by a university's Academic Council (e.g., Ordinance 14-B governs how exam papers are re-evaluated).
* **7. University Ombudsperson:**
  * *Simple definition:* An independent, neutral judge or senior professor appointed outside the regular university hierarchy to ensure students receive unbiased justice if departmental committees fail.
* **8. Interlocutory Order:**
  * *Simple definition:* A temporary or provisional legal order issued while a case is still being investigated (e.g., ordering an admit card to be unblocked while an attendance review takes place).
* **9. Resolution Decree:**
  * *Simple definition:* The final, legally binding official document issued by an authority specifying what actions must be taken, signed with official seals.
* **10. REST API (Representational State Transfer):**
  * *Simple definition:* A standard protocol that allows a web browser frontend to send requests and exchange data with a backend server.
