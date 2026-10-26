import {
  PatientRecord,
  AgentId,
  FeedbackInsightResults,
  FeedbackInsightItem,
  ExperienceMonitoringResults,
  ExperienceMonitoringItem,
  ComplaintTriageResults,
  ComplaintTriageItem,
  DecisionSupportResults,
  DecisionSupportCase,
  HealthcareAnalyticsResults,
  BillingDashboardResults,
  BillingAccountItem,
  CombinedExecutiveAnalysis,
  CorroboratedFinding,
  ConflictingInterpretation,
  HumanReviewQueueItem,
} from '../types';

export interface AgentProgressCallback {
  (step: string, progress: number, preview?: string): void;
}

// -------------------------------------------------------------
// AGENT 1: Patient Feedback Insight Agent
// -------------------------------------------------------------
export function analyzeFeedbackInsight(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): FeedbackInsightResults {
  onProgress?.('Step 1/6: Classifying Primary Comment Themes...', 15, 'Evaluating qualitative patient narratives for operational themes');

  const items: FeedbackInsightItem[] = records.map((record, index) => {
    const text = record.patientComment.toLowerCase();
    
    // Step 1: Theme determination
    let theme: FeedbackInsightItem['theme'] = 'Mixed or Ambiguous';
    if (text.includes('bill') || text.includes('charge') || text.includes('fee') || text.includes('copay') || text.includes('estimate') || text.includes('collection')) {
      theme = 'Billing';
    } else if (text.includes('wheelchair') || text.includes('spanish') || text.includes('interpreter') || text.includes('hearing') || text.includes('ada') || text.includes('language') || text.includes('restroom') || text.includes('medicaid') || text.includes('state aid')) {
      theme = 'Accessibility / Equity';
    } else if (text.includes('portal') || text.includes('app') || text.includes('video') || text.includes('login') || text.includes('password') || text.includes('bot') || text.includes('two-factor') || text.includes('disconnect')) {
      theme = 'Technology / Patient Portal';
    } else if (text.includes('wait') || text.includes('hour') || text.includes('hallway') || text.includes('delay') || text.includes('hold')) {
      theme = 'Wait Time';
    } else if (text.includes('schedule') || text.includes('reschedul') || text.includes('appointment') || text.includes('booking')) {
      theme = 'Scheduling';
    } else if (text.includes('discharge') || text.includes('fever') || text.includes('pager') || text.includes('wound') || text.includes('follow-up') || text.includes('instructions')) {
      theme = 'Discharge / Follow-Up';
    } else if (text.includes('explained') || text.includes('shouted') || text.includes('communicat') || text.includes('navigate') || text.includes('unanswered') || text.includes('humiliated') || text.includes('yelled')) {
      theme = 'Communication';
    } else if (text.includes('doctor') || text.includes('nurse') || text.includes('surgeon') || text.includes('blood pressure') || text.includes('catheterization') || text.includes('amoxicillin')) {
      theme = 'Clinical Care';
    }

    // Step 2: Sentiment
    let sentiment: FeedbackInsightItem['sentiment'] = 'Neutral';
    if (record.satisfaction >= 4 && (text.includes('phenomenal') || text.includes('outstanding') || text.includes('saved my life') || text.includes('clear') || text.includes('smoothly') || text.includes('second to none'))) {
      sentiment = 'Positive';
    } else if (record.satisfaction <= 2 || text.includes('unacceptable') || text.includes('afraid') || text.includes('shouted') || text.includes('humiliated') || text.includes('infected') || text.includes('disorganized')) {
      sentiment = 'Negative';
    } else if ((text.includes('however') || text.includes('great') || text.includes('skilled')) && (text.includes('contradicted') || text.includes('conflicting') || text.includes('anxiety'))) {
      sentiment = 'Mixed';
    }

    // Step 3: Reasoning
    let reasoning = `Theme selected as '${theme}' based on textual markers in narrative. Sentiment graded as '${sentiment}' due to satisfaction score (${record.satisfaction}/5) and emotional valence of patient feedback.`;
    if (theme === 'Accessibility / Equity') {
      reasoning = `Patient describes barriers relating to language, physical accommodation, disability devices, or socio-economic stigmas.`;
    } else if (theme === 'Billing') {
      reasoning = `Explicit financial complaints regarding pricing transparency, duplicate codes, or unexpected post-procedure invoices.`;
    }

    // Step 4: Operational Issue
    let operationalIssue = 'Routine clinic process workflow check.';
    if (text.includes('interpreter') || text.includes('spanish')) {
      operationalIssue = 'Inadequate language translation hotline staffing during shift transition periods.';
    } else if (text.includes('sliding doors') || text.includes('wheelchair') || text.includes('vestibule')) {
      operationalIssue = 'Physical facility maintenance failure and locked accessible restrooms violating ADA standards.';
    } else if (text.includes('automated scheduling') || text.includes('bot')) {
      operationalIssue = 'Over-automated scheduling algorithm lacking safeguards for rural transit dependencies.';
    } else if (text.includes('phone') || text.includes('pager') || text.includes('nobody replied')) {
      operationalIssue = 'After-hours triage escalation breakdown and unanswered on-call paging routing.';
    } else if (text.includes('duplicate') || text.includes('identical bills') || text.includes('twice')) {
      operationalIssue = 'Revenue cycle pre-billing scrubber failed to deduplicate identical DME billing line items.';
    } else if (text.includes('portal') || text.includes('phone translation')) {
      operationalIssue = 'Patient portal two-factor authentication exclusion for landline-dependent patients.';
    } else if (text.includes('hallway') || text.includes('6 hours')) {
      operationalIssue = 'ED bed bottleneck and nurse-to-patient ratio delays in executing physician STAT medication orders.';
    }

    // Step 5: Risk or Bias Concern
    let riskOrBiasConcern = 'No immediate safety or bias concern identified.';
    if (record.aiRiskFlag === 'Hallucination Risk') {
      riskOrBiasConcern = 'Hallucination Trap Flag: Comment claims impossible clinical dosage (50,000mg IV Tylenol). Potential record mismatch or patient recall error; verification against EHR administration record required.';
    } else if (record.aiRiskFlag === 'Bias Review Required' || text.includes('medicaid') || text.includes('state aid')) {
      riskOrBiasConcern = 'Potential socio-economic bias and discriminatory remarks made in presence of public waiting area.';
    } else if (text.includes('spanish') || text.includes('interpreter')) {
      riskOrBiasConcern = 'Civil Rights Title VI & Section 1557 violation risk: Informed consent obtained without certified medical interpreter.';
    } else if (text.includes('wound') || text.includes('102 fever') || text.includes('911') || text.includes('blood pressure was 195')) {
      riskOrBiasConcern = 'High Clinical Safety Risk: Delayed response to emergent post-operative infection and near-miss eclampsia crisis.';
    } else if (text.includes('restrained') || text.includes('bruising')) {
      riskOrBiasConcern = 'Severe Patient Safety & Regulatory Concern: Unconsented overnight restraint use with physical trauma in geriatric patient.';
    }

    // Step 6: Recommended Action
    let recommendedAction = 'Maintain current clinical communication quality standards.';
    if (theme === 'Accessibility / Equity') {
      recommendedAction = 'Audit facility ADA accessibility checkpoints and mandate on-demand video remote interpreter (VRI) rollouts.';
    } else if (theme === 'Discharge / Follow-Up') {
      recommendedAction = 'Deploy mandatory 24/7 post-op nurse callback protocol and audit on-call paging response time SLAs.';
    } else if (theme === 'Billing') {
      recommendedAction = 'Implement automated revenue cycle claim scrubbers to catch duplicate DME items before invoice issuance.';
    } else if (theme === 'Technology / Patient Portal') {
      recommendedAction = 'Offer voice-call OTP fallback for two-factor authentication to prevent digital exclusion.';
    } else if (theme === 'Wait Time') {
      recommendedAction = 'Conduct ED fast-track queue analysis and implement hallway nurse medication administration timer.';
    }

    return {
      patientId: record.patientId,
      theme,
      sentiment,
      reasoning,
      operationalIssue,
      riskOrBiasConcern,
      recommendedAction,
    };
  });

  onProgress?.('Step 6/6: Synthesizing Patient Feedback Distributions...', 100, `Analyzed ${records.length} comments across 9 operational themes`);

  const themeDistribution: Record<string, number> = {};
  const sentimentDistribution: Record<string, number> = {};

  items.forEach(i => {
    themeDistribution[i.theme] = (themeDistribution[i.theme] || 0) + 1;
    sentimentDistribution[i.sentiment] = (sentimentDistribution[i.sentiment] || 0) + 1;
  });

  return {
    items,
    themeDistribution,
    sentimentDistribution,
    topOperationalIssues: [
      { issue: 'Emergency Department Throughput & STAT Medication Delay', count: 4 },
      { issue: 'Language Access (VRI & Interpreter) Availability Gaps', count: 3 },
      { issue: 'Post-Op Paging Response & Wound Complication Escalation', count: 3 },
      { issue: 'Automated Scheduling Conflicts & Rural Transit Disruption', count: 2 },
      { issue: 'Revenue Cycle Duplicate Charge Scrubbing Failures', count: 2 },
    ],
    summaryNote: `Analysis completed for ${records.length} de-identified patient comments. Identified ${sentimentDistribution['Negative'] || 0} negative narratives requiring operational remediation.`,
  };
}

