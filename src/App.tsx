import React, { useState, useEffect, useRef } from 'react';
import { 
  AgentId, 
  AgentStatus, 
  AgentMetadata, 
  PatientRecord, 
  ActiveScreen, 
  AgentExecutionState,
  FeedbackInsightResults,
  ExperienceMonitoringResults,
  ComplaintTriageResults,
  DecisionSupportResults,
  HealthcareAnalyticsResults,
  BillingDashboardResults,
  CombinedExecutiveAnalysis,
  HumanReviewQueueItem
} from './types';
import { 
  AGENTS_METADATA, 
  DEFAULT_PATIENT_RECORDS 
} from './data/defaultPatientData';
import { 
  analyzeFeedbackInsight, 
  analyzeExperienceMonitoring, 
  analyzeComplaintTriage, 
  analyzeHospitalDecisionSupport, 
  analyzeHealthcareAnalytics, 
  analyzeBillingAudit, 
  synthesizeCombinedExecutiveInsights 
} from './services/agentEngine';

// Components
import { Navbar } from './components/Navbar';
import { AgentRoomCard } from './components/VirtualOffice/AgentRoomCard';
import { OfficeFloorplan } from './components/VirtualOffice/OfficeFloorplan';
import { SharedActivityBar } from './components/VirtualOffice/SharedActivityBar';
import { DataHubView } from './components/DataHub/DataHubView';
import { FeedbackInsightView } from './components/Workspaces/FeedbackInsightView';
import { ExperienceMonitoringView } from './components/Workspaces/ExperienceMonitoringView';
import { ComplaintTriageView } from './components/Workspaces/ComplaintTriageView';
import { HospitalDecisionSupportView } from './components/Workspaces/HospitalDecisionSupportView';
import { HealthcareAnalyticsView } from './components/Workspaces/HealthcareAnalyticsView';
import { BillingAuditView } from './components/Workspaces/BillingAuditView';
import { CombinedExecutiveView } from './components/Workspaces/CombinedExecutiveView';
import { AgentConfigModal } from './components/AgentConfigModal';
import { AgentAvatar } from './components/VirtualOffice/AgentAvatar';

