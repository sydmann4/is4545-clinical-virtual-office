import { PatientRecord, AgentMetadata } from '../types';

export const AGENTS_METADATA: AgentMetadata[] = [
  {
    id: 'feedback-insight',
    roomNumber: '101',
    roomName: 'Patient Voice Studio',
    agentName: 'Dr. Maya Lin, MPH',
    title: 'Patient Feedback Insight Agent',
    role: 'Patient Comment Quality & Operational Analysis',
    shortDescription: 'Analyzes qualitative patient narratives for themes, sentiment, operational breakdowns, and safety/bias alerts.',
    fullTasksDescription: 'Steps: 1. Theme (Communication, Scheduling, Wait Time, Portal, Billing, Clinical Care, Discharge, Equity, Ambiguous), 2. Sentiment (Positive, Negative, Neutral, Mixed), 3. Reasoning, 4. Operational Issue, 5. Risk or Bias Concern, 6. Practical Managerial Action.',
    colorScheme: {
      primary: 'from-blue-600 to-indigo-700',
      border: 'border-blue-500/40',
      bgGlow: 'bg-blue-500/10',
      badgeBg: 'bg-blue-900/60',
      badgeText: 'text-blue-300',
      accent: 'text-blue-400',
      ring: 'ring-blue-500',
    },
    avatarStyle: {
      gender: 'female',
      accessory: 'headset',
      coatColor: '#1e3a8a',
      hairColor: '#334155',
    },
    estimatedRunTimeSec: 2.2,
  },
  {
    id: 'experience-monitoring',
    roomNumber: '102',
    roomName: 'Experience & Equity Observatorium',
    agentName: 'Marcus Bennett, CPXP',
    title: 'Patient Experience Monitoring Agent',
    role: 'Experience Benchmarking & Healthcare Equity Review',
    shortDescription: 'Monitors patient journey touchpoints, operational bottlenecks, equity flags (LEP, elderly, rural, disabilities), and organizational risk.',
    fullTasksDescription: 'Steps: 1. Theme Classification (Primary & Secondary), 2. Operational Bottlenecks, 3. Healthcare Equity & Accessibility Review (older adults, rural, disabilities, LEP, low digital literacy), 4. Risk Assessment (Low, Moderate, High across Patient Safety, Reputational, Compliance, Equity), 5. Managerial Recommendation.',
    colorScheme: {
      primary: 'from-emerald-600 to-teal-700',
      border: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-500/10',
      badgeBg: 'bg-emerald-900/60',
      badgeText: 'text-emerald-300',
      accent: 'text-emerald-400',
      ring: 'ring-emerald-500',
    },
    avatarStyle: {
      gender: 'male',
      accessory: 'clipboard',
      coatColor: '#065f46',
      hairColor: '#1e293b',
    },
    estimatedRunTimeSec: 2.4,
  },
  {
    id: 'complaint-triage',
    roomNumber: '103',
    roomName: 'Clinical Triage & Escalation Command',
    agentName: 'Dr. Evelyn Sterling, MD',
    title: 'Complaint Triage Assistant',
    role: 'Grievance Prioritization & Rapid Routing',
    shortDescription: 'Triages patient complaints into 4 severity levels, flags clinical/privacy risks, and routes to appropriate leadership teams.',
    fullTasksDescription: 'Steps: 1. Complaint Category, 2. Severity Assessment (Level 1 Low, Level 2 Moderate, Level 3 High, Level 4 Critical), 3. Risk Detection (Patient Safety, Clinical, Compliance, Privacy, Accessibility, Equity, Reputational, Operational), 4. Escalation Recommendation (Routes to 10 specific hospital teams).',
    colorScheme: {
      primary: 'from-rose-600 to-amber-700',
      border: 'border-rose-500/40',
      bgGlow: 'bg-rose-500/10',
      badgeBg: 'bg-rose-900/60',
      badgeText: 'text-rose-300',
      accent: 'text-rose-400',
      ring: 'ring-rose-500',
    },
    avatarStyle: {
      gender: 'female',
      accessory: 'stethoscope',
      coatColor: '#881337',
      hairColor: '#475569',
    },
    estimatedRunTimeSec: 2.0,
  },
  {
    id: 'decision-support',
    roomNumber: '104',
    roomName: 'Hospital Operations Strategy Office',
    agentName: 'Arthur Vance, FACHE',
    title: 'Hospital Manager Decision Support Agent',
    role: 'Executive Case Prioritization & Risk Governance',
    shortDescription: 'Transforms patient encounter data into management actions, prioritizes operational problems, and safeguards human review for AI risk flags.',
    fullTasksDescription: 'Steps: Evaluates persona, service line, satisfaction, ratings, compliance, portal usage, readmission risk, AI risk flags. Identifies main problem, rates priority (Low, Med, High), provides reasoning, suggests 1-2 managerial actions, flags cases needing human review. Displays Top Management Alert and Strategic Actions.',
    colorScheme: {
      primary: 'from-indigo-600 to-purple-800',
      border: 'border-indigo-500/40',
      bgGlow: 'bg-indigo-500/10',
      badgeBg: 'bg-indigo-900/60',
      badgeText: 'text-indigo-300',
      accent: 'text-indigo-400',
      ring: 'ring-indigo-500',
    },
    avatarStyle: {
      gender: 'male',
      accessory: 'glasses',
      coatColor: '#312e81',
      hairColor: '#64748b',
    },
    estimatedRunTimeSec: 2.5,
  },
  {
    id: 'healthcare-analytics',
    roomNumber: '105',
    roomName: 'C-Suite Executive Analytics Hub',
    agentName: 'Dr. Aris Thorne, PhD',
    title: 'Healthcare Analytics Agent',
    role: 'Hospital Leadership Interactive Executive Analytics',
    shortDescription: 'Synthesizes enterprise KPIs, satisfaction cross-tabs, NLP sentiment clouds, hidden operational bottlenecks, and strategic AI roadmaps.',
    fullTasksDescription: '6 Structured Executive Sections: 1. Overview KPIs, 2. Satisfaction Insights (by service line, visit type, persona), 3. NLP Analysis (top themes, word cloud), 4. Hidden Organizational Problems, 5. AI Risk Monitoring (Hallucination traps, bias), 6. Top 5 Priorities, 3-Month Quick Wins, 6-12 Month AI Roadmap.',
    colorScheme: {
      primary: 'from-cyan-600 to-blue-700',
      border: 'border-cyan-500/40',
      bgGlow: 'bg-cyan-500/10',
      badgeBg: 'bg-cyan-900/60',
      badgeText: 'text-cyan-300',
      accent: 'text-cyan-400',
      ring: 'ring-cyan-500',
    },
    avatarStyle: {
      gender: 'male',
      accessory: 'data-visor',
      coatColor: '#164e63',
      hairColor: '#0f172a',
    },
    estimatedRunTimeSec: 2.8,
  },
  {
    id: 'billing-dashboard',
    roomNumber: '106',
    roomName: 'Revenue Cycle & Account Audit Chamber',
    agentName: 'Elena Rostova, CPA',
    title: 'Patient Billing & Account Dashboard Agent',
    role: 'Financial Reconciliation, Charge Audit & Ledger Review',
    shortDescription: 'Audits authorized patient accounts, executes verified balance calculations, tracks payment statuses, and flags ledger discrepancies.',
    fullTasksDescription: 'Tasks: 1. Patient Account Lookup, 2. Billing Calculations (Outstanding = Charges - Insurance - Patient - Adjustments), 3. Payment Tracking (pending vs completed), 4. Account Review (discrepancy & duplicate detection), 5. Interactive Ledger Dashboard with discrepancy audit queue.',
    colorScheme: {
      primary: 'from-amber-600 to-yellow-700',
      border: 'border-amber-500/40',
      bgGlow: 'bg-amber-500/10',
      badgeBg: 'bg-amber-900/60',
      badgeText: 'text-amber-300',
      accent: 'text-amber-400',
      ring: 'ring-amber-500',
    },
    avatarStyle: {
      gender: 'female',
      accessory: 'calculator',
      coatColor: '#78350f',
      hairColor: '#713f12',
    },
    estimatedRunTimeSec: 2.1,
  },
];