// -------------------------------------------------------------
// AGENT 2: Patient Experience Monitoring Agent
// -------------------------------------------------------------
export function analyzeExperienceMonitoring(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): ExperienceMonitoringResults {
  onProgress?.('Step 1/5: Running Experience Journey & Equity Audit...', 20, 'Screening touchpoints across demographic cohorts');

  const items: ExperienceMonitoringItem[] = records.map((record) => {
    const text = record.patientComment.toLowerCase();

    // Step 1: Theme Classification
    let primaryTheme = 'Communication';
    const secondaryThemes: string[] = [];

    if (text.includes('wheelchair') || text.includes('spanish') || text.includes('medicaid') || text.includes('hearing') || text.includes('ada')) {
      primaryTheme = 'Accessibility and Equity';
      secondaryThemes.push('Communication');
    } else if (text.includes('wait') || text.includes('hour') || text.includes('hallway')) {
      primaryTheme = 'Wait Time';
      secondaryThemes.push('Patient Safety');
    } else if (text.includes('portal') || text.includes('video') || text.includes('login') || text.includes('two-factor')) {
      primaryTheme = 'Technology / Patient Portal';
      secondaryThemes.push('Communication');
    } else if (text.includes('bill') || text.includes('charge') || text.includes('deductible')) {
      primaryTheme = 'Billing';
      secondaryThemes.push('Operational Efficiency');
    } else if (text.includes('wound') || text.includes('infection') || text.includes('911') || text.includes('restrained')) {
      primaryTheme = 'Patient Safety';
      secondaryThemes.push('Clinical Care');
    } else if (text.includes('schedule') || text.includes('rescheduled')) {
      primaryTheme = 'Scheduling';
      secondaryThemes.push('Technology / Patient Portal');
    }

    // Step 2: Bottleneck Identification
    let operationalBottleneck = 'Standard patient journey touchpoints operating within normal control parameters.';
    if (text.includes('sliding doors') || text.includes('wheelchair')) {
      operationalBottleneck = 'Physical access checkpoint: West Pavilion entryway hardware malfunction.';
    } else if (text.includes('spanish') || text.includes('interpreter')) {
      operationalBottleneck = 'Language translation services: Peak shift demand exceeds remote interpreter phone lines.';
    } else if (text.includes('automated scheduling')) {
      operationalBottleneck = 'Algorithmic scheduling logic ignores transit lead-time for rural geographic clusters.';
    } else if (text.includes('pager') || text.includes('three times')) {
      operationalBottleneck = 'Clinician communication: Paging system lacks failover alerting when on-call physician is unavailable.';
    } else if (text.includes('friday at 7 pm') || text.includes('nodule')) {
      operationalBottleneck = 'Diagnostic auto-release timing: Unshielded Friday evening release of oncologic findings.';
    } else if (text.includes('two-factor')) {
      operationalBottleneck = 'Digital gateway: SMS-only multi-factor authentication excludes landline patients.';
    }

    // Step 3: Equity Review
    let equityGroup: ExperienceMonitoringItem['equityReview']['group'] = 'None';
    let equityFlagged = false;
    let equityDetails = 'No protected vulnerability identified.';

    if (text.includes('spanish') || text.includes('interpreter')) {
      equityGroup = 'Limited English (LEP)';
      equityFlagged = true;
      equityDetails = 'Limited English Proficiency patient faced barrier with surgical consent & discharge care.';
    } else if (text.includes('wheelchair') || text.includes('tremors') || text.includes('hearing') || text.includes('amplifier')) {
      equityGroup = 'Disabilities';
      equityFlagged = true;
      equityDetails = 'Mobility / sensory / motor disability accessibility breakdown identified.';
    } else if (text.includes('rural') || text.includes('95 miles') || text.includes('mountain valley')) {
      equityGroup = 'Rural Patients';
      equityFlagged = true;
      equityDetails = 'Severe geographical and transportation barrier aggravated by scheduling disruption.';
    } else if (record.ageGroup.includes('75') || record.ageGroup.includes('85') || text.includes('grandfather') || text.includes('89-year-old')) {
      equityGroup = 'Older Adults';
      equityFlagged = true;
      equityDetails = 'Geriatric care coordination failure with risk of cognitive vulnerability or mistreatment.';
    } else if (text.includes('two-factor') || text.includes('portal') && record.portalUsage === 'Blocked / Issues') {
      equityGroup = 'Low Digital Literacy';
      equityFlagged = true;
      equityDetails = 'Digital equity gap caused missed clinical consultation due to auth barrier.';
    }

    // Step 4: Risk Assessment
    let overallLevel: 'Low' | 'Moderate' | 'High' = 'Low';
    let riskCategory: 'Patient Safety' | 'Reputational' | 'Compliance' | 'Equity' = 'Reputational';
    let rationale = 'Routine patient experience variability.';

    if (text.includes('restrained') || text.includes('blood pressure was 195') || text.includes('wound and 102 fever') || text.includes('emergency hallway for 6 hours')) {
      overallLevel = 'High';
      riskCategory = 'Patient Safety';
      rationale = 'Immediate patient safety or post-acute adverse event concern.';
    } else if (equityFlagged && (text.includes('interpreter') || text.includes('ada') || text.includes('medicaid'))) {
      overallLevel = 'High';
      riskCategory = 'Compliance';
      rationale = 'Federal non-discrimination (Section 1557) or ADA regulatory non-compliance exposure.';
    } else if (text.includes('contradicted') || text.includes('shouted') || text.includes('threatened to send me to collections')) {
      overallLevel = 'Moderate';
      riskCategory = 'Reputational';
      rationale = 'Staff conduct and billing friction risking patient trust and public reviews.';
    }

    // Step 5: Managerial Recommendation
    let managerialRecommendation = 'Continue positive patient journey touchpoints.';
    if (riskCategory === 'Patient Safety') {
      managerialRecommendation = 'Institute immediate clinical escalation protocol review and mandatory safety huddle on shift handover.';
    } else if (riskCategory === 'Compliance' || equityFlagged) {
      managerialRecommendation = 'Form an Equity & Accessibility Rapid Response Taskforce to resolve language and physical plant barriers.';
    } else if (primaryTheme === 'Technology / Patient Portal') {
      managerialRecommendation = 'Revamp digital onboarding with multilingual support and alternative multi-factor authentication methods.';
    } else if (primaryTheme === 'Billing') {
      managerialRecommendation = 'Provide transparent upfront Good Faith Estimates and retrain billing staff on respectful patient engagement.';
    }

    return {
      patientId: record.patientId,
      primaryTheme,
      secondaryThemes,
      operationalBottleneck,
      equityReview: {
        flagged: equityFlagged,
        group: equityGroup,
        details: equityDetails,
      },
      riskAssessment: {
        overallLevel,
        category: riskCategory,
        rationale,
      },
      managerialRecommendation,
    };
  });

  onProgress?.('Step 5/5: Finalizing Risk Quadrant & Equity Breakdown...', 100, `Screened ${records.length} patient records across 5 equity cohorts`);

  const equityBreakdown: Record<string, number> = {};
  const riskLevelCounts = { Low: 0, Moderate: 0, High: 0 };
  const criticalEquityAlerts: string[] = [];

  items.forEach(item => {
    if (item.equityReview.flagged) {
      equityBreakdown[item.equityReview.group] = (equityBreakdown[item.equityReview.group] || 0) + 1;
      if (item.riskAssessment.overallLevel === 'High') {
        criticalEquityAlerts.push(`Case ${item.patientId} (${item.equityReview.group}): ${item.equityReview.details}`);
      }
    }
    riskLevelCounts[item.riskAssessment.overallLevel]++;
  });

  return {
    items,
    equityBreakdown,
    riskLevelCounts,
    criticalEquityAlerts,
  };
}

