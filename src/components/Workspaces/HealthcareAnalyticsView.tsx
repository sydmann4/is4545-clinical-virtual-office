import React, { useState } from 'react';
import { HealthcareAnalyticsResults, PatientRecord } from '../../types';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  AlertCircle, 
  BrainCircuit, 
  Sparkles, 
  Users, 
  Building2, 
  Clock, 
  MessageSquare,
  Activity,
  Layers,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';

interface HealthcareAnalyticsViewProps {
  results: HealthcareAnalyticsResults;
  records: PatientRecord[];
}

export const HealthcareAnalyticsView: React.FC<HealthcareAnalyticsViewProps> = ({
  results,
  records,
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
                  AGENT 105 • C-SUITE EXECUTIVE ANALYTICS HUB
                </span>
                <span className="text-xs text-slate-400 font-mono">Dr. Aris Thorne, PhD</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Hospital Leadership Executive Performance Dashboard
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                C-Suite reporting portal structured into 6 mandated analytical sections: Executive Overview, Satisfaction Deep-Dive, NLP Semantic Clouds, Hidden Bottlenecks, AI Risk Monitoring, and Strategic Roadmaps.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-cyan-300 font-mono text-xs font-bold">
              6 Executive Sections Active
            </span>
          </div>
        </div>
      </div>

      {/* Section Quick Nav Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold">
        {[
          { num: 1, label: '1. Executive Overview' },
          { num: 2, label: '2. Satisfaction Insights' },
          { num: 3, label: '3. NLP Semantic Analysis' },
          { num: 4, label: '4. Hidden Problems' },
          { num: 5, label: '5. AI Risk Monitoring' },
          { num: 6, label: '6. Executive Recommendations' },
        ].map((sec) => (
          <button
            key={sec.num}
            onClick={() => setActiveSection(sec.num)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSection === sec.num
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          SECTION 1: Executive Overview (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 1 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              SECTION 1: Executive Overview KPIs
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-time cohort telemetry</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Comments Analyzed</div>
              <div className="text-3xl font-bold font-mono text-white">
                {results.overview.totalComments}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">100% data ingestion</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Avg Satisfaction Score</div>
              <div className="text-3xl font-bold font-mono text-cyan-400">
                {results.overview.averageSatisfaction} <span className="text-sm text-slate-500">/ 5.0</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">CAHPS equivalent</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Avg Communication Rating</div>
              <div className="text-3xl font-bold font-mono text-emerald-400">
                {results.overview.averageCommunication} <span className="text-sm text-slate-500">/ 5.0</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Clinician clarity index</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Follow-Up Compliance</div>
              <div className="text-3xl font-bold font-mono text-indigo-400">
                {results.overview.followUpComplianceRate}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Discharge adherence</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Service Lines Represented</div>
              <div className="text-3xl font-bold font-mono text-amber-400">
                {results.overview.serviceLinesRepresented}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Hospital clinical departments</div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: Patient Satisfaction Insights (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 2 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              SECTION 2: Patient Satisfaction Insights
            </h3>
            <span className="text-xs text-slate-400 font-mono">Multivariate breakdown</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* By Service Line */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                Satisfaction by Service Line
              </h4>
              <div className="space-y-2">
                {results.satisfactionByServiceLine.map((sl, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{sl.serviceLine}</span>
                      <span className="font-mono font-bold text-white">{sl.avgScore} / 5</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          sl.avgScore >= 4.0 ? 'bg-emerald-500' : sl.avgScore >= 3.0 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${(sl.avgScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Visit Type */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Satisfaction by Visit Type
              </h4>
              <div className="space-y-2">
                {results.satisfactionByVisitType.map((vt, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{vt.visitType}</span>
                      <span className="font-mono font-bold text-white">{vt.avgScore} / 5</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          vt.avgScore >= 4.0 ? 'bg-emerald-500' : vt.avgScore >= 3.0 ? 'bg-indigo-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${(vt.avgScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Patient Persona */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Satisfaction by Patient Persona
              </h4>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {results.satisfactionByPersona.map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 truncate max-w-[170px]">{p.persona}</span>
                      <span className="font-mono font-bold text-white">{p.avgScore} / 5</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.avgScore >= 4.0 ? 'bg-emerald-500' : p.avgScore >= 3.0 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${(p.avgScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: NLP Analysis (Top Themes, Keywords, Word Cloud) (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 3 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              SECTION 3: NLP Semantic Analysis & Word Cloud
            </h3>
            <span className="text-xs text-slate-400 font-mono">Natural Language Processing of Free-Text Comments</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Themes */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Top Themes Identified from Qualitative Comments
              </h4>
              <div className="space-y-2">
                {results.nlpTopThemes.map((thm, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{thm.theme}</span>
                      <span className="font-mono font-bold text-cyan-400">{thm.percentage}% ({thm.count})</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${thm.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Word Cloud Visualization */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  NLP Semantic Word Cloud & Frequency Clusters
                </h4>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-center gap-3 min-h-[170px]">
                  {results.nlpFrequentKeywords.map((kw, idx) => {
                    const fontSize = Math.max(11, Math.min(26, 10 + kw.frequency * 0.9));
                    const color = kw.sentiment === 'neg' ? 'text-rose-400 hover:text-rose-300' : kw.sentiment === 'pos' ? 'text-emerald-400 hover:text-emerald-300' : 'text-cyan-400 hover:text-cyan-300';
                    return (
                      <span
                        key={idx}
                        className={`font-bold transition-all cursor-pointer hover:scale-110 select-none ${color}`}
                        style={{ fontSize: `${fontSize}px` }}
                        title={`Occurred ${kw.frequency} times (${kw.sentiment} sentiment)`}
                      >
                        {kw.word}
                        <span className="text-[9px] font-mono opacity-60 ml-0.5">({kw.frequency})</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800 mt-3 font-mono">
                <span className="text-rose-400 font-semibold">• Negative sentiment cluster</span>
                <span className="text-emerald-400 font-semibold">• Positive benchmark</span>
                <span className="text-cyan-400 font-semibold">• Neutral / Process</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: Hidden Organizational Problems (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 4 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              SECTION 4: Hidden Organizational Bottlenecks & Operational Failures
            </h3>
            <span className="text-xs text-slate-400 font-mono">Root cause telemetry</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* High complaint service lines */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30 space-y-2">
              <div className="font-bold text-rose-300 uppercase text-[11px]">
                High-Complaint Service Lines
              </div>
              <div className="space-y-2">
                {results.hiddenProblems.highComplaintDepts.map((d, i) => (
                  <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="flex justify-between font-bold text-white">
                      <span>{d.serviceLine}</span>
                      <span className="text-rose-400 font-mono">{d.complaintRate}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{d.rootCause}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication & Technology Bottlenecks */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 uppercase text-[11px]">
                Communication & Tech Bottlenecks
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {results.hiddenProblems.communicationBottlenecks.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
                {results.hiddenProblems.techIssues.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scheduling & Wait Times */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 uppercase text-[11px]">
                Scheduling & Wait-Time Alerts
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {results.hiddenProblems.schedulingIssues.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
                {results.hiddenProblems.waitTimeAlerts.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: AI Risk Monitoring (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 5 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              SECTION 5: AI Risk Monitoring & Hallucination Defense
            </h3>
            <span className="text-xs text-slate-400 font-mono">Responsible AI Guardrails</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Hallucination Traps */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/30 space-y-2">
              <div className="font-bold text-purple-300 uppercase text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Detected Hallucination Traps & Data Contradictions
              </div>
              {results.aiRiskMonitoring.hallucinationTraps.map((h, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-purple-400">
                    <span>Case {h.patientId}</span>
                    <span className="text-xs text-amber-400">Dosage Anomaly Trap</span>
                  </div>
                  <p className="text-slate-300 italic">"{h.commentExcerpt}"</p>
                  <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">{h.riskNote}</p>
                </div>
              ))}
            </div>

            {/* Bias Comments & Human Gating */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-bold text-rose-300 uppercase text-[11px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Demographic Bias Incidents Requiring Executive Remediation
              </div>
              {results.aiRiskMonitoring.biasComments.map((b, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-mono font-bold text-rose-400">Case {b.patientId}</div>
                  <p className="text-slate-300">{b.concern}</p>
                  <p className="text-emerald-400 text-[11px] font-semibold">Action: {b.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: Executive Recommendations (Prompt Requirement)
         ========================================================================= */}
      {(activeSection === 6 || activeSection === 0) && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-2 border-cyan-500/40 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              SECTION 6: Executive Strategic Roadmaps
            </h3>
            <span className="text-xs text-slate-400 font-mono">Priorities, Quick Wins & AI Roadmap</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Top 5 Organizational Priorities */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
              <h4 className="font-bold text-cyan-300 uppercase text-xs tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Top 5 Organizational Priorities
              </h4>
              <ol className="space-y-2 text-slate-200">
                {results.executiveRecommendations.top5Priorities.map((pri, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{pri}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Quick Wins (Within 3 Months) */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
              <h4 className="font-bold text-emerald-300 uppercase text-xs tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Wins (Within 3 Months)
              </h4>
              <ul className="space-y-2 text-slate-200">
                {results.executiveRecommendations.quickWins3Months.map((qw, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{qw}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Long-Term AI Opportunities (6-12 Months) */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-3">
              <h4 className="font-bold text-purple-300 uppercase text-xs tracking-wider flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5" />
                Long-Term AI Opportunities (6–12 Mo.)
              </h4>
              <ul className="space-y-2 text-slate-200">
                {results.executiveRecommendations.longTermAIOpportunities.map((lt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{lt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