export const DEFAULT_PATIENT_RECORDS: PatientRecord[] = [
  {
    patientId: 'PT-8101',
    accountNumber: 'ACC-90412',
    patientNameMasked: 'Patient R.M. (De-identified)',
    persona: 'Elderly / Chronic Heart Failure',
    ageGroup: '75-84',
    visitType: 'Emergency',
    serviceLine: 'Emergency Medicine',
    satisfaction: 1,
    communicationRating: 1,
    followUpCompliance: 'No',
    complaintSeverity: 'Critical',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'High',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'I sat in the emergency hallway for 6 hours while severely short of breath. The nurse said my doctor ordered blood pressure medication, but nobody administered it until my daughter arrived and yelled. Then I was discharged at midnight with zero ride and no translated care instructions for my family.',
    totalPostedCharges: 14850.00,
    postedInsurancePayments: 10200.00,
    postedPatientPayments: 500.00,
    approvedCreditsAdjustments: 2000.00,
    recordedBalance: 4650.00, // Discrepancy! Correct = 14850 - 10200 - 500 - 2000 = 2150. Overstated by 2500!
    pendingTransactions: 0.00,
    paymentStatus: 'Discrepancy Flagged',
    notes: 'Audit detected double-billed resuscitation tray charge of $2,500.00. Medical record indicates language barrier and high readmission probability within 7 days.',
  },
  {
    patientId: 'PT-8102',
    accountNumber: 'ACC-90413',
    patientNameMasked: 'Patient S.K. (De-identified)',
    persona: 'Working Parent / Pediatric Asthma',
    ageGroup: '35-44',
    visitType: 'Urgent Care',
    serviceLine: 'Pediatrics',
    satisfaction: 5,
    communicationRating: 5,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Routine',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'Dr. Gomez in Pediatrics was phenomenal with my 6-year-old son. She explained his inhaler spacer technique with friendly demonstrations, and the pediatric nurse messaged us the next morning via the MyChart portal to check if his wheezing subsided. Outstanding care!',
    totalPostedCharges: 850.00,
    postedInsurancePayments: 650.00,
    postedPatientPayments: 150.00,
    approvedCreditsAdjustments: 50.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Account fully settled and reconciled. Portal messaging confirmed follow-up completed.',
  },
  {
    patientId: 'PT-8103',
    accountNumber: 'ACC-90414',
    patientNameMasked: 'Patient D.T. (De-identified)',
    persona: 'Rural Veteran / Chemotherapy',
    ageGroup: '65-74',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Oncology',
    satisfaction: 2,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    complaintSeverity: 'High',
    portalUsage: 'Blocked / Issues',
    readmissionRisk: 'High',
    aiRiskFlag: 'Bias Review Required',
    patientComment: 'I drive 95 miles each way from our rural county for infusion. The automated scheduling bot rescheduled my appointment three times without asking me, meaning my ride from the volunteer veterans shuttle fell through. I tried calling the clinic desk 14 times and stayed on hold for 45 minutes before being disconnected.',
    totalPostedCharges: 28400.00,
    postedInsurancePayments: 22000.00,
    postedPatientPayments: 1400.00,
    approvedCreditsAdjustments: 5000.00,
    recordedBalance: 0.00,
    pendingTransactions: 1200.00,
    paymentStatus: 'Pending Insurance',
    notes: 'Pending secondary VA insurance voucher ($1,200). Transportation equity and automated scheduling conflict reported.',
  },
  {
    patientId: 'PT-8104',
    accountNumber: 'ACC-90415',
    patientNameMasked: 'Patient M.L. (De-identified)',
    persona: 'Young Adult / Sports Knee Injury',
    ageGroup: '18-24',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Orthopedics',
    satisfaction: 3,
    communicationRating: 4,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The orthopedic surgical team and physical therapists were skilled and polite. However, check-in registration was disorganized, taking 90 minutes past my arrival time, and the billing department sent a paper bill for $3,400 that contradicted the estimate provided before surgery.',
    totalPostedCharges: 18500.00,
    postedInsurancePayments: 14000.00,
    postedPatientPayments: 1000.00,
    approvedCreditsAdjustments: 1000.00,
    recordedBalance: 2500.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Pre-surgery Good Faith Estimate variance of $900 noted due to out-of-network assistant surgeon billing.',
  },
  {
    patientId: 'PT-8105',
    accountNumber: 'ACC-90416',
    patientNameMasked: 'Patient J.H. (De-identified)',
    persona: 'ESL Immigrant / Post-Cesarean',
    ageGroup: '25-34',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Obstetrics',
    satisfaction: 1,
    communicationRating: 1,
    followUpCompliance: 'No',
    complaintSeverity: 'Critical',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'High',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'No Spanish interpreter was provided during my shift change. A nurse handed me an English form to sign for surgical wound drain care that I could not read. I was in intense pain and afraid. When I asked for an interpreter, I was told "all phone translation lines are tied up".',
    totalPostedCharges: 22100.00,
    postedInsurancePayments: 17500.00,
    postedPatientPayments: 0.00,
    approvedCreditsAdjustments: 2000.00,
    recordedBalance: 2600.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Title VI Civil Rights & Section 1557 Language Access compliance alert. Immediate clinical risk regarding infected incision signs.',
  },
  {
    patientId: 'PT-8106',
    accountNumber: 'ACC-90417',
    patientNameMasked: 'Patient C.W. (De-identified)',
    persona: 'Executive / Preventative Telehealth',
    ageGroup: '45-54',
    visitType: 'Telehealth',
    serviceLine: 'Cardiology',
    satisfaction: 2,
    communicationRating: 3,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Blocked / Issues',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The video appointment with the cardiologist kept freezing every 2 minutes. The sound was lagged, so half of my questions about my Holter monitor results went unanswered. Why are we paying top-tier specialist co-pays for unstable video software?',
    totalPostedCharges: 420.00,
    postedInsurancePayments: 280.00,
    postedPatientPayments: 60.00,
    approvedCreditsAdjustments: 0.00,
    recordedBalance: 80.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Telehealth platform latency incident #7721 reported on server cluster east.',
  },
  {
    patientId: 'PT-8107',
    accountNumber: 'ACC-90418',
    patientNameMasked: 'Patient K.B. (De-identified)',
    persona: 'Senior / Wheelchair Bound / Diabetic',
    ageGroup: '75-84',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Neurology',
    satisfaction: 1,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    complaintSeverity: 'High',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'Medium',
    aiRiskFlag: 'Bias Review Required',
    patientComment: 'The automatic sliding doors at the West Pavilion were out of order. My motorized wheelchair got stuck in the vestibule for 20 minutes in 40-degree weather before a visitor pushed it. The accessible restroom was locked with a sign saying "Staff Only Key Required". Unacceptable ADA violation.',
    totalPostedCharges: 1650.00,
    postedInsurancePayments: 1200.00,
    postedPatientPayments: 200.00,
    approvedCreditsAdjustments: 250.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'ADA physical plant citation reported. Facilities work order #994 logged for entrance door sensor repair.',
  },
  {
    patientId: 'PT-8108',
    accountNumber: 'ACC-90419',
    patientNameMasked: 'Patient V.N. (De-identified)',
    persona: 'Uninsured Student / Acute Migraine',
    ageGroup: '18-24',
    visitType: 'Emergency',
    serviceLine: 'Emergency Medicine',
    satisfaction: 1,
    communicationRating: 1,
    followUpCompliance: 'No',
    complaintSeverity: 'High',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Hallucination Risk',
    patientComment: 'The doctor allegedly prescribed me 50,000 milligrams of intravenous Tylenol in the chart, and then the ER nurse billed me $850 for a single bag of salt water. When I asked for an itemized bill before leaving, the registration clerk threatened to send me to collections.',
    totalPostedCharges: 6400.00,
    postedInsurancePayments: 0.00,
    postedPatientPayments: 100.00,
    approvedCreditsAdjustments: 0.00,
    recordedBalance: 6300.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Discrepancy Flagged',
    notes: 'AI Risk Trap: Comment states impossible dosage (50,000mg IV Tylenol). Medical record check shows standard 1,000mg administered. Financial assistance screening not offered.',
  },
  {
    patientId: 'PT-8109',
    accountNumber: 'ACC-90420',
    patientNameMasked: 'Patient A.R. (De-identified)',
    persona: 'Middle-Aged / Post-Stent Placement',
    ageGroup: '55-64',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Cardiology',
    satisfaction: 4,
    communicationRating: 4,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Medium',
    aiRiskFlag: 'Normal',
    patientComment: 'The cardiac catheterization team saved my life when I had severe chest pain. Dr. Evans is a master. My only complaint is the discharge nurse gave me three different medication lists with conflicting instructions about whether to stop Plavix before dental work.',
    totalPostedCharges: 42100.00,
    postedInsurancePayments: 34500.00,
    postedPatientPayments: 2000.00,
    approvedCreditsAdjustments: 5000.00,
    recordedBalance: 600.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Pharmacy reconciliation required on dual antiplatelet therapy (DAPT) protocol.',
  },
  {
    patientId: 'PT-8110',
    accountNumber: 'ACC-90421',
    patientNameMasked: 'Patient T.F. (De-identified)',
    persona: 'Parent / Toddler Ear Infection',
    ageGroup: '25-34',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Pediatrics',
    satisfaction: 4,
    communicationRating: 5,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Routine',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'Quick appointment scheduling through the portal. The triage nurse answered our weekend message within 15 minutes and called in an amoxicillin prescription to our local 24-hour pharmacy.',
    totalPostedCharges: 310.00,
    postedInsurancePayments: 240.00,
    postedPatientPayments: 50.00,
    approvedCreditsAdjustments: 20.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Exemplary pediatric portal engagement benchmark.',
  },
  {
    patientId: 'PT-8111',
    accountNumber: 'ACC-90422',
    patientNameMasked: 'Patient O.P. (De-identified)',
    persona: 'Senior / Total Hip Arthroplasty',
    ageGroup: '65-74',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Orthopedics',
    satisfaction: 2,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    complaintSeverity: 'Critical',
    portalUsage: 'Inactive',
    readmissionRisk: 'High',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'I developed a red, burning surgical wound and 102 fever 4 days after discharge. My wife called the orthopedic on-call pager three times and nobody replied. We had to call 911 and return through the emergency room for an infected hematoma drainage.',
    totalPostedCharges: 34500.00,
    postedInsurancePayments: 28000.00,
    postedPatientPayments: 1500.00,
    approvedCreditsAdjustments: 3000.00,
    recordedBalance: 2000.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Surgical site infection (SSI) within 30-day window. Quality and on-call paging failure sentinel event review.',
  },
  {
    patientId: 'PT-8112',
    accountNumber: 'ACC-90423',
    patientNameMasked: 'Patient G.M. (De-identified)',
    persona: 'Adult / Epilepsy Monitoring',
    ageGroup: '45-54',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Neurology',
    satisfaction: 3,
    communicationRating: 3,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Medium',
    aiRiskFlag: 'Normal',
    patientComment: 'The EEG technician was very calm and reassuring. But waiting 8 weeks for the reading results to be posted to my chart caused immense anxiety while trying to clear my driver license medical review with the state DMV.',
    totalPostedCharges: 2100.00,
    postedInsurancePayments: 1600.00,
    postedPatientPayments: 300.00,
    approvedCreditsAdjustments: 200.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Turnaround time for diagnostic neurology reports exceeded 14-day SLA.',
  },
  {
    patientId: 'PT-8113',
    accountNumber: 'ACC-90424',
    patientNameMasked: 'Patient L.S. (De-identified)',
    persona: 'Low-Income Mother / Prenatal Check',
    ageGroup: '25-34',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Obstetrics',
    satisfaction: 1,
    communicationRating: 2,
    followUpCompliance: 'No',
    complaintSeverity: 'High',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'High',
    aiRiskFlag: 'Bias Review Required',
    patientComment: 'I receive Medicaid. When I asked the billing desk about transportation vouchers promised by the social worker, the clerk loudly commented across the waiting room: "People on state aid always demand free taxi rides." I was mortified in front of 15 other patients.',
    totalPostedCharges: 1450.00,
    postedInsurancePayments: 1200.00,
    postedPatientPayments: 0.00,
    approvedCreditsAdjustments: 250.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Staff conduct and dignity complaint with public disclosure of payer status (potential HIPAA privacy violation).',
  },
  {
    patientId: 'PT-8114',
    accountNumber: 'ACC-90425',
    patientNameMasked: 'Patient W.D. (De-identified)',
    persona: 'Cancer Survivor / Surveillance CT',
    ageGroup: '55-64',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Oncology',
    satisfaction: 2,
    communicationRating: 1,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Critical',
    portalUsage: 'Active',
    readmissionRisk: 'Medium',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'My CT scan results showing a new lung nodule were released directly onto my smartphone patient portal on a Friday at 7 PM without any doctor phone call. I spent the entire weekend terrified that my cancer returned before anyone in oncology called me on Monday afternoon.',
    totalPostedCharges: 4200.00,
    postedInsurancePayments: 3300.00,
    postedPatientPayments: 500.00,
    approvedCreditsAdjustments: 400.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: '21st Century Cures Act immediate diagnostic result release timing protocol issue. Sensitive findings buffer needed.',
  },
  {
    patientId: 'PT-8115',
    accountNumber: 'ACC-90426',
    patientNameMasked: 'Patient B.Z. (De-identified)',
    persona: 'Commercial Insured / Knee Arthroscopy',
    ageGroup: '45-54',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Orthopedics',
    satisfaction: 3,
    communicationRating: 3,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'Surgeon was great. However, billing sent me two identical bills with different transaction codes for the same knee brace, charging $850 twice. I have called billing three times and they keep saying they will review it.',
    totalPostedCharges: 9800.00,
    postedInsurancePayments: 7200.00,
    postedPatientPayments: 600.00,
    approvedCreditsAdjustments: 300.00,
    recordedBalance: 2550.00, // Discrepancy! Correct = 9800 - 7200 - 600 - 300 = 1700. Duplicate $850 brace included!
    pendingTransactions: 0.00,
    paymentStatus: 'Duplicate Transaction Flag',
    notes: 'Duplicate DME charge #DME-8849 ($850) verified. Account requires immediate ledger correction.',
  },
  {
    patientId: 'PT-8116',
    accountNumber: 'ACC-90427',
    patientNameMasked: 'Patient K.Y. (De-identified)',
    persona: 'Geriatric / Syncope Evaluation',
    ageGroup: '85+',
    visitType: 'Emergency',
    serviceLine: 'Emergency Medicine',
    satisfaction: 1,
    communicationRating: 1,
    followUpCompliance: 'Partial',
    complaintSeverity: 'High',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'High',
    aiRiskFlag: 'Bias Review Required',
    patientComment: 'My 89-year-old mother is hard of hearing. The triage nurse shouted at her instead of using the pocket amplifier device we requested. She was treated as if she were mentally incompetent when she is sharp as a tack. She left humiliated without finishing the cardiac workup.',
    totalPostedCharges: 7800.00,
    postedInsurancePayments: 6100.00,
    postedPatientPayments: 200.00,
    approvedCreditsAdjustments: 1000.00,
    recordedBalance: 500.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Against Medical Advice (AMA) departure due to communication distress. High syncope recurrence risk.',
  },
  {
    patientId: 'PT-8117',
    accountNumber: 'ACC-90428',
    patientNameMasked: 'Patient R.D. (De-identified)',
    persona: 'Young Adult / Arrhythmia',
    ageGroup: '18-24',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Cardiology',
    satisfaction: 4,
    communicationRating: 4,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Routine',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The Apple Watch ECG sync into the hospital portal worked smoothly. The nurse practitioner reviewed my palpitations data during my clinic visit and adjusted my beta-blocker with clear instructions.',
    totalPostedCharges: 720.00,
    postedInsurancePayments: 540.00,
    postedPatientPayments: 100.00,
    approvedCreditsAdjustments: 80.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Wearable remote monitoring integration successful.',
  },
  {
    patientId: 'PT-8118',
    accountNumber: 'ACC-90429',
    patientNameMasked: 'Patient F.T. (De-identified)',
    persona: 'Pediatric / Type 1 Diabetes',
    ageGroup: '0-17',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Pediatrics',
    satisfaction: 5,
    communicationRating: 5,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Routine',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The diabetes educator and endocrinology team spent two hours with our 10-year-old daughter teaching her continuous glucose monitor calibration. The visual guides and empathy were second to none.',
    totalPostedCharges: 1100.00,
    postedInsurancePayments: 880.00,
    postedPatientPayments: 120.00,
    approvedCreditsAdjustments: 100.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Exemplary pediatric chronic disease education standard.',
  },
  {
    patientId: 'PT-8119',
    accountNumber: 'ACC-90430',
    patientNameMasked: 'Patient M.E. (De-identified)',
    persona: 'Middle-Aged / Stroke Follow-up',
    ageGroup: '55-64',
    visitType: 'Telehealth',
    serviceLine: 'Neurology',
    satisfaction: 2,
    communicationRating: 2,
    followUpCompliance: 'Partial',
    complaintSeverity: 'Moderate',
    portalUsage: 'Blocked / Issues',
    readmissionRisk: 'High',
    aiRiskFlag: 'Bias Review Required',
    patientComment: 'The portal login requires a two-factor verification text message to a smartphone, but we only have a home landline in our mountain valley. As a stroke patient with hand tremors, I was locked out of my account and missed the telehealth checkup entirely.',
    totalPostedCharges: 380.00,
    postedInsurancePayments: 260.00,
    postedPatientPayments: 0.00,
    approvedCreditsAdjustments: 0.00,
    recordedBalance: 120.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Digital exclusion and authentication barrier for disability/rural population.',
  },
  {
    patientId: 'PT-8120',
    accountNumber: 'ACC-90431',
    patientNameMasked: 'Patient S.A. (De-identified)',
    persona: 'Postpartum Mother / Pre-eclampsia',
    ageGroup: '25-34',
    visitType: 'Emergency',
    serviceLine: 'Obstetrics',
    satisfaction: 1,
    communicationRating: 2,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Critical',
    portalUsage: 'Active',
    readmissionRisk: 'High',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'I had severe throbbing headache and blurry vision 5 days after giving birth. In triage, the receptionist told me to wait my turn behind sprained ankles because "new mothers always feel tired". My blood pressure was 195/115 when a passing doctor noticed my twitching.',
    totalPostedCharges: 16900.00,
    postedInsurancePayments: 13200.00,
    postedPatientPayments: 700.00,
    approvedCreditsAdjustments: 1500.00,
    recordedBalance: 1500.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Near-miss hypertensive crisis / eclampsia emergency triage failure. Urgent clinical protocol review initiated.',
  },
  {
    patientId: 'PT-8121',
    accountNumber: 'ACC-90432',
    patientNameMasked: 'Patient H.C. (De-identified)',
    persona: 'Senior / Chemotherapy Port Infection',
    ageGroup: '65-74',
    visitType: 'Emergency',
    serviceLine: 'Oncology',
    satisfaction: 2,
    communicationRating: 2,
    followUpCompliance: 'Yes',
    complaintSeverity: 'High',
    portalUsage: 'Active',
    readmissionRisk: 'High',
    aiRiskFlag: 'Normal',
    patientComment: 'Immunocompromised oncology patients should not be forced to sit in the general ER waiting room next to coughing influenza patients for 3 hours. My chemotherapy port site was infected and feverish. There was no private triage isolation area.',
    totalPostedCharges: 9200.00,
    postedInsurancePayments: 7400.00,
    postedPatientPayments: 500.00,
    approvedCreditsAdjustments: 800.00,
    recordedBalance: 500.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Infection prevention and neutropenic fever isolation protocol breach in ED.',
  },
  {
    patientId: 'PT-8122',
    accountNumber: 'ACC-90433',
    patientNameMasked: 'Patient N.G. (De-identified)',
    persona: 'Working Adult / Fracture Reduction',
    ageGroup: '35-44',
    visitType: 'Urgent Care',
    serviceLine: 'Orthopedics',
    satisfaction: 3,
    communicationRating: 3,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The splinting was done well, but the clinic charged an extra $350 for an after-hours facility fee even though I checked in at 4:15 PM during standard clinic hours.',
    totalPostedCharges: 2150.00,
    postedInsurancePayments: 1400.00,
    postedPatientPayments: 200.00,
    approvedCreditsAdjustments: 200.00,
    recordedBalance: 350.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Incorrect time-of-service billing code applied (after-hours modifier applied prematurely).',
  },
  {
    patientId: 'PT-8123',
    accountNumber: 'ACC-90434',
    patientNameMasked: 'Patient D.K. (De-identified)',
    persona: 'Adult / Cardiology Consultation',
    ageGroup: '45-54',
    visitType: 'Outpatient Clinic',
    serviceLine: 'Cardiology',
    satisfaction: 4,
    communicationRating: 4,
    followUpCompliance: 'Yes',
    complaintSeverity: 'Routine',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlag: 'Normal',
    patientComment: 'The nurse navigator called before the appointment to confirm my lipid panel fasting requirements. Dr. Reynolds was attentive and reviewed all lifestyle and diet adjustments with clarity.',
    totalPostedCharges: 890.00,
    postedInsurancePayments: 690.00,
    postedPatientPayments: 120.00,
    approvedCreditsAdjustments: 80.00,
    recordedBalance: 0.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Paid in Full',
    notes: 'Cardiology outpatient service benchmark for patient onboarding.',
  },
  {
    patientId: 'PT-8124',
    accountNumber: 'ACC-90435',
    patientNameMasked: 'Patient E.J. (De-identified)',
    persona: 'Elderly / Hip Fracture & Delirium',
    ageGroup: '75-84',
    visitType: 'Inpatient Surgery',
    serviceLine: 'Orthopedics',
    satisfaction: 1,
    communicationRating: 1,
    followUpCompliance: 'No',
    complaintSeverity: 'Critical',
    portalUsage: 'Never Enrolled',
    readmissionRisk: 'High',
    aiRiskFlag: 'Human Review Required',
    patientComment: 'My 82-year-old grandfather was restrained in bed overnight after surgery because he became confused. No one informed the family or assigned a sitter. He sustained severe bruising on both wrists and developed acute delirium. The nurse manager dismissed our concerns as "normal post-op agitation".',
    totalPostedCharges: 31200.00,
    postedInsurancePayments: 24500.00,
    postedPatientPayments: 1000.00,
    approvedCreditsAdjustments: 2000.00,
    recordedBalance: 3700.00,
    pendingTransactions: 0.00,
    paymentStatus: 'Balance Due',
    notes: 'Physical restraint documentation deficiency and sentinel delirium management alert. Escalated to Risk Management and Nursing Leadership.',
  },
];