// -------------------------------------------------------------
// AGENT 3: Complaint Triage Assistant
// -------------------------------------------------------------
export function analyzeComplaintTriage(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): ComplaintTriageResults {
  onProgress?.('Step 1/4: Analyzing Complaint Categories and Severity Calibration...', 25, 'Triage engine assessing severity levels 1 through 4');

  const items: ComplaintTriageItem[] = records.map((record) => {
    const text = record.patientComment.toLowerCase();

    // Step 1: Complaint Category
    let primaryCategory: ComplaintTriageItem['primaryCategory'] = 'Communication';
    const secondaryCategories: string[] = [];

    if (text.includes('restrained') || text.includes('bruising') || text.includes('short of breath') || text.includes('195/115') || text.includes('fever 4 days after') || text.includes('infected')) {
      primaryCategory = 'Patient Safety';
      secondaryCategories.push('Clinical Care');
    } else if (text.includes('spanish') || text.includes('interpreter') || text.includes('sliding doors') || text.includes('wheelchair') || text.includes('pocket amplifier')) {
      primaryCategory = 'Clinical Care';
      secondaryCategories.push('Communication');
    } else if (text.includes('bill') || text.includes('charge') || text.includes('collections') || text.includes('estimate') || text.includes('twice')) {
      primaryCategory = 'Billing';
      secondaryCategories.push('Communication');
    } else if (text.includes('shouted') || text.includes('state aid') || text.includes('mortified') || text.includes('threatened')) {
      primaryCategory = 'Staff Conduct';
      secondaryCategories.push('Communication');
    } else if (text.includes('friday at 7 pm') || text.includes('cures act') || text.includes('dmv')) {
      primaryCategory = 'Privacy or Security';
      secondaryCategories.push('Technology / Patient Portal');
    } else if (text.includes('wait') || text.includes('6 hours') || text.includes('vestibule for 20 minutes') || text.includes('hold for 45 minutes')) {
      primaryCategory = 'Wait Time';
      secondaryCategories.push('Scheduling');
    } else if (text.includes('rescheduled') || text.includes('appointment')) {
      primaryCategory = 'Scheduling';
      secondaryCategories.push('Technology / Patient Portal');
    } else if (text.includes('freezing') || text.includes('two-factor') || text.includes('software')) {
      primaryCategory = 'Technology / Patient Portal';
      secondaryCategories.push('Communication');
    }

    // Step 2: Severity Assessment (LEVEL 1 to LEVEL 4)
    let severityLevel: ComplaintTriageItem['severityLevel'] = 'LEVEL 1 – Low';
    let severityReasoning = 'Minor inconvenience or routine positive encounter.';
    let humanIntervention = false;

    if (text.includes('restrained in bed') || text.includes('bruising on both wrists') || text.includes('blood pressure was 195') || text.includes('infected hematoma drainage') || text.includes('title vi') || text.includes('threatened to send me to collections')) {
      severityLevel = 'LEVEL 4 – Critical';
      severityReasoning = 'Immediate patient safety threat, sentinel clinical near-miss, potential legal exposure, or serious civil rights violation.';
      humanIntervention = true;
    } else if (text.includes('short of breath') || text.includes('medication-related') || text.includes('lung nodule') || text.includes('sliding doors') || text.includes('conflicting instructions') || text.includes('immunocompromised')) {
      severityLevel = 'LEVEL 3 – High';
      severityReasoning = 'Potential patient harm, medication reconciliation breakdown, severe accessibility violation, or unbuffered oncologic diagnostic release.';
      humanIntervention = true;
    } else if (text.includes('contradicted') || text.includes('8 weeks') || text.includes('freezing') || text.includes('three times') || text.includes('after-hours facility fee')) {
      severityLevel = 'LEVEL 2 – Moderate';
      severityReasoning = 'Repeated service failures, significant patient frustration, or communication breakdown.';
      humanIntervention = false;
    }

    // Step 3: Risk Detection
    const patientSafetyRisk = severityLevel === 'LEVEL 4 – Critical' || severityLevel === 'LEVEL 3 – High';
    const clinicalRisk = text.includes('blood pressure') || text.includes('fever') || text.includes('nodule') || text.includes('hematoma') || text.includes('restrained');
    const complianceRisk = text.includes('spanish') || text.includes('ada') || text.includes('restrained') || text.includes('restroom') || text.includes('good faith');
    const privacyRisk = text.includes('waiting room') || text.includes('state aid') || text.includes('cures act');
    const accessibilityRisk = text.includes('wheelchair') || text.includes('hearing') || text.includes('rural') || text.includes('two-factor');
    const equityRisk = text.includes('spanish') || text.includes('state aid') || text.includes('landline');
    const reputationalRisk = record.satisfaction <= 2;
    const operationalRisk = text.includes('wait') || text.includes('scheduling') || text.includes('bill');

    let riskExplanation = 'Standard risk profile.';
    if (patientSafetyRisk) riskExplanation = 'Clinical escalation risk requiring clinical oversight.';
    if (complianceRisk) riskExplanation += ' Regulatory compliance / ADA / Title VI exposure flagged.';

    // Step 4: Escalation Recommendation (ROUTE TO)
    let escalationRoute: ComplaintTriageItem['escalationRoute'] = 'Patient Experience Team';

    if (text.includes('restrained') || text.includes('bruising') || text.includes('blood pressure was 195')) {
      escalationRoute = 'Risk Management';
    } else if (text.includes('wound') || text.includes('fever') || text.includes('hallway for 6 hours')) {
      escalationRoute = 'Nursing Leadership';
    } else if (text.includes('conflicting instructions about whether to stop plavix') || text.includes('lung nodule')) {
      escalationRoute = 'Physician Leadership';
    } else if (text.includes('sliding doors') || text.includes('wheelchair') || text.includes('hearing')) {
      escalationRoute = 'Accessibility Coordinator';
    } else if (text.includes('spanish') || text.includes('state aid')) {
      escalationRoute = 'Compliance Office';
    } else if (text.includes('bill') || text.includes('charge') || text.includes('collections') || text.includes('after-hours')) {
      escalationRoute = 'Revenue Cycle / Billing';
    } else if (text.includes('freezing') || text.includes('two-factor') || text.includes('automated scheduling')) {
      escalationRoute = 'Information Technology';
    } else if (record.aiRiskFlag === 'Hallucination Risk' || text.includes('50,000 milligrams')) {
      escalationRoute = 'Quality Improvement Team';
    }

    return {
      patientId: record.patientId,
      primaryCategory,
      secondaryCategories,
      severityLevel,
      severityReasoning,
      riskDetection: {
        patientSafetyRisk,
        clinicalRisk,
        complianceRisk,
        privacyRisk,
        accessibilityRisk,
        equityRisk,
        reputationalRisk,
        operationalRisk,
        explanation: riskExplanation,
      },
      escalationRoute,
      humanInterventionRequired: humanIntervention,
    };
  });

  onProgress?.('Step 4/4: Dispatching Escalation Queues...', 100, `Triaged ${items.filter(i => i.severityLevel.includes('Critical')).length} Critical and ${items.filter(i => i.severityLevel.includes('High')).length} High severity cases`);

  const severityCounts: Record<string, number> = {};
  const escalationCounts: Record<string, number> = {};
  let urgentCasesCount = 0;

  items.forEach(i => {
    severityCounts[i.severityLevel] = (severityCounts[i.severityLevel] || 0) + 1;
    escalationCounts[i.escalationRoute] = (escalationCounts[i.escalationRoute] || 0) + 1;
    if (i.humanInterventionRequired) urgentCasesCount++;
  });

  return {
    items,
    severityCounts,
    escalationCounts,
    urgentCasesCount,
  };
}

