export type AgentId = 
  | 'feedback-insight'
  | 'experience-monitoring'
  | 'complaint-triage'
  | 'decision-support'
  | 'healthcare-analytics'
  | 'billing-dashboard';

export type AgentStatus = 'Idle' | 'Selected' | 'Processing' | 'Completed' | 'Error';

export interface AgentMetadata {
  id: AgentId;
  roomNumber: string;
  roomName: string;
  agentName: string;
  title: string;
  role: string;
  shortDescription: string;
  fullTasksDescription: string;
  colorScheme: {
    primary: string;
    border: string;
    bgGlow: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
    ring: string;
  };
  avatarStyle: {
    gender: 'female' | 'male';
    accessory: 'stethoscope' | 'clipboard' | 'headset' | 'glasses' | 'data-visor' | 'calculator';
    coatColor: string;
    hairColor: string;
  };
  estimatedRunTimeSec: number;
}

export interface PatientRecord {
  patientId: string;
  accountNumber: string;
  patientNameMasked: string;
  persona: string;
  ageGroup: string;
  visitType: 'Emergency' | 'Outpatient Clinic' | 'Inpatient Surgery' | 'Telehealth' | 'Urgent Care';
  serviceLine: 'Emergency Medicine' | 'Cardiology' | 'Orthopedics' | 'Pediatrics' | 'Oncology' | 'Obstetrics' | 'Neurology';
  satisfaction: number; // 1 to 5
  communicationRating: number; // 1 to 5
  followUpCompliance: 'Yes' | 'No' | 'Partial';
  complaintSeverity: 'Routine' | 'Moderate' | 'High' | 'Critical';
  portalUsage: 'Active' | 'Inactive' | 'Blocked / Issues' | 'Never Enrolled';
  readmissionRisk: 'Low' | 'Medium' | 'High';
  aiRiskFlag: 'Normal' | 'Hallucination Risk' | 'Bias Review Required' | 'Human Review Required';
  patientComment: string;
  totalPostedCharges: number;
  postedInsurancePayments: number;
  postedPatientPayments: number;
  approvedCreditsAdjustments: number;
  recordedBalance: number;
  pendingTransactions: number;
  paymentStatus: 'Paid in Full' | 'Pending Insurance' | 'Balance Due' | 'Discrepancy Flagged' | 'Duplicate Transaction Flag';
  notes: string;
}

// Agent 1: Patient Feedback Insight
export interface FeedbackInsightItem {
  patientId: string;
  theme: 'Communication' | 'Scheduling' | 'Wait Time' | 'Technology / Patient Portal' | 'Billing' | 'Clinical Care' | 'Discharge / Follow-Up' | 'Accessibility / Equity' | 'Mixed or Ambiguous';
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  reasoning: string;
  operationalIssue: string;
  riskOrBiasConcern: string;
  recommendedAction: string;
}

export interface FeedbackInsightResults {
  items: FeedbackInsightItem[];
  themeDistribution: Record<string, number>;
  sentimentDistribution: Record<string, number>;
  topOperationalIssues: { issue: string; count: number }[];
  summaryNote: string;
}

// Agent 2: Patient Experience Monitoring
export interface ExperienceMonitoringItem {
  patientId: string;
  primaryTheme: string;
  secondaryThemes: string[];
  operationalBottleneck: string;
  equityReview: {
    flagged: boolean;
    group: 'Older Adults' | 'Rural Patients' | 'Disabilities' | 'Limited English (LEP)' | 'Low Digital Literacy' | 'None';
    details: string;
  };
  riskAssessment: {
    overallLevel: 'Low' | 'Moderate' | 'High';
    category: 'Patient Safety' | 'Reputational' | 'Compliance' | 'Equity';
    rationale: string;
  };
  managerialRecommendation: string;
}

export interface ExperienceMonitoringResults {
  items: ExperienceMonitoringItem[];
  equityBreakdown: Record<string, number>;
  riskLevelCounts: { Low: number; Moderate: number; High: number };
  criticalEquityAlerts: string[];
}

// Agent 3: Complaint Triage Assistant
export interface ComplaintTriageItem {
  patientId: string;
  primaryCategory: 'Communication' | 'Scheduling' | 'Wait Time' | 'Technology / Patient Portal' | 'Billing' | 'Clinical Care' | 'Patient Safety' | 'Privacy or Security' | 'Staff Conduct' | 'Other';
  secondaryCategories: string[];
  severityLevel: 'LEVEL 1 – Low' | 'LEVEL 2 – Moderate' | 'LEVEL 3 – High' | 'LEVEL 4 – Critical';
  severityReasoning: string;
  riskDetection: {
    patientSafetyRisk: boolean;
    clinicalRisk: boolean;
    complianceRisk: boolean;
    privacyRisk: boolean;
    accessibilityRisk: boolean;
    equityRisk: boolean;
    reputationalRisk: boolean;
    operationalRisk: boolean;
    explanation: string;
  };
  escalationRoute: 
    | 'Patient Experience Team'
    | 'Nursing Leadership'
    | 'Physician Leadership'
    | 'Quality Improvement Team'
    | 'Compliance Office'
    | 'Information Technology'
    | 'Revenue Cycle / Billing'
    | 'Accessibility Coordinator'
    | 'Risk Management'
    | 'Executive Review';
  humanInterventionRequired: boolean;
}

