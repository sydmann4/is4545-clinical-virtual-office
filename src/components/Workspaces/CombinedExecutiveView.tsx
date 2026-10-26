import React, { useState } from 'react';
import { 
  CombinedExecutiveAnalysis, 
  HumanReviewQueueItem, 
  AgentId,
  PatientRecord 
} from '../../types';
import { 
  ShieldCheck, 
  AlertOctagon, 
  AlertTriangle, 
  Scale, 
  FileCheck2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Download, 
  HelpCircle,
  Building,
  UserCheck,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface CombinedExecutiveViewProps {
  analysis: CombinedExecutiveAnalysis;
  records: PatientRecord[];
  onUpdateReviewItem: (itemId: string, status: HumanReviewQueueItem['status'], notes?: string) => void;
}

export const CombinedExecutiveView: React.FC<CombinedExecutiveViewProps> = ({
  analysis,
  records,
  onUpdateReviewItem,
}) => {
  const [selectedTab, setSelectedTab] = useState<'review-queue' | 'corroborated' | 'conflicts' | 'directives'>('review-queue');
  const [selectedReviewItem, setSelectedReviewItem] = useState<HumanReviewQueueItem | null>(
    analysis.humanReviewQueue[0] || null
  );
  const [reviewerDecisionNotes, setReviewerDecisionNotes] = useState('');

  const getAgentTag = (id: AgentId) => {
    switch (id) {
      case 'feedback-insight': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-900/60 text-blue-300 border border-blue-500/30">Voice #101</span>;
      case 'experience-monitoring': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">Equity #102</span>;
      case 'complaint-triage': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-900/60 text-rose-300 border border-rose-500/30">Triage #103</span>;
      case 'decision-support': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-900/60 text-purple-300 border border-purple-500/30">Strategy #104</span>;
      case 'healthcare-analytics': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">Analytics #105</span>;
      case 'billing-dashboard': return <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-900/60 text-amber-300 border border-amber-500/30">Audit #106</span>;
    }
  };

  const handleApprove = (item: HumanReviewQueueItem) => {
    onUpdateReviewItem(item.id, 'Approved', reviewerDecisionNotes || 'Approved by Clinical Operations Director');
    setReviewerDecisionNotes('');
  };

  const handleEscalate = (item: HumanReviewQueueItem) => {
    onUpdateReviewItem(item.id, 'Escalated to Clinical Director', reviewerDecisionNotes || 'Escalated to Chief Medical Officer & Risk Committee');
    setReviewerDecisionNotes('');
  };

  const handleOverride = (item: HumanReviewQueueItem) => {
    onUpdateReviewItem(item.id, 'Overridden', reviewerDecisionNotes || 'Overridden after chart review; false positive anomaly');
    setReviewerDecisionNotes('');
  };

  const handleExportBrief = () => {
    const briefText = `
AuraClinic Clinical Virtual-Office Executive Multi-Agent Brief
Generated: ${new Date().toLocaleString()}
-------------------------------------------------------------
EXECUTIVE SUMMARY:
${analysis.executiveBriefSummary}

CORROBORATED SENTINEL FINDINGS (Supported by 2+ AI Models):
${analysis.corroboratedFindings.map(f => `• [${f.id}] ${f.title} (${f.serviceLine}) - Supporting: ${f.supportingAgents.join(', ')}\n  Intervention: ${f.recommendedIntervention}`).join('\n\n')}

HIGH-PRIORITY HUMAN REVIEW QUEUE:
${analysis.humanReviewQueue.map(q => `• [${q.id}] ${q.patientId} (${q.severity}): ${q.issueSummary} [Status: ${q.status}]`).join('\n')}

FOLLOW-UP DIRECTIVES:
${analysis.followUpDirectives.map((d, i) => `${i + 1}. ${d}`).join('\n')}

DATA GAPS IDENTIFIED:
${analysis.dataGapsIdentified.map((g, i) => `${i + 1}. ${g}`).join('\n')}

NOTICE: The agents support healthcare analysis and decision-making but do not independently make clinical diagnoses, treatment decisions, employment decisions, or final compliance determinations.
    `.trim();

    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AuraClinic_Executive_Brief_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-teal-950/80 border-2 border-teal-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                Consolidated Cross-Agent Intelligence
              </span>
              <span className="text-xs text-slate-400 font-mono">6 Agent Corroboration Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1.5">
              Combined Executive Insights & Human Review Gate
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Synthesizes findings corroborated across multiple autonomous models, identifies conflicting interpretations, and enforces human-in-the-loop checkpoints before clinical or managerial action.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportBrief}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Human Review & Regulatory Notice (Prompt Requirement) */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-amber-200 leading-relaxed">
          <strong className="text-amber-300 uppercase tracking-wider block text-[11px] mb-0.5">
            MANDATORY CLINICAL DECISION SUPPORT & RESPONSIBLE USE NOTICE:
          </strong>
          The AI agents support healthcare analysis and operational decision-making but <strong>do not independently make clinical diagnoses, treatment decisions, employment decisions, or final compliance determinations</strong>. All high-risk findings, sentinel events, and billing discrepancies require review and final approval by authorized human clinical leadership.
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setSelectedTab('review-queue')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'review-queue'
              ? 'bg-rose-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Human Review Queue ({analysis.humanReviewQueue.filter(q => q.status === 'Pending Review').length} Pending)</span>
        </button>

        <button
          onClick={() => setSelectedTab('corroborated')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'corroborated'
              ? 'bg-teal-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Corroborated Sentinel Findings ({analysis.corroboratedFindings.length})</span>
        </button>

        <button
          onClick={() => setSelectedTab('conflicts')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'conflicts'
              ? 'bg-amber-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Conflicting Interpretations ({analysis.conflictingInterpretations.length})</span>
        </button>

        <button
          onClick={() => setSelectedTab('directives')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'directives'
              ? 'bg-indigo-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Action Directives & Data Gaps</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: High-Priority Human Review Queue (Critical Requirement)
         ========================================================================= */}
      {selectedTab === 'review-queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queue List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sentinel Incidents Gated for Human Sign-Off
            </h3>
            {analysis.humanReviewQueue.map((item) => {
              const isSelected = selectedReviewItem?.id === item.id;
              const isPending = item.status === 'Pending Review';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedReviewItem(item)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 shadow-lg ring-1 ring-rose-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono font-bold text-rose-400 text-xs">
                      {item.patientId} • {item.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white truncate">
                    {item.issueSummary}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 text-[10px] font-mono">
                    <span className="text-slate-400">{item.serviceLine}</span>
                    <span className={isPending ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Decision Gating Station */}
          {selectedReviewItem && (
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-rose-400">
                      CASE {selectedReviewItem.patientId}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {selectedReviewItem.patientPersona} • {selectedReviewItem.serviceLine}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedReviewItem.issueSummary}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-mono">Status:</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950 text-amber-300 border border-amber-500/40">
                    {selectedReviewItem.status}
                  </span>
                </div>
              </div>

              {/* 4 Distinct Audit Categories (Prompt Requirement) */}
              <div className="space-y-3 text-xs">
                {/* 1. Supporting Evidence */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-mono font-bold text-slate-400 text-[11px] uppercase">
                    1. Supporting Evidence (From Verified Clinical Data)
                  </span>
                  <p className="text-slate-200 italic font-mono leading-relaxed">
                    {selectedReviewItem.supportingEvidence}
                  </p>
                </div>

                {/* 2. AI Observation */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-mono font-bold text-blue-400 text-[11px] uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    2. AI-Generated Clinical Observation
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedReviewItem.aiObservation}
                  </p>
                </div>

                {/* 3. AI Recommendation */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-mono font-bold text-indigo-400 text-[11px] uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    3. AI-Generated Managerial Recommendation
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {selectedReviewItem.aiRecommendation}
                  </p>
                </div>

                {/* Flagged By */}
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">Independent Flagging Agents:</span>
                  <div className="flex items-center gap-1.5">
                    {selectedReviewItem.flaggedBy.map(id => (
                      <span key={id}>{getAgentTag(id)}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Human Decision Checkpoint Station */}
              <div className="p-4 rounded-xl bg-slate-950 border-2 border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-rose-400" />
                    4. Human Reviewer Checkpoint & Decision Sign-Off
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Sign-Off Authority Required</span>
                </div>

                <input
                  type="text"
                  placeholder="Enter clinical rationale, orders, or executive notes..."
                  value={reviewerDecisionNotes}
                  onChange={(e) => setReviewerDecisionNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />

                <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleOverride(selectedReviewItem)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Override AI Finding
                  </button>
                  <button
                    onClick={() => handleEscalate(selectedReviewItem)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600/30 text-amber-200 border border-amber-500/40 hover:bg-amber-600/50 transition-colors"
                  >
                    Escalate to Clinical Director
                  </button>
                  <button
                    onClick={() => handleApprove(selectedReviewItem)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all shadow-md"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve & Authorize Action</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: Corroborated Findings (Supported by 2+ AI Agents)
         ========================================================================= */}
      {selectedTab === 'corroborated' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            High-consensus operational risks and clinical issues independently supported across multiple agent analyses.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.corroboratedFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-teal-500/40 transition-all shadow-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-mono font-bold text-teal-400 text-xs">
                    {finding.patientId} • {finding.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-500/30 uppercase">
                    Consensus: {finding.consensusLevel}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">
                  {finding.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {finding.description}
                </p>

                <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-500/30 text-xs text-teal-200">
                  <span className="font-bold text-teal-400 uppercase text-[10px] block mb-0.5">
                    Recommended Executive Intervention:
                  </span>
                  {finding.recommendedIntervention}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
                  <span>Department: {finding.serviceLine}</span>
                  <div className="flex items-center gap-1">
                    {finding.supportingAgents.map(a => (
                      <span key={a}>{getAgentTag(a)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: Conflicting Interpretations
         ========================================================================= */}
      {selectedTab === 'conflicts' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            Cases where specialized agents produced divergent classifications or conflicting urgency recommendations, requiring human adjudication.
          </div>

          <div className="space-y-4">
            {analysis.conflictingInterpretations.map((conflict) => (
              <div
                key={conflict.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 shadow-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    CASE {conflict.patientId} • {conflict.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                    Model Divergence
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">
                  {conflict.description}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Perspective A */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      {getAgentTag(conflict.agentA.id)}
                      <span>Perspective A</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {conflict.agentA.claim}
                    </p>
                  </div>

                  {/* Perspective B */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      {getAgentTag(conflict.agentB.id)}
                      <span>Perspective B</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {conflict.agentB.claim}
                    </p>
                  </div>
                </div>

                {/* Human Resolution Advice */}
                <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs text-amber-200">
                  <span className="font-bold text-amber-300 uppercase text-[10px] block mb-0.5">
                    Clinical Director Adjudication Advice:
                  </span>
                  {conflict.humanResolutionAdvice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: Action Directives & Data Gaps
         ========================================================================= */}
      {selectedTab === 'directives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Follow-up directives */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Consolidated Follow-Up Directives
            </h3>
            <ol className="space-y-3 text-slate-200">
              {analysis.followUpDirectives.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Missing data gaps */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Identified Data Gaps for Future Ingestion
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Areas where additional clinical or operational data would enable more definitive conclusions:
            </p>
            <ul className="space-y-3 text-slate-200">
              {analysis.dataGapsIdentified.map((g, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span className="leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