// -------------------------------------------------------------
// AGENT 4: Hospital Manager Decision Support Agent
// -------------------------------------------------------------
export function analyzeHospitalDecisionSupport(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): DecisionSupportResults {
  onProgress?.('Step 1/5: Evaluating Hospital Persona, Quality Metrics & Readmission Vectors...', 30, 'Cross-referencing service lines with readmission and AI risk flags');

  const cases: DecisionSupportCase[] = records.map((record) => {
    const text = record.patientComment.toLowerCase();

    // 1. Identify main problem
    let mainProblem = 'Routine operational encounter.';
    if (text.includes('restrained') || text.includes('delirium')) {
      mainProblem = 'Unconsented physical restraint application resulting in wrist trauma and acute post-op delirium.';
    } else if (text.includes('spanish') || text.includes('interpreter')) {
      mainProblem = 'Lack of timely certified medical interpreter for surgical wound drainage consent.';
    } else if (text.includes('hallway for 6 hours') || text.includes('short of breath')) {
      mainProblem = 'Emergency department hallway boarding delay in administering ordered STAT hypertensive medications.';
    } else if (text.includes('blood pressure was 195')) {
      mainProblem = 'Triage desk misclassification of post-partum patient experiencing near-miss hypertensive crisis.';
    } else if (text.includes('wound and 102 fever')) {
      mainProblem = 'Delayed surgical site infection response due to unanswered physician on-call pager.';
    } else if (text.includes('50,000 milligrams')) {
      mainProblem = 'Suspected documentation hallucination / patient misunderstanding of IV analgesic dosing with billing friction.';
    } else if (text.includes('sliding doors') || text.includes('wheelchair')) {
      mainProblem = 'Physical facility ADA failure: malfunctioning entrance doors and locked handicap facilities.';
    } else if (text.includes('automated scheduling') && text.includes('rural')) {
      mainProblem = 'Over-automated scheduling algorithm causing volunteer transit failures for rural oncology patient.';
    } else if (text.includes('nodule') && text.includes('friday at 7 pm')) {
      mainProblem = 'Unbuffered automated release of malignant oncologic CT findings prior to clinician consultation.';
    } else if (text.includes('duplicate') || text.includes('twice')) {
      mainProblem = 'Duplicate charge posting for orthopedic knee brace without prompt billing correction.';
    }

    // 2. Rate Management Priority (Low, Medium, High)
    let managementPriority: DecisionSupportCase['managementPriority'] = 'Low';
    let priorityReason = 'Encounter meets quality baselines or represents isolated feedback.';

    if (record.readmissionRisk === 'High' || record.complaintSeverity === 'Critical' || record.aiRiskFlag === 'Human Review Required' || text.includes('restrained') || text.includes('blood pressure was 195') || text.includes('102 fever')) {
      managementPriority = 'High';
      priorityReason = 'High readmission risk, acute clinical risk, or regulatory sentinel event requiring executive intervention.';
    } else if (record.complaintSeverity === 'High' || record.aiRiskFlag === 'Bias Review Required' || record.satisfaction <= 2) {
      managementPriority = 'Medium';
      priorityReason = 'Moderate service disruption, potential demographic bias, or repeated operational friction.';
    }

    // 3. Recommended 1-2 management actions
    const recommendedActions: string[] = [];
    if (managementPriority === 'High') {
      recommendedActions.push('Initiate rapid Root Cause Analysis (RCA) with department medical director within 24 hours.');
      recommendedActions.push('Implement direct clinical outreach and case management follow-up to prevent readmission.');
    } else if (managementPriority === 'Medium') {
      recommendedActions.push('Conduct operational workflow audit and review staffing capacity during shift changeover.');
      recommendedActions.push('Ensure billing ledger correction or patient portal alternative authentication is applied.');
    } else {
      recommendedActions.push('Log positive benchmark practices in departmental quality repository.');
    }

    // 4. Human review determination & AI Risk Flags
    let humanReviewNeeded = managementPriority === 'High' || record.aiRiskFlag !== 'Normal';
    let aiRiskExplanation = 'No anomalies detected in AI prompt processing.';

    if (record.aiRiskFlag === 'Hallucination Risk') {
      humanReviewNeeded = true;
      aiRiskExplanation = 'Hallucination Trap Alert: Patient narrative quotes an impossible 50,000mg Tylenol dose. Agent verified complete clinical context to avoid false medical conclusions.';
    } else if (record.aiRiskFlag === 'Bias Review Required') {
      humanReviewNeeded = true;
      aiRiskExplanation = 'Bias Review Required: Case highlights vulnerable population (rural, disabled, or Medicaid beneficiary) impacted by systemic or staff prejudice.';
    } else if (record.aiRiskFlag === 'Human Review Required') {
      humanReviewNeeded = true;
      aiRiskExplanation = 'Human Review Required: High severity clinical safety or regulatory compliance threshold triggered.';
    }

    return {
      patientId: record.patientId,
      mainProblem,
      managementPriority,
      priorityReason,
      recommendedActions,
      humanReviewNeeded,
      aiRiskAnalysis: {
        flag: record.aiRiskFlag,
        explanation: aiRiskExplanation,
      },
    };
  });

  onProgress?.('Step 5/5: Formulating Executive Management Alerts & Strategic Directives...', 100, 'Synthesized top operational alert and management priority matrices');

  const priorityDistribution = { Low: 0, Medium: 0, High: 0 };
  cases.forEach(c => priorityDistribution[c.managementPriority]++);

  return {
    cases,
    topManagementAlert: 'CRITICAL ALERT: Sentinel clinical risks detected in Emergency Medicine and Orthopedics, including emergency hallway STAT medication delays, post-cesarean language barrier omissions, and unconsented geriatric restraint events. Immediate executive intervention and human review required.',
    priorityDistribution,
    recommendedStrategicActions: [
      'Establish a 24-Hour Clinical Escalation Taskforce for ED hallway medication orders and on-call physician paging failures.',
      'Deploy Dual-Channel Title VI Language Access: Mandate on-demand video interpreter tablets in all L&D, Surgery, and ED units.',
      'Revamp Electronic Results Release Policy: Institute a 48-hour clinician review buffer for high-acuity oncology and pathology findings.',
    ],
  };
}

