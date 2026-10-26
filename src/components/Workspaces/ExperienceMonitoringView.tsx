import React, { useState } from 'react';
import { ExperienceMonitoringResults, PatientRecord } from '../../types';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Users, 
  Activity, 
  Search, 
  Compass, 
  CheckCircle2, 
  Globe, 
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

interface ExperienceMonitoringViewProps {
  results: ExperienceMonitoringResults;
  records: PatientRecord[];
}

export const ExperienceMonitoringView: React.FC<ExperienceMonitoringViewProps> = ({
  results,
  records,
}) => {
  const [selectedEquityGroup, setSelectedEquityGroup] = useState<string>('All');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = results.items.filter((item) => {
    const matchesEquity = selectedEquityGroup === 'All' || item.equityReview.group === selectedEquityGroup;
    const matchesRisk = selectedRiskLevel === 'All' || item.riskAssessment.overallLevel === selectedRiskLevel;
    const record = records.find(r => r.patientId === item.patientId);
    const matchesSearch = 
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operationalBottleneck.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equityReview.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record && record.patientComment.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesEquity && matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                  AGENT 102 • EXPERIENCE & EQUITY OBSERVATORIUM
                </span>
                <span className="text-xs text-slate-400 font-mono">Marcus Bennett, CPXP</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Patient Experience & Equity Monitoring Dashboard
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Continuous surveillance of patient journey bottlenecks, demographic equity barriers (LEP, rural access, disabilities, older adults), and multi-dimensional institutional risk scoring.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-300 font-bold">
              {results.items.filter(i => i.equityReview.flagged).length} Equity Flags Detected
            </span>
          </div>
        </div>
      </div>

      {/* Equity Cohort Distribution & Risk Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Older Adults', icon: Users, count: results.equityBreakdown['Older Adults'] || 0, color: 'text-amber-400' },
          { label: 'Rural Patients', icon: Compass, count: results.equityBreakdown['Rural Patients'] || 0, color: 'text-cyan-400' },
          { label: 'Disabilities & Mobility', icon: Activity, count: results.equityBreakdown['Disabilities'] || 0, color: 'text-indigo-400' },
          { label: 'Limited English (LEP)', icon: Globe, count: results.equityBreakdown['Limited English (LEP)'] || 0, color: 'text-rose-400' },
          { label: 'Low Digital Literacy', icon: AlertOctagon, count: results.equityBreakdown['Low Digital Literacy'] || 0, color: 'text-purple-400' },
        ].map((cohort, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedEquityGroup(selectedEquityGroup === cohort.label ? 'All' : cohort.label)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedEquityGroup === cohort.label
                ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{cohort.label}</span>
              <cohort.icon className={`w-4 h-4 ${cohort.color}`} />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {cohort.count}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">cases requiring equity review</div>
          </button>
        ))}
      </div>

      {/* Critical Equity Alerts Banner */}
      {results.criticalEquityAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4" />
            High-Risk Healthcare Equity & Accessibility Notifications
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-200">
            {results.criticalEquityAlerts.map((alert, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Risk Level:</span>
          {['All', 'High', 'Moderate', 'Low'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRiskLevel(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedRiskLevel === lvl
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search equity barriers or bottlenecks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Case Feed */}
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
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {item.patientId}
                  </span>
                  {record && (
                    <span className="text-xs text-slate-300 font-medium">
                      {record.persona} • {record.serviceLine}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Primary: {item.primaryTheme}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    item.riskAssessment.overallLevel === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : item.riskAssessment.overallLevel === 'Moderate'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    Risk: {item.riskAssessment.overallLevel} ({item.riskAssessment.category})
                  </span>
                </div>
              </div>

              {/* Grid with 5 Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Step 2: Bottleneck */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[11px] font-bold text-amber-400 uppercase">
                    Step 2: Operational Bottleneck
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {item.operationalBottleneck}
                  </p>
                </div>

                {/* Step 3: Equity Review */}
                <div className={`p-3.5 rounded-xl border space-y-1 ${
                  item.equityReview.flagged
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/40 border-slate-800/80'
                }`}>
                  <div className="font-mono text-[11px] font-bold text-emerald-400 uppercase flex items-center justify-between">
                    <span>Step 3: Equity & Accessibility Review</span>
                    {item.equityReview.flagged && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
                        {item.equityReview.group}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {item.equityReview.details}
                  </p>
                </div>

                {/* Step 5: Managerial Recommendation */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="font-mono text-[11px] font-bold text-teal-400 uppercase">
                    Step 5: Managerial Directive
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {item.managerialRecommendation}
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