export function exportDatasetToCSV(records: PatientRecord[]): string {
  const headers = [
    'Patient_ID',
    'Account_Number',
    'Persona',
    'Age_Group',
    'Visit_Type',
    'Service_Line',
    'Satisfaction_1to5',
    'Communication_Rating_1to5',
    'Follow_Up_Compliance',
    'Complaint_Severity',
    'Portal_Usage',
    'Readmission_Risk',
    'AI_Risk_Flag',
    'Patient_Comment',
    'Total_Posted_Charges',
    'Posted_Insurance_Payments',
    'Posted_Patient_Payments',
    'Approved_Credits_Adjustments',
    'Recorded_Balance',
    'Payment_Status',
    'Notes',
  ];

  const escapeCSV = (val: string | number) => {
    if (typeof val === 'number') return val.toString();
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = records.map((r) => [
    r.patientId,
    r.accountNumber,
    r.persona,
    r.ageGroup,
    r.visitType,
    r.serviceLine,
    r.satisfaction,
    r.communicationRating,
    r.followUpCompliance,
    r.complaintSeverity,
    r.portalUsage,
    r.readmissionRisk,
    r.aiRiskFlag,
    r.patientComment,
    r.totalPostedCharges,
    r.postedInsurancePayments,
    r.postedPatientPayments,
    r.approvedCreditsAdjustments,
    r.recordedBalance,
    r.paymentStatus,
    r.notes,
  ].map(escapeCSV).join(','));

  return [headers.join(','), ...rows].join('\n');
}

export function parseCSVToPatientRecords(csvText: string): { records: PatientRecord[]; warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];
  const lines = csvText.trim().split(/\r?\n/);

  if (lines.length < 2) {
    errors.push('CSV file contains no data rows.');
    return { records: [], warnings, errors };
  }

  // Parse header
  const headerLine = lines[0];
  const headers = parseCSVRow(headerLine).map(h => h.trim().toLowerCase().replace(/[\s_-]+/g, ''));

  const findCol = (aliases: string[]) => {
    return headers.findIndex(h => aliases.some(a => h.includes(a)));
  };

  const colMap = {
    patientId: findCol(['patientid', 'ptid', 'id']),
    accountNumber: findCol(['accountnumber', 'account', 'accno', 'acct']),
    persona: findCol(['persona', 'demographic', 'patienttype']),
    ageGroup: findCol(['agegroup', 'age']),
    visitType: findCol(['visittype', 'encountertype', 'setting']),
    serviceLine: findCol(['serviceline', 'department', 'specialty']),
    satisfaction: findCol(['satisfaction', 'score', 'rating']),
    communication: findCol(['communication', 'commrating']),
    compliance: findCol(['followup', 'compliance']),
    severity: findCol(['severity', 'complaintseverity', 'urgency']),
    portal: findCol(['portal', 'portalusage', 'digital']),
    readmission: findCol(['readmission', 'readmitrisk']),
    aiRisk: findCol(['airisk', 'riskflag', 'flag']),
    comment: findCol(['comment', 'feedback', 'text', 'narrative', 'complaint']),
    charges: findCol(['charges', 'totalpostedcharges', 'totalcharges', 'billed']),
    insurance: findCol(['insurance', 'postedinsurance', 'inspayments']),
    patientPay: findCol(['patientpayments', 'copay', 'ptpaid']),
    adjustments: findCol(['adjustments', 'credits', 'writeoff']),
    balance: findCol(['balance', 'recordedbalance', 'due']),
    status: findCol(['status', 'paymentstatus']),
    notes: findCol(['notes', 'note', 'audit', 'remarks']),
  };

  if (colMap.comment === -1) {
    warnings.push('No patient comment/narrative column detected. Text analysis agents may produce limited insights.');
  }

  const records: PatientRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const row = parseCSVRow(rawLine);
    const getVal = (idx: number, fallback = '') => (idx >= 0 && idx < row.length ? row[idx].trim() : fallback);
    const getNum = (idx: number, fallback = 0) => {
      const val = getVal(idx);
      const parsed = parseFloat(val.replace(/[$,]/g, ''));
      return isNaN(parsed) ? fallback : parsed;
    };

    const patientId = getVal(colMap.patientId, `PT-UPLOAD-${1000 + i}`);
    const comment = getVal(colMap.comment, 'No comment provided in upload.');
    const charges = getNum(colMap.charges, 1200.00);
    const ins = getNum(colMap.insurance, 800.00);
    const ptPay = getNum(colMap.patientPay, 100.00);
    const adj = getNum(colMap.adjustments, 100.00);
    const bal = getNum(colMap.balance, charges - ins - ptPay - adj);

    // Validate satisfaction
    let sat = Math.round(getNum(colMap.satisfaction, 3));
    if (sat < 1) sat = 1;
    if (sat > 5) sat = 5;

    let comm = Math.round(getNum(colMap.communication, 3));
    if (comm < 1) comm = 1;
    if (comm > 5) comm = 5;

    const visitRaw = getVal(colMap.visitType, 'Outpatient Clinic');
    const visitType: PatientRecord['visitType'] = 
      visitRaw.includes('Emerg') ? 'Emergency' :
      visitRaw.includes('Inpatient') || visitRaw.includes('Surg') ? 'Inpatient Surgery' :
      visitRaw.includes('Tele') ? 'Telehealth' :
      visitRaw.includes('Urgent') ? 'Urgent Care' : 'Outpatient Clinic';

    const serviceRaw = getVal(colMap.serviceLine, 'Cardiology');
    const serviceLine: PatientRecord['serviceLine'] = 
      serviceRaw.includes('Emerg') ? 'Emergency Medicine' :
      serviceRaw.includes('Ortho') ? 'Orthopedics' :
      serviceRaw.includes('Pediat') ? 'Pediatrics' :
      serviceRaw.includes('Oncol') ? 'Oncology' :
      serviceRaw.includes('Obstet') || serviceRaw.includes('Matern') ? 'Obstetrics' :
      serviceRaw.includes('Neuro') ? 'Neurology' : 'Cardiology';

    const sevRaw = getVal(colMap.severity, 'Routine');
    const complaintSeverity: PatientRecord['complaintSeverity'] =
      sevRaw.includes('Crit') ? 'Critical' :
      sevRaw.includes('High') ? 'High' :
      sevRaw.includes('Mod') ? 'Moderate' : 'Routine';

    const portalRaw = getVal(colMap.portal, 'Active');
    const portalUsage: PatientRecord['portalUsage'] =
      portalRaw.includes('Block') || portalRaw.includes('Issue') ? 'Blocked / Issues' :
      portalRaw.includes('Never') ? 'Never Enrolled' :
      portalRaw.includes('Inact') ? 'Inactive' : 'Active';

    const readmitRaw = getVal(colMap.readmission, 'Medium');
    const readmissionRisk: PatientRecord['readmissionRisk'] =
      readmitRaw.includes('High') ? 'High' :
      readmitRaw.includes('Low') ? 'Low' : 'Medium';

    const aiRaw = getVal(colMap.aiRisk, 'Normal');
    const aiRiskFlag: PatientRecord['aiRiskFlag'] =
      aiRaw.includes('Hallucin') ? 'Hallucination Risk' :
      aiRaw.includes('Bias') ? 'Bias Review Required' :
      aiRaw.includes('Human') ? 'Human Review Required' : 'Normal';

    records.push({
      patientId,
      accountNumber: getVal(colMap.accountNumber, `ACC-${80000 + i}`),
      patientNameMasked: `Patient (Uploaded #${i})`,
      persona: getVal(colMap.persona, 'Standard Adult Patient'),
      ageGroup: getVal(colMap.ageGroup, '45-54'),
      visitType,
      serviceLine,
      satisfaction: sat,
      communicationRating: comm,
      followUpCompliance: getVal(colMap.compliance, 'Yes').includes('No') ? 'No' : getVal(colMap.compliance, 'Yes').includes('Part') ? 'Partial' : 'Yes',
      complaintSeverity,
      portalUsage,
      readmissionRisk,
      aiRiskFlag,
      patientComment: comment,
      totalPostedCharges: charges,
      postedInsurancePayments: ins,
      postedPatientPayments: ptPay,
      approvedCreditsAdjustments: adj,
      recordedBalance: bal,
      pendingTransactions: 0.00,
      paymentStatus: Math.abs((charges - ins - ptPay - adj) - bal) > 1 ? 'Discrepancy Flagged' : 'Paid in Full',
      notes: getVal(colMap.notes, 'Parsed from uploaded CSV file.'),
    });
  }

  if (records.length === 0) {
    errors.push('No valid patient rows could be extracted from file.');
  }

  return { records, warnings, errors };
}

function parseCSVRow(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}