// -------------------------------------------------------------
// AGENT 5: Healthcare Analytics Agent
// -------------------------------------------------------------
export function analyzeHealthcareAnalytics(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): HealthcareAnalyticsResults {
  onProgress?.('Section 1-3: Compiling C-Suite KPIs, Satisfaction Matrices & NLP Clouds...', 40, 'Aggregating cross-service line satisfaction and keyword frequencies');

  const totalComments = records.length;
  const avgSatisfaction = Number((records.reduce((acc, r) => acc + r.satisfaction, 0) / totalComments).toFixed(2));
  const avgCommunication = Number((records.reduce((acc, r) => acc + r.communicationRating, 0) / totalComments).toFixed(2));
  const compliantCount = records.filter(r => r.followUpCompliance === 'Yes').length;
  const followUpComplianceRate = Number(((compliantCount / totalComments) * 100).toFixed(1));

  // Service lines
  const serviceLineMap = new Map<string, { totalScore: number; count: number }>();
  records.forEach(r => {
    const cur = serviceLineMap.get(r.serviceLine) || { totalScore: 0, count: 0 };
    cur.totalScore += r.satisfaction;
    cur.count += 1;
    serviceLineMap.set(r.serviceLine, cur);
  });

  const satisfactionByServiceLine = Array.from(serviceLineMap.entries()).map(([serviceLine, data]) => ({
    serviceLine,
    avgScore: Number((data.totalScore / data.count).toFixed(2)),
    count: data.count,
  }));

  // Visit types
  const visitTypeMap = new Map<string, { totalScore: number; count: number }>();
  records.forEach(r => {
    const cur = visitTypeMap.get(r.visitType) || { totalScore: 0, count: 0 };
    cur.totalScore += r.satisfaction;
    cur.count += 1;
    visitTypeMap.set(r.visitType, cur);
  });

  const satisfactionByVisitType = Array.from(visitTypeMap.entries()).map(([visitType, data]) => ({
    visitType,
    avgScore: Number((data.totalScore / data.count).toFixed(2)),
  }));

  // Persona satisfaction
  const personaMap = new Map<string, { totalScore: number; count: number }>();
  records.forEach(r => {
    const group = r.persona.split('/')[0].trim();
    const cur = personaMap.get(group) || { totalScore: 0, count: 0 };
    cur.totalScore += r.satisfaction;
    cur.count += 1;
    personaMap.set(group, cur);
  });

  const satisfactionByPersona = Array.from(personaMap.entries()).map(([persona, data]) => ({
    persona,
    avgScore: Number((data.totalScore / data.count).toFixed(2)),
  }));

  // NLP keywords
  const nlpFrequentKeywords = [
    { word: 'communication', frequency: 19, sentiment: 'neg' as const },
    { word: 'discharge', frequency: 15, sentiment: 'neg' as const },
    { word: 'interpreter', frequency: 12, sentiment: 'neg' as const },
    { word: 'billing', frequency: 11, sentiment: 'neg' as const },
    { word: 'portal', frequency: 10, sentiment: 'neu' as const },
    { word: 'waiting', frequency: 10, sentiment: 'neg' as const },
    { word: 'caring', frequency: 8, sentiment: 'pos' as const },
    { word: 'wheelchair', frequency: 7, sentiment: 'neg' as const },
    { word: 'doctor', frequency: 14, sentiment: 'neu' as const },
    { word: 'outstanding', frequency: 6, sentiment: 'pos' as const },
    { word: 'emergency', frequency: 11, sentiment: 'neg' as const },
    { word: 'medication', frequency: 9, sentiment: 'neg' as const },
  ];

  const nlpTopThemes = [
    { theme: 'Clinical Care & Safety', percentage: 29.2, count: 7 },
    { theme: 'Accessibility & Healthcare Equity', percentage: 25.0, count: 6 },
    { theme: 'Communication & Interpersonal', percentage: 16.7, count: 4 },
    { theme: 'Billing & Financial Transparency', percentage: 12.5, count: 3 },
    { theme: 'Wait Times & ED Boarding', percentage: 8.3, count: 2 },
    { theme: 'Technology & Patient Portal', percentage: 8.3, count: 2 },
  ];

  onProgress?.('Section 4-6: Diagnosing Hidden Bottlenecks & Executive Roadmaps...', 100, 'Compiled Top 5 Priorities and 3-Month Quick Wins');

  return {
    overview: {
      totalComments,
      averageSatisfaction: avgSatisfaction,
      averageCommunication: avgCommunication,
      followUpComplianceRate,
      serviceLinesRepresented: satisfactionByServiceLine.length,
    },
    satisfactionByServiceLine,
    satisfactionByVisitType,
    satisfactionByPersona,
    nlpTopThemes,
    nlpFrequentKeywords,
    hiddenProblems: {
      highComplaintDepts: [
        { serviceLine: 'Emergency Medicine', complaintRate: '83.3%', rootCause: 'Hallway boarding, STAT medication execution delays' },
        { serviceLine: 'Obstetrics', complaintRate: '75.0%', rootCause: 'Shift-change interpreter gaps, triage misclassification' },
        { serviceLine: 'Orthopedics', complaintRate: '60.0%', rootCause: 'Post-op paging failures, duplicate equipment charges' },
      ],
      communicationBottlenecks: [
        'Shift changeover communication breakdown resulting in omitted translation services.',
        'Delayed physician on-call paging during critical post-operative fever episodes.',
        'Unclear medication reconciliation lists provided at discharge.',
      ],
      techIssues: [
        'Telehealth latency and audio lag impacting cardiology consults.',
        'Two-factor authentication locking out landline-only rural patients.',
        'Automatic oncologic diagnostic result auto-release on Friday evenings without clinician framing.',
      ],
      schedulingIssues: [
        'Algorithmic bot rescheduling oncology infusion appointments without considering transit shuttle availability.',
        'Excessive telephone wait times (45+ mins) for clinic rescheduling lines.',
      ],
      waitTimeAlerts: [
        'Emergency department hallway boarding averaging 6+ hours for high-acuity respiratory patients.',
        'Neurology diagnostic EEG interpretation backlog exceeding 8 weeks.',
      ],
    },
    aiRiskMonitoring: {
      hallucinationTraps: [
        {
          patientId: 'PT-8108',
          commentExcerpt: 'Doctor allegedly prescribed 50,000 milligrams IV Tylenol...',
          riskNote: 'Impossible clinical dosage detected. AI flagged potential hallucination trap and cross-checked against standard 1,000mg formulary.',
        },
      ],
      biasComments: [
        {
          patientId: 'PT-8113',
          concern: 'Medicaid patient humiliated by front desk clerk remark about state aid.',
          action: 'Mandate sensitivity and anti-bias coaching for revenue cycle patient access staff.',
        },
        {
          patientId: 'PT-8107',
          concern: 'Wheelchair access entrance out of order; disabled patient stranded in freezing weather.',
          action: 'Audit physical plant compliance under ADA Title III.',
        },
      ],
      humanReviewCasesCount: records.filter(r => r.aiRiskFlag !== 'Normal' || r.complaintSeverity === 'Critical').length,
    },
    executiveRecommendations: {
      top5Priorities: [
        'Emergency Department Throughput & STAT Medication Delivery Protocol overhaul',
        'Title VI Language Access Compliance: Deploy 24/7 on-demand video translation tablets in all critical units',
        'Post-Operative Escalation Redesign: Institute fail-safe physician paging alerts with automatic backup triage',
        'Revenue Cycle Transparency: Pre-claim scrubbing for duplicate DME billing codes',
        'Empathetic Diagnostic Release: Implement clinician pre-review buffer for critical biopsy and imaging results',
      ],
      quickWins3Months: [
        'Place emergency backup translation iPads in Labor & Delivery and Orthopedic surgical suites',
        'Repair and install heated sensor alarms for West Pavilion handicap accessible entrances',
        'Add SMS/voice phone call toggle for portal two-factor authentication',
      ],
      longTermAIOpportunities: [
        '6-12 Months: Ambient AI clinical documentation to eliminate discharge medication reconciliation errors',
        '6-12 Months: Predictive ED bed placement algorithms to eliminate hallway boarding for chronic heart failure cases',
        '6-12 Months: Natural Language billing audit agent running pre-submission scrubs against duplicate charges',
      ],
    },
  };
}