export interface ComplaintTriageResults {
  items: ComplaintTriageItem[];
  severityCounts: Record<string, number>;
  escalationCounts: Record<string, number>;
  urgentCasesCount: number;
}

// Agent 4: Hospital Manager Decision Support Agent
export interface DecisionSupportCase {
  patientId: string;
  mainProblem: string;
  managementPriority: 'Low' | 'Medium' | 'High';
  priorityReason: string;
  recommendedActions: string[];
  humanReviewNeeded: boolean;
  aiRiskAnalysis: {
    flag: string;
    explanation: string;
  };
}

export interface DecisionSupportResults {
  cases: DecisionSupportCase[];
  topManagementAlert: string;
  priorityDistribution: { Low: number; Medium: number; High: number };
  recommendedStrategicActions: string[];
}

// Agent 5: Healthcare Analytics Agent
export interface AnalyticsSectionOverview {
  totalComments: number;
  averageSatisfaction: number;
  averageCommunication: number;
  followUpComplianceRate: number;
  serviceLinesRepresented: number;
}

export interface HealthcareAnalyticsResults {
  overview: AnalyticsSectionOverview;
  satisfactionByServiceLine: { serviceLine: string; avgScore: number; count: number }[];
  satisfactionByVisitType: { visitType: string; avgScore: number }[];
  satisfactionByPersona: { persona: string; avgScore: number }[];
  nlpTopThemes: { theme: string; percentage: number; count: number }[];
  nlpFrequentKeywords: { word: string; frequency: number; sentiment: 'pos' | 'neg' | 'neu' }[];
  hiddenProblems: {
    highComplaintDepts: { serviceLine: string; complaintRate: string; rootCause: string }[];
    communicationBottlenecks: string[];
    techIssues: string[];
    schedulingIssues: string[];
    waitTimeAlerts: string[];
  };
  aiRiskMonitoring: {
    hallucinationTraps: { patientId: string; commentExcerpt: string; riskNote: string }[];
    biasComments: { patientId: string; concern: string; action: string }[];
    humanReviewCasesCount: number;
  };
  executiveRecommendations: {
    top5Priorities: string[];
    quickWins3Months: string[];
    longTermAIOpportunities: string[];
  };
}

// Agent 6: Patient Billing & Account Dashboard Agent
export interface BillingAccountItem {
  patientId: string;
  accountNumber: string;
  totalPostedCharges: number;
  postedInsurancePayments: number;
  postedPatientPayments: number;
  approvedCreditsAdjustments: number;
  calculatedBalance: number;
  recordedBalance: number;
  discrepancyAmount: number;
  patientResponsibility: number;
  pendingTransactions: number;
  paymentStatus: string;
  accountAuditFlag: 'Clean' | 'Discrepancy' | 'Duplicate Charge' | 'Missing Insurance EOB' | 'Unapplied Credit';
  discrepancyExplanation?: string;
  auditActionRequired: string;
}

export interface BillingDashboardResults {
  accounts: BillingAccountItem[];
  totals: {
    totalCharges: number;
    totalInsurancePayments: number;
    totalPatientPayments: number;
    totalAdjustments: number;
    totalOutstandingBalance: number;
    totalDiscrepanciesCount: number;
    totalDiscrepantDollarAmount: number;
  };
  auditQueueCount: number;
}

// Combined Executive Dashboard & Cross-Agent Insights
export interface CorroboratedFinding {
  id: string;
  patientId: string;
  serviceLine: string;
  title: string;
  description: string;
  supportingAgents: AgentId[];
  consensusLevel: 'High' | 'Critical' | 'Moderate';
  recommendedIntervention: string;
}

export interface ConflictingInterpretation {
  id: string;
  patientId: string;
  description: string;
  agentA: { id: AgentId; claim: string };
  agentB: { id: AgentId; claim: string };
  humanResolutionAdvice: string;
}

export interface HumanReviewQueueItem {
  id: string;
  patientId: string;
  patientPersona: string;
  serviceLine: string;
  issueSummary: string;
  flaggedBy: AgentId[];
  severity: 'Critical' | 'High' | 'Moderate';
  aiObservation: string;
  aiRecommendation: string;
  supportingEvidence: string;
  status: 'Pending Review' | 'Approved' | 'Escalated to Clinical Director' | 'Overridden' | 'Resolved';
  humanReviewerDecision?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
}

export interface CombinedExecutiveAnalysis {
  corroboratedFindings: CorroboratedFinding[];
  conflictingInterpretations: ConflictingInterpretation[];
  humanReviewQueue: HumanReviewQueueItem[];
  followUpDirectives: string[];
  dataGapsIdentified: string[];
  executiveBriefSummary: string;
}

export interface AgentExecutionState {
  id: AgentId;
  status: AgentStatus;
  progress: number;
  currentStep: string;
  currentStepIdx: number;
  totalSteps: number;
  warnings: string[];
  latestFindingPreview: string;
  startedAt?: number;
  completedAt?: string;
  error?: string;
}

export type ActiveScreen = 
  | 'virtual-office'
  | 'data-upload'
  | 'agent-config'
  | 'live-processing'
  | 'results-dashboard'
  | 'combined-executive';
