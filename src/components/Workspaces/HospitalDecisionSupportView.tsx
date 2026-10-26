import React, { useState } from 'react';
import { DecisionSupportResults, PatientRecord } from '../../types';
import { 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  UserCheck, 
  BrainCircuit, 
  Building2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface HospitalDecisionSupportViewProps {
  results: DecisionSupportResults;
  records: PatientRecord[];
}

export const HospitalDecisionSupportView: React.FC<HospitalDecisionSupportViewProps> = ({
  results,
  records,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = results.cases.filter((c) => {
    const matchesPriority = selectedPriority === 'All' || c.managementPriority === selectedPriority;
    const record = records.find(r => r.patientId === c.patientId);
    const matchesSearch =
      c.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mainProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.priorityReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record && record.patientComment.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP OF DASHBOARD: MOST IMPORTANT MANAGEMENT ALERT (Prompt Requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Briefcase className="w-32 h-32 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                AGENT 104 • HOSPITAL OPERATIONS STRATEGY
              </span>
              <span className="text-xs text-slate-400 font-mono">Arthur Vance, FACHE</span>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-500/40">
              <div className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                EXECUTIVE PRIORITY MANAGEMENT ALERT (CRITICAL FINDING)
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {results.topManagementAlert}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">HIGH PRIORITY</div>
              <div className="text-2xl font-bold text-rose-400">{results.priorityDistribution.High}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">MEDIUM</div>
              <div className="text-2xl font-bold text-amber-400">{results.priorityDistribution.Medium}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">LOW</div>
              <div className="text-2xl font-bold text-emerald-400">{results.priorityDistribution.Low}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Priority Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Management Priority:</span>
          {['All', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedPriority === p
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {p} {p !== 'All' ? `(${results.cases.filter(c => c.managementPriority === p).length})` : ''}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search problems, AI risk flags, or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Case Management Feed */}
      <div className="space-y-4">
        {filteredCases.map((c) => {
          const record = records.find(r => r.patientId === c.patientId);

          return (
            <div
              key={c.patientId}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-md"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-indigo-400 text-sm">
                    {c.patientId}
                  </span>
                  {record && (
                    <span className="text-xs text-slate-300 font-medium">
                      {record.persona} • {record.serviceLine} • {record.visitType}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    c.managementPriority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : c.managementPriority === 'Medium'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    Priority: {c.managementPriority}
                  </span>

                  {c.humanReviewNeeded && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      Human Review Needed
                    </span>
                  )}
                </div>
              </div>

              {/* Patient Narrative */}
              {record && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 italic">
                  "{record.patientComment}"
                </div>
              )}

              {/* Case Details 4 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Main Problem */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    1. Main Problem Identified
                  </div>
                  <p className="text-slate-200 font-semibold leading-relaxed">
                    {c.mainProblem}
                  </p>
                </div>

                {/* 3. Priority Reasoning */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-indigo-400 uppercase">
                    2 & 3. Priority Determination & Rationale
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {c.priorityReason}
                  </p>
                  {record && (
                    <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span>Satisfaction: {record.satisfaction}/5</span>
                      <span>• Readmission Risk: {record.readmissionRisk}</span>
                    </div>
                  )}
                </div>

                {/* 4. Recommended Management Actions */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-indigo-300 uppercase">
                    4. Recommended Management Actions
                  </div>
                  <ul className="space-y-1 text-slate-200">
                    {c.recommendedActions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Risk Flag Analysis Section */}
              {c.aiRiskAnalysis.flag !== 'Normal' && (
                <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
                  <BrainCircuit className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                      Special AI Risk Flag Evaluation: {c.aiRiskAnalysis.flag}
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {c.aiRiskAnalysis.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. BOTTOM OF DASHBOARD: 2-3 RECOMMENDED MANAGEMENT ACTIONS (Prompt Requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-2 border-indigo-500/40 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          EXECUTIVE SUMMARY: TOP 2–3 RECOMMENDED MANAGEMENT ACTIONS
        </div>
        <p className="text-xs text-slate-300">
          Formulated directly from data-driven cross-departmental pattern synthesis to support hospital leadership decisions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {results.recommendedStrategicActions.map((action, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40">
                  {idx + 1}
                </span>
                <span>STRATEGIC INITIATIVE</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