// Icons
import { 
  Building2, 
  Layers, 
  Grid3X3, 
  Map, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  ArrowRight,
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // Primary State
  const [records, setRecords] = useState<PatientRecord[]>(DEFAULT_PATIENT_RECORDS);
  const [datasetName, setDatasetName] = useState<string>(
    'St. Jude & Memorial Regional Health — Q3 Patient Experience, Grievance & Ledger Dataset'
  );
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('virtual-office');
  const [activeWorkspaceAgentId, setActiveWorkspaceAgentId] = useState<AgentId>('feedback-insight');
  const [selectedAgentIds, setSelectedAgentIds] = useState<AgentId[]>([
    'feedback-insight',
    'experience-monitoring',
    'complaint-triage',
    'decision-support',
    'healthcare-analytics',
    'billing-dashboard',
  ]);
  const [officeLayoutMode, setOfficeLayoutMode] = useState<'cards' | 'floorplan'>('cards');
  const [configModalAgent, setConfigModalAgent] = useState<AgentMetadata | null>(null);

  // Agent Execution States
  const [executionStates, setExecutionStates] = useState<Record<AgentId, AgentExecutionState>>(() => {
    const initial: Record<string, AgentExecutionState> = {};
    AGENTS_METADATA.forEach((agent) => {
      initial[agent.id] = {
        id: agent.id,
        status: 'Completed',
        progress: 100,
        currentStep: 'Completed initial baseline audit',
        currentStepIdx: 6,
        totalSteps: 6,
        warnings: [],
        latestFindingPreview: 'Baseline analysis generated from 24 patient records.',
        completedAt: 'Just now',
      };
    });
    return initial as Record<AgentId, AgentExecutionState>;
  });

  // Results State
  const [feedbackResults, setFeedbackResults] = useState<FeedbackInsightResults | null>(() =>
    analyzeFeedbackInsight(DEFAULT_PATIENT_RECORDS)
  );
  const [experienceResults, setExperienceResults] = useState<ExperienceMonitoringResults | null>(() =>
    analyzeExperienceMonitoring(DEFAULT_PATIENT_RECORDS)
  );
  const [triageResults, setTriageResults] = useState<ComplaintTriageResults | null>(() =>
    analyzeComplaintTriage(DEFAULT_PATIENT_RECORDS)
  );
  const [decisionResults, setDecisionResults] = useState<DecisionSupportResults | null>(() =>
    analyzeHospitalDecisionSupport(DEFAULT_PATIENT_RECORDS)
  );
  const [analyticsResults, setAnalyticsResults] = useState<HealthcareAnalyticsResults | null>(() =>
    analyzeHealthcareAnalytics(DEFAULT_PATIENT_RECORDS)
  );
  const [billingResults, setBillingResults] = useState<BillingDashboardResults | null>(() =>
    analyzeBillingAudit(DEFAULT_PATIENT_RECORDS)
  );
  const [combinedExecutiveAnalysis, setCombinedExecutiveAnalysis] = useState<CombinedExecutiveAnalysis | null>(() =>
    synthesizeCombinedExecutiveInsights(DEFAULT_PATIENT_RECORDS)
  );

  // Track if any agent is actively processing
  const isAnyProcessing = Object.values(executionStates).some((s) => s.status === 'Processing');
  const completedAgentsCount = Object.values(executionStates).filter((s) => s.status === 'Completed').length;
  const pendingReviewCount = combinedExecutiveAnalysis?.humanReviewQueue.filter(
    (q) => q.status === 'Pending Review'
  ).length || 0;

  // Toggle selection for an agent
  const handleToggleSelectAgent = (id: AgentId) => {
    setSelectedAgentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all
  const handleToggleSelectAll = () => {
    if (selectedAgentIds.length === AGENTS_METADATA.length) {
      setSelectedAgentIds([]);
    } else {
      setSelectedAgentIds(AGENTS_METADATA.map((a) => a.id));
    }
  };

  // Run a single agent
  const handleRunSingle = async (agentId: AgentId) => {
    await runAgent(agentId, records);
  };

  // Run all selected agents in parallel
  const handleRunSelected = async () => {
    if (selectedAgentIds.length === 0) return;
    
    // Switch to live processing or stay on office
    const promises = selectedAgentIds.map((id) => runAgent(id, records));
    await Promise.all(promises);

    // After all selected finish, synthesize combined executive insights
    const newCombined = synthesizeCombinedExecutiveInsights(
      records,
      feedbackResults || undefined,
      experienceResults || undefined,
      triageResults || undefined,
      decisionResults || undefined,
      analyticsResults || undefined,
      billingResults || undefined
    );
    setCombinedExecutiveAnalysis(newCombined);
  };

  // Simulation execution runner with real multi-stage progression
  const runAgent = async (agentId: AgentId, currentRecords: PatientRecord[]) => {
    const meta = AGENTS_METADATA.find((a) => a.id === agentId)!;
    
    // Set to processing
    setExecutionStates((prev) => ({
      ...prev,
      [agentId]: {
        id: agentId,
        status: 'Processing',
        progress: 10,
        currentStep: 'Step 1: Ingesting verified dataset...',
        currentStepIdx: 1,
        totalSteps: 6,
        warnings: [],
        latestFindingPreview: `Connecting to ${currentRecords.length} de-identified patient encounters...`,
        startedAt: Date.now(),
      },
    }));

    // Multi-stage progression timer
    const steps = [
      { pct: 25, label: 'Step 2: Processing natural language narratives & clinical tags', delay: 400 },
      { pct: 55, label: 'Step 3: Calculating domain-specific risk & operational metrics', delay: 450 },
      { pct: 85, label: 'Step 4: Cross-referencing equity barriers & compliance safeguards', delay: 400 },
      { pct: 100, label: 'Step 5: Finalizing decision-support findings & audit tables', delay: 350 },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          progress: step.pct,
          currentStep: step.label,
          latestFindingPreview: `Identified critical operational factors across ${currentRecords.length} records.`,
        },
      }));
    }

    // Produce real analytical result
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (agentId === 'feedback-insight') {
      const res = analyzeFeedbackInsight(currentRecords);
      setFeedbackResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Completed 6-step qualitative feedback decomposition',
          latestFindingPreview: `${res.items.length} comments classified. Identified ${res.sentimentDistribution['Negative'] || 0} negative experiences.`,
          completedAt: nowStr,
        },
      }));
    } else if (agentId === 'experience-monitoring') {
      const res = analyzeExperienceMonitoring(currentRecords);
      setExperienceResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Completed patient experience & healthcare equity review',
          latestFindingPreview: `Flagged ${res.criticalEquityAlerts.length} high-risk equity alerts across 5 vulnerable cohorts.`,
          completedAt: nowStr,
        },
      }));
    } else if (agentId === 'complaint-triage') {
      const res = analyzeComplaintTriage(currentRecords);
      setTriageResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Completed 4-level complaint triage & team escalation dispatch',
          latestFindingPreview: `${res.urgentCasesCount} cases routed through mandatory human intervention gating.`,
          completedAt: nowStr,
        },
      }));
    } else if (agentId === 'decision-support') {
      const res = analyzeHospitalDecisionSupport(currentRecords);
      setDecisionResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Formulated managerial priorities and executive alert',
          latestFindingPreview: `Executive Management Alert generated; ${res.priorityDistribution.High} High-priority cases flagged.`,
          completedAt: nowStr,
        },
      }));
    } else if (agentId === 'healthcare-analytics') {
      const res = analyzeHealthcareAnalytics(currentRecords);
      setAnalyticsResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Compiled 6-section C-Suite leadership analytics suite',
          latestFindingPreview: `Avg satisfaction ${res.overview.averageSatisfaction}/5.0 across ${res.overview.serviceLinesRepresented} service lines.`,
          completedAt: nowStr,
        },
      }));
    } else if (agentId === 'billing-dashboard') {
      const res = analyzeBillingAudit(currentRecords);
      setBillingResults(res);
      setExecutionStates((prev) => ({
        ...prev,
        [agentId]: {
          ...prev[agentId],
          status: 'Completed',
          progress: 100,
          currentStep: 'Reconciled mathematical balances and duplicate charges',
          latestFindingPreview: `Detected ${res.totals.totalDiscrepanciesCount} accounts with ledger variances totaling $${res.totals.totalDiscrepantDollarAmount.toFixed(2)}.`,
          completedAt: nowStr,
        },
      }));
    }

    // Refresh cross-agent synthesis
    setCombinedExecutiveAnalysis((prev) =>
      synthesizeCombinedExecutiveInsights(currentRecords)
    );
  };

  // Reset all agent states
  const handleResetAll = () => {
    const resetStates: Record<string, AgentExecutionState> = {};
    AGENTS_METADATA.forEach((a) => {
      resetStates[a.id] = {
        id: a.id,
        status: 'Idle',
        progress: 0,
        currentStep: 'Standby',
        currentStepIdx: 0,
        totalSteps: 6,
        warnings: [],
        latestFindingPreview: 'Standing by for dataset ingestion.',
      };
    });
    setExecutionStates(resetStates as Record<AgentId, AgentExecutionState>);
  };

  // Open an agent's individual workspace
  const handleOpenWorkspace = (agentId: AgentId) => {
    setActiveWorkspaceAgentId(agentId);
    setActiveScreen('results-dashboard');
  };

  // Update records from DataHub
  const handleUpdateRecords = (newRecords: PatientRecord[], name: string) => {
    setRecords(newRecords);
    setDatasetName(name);
    // Auto-run all selected agents on new dataset
    selectedAgentIds.forEach((id) => runAgent(id, newRecords));
  };

  // Human review sign-off update
  const handleUpdateReviewItem = (
    itemId: string,
    status: HumanReviewQueueItem['status'],
    notes?: string
  ) => {
    setCombinedExecutiveAnalysis((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        humanReviewQueue: prev.humanReviewQueue.map((item) =>
          item.id === itemId
            ? {
                ...item,
                status,
                humanReviewerDecision: status,
                reviewerNotes: notes,
                reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            : item
        ),
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Application Bar */}
      <Navbar
        activeScreen={activeScreen}
        activeAgentId={activeWorkspaceAgentId}
        recordsCount={records.length}
        isAnyProcessing={isAnyProcessing}
        completedAgentsCount={completedAgentsCount}
        pendingReviewCount={pendingReviewCount}
        onNavigate={(screen, agentId) => {
          setActiveScreen(screen);
          if (agentId) setActiveWorkspaceAgentId(agentId);
        }}
      />

      {/* Main Screen Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* =========================================================================
            SCREEN 1: Virtual-Office Landing Page
           ========================================================================= */}
        {activeScreen === 'virtual-office' && (
          <div className="space-y-6">
            {/* Office Header & View Switcher */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                    Virtual Office Complex
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    6 Specialized Healthcare AI Agents
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mt-1.5">
                  Clinical Operations Virtual Office
                </h1>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Welcome to the multi-agent clinical coordination center. Each room houses an autonomous healthcare AI specialist analyzing patient narratives, experience equity, complaint severity, managerial priorities, enterprise metrics, and billing accuracy.
                </p>
              </div>

              {/* View Layout Toggle */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold shrink-0">
                <button
                  onClick={() => setOfficeLayoutMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    officeLayoutMode === 'cards'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>Room Grid</span>
                </button>
                <button
                  onClick={() => setOfficeLayoutMode('floorplan')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    officeLayoutMode === 'floorplan'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Floorplan View</span>
                </button>
              </div>
            </div>

            {/* Shared Activity Overview Bar */}
            <SharedActivityBar
              agents={AGENTS_METADATA}
              executionStates={executionStates}
              selectedAgentIds={selectedAgentIds}
              recordsCount={records.length}
              datasetName={datasetName}
              isAnyProcessing={isAnyProcessing}
              onToggleSelectAll={handleToggleSelectAll}
              onRunSelected={handleRunSelected}
              onResetAll={handleResetAll}
              onOpenDataUpload={() => setActiveScreen('data-upload')}
              onOpenCombinedExecutive={() => setActiveScreen('combined-executive')}
            />

            {/* Layout Mode 1: 6 Interactive Animated Agent Rooms */}
            {officeLayoutMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AGENTS_METADATA.map((agent) => (
                  <AgentRoomCard
                    key={agent.id}
                    metadata={agent}
                    executionState={executionStates[agent.id]}
                    isSelected={selectedAgentIds.includes(agent.id)}
                    onToggleSelect={handleToggleSelectAgent}
                    onRunSingle={handleRunSingle}
                    onOpenWorkspace={handleOpenWorkspace}
                    onOpenConfig={(id) => {
                      const found = AGENTS_METADATA.find((a) => a.id === id);
                      if (found) setConfigModalAgent(found);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Layout Mode 2: Architectural Floorplan View */
              <OfficeFloorplan
                agents={AGENTS_METADATA}
                executionStates={executionStates}
                selectedAgentIds={selectedAgentIds}
                onSelectAgent={handleToggleSelectAgent}
                onOpenWorkspace={handleOpenWorkspace}
              />
            )}
          </div>
        )}

        {/* =========================================================================
            SCREEN 2: Data Upload & Validation Screen
           ========================================================================= */}
        {activeScreen === 'data-upload' && (
          <DataHubView
            records={records}
            datasetName={datasetName}
            onUpdateRecords={handleUpdateRecords}
            onProceedToAgents={() => setActiveScreen('virtual-office')}
          />
        )}

        {/* =========================================================================
            SCREEN 5: Agent Results Dashboard (Individual Workspaces)
           ========================================================================= */}
        {activeScreen === 'results-dashboard' && (
          <div className="space-y-6">
            {/* Top Workspace Selector Tabs */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-md">
              <div className="flex items-center gap-2">
                {AGENTS_METADATA.map((agent) => {
                  const isActive = activeWorkspaceAgentId === agent.id;
                  const isDone = executionStates[agent.id]?.status === 'Completed';

                  return (
                    <button
                      key={agent.id}
                      onClick={() => setActiveWorkspaceAgentId(agent.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                          : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-75">
                        #{agent.roomNumber}
                      </span>
                      <span>{agent.agentName.split(',')[0]}</span>
                      {isDone && (
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isActive ? 'text-slate-950' : 'text-emerald-400'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setActiveScreen('combined-executive')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/40 transition-colors shrink-0"
              >
                <span>View Combined Executive</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Workspace View */}
            {activeWorkspaceAgentId === 'feedback-insight' && feedbackResults && (
              <FeedbackInsightView
                results={feedbackResults}
                records={records}
              />
            )}

            {activeWorkspaceAgentId === 'experience-monitoring' && experienceResults && (
              <ExperienceMonitoringView
                results={experienceResults}
                records={records}
              />
            )}

            {activeWorkspaceAgentId === 'complaint-triage' && triageResults && (
              <ComplaintTriageView
                results={triageResults}
                records={records}
              />
            )}

            {activeWorkspaceAgentId === 'decision-support' && decisionResults && (
              <HospitalDecisionSupportView
                results={decisionResults}
                records={records}
              />
            )}

            {activeWorkspaceAgentId === 'healthcare-analytics' && analyticsResults && (
              <HealthcareAnalyticsView
                results={analyticsResults}
                records={records}
              />
            )}

            {activeWorkspaceAgentId === 'billing-dashboard' && billingResults && (
              <BillingAuditView
                results={billingResults}
                records={records}
              />
            )}
          </div>
        )}

        {/* =========================================================================
            SCREEN 6: Combined Executive Dashboard
           ========================================================================= */}
        {activeScreen === 'combined-executive' && combinedExecutiveAnalysis && (
          <CombinedExecutiveView
            analysis={combinedExecutiveAnalysis}
            records={records}
            onUpdateReviewItem={handleUpdateReviewItem}
          />
        )}
      </main>

      {/* Agent Configuration Modal */}
      {configModalAgent && (
        <AgentConfigModal
          metadata={configModalAgent}
          isOpen={!!configModalAgent}
          onClose={() => setConfigModalAgent(null)}
          onRunSingle={(id) => {
            handleRunSingle(id);
          }}
        />
      )}
    </div>
  );
}