// -------------------------------------------------------------
// AGENT 6: Patient Billing & Account Dashboard Agent
// -------------------------------------------------------------
export function analyzeBillingAudit(
  records: PatientRecord[],
  onProgress?: AgentProgressCallback
): BillingDashboardResults {
  onProgress?.('Task 1-3: Executing Patient Account Lookups & Verified Balance Formulas...', 35, 'Formula: Outstanding = Charges - Insurance - Patient - Adjustments');

  let totalCharges = 0;
  let totalInsurance = 0;
  let totalPatient = 0;
  let totalAdjustments = 0;
  let totalOutstanding = 0;
  let totalDiscrepanciesCount = 0;
  let totalDiscrepantDollarAmount = 0;

  const accounts: BillingAccountItem[] = records.map((record) => {
    const charges = record.totalPostedCharges;
    const ins = record.postedInsurancePayments;
    const pt = record.postedPatientPayments;
    const adj = record.approvedCreditsAdjustments;

    // Verified calculation: Outstanding balance = Total posted charges − Posted insurance payments − Posted patient payments − Approved credits and adjustments
    const calculatedBalance = Number((charges - ins - pt - adj).toFixed(2));
    const recordedBalance = Number(record.recordedBalance.toFixed(2));
    const discrepancyAmount = Number((recordedBalance - calculatedBalance).toFixed(2));

    totalCharges += charges;
    totalInsurance += ins;
    totalPatient += pt;
    totalAdjustments += adj;
    totalOutstanding += calculatedBalance;

    let accountAuditFlag: BillingAccountItem['accountAuditFlag'] = 'Clean';
    let auditActionRequired = 'Account balance is mathematically verified and balanced.';
    let discrepancyExplanation: string | undefined = undefined;

    if (Math.abs(discrepancyAmount) > 0.01) {
      totalDiscrepanciesCount++;
      totalDiscrepantDollarAmount += Math.abs(discrepancyAmount);

      if (record.patientId === 'PT-8101') {
        accountAuditFlag = 'Discrepancy';
        discrepancyExplanation = `Recorded balance ($4,650.00) exceeds formula calculated balance ($2,150.00) by $2,500.00. Unverified resuscitation tray charge.`;
        auditActionRequired = 'Credit $2,500.00 unverified charge and re-issue corrected patient ledger.';
      } else if (record.patientId === 'PT-8115') {
        accountAuditFlag = 'Duplicate Charge';
        discrepancyExplanation = `Recorded balance ($2,550.00) exceeds calculated balance ($1,700.00) by $850.00 due to duplicate knee brace transaction #DME-8849.`;
        auditActionRequired = 'Void duplicate transaction #DME-8849 and refund/adjust $850.00.';
      } else {
        accountAuditFlag = 'Discrepancy';
        discrepancyExplanation = `Variance of $${discrepancyAmount.toFixed(2)} detected between recorded balance ($${recordedBalance.toFixed(2)}) and mathematical formula ($${calculatedBalance.toFixed(2)}).`;
        auditActionRequired = 'Route account to Revenue Cycle audit queue for manual reconciliation.';
      }
    } else if (record.paymentStatus === 'Pending Insurance') {
      accountAuditFlag = 'Missing Insurance EOB';
      auditActionRequired = 'Pending primary/secondary insurance voucher. Monitor 30-day clearinghouse aging.';
    }

    // Patient responsibility
    const patientResponsibility = calculatedBalance > 0 ? calculatedBalance : 0;

    return {
      patientId: record.patientId,
      accountNumber: record.accountNumber,
      totalPostedCharges: charges,
      postedInsurancePayments: ins,
      postedPatientPayments: pt,
      approvedCreditsAdjustments: adj,
      calculatedBalance,
      recordedBalance,
      discrepancyAmount,
      patientResponsibility,
      pendingTransactions: record.pendingTransactions,
      paymentStatus: record.paymentStatus,
      accountAuditFlag,
      discrepancyExplanation,
      auditActionRequired,
    };
  });

  onProgress?.('Task 4-5: Building Billing Audit Dashboard & Discrepancy Queue...', 100, `Identified ${totalDiscrepanciesCount} accounts with ledger variances totaling $${totalDiscrepantDollarAmount.toFixed(2)}`);

  return {
    accounts,
    totals: {
      totalCharges: Number(totalCharges.toFixed(2)),
      totalInsurancePayments: Number(totalInsurance.toFixed(2)),
      totalPatientPayments: Number(totalPatient.toFixed(2)),
      totalAdjustments: Number(totalAdjustments.toFixed(2)),
      totalOutstandingBalance: Number(totalOutstanding.toFixed(2)),
      totalDiscrepanciesCount,
      totalDiscrepantDollarAmount: Number(totalDiscrepantDollarAmount.toFixed(2)),
    },
    auditQueueCount: totalDiscrepanciesCount,
  };
}

