import React, { useState } from 'react';
import { ComplaintTriageResults, PatientRecord } from '../../types';
import { 
  AlertOctagon, 
  ShieldAlert, 
  SendHorizontal, 
  UserCheck, 
  Activity, 
  Search, 
  Filter, 
  AlertTriangle,
  Building2,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface ComplaintTriageViewProps {
  results: ComplaintTriageResults;
  records: PatientRecord[];
}

export const ComplaintTriageView: React.FC<ComplaintTriageViewProps> = ({
  results,
  records,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedRoute, setSelectedRoute] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = results.items.filter((item) => {
    const matchesSeverity = selectedSeverity === 'All' || item.severityLevel.includes(selectedSeverity);
    const matchesRoute = selectedRoute === 'All' || item.escalationRoute === selectedRoute;
    const record = records.find(r => r.patientId === item.patientId);
    const matchesSearch = 
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.severityReasoning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record && record.patientComment.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSeverity && matchesRoute && matchesSearch;
  });

  const getSeverityBadge = (level: string) => {
    if (level.includes('Level 4') || level.includes('LEVEL 4')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          LEVEL 4 – CRITICAL
        </span>
      );
    }
    if (level.includes('Level 3') || level.includes('LEVEL 3')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          LEVEL 3 – HIGH
        </span>
      );
    }
    if (level.includes('Level 2') || level.includes('LEVEL 2')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
          LEVEL 2 – MODERATE
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
        LEVEL 1 – LOW
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-500/30">
                  AGENT 103 • CLINICAL TRIAGE COMMAND
                </span>
                <span className="text-xs text-slate-400 font-mono">Dr. Evelyn Sterling, MD</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Healthcare Complaint Triage & Rapid Escalation
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Non-adjudicating triage engine: Determines complaint categories, 4-tier severity levels, clinical/legal risks, mandatory human intervention gating, and routes to 10 hospital leadership teams.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1.5 animate-pulse">
              <UserCheck className="w-4 h-4 text-rose-400" />
              {results.urgentCasesCount} Human Review Gated
            </span>
          </div>
        </div>
      </div>

      {/* 4-Tier Severity Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { level: 'Critical', label: 'LEVEL 4 – Critical', count: results.severityCounts['LEVEL 4 – Critical'] || 0, color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-950/20' },
          { level: 'High', label: 'LEVEL 3 – High', count: results.severityCounts['LEVEL 3 – High'] || 0, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/20' },
          { level: 'Moderate', label: 'LEVEL 2 – Moderate', count: results.severityCounts['LEVEL 2 – Moderate'] || 0, color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-950/20' },
          { level: 'Low', label: 'LEVEL 1 – Low', count: results.severityCounts['LEVEL 1 – Low'] || 0, color: 'text-slate-400', border: 'border-slate-800', bg: 'bg-slate-900/60' },
        ].map((sev, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedSeverity(selectedSeverity === sev.level ? 'All' : sev.level)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSeverity === sev.level
                ? 'ring-2 ring-rose-500 bg-slate-900'
                : `${sev.bg} ${sev.border} hover:border-slate-600`
            }`}
          >
            <div className="text-xs font-semibold text-slate-300">{sev.label}</div>
            <div className={`text-2xl font-bold font-mono mt-1 ${sev.color}`}>
              {sev.count} Cases
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {sev.level === 'Critical' ? 'Immediate human gate' : sev.level === 'High' ? 'Potential harm risk' : 'Standard resolution'}
            </div>
          </button>
        ))}
      </div>

      {/* Escalation Routing Channels */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Step 4: Dispatch Directory — 10 Specialized Hospital Teams</span>
          <span className="text-[10px] font-mono text-slate-500">CLICK TO FILTER</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {Object.entries(results.escalationCounts).map(([route, count]) => (
            <button
              key={route}
              onClick={() => setSelectedRoute(selectedRoute === route ? 'All' : route)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedRoute === route
                  ? 'bg-rose-950/40 border-rose-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-semibold truncate text-slate-200">{route}</div>
              <div className="text-xs font-mono font-bold text-rose-400 mt-1 flex items-center gap-1">
                <SendHorizontal className="w-3 h-3" />
                {count} {count === 1 ? 'Dispatch' : 'Dispatches'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Active Filters:</span>
          <span className="text-xs text-rose-300 font-semibold px-2.5 py-0.5 rounded bg-rose-950/60 border border-rose-500/30">
            Severity: {selectedSeverity}
          </span>
          <span className="text-xs text-cyan-300 font-semibold px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
            Route: {selectedRoute}
          </span>
          {(selectedSeverity !== 'All' || selectedRoute !== 'All') && (
            <button
              onClick={() => { setSelectedSeverity('All'); setSelectedRoute('All'); }}
              className="text-xs text-slate-400 hover:text-white underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search complaint reasons or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Triaged Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const record = records.find(r => r.patientId === item.patientId);

          return (
            <div
              key={item.patientId}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-400 text-sm">
                    {item.patientId}
                  </span>
                  {record && (
                    <span className="text-xs text-slate-300 font-medium">
                      {record.persona} • {record.serviceLine}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    Category: {item.primaryCategory}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {getSeverityBadge(item.severityLevel)}
                  {item.humanInterventionRequired && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                      Human Gate Req.
                    </span>
                  )}
                </div>
              </div>

              {/* Case Narrative */}
              {record && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 italic">
                  "{record.patientComment}"
                </div>
              )}

              {/* 4 Step Triage Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Step 2 Reasoning */}
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Step 2: Severity Reasoning
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {item.severityReasoning}
                  </p>
                </div>

                {/* Step 3 Risks */}
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-rose-400 uppercase">
                    Step 3: Identified Risks
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.riskDetection.patientSafetyRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-500/40">Patient Safety</span>
                    )}
                    {item.riskDetection.clinicalRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-500/40">Clinical Risk</span>
                    )}
                    {item.riskDetection.complianceRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40">Compliance</span>
                    )}
                    {item.riskDetection.accessibilityRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40">Accessibility</span>
                    )}
                    {item.riskDetection.reputationalRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Reputational</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{item.riskDetection.explanation}</p>
                </div>

                {/* Step 4 Escalation Route */}
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <div className="font-mono text-[10px] font-bold text-rose-300 uppercase flex items-center justify-between">
                    <span>Step 4: Recommended Routing</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {item.escalationRoute}
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Dispatched to designated team queue with triage severity tag.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