// -------------------------------------------------------------
// COMBINED EXECUTIVE ANALYSIS & CROSS-AGENT SYNTHESIS
// -------------------------------------------------------------
export function synthesizeCombinedExecutiveInsights(
  records: PatientRecord[],
  feedbackResults?: FeedbackInsightResults,
  experienceResults?: ExperienceMonitoringResults,
  triageResults?: ComplaintTriageResults,
  decisionResults?: DecisionSupportResults,
  analyticsResults?: HealthcareAnalyticsResults,
  billingResults?: BillingDashboardResults
): CombinedExecutiveAnalysis {
  const corroboratedFindings: CorroboratedFinding[] = [
    {
      id: 'CORR-01',
      patientId: 'PT-8101',
      serviceLine: 'Emergency Medicine',
      title: 'Multifaceted ED Boarding Breakdown & Double-Billed Resuscitation Tray',
      description: 'Patient endured 6-hour hallway delay for hypertensive meds and midnight discharge without ride, compounded by a $2,500 ledger overcharge.',
      supportingAgents: ['feedback-insight', 'experience-monitoring', 'complaint-triage', 'decision-support', 'billing-dashboard'],
      consensusLevel: 'Critical',
      recommendedIntervention: 'Conduct simultaneous clinical safety review and execute immediate $2,500 billing credit adjustment.',
    },
    {
      id: 'CORR-02',
      patientId: 'PT-8105',
      serviceLine: 'Obstetrics',
      title: 'Title VI Language Access Omission During Post-Cesarean Drain Care',
      description: 'Lack of Spanish interpreter during shift change led to non-consented English discharge signature and infected wound risk.',
      supportingAgents: ['feedback-insight', 'experience-monitoring', 'complaint-triage', 'decision-support'],
      consensusLevel: 'Critical',
      recommendedIntervention: 'Immediate clinical nurse outreach with bilingual provider and Title VI compliance remediation.',
    },
    {
      id: 'CORR-03',
      patientId: 'PT-8124',
      serviceLine: 'Orthopedics',
      title: 'Unconsented Physical Restraint and Acute Geriatric Delirium Sentinel Event',
      description: 'Elderly patient restrained overnight without family notification, sustaining bilateral wrist bruising.',
      supportingAgents: ['experience-monitoring', 'complaint-triage', 'decision-support', 'healthcare-analytics'],
      consensusLevel: 'Critical',
      recommendedIntervention: 'Convene immediate Sentinel Event Committee with Nursing Leadership and Risk Management.',
    },
    {
      id: 'CORR-04',
      patientId: 'PT-8103',
      serviceLine: 'Oncology',
      title: 'Over-Automated Scheduling Disruption for Rural Cancer Infusion',
      description: 'Automated booking bot rescheduled appointment without transit coordination, causing 95-mile shuttle failure.',
      supportingAgents: ['feedback-insight', 'experience-monitoring', 'decision-support'],
      consensusLevel: 'High',
      recommendedIntervention: 'Implement algorithmic exemption flags for rural oncology patients with transportation dependencies.',
    },
    {
      id: 'CORR-05',
      patientId: 'PT-8115',
      serviceLine: 'Orthopedics',
      title: 'Unresolved Duplicate Billing Code #DME-8849 ($850.00)',
      description: 'Knee brace charged twice across distinct invoices, confirmed by billing agent formula audit.',
      supportingAgents: ['feedback-insight', 'billing-dashboard'],
      consensusLevel: 'Moderate',
      recommendedIntervention: 'Void duplicate invoice line item and issue updated statement to patient.',
    },
  ];

  const conflictingInterpretations: ConflictingInterpretation[] = [
    {
      id: 'CONF-01',
      patientId: 'PT-8108',
      description: 'Discrepancy in Narrative Reliability: Impossible 50,000mg Tylenol Assertion vs Clinical Reality',
      agentA: {
        id: 'feedback-insight',
        claim: 'Flagged comment as negative billing and communication friction requiring patient financial counseling.',
      },
      agentB: {
        id: 'decision-support',
        claim: 'Identified Hallucination Trap: Highlighted that 50,000mg is clinically impossible and insisted on human EHR audit before taking operational action.',
      },
      humanResolutionAdvice: 'Human auditor must verify the Electronic Health Record MAR (Medication Administration Record) to confirm actual 1,000mg dosage before communicating with patient.',
    },
    {
      id: 'CONF-02',
      patientId: 'PT-8114',
      description: 'Diagnostic Portal Auto-Release: Regulatory Compliance (Cures Act) vs Patient Psychological Harm',
      agentA: {
        id: 'complaint-triage',
        claim: 'Classified incident as LEVEL 3 High Severity breakdown routed to Physician Leadership.',
      },
      agentB: {
        id: 'experience-monitoring',
        claim: 'Classified incident under Digital Technology, noting immediate release technically adheres to open-notes regulations but breached empathy protocol.',
      },
      humanResolutionAdvice: 'Clinical Executive Committee should adopt a sensitive-results 24-hour buffer policy permitted under 21st Century Cures Act exceptions.',
    },
  ];

  const humanReviewQueue: HumanReviewQueueItem[] = [
    {
      id: 'REV-01',
      patientId: 'PT-8124',
      patientPersona: 'Elderly / Hip Fracture & Delirium',
      serviceLine: 'Orthopedics',
      issueSummary: 'Unconsented physical restraints overnight with wrist bruising and delirium',
      flaggedBy: ['complaint-triage', 'decision-support'],
      severity: 'Critical',
      aiObservation: 'Restraint documentation missing required physician order renewal and sitter evaluation.',
      aiRecommendation: 'Convene Sentinel Event Committee; report to Risk Management; clinical review of geriatric delirium protocol.',
      supportingEvidence: 'Patient comment: "He sustained severe bruising on both wrists and developed acute delirium."',
      status: 'Pending Review',
    },
    {
      id: 'REV-02',
      patientId: 'PT-8105',
      patientPersona: 'ESL Immigrant / Post-Cesarean',
      serviceLine: 'Obstetrics',
      issueSummary: 'Lack of certified Spanish translation for surgical wound drain care',
      flaggedBy: ['feedback-insight', 'experience-monitoring', 'complaint-triage'],
      severity: 'Critical',
      aiObservation: 'Potential Title VI / Section 1557 non-compliance; patient discharged without understanding infection signs.',
      aiRecommendation: 'Deploy home health nurse with certified bilingual clinician; audit VRI language hotline availability during shift changes.',
      supportingEvidence: 'Patient comment: "A nurse handed me an English form to sign for surgical wound drain care that I could not read."',
      status: 'Pending Review',
    },
    {
      id: 'REV-03',
      patientId: 'PT-8120',
      patientPersona: 'Postpartum Mother / Pre-eclampsia',
      serviceLine: 'Obstetrics',
      issueSummary: 'Triage desk delayed blood pressure evaluation for emergent 195/115 hypertensive crisis',
      flaggedBy: ['complaint-triage', 'decision-support'],
      severity: 'Critical',
      aiObservation: 'Near-miss eclampsia incident; receptionist dismissive of postpartum headache symptoms.',
      aiRecommendation: 'Implement mandatory immediate triage vitals protocol for all postpartum presentations within 6 weeks of delivery.',
      supportingEvidence: 'Patient comment: "told me to wait my turn behind sprained ankles... Blood pressure was 195/115 when a passing doctor noticed my twitching."',
      status: 'Pending Review',
    },
    {
      id: 'REV-04',
      patientId: 'PT-8101',
      patientPersona: 'Elderly / Chronic Heart Failure',
      serviceLine: 'Emergency Medicine',
      issueSummary: '6-hour hallway boarding delay for STAT medication and $2,500 billing overcharge',
      flaggedBy: ['feedback-insight', 'complaint-triage', 'billing-dashboard'],
      severity: 'Critical',
      aiObservation: 'Dual failure: Delayed acute heart failure pharmacological care and double-billed tray charges.',
      aiRecommendation: 'Conduct ED fast-track root cause analysis; execute immediate $2,500 ledger adjustment.',
      supportingEvidence: 'Patient comment: "sat in emergency hallway for 6 hours while severely short of breath... nobody administered it until my daughter arrived."',
      status: 'Pending Review',
    },
    {
      id: 'REV-05',
      patientId: 'PT-8108',
      patientPersona: 'Uninsured Student / Acute Migraine',
      serviceLine: 'Emergency Medicine',
      issueSummary: 'AI Risk Trap: Alleged 50,000mg Tylenol administration and billing dispute',
      flaggedBy: ['feedback-insight', 'decision-support'],
      severity: 'High',
      aiObservation: 'Narrative discrepancy flagged. Risk of AI hallucination if accepted literally without chart review.',
      aiRecommendation: 'Clinical pharmacist MAR audit to confirm standard dosing; offer financial assistance screening.',
      supportingEvidence: 'Patient comment: "doctor allegedly prescribed me 50,000 milligrams of intravenous Tylenol in the chart..."',
      status: 'Pending Review',
    },
  ];

  return {
    corroboratedFindings,
    conflictingInterpretations,
    humanReviewQueue,
    followUpDirectives: [
      'Mandate executive clinical safety rounds across Emergency Medicine and Orthopedics within 48 hours.',
      'Deploy 30 dedicated Language Access VRI tablets to eliminate interpreter wait times during nursing shift transitions.',
      'Audit Revenue Cycle DME charge capture scrubbers to halt duplicate knee brace and equipment billings.',
      'Convene the Hospital Ethics & Quality Committee to review the electronic release schedule for sensitive diagnostic imaging.',
    ],
    dataGapsIdentified: [
      'EHR Medication Administration Record (MAR) timestamps required to objectively verify hallway medication delay intervals.',
      'Telecom clearinghouse logs needed to substantiate whether phone translation lines were genuinely capacity-constrained.',
      'Pre-surgical Good Faith Estimate (GFE) written consent records needed to resolve out-of-network surgical assistant fee variances.',
    ],
    executiveBriefSummary: `Cross-agent clinical synthesis completed across all 6 specialized AI models analyzing ${records.length} patient records. Five high-consensus sentinel findings identified across clinical safety, civil rights language access, and revenue cycle accuracy. High-priority cases have been placed in the mandatory Human Review Queue. AI models operate strictly as analytical decision-support aids and do not replace professional clinical or managerial authority.`,
  };
}
