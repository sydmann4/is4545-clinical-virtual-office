import React, { useState } from 'react';
import { FeedbackInsightResults, PatientRecord } from '../../types';
import { 
  MessageSquare, 
  Filter, 
  Download, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  BrainCircuit, 
  Building,
  Sparkles
} from 'lucide-react';

interface FeedbackInsightViewProps {
  results: FeedbackInsightResults;
  records: PatientRecord[];
  onOpenDataHub?: () => void;
}

export const FeedbackInsightView: React.FC<FeedbackInsightViewProps> = ({
  results,
  records,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = results.items.filter((item) => {
    const matchesTheme = selectedTheme === 'All' || item.theme === selectedTheme;
    const matchesSentiment = selectedSentiment === 'All' || item.sentiment === selectedSentiment;
    const record = records.find(r => r.patientId === item.patientId);
    const matchesSearch = 
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operationalIssue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.riskOrBiasConcern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record && record.patientComment.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTheme && matchesSentiment && matchesSearch;
  });

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Positive</span>;
      case 'Negative':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">Negative</span>;
      case 'Mixed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">Mixed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">Neutral</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30">
                  AGENT 101 • PATIENT VOICE STUDIO
                </span>
                <span className="text-xs text-slate-400 font-mono">Dr. Maya Lin, MPH</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Patient Feedback Insight Dashboard
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Systematic 6-step qualitative feedback decomposition: Theme Classification, Sentiment Valence, Analytical Reasoning, Operational Bottlenecks, Safety/Bias Risk Screening, and Practical Managerial Actions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-right">
              <div className="text-xs text-slate-400 font-mono">Analyzed Narratives</div>
              <div className="text-xl font-bold text-white font-mono">{results.items.length} Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sentiment breakdown */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Negative Experiences</div>
            <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
              {results.sentimentDistribution['Negative'] || 0}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Positive Benchmarks</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
              {results.sentimentDistribution['Positive'] || 0}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Mixed / Ambiguous</div>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
              {(results.sentimentDistribution['Mixed'] || 0) + (results.sentimentDistribution['Neutral'] || 0)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Active Themes</div>
            <div className="text-2xl font-bold text-blue-400 font-mono mt-1">
              {Object.keys(results.themeDistribution).length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Top Themes Distribution Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 1: Theme Prevalence Across Patient Population
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(results.themeDistribution).map(([theme, count]) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(selectedTheme === theme ? 'All' : theme)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedTheme === theme
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-semibold truncate">{theme}</div>
              <div className="text-sm font-bold font-mono text-blue-400 mt-1">
                {count} cases ({Math.round((count / results.items.length) * 100)}%)
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-blue-400" /> Sentiment:
          </span>
          {['All', 'Positive', 'Negative', 'Mixed', 'Neutral'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedSentiment(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedSentiment === st
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search issues, safety risks, or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Detailed 6-Step Case Cards */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const record = records.find(r => r.patientId === item.patientId);
          const isExpanded = expandedId === item.patientId;

          return (
            <div
              key={item.patientId}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden shadow-md"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-blue-400 text-sm">
                    {item.patientId}
                  </span>
                  {record && (
                    <span className="text-xs text-slate-300 font-medium">
                      {record.persona} • <span className="text-slate-400">{record.serviceLine}</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30">
                    Step 1: {item.theme}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Step 2:</span>
                    {getSentimentBadge(item.sentiment)}
                  </div>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.patientId)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    {isExpanded ? 'Collapse' : 'Inspect 6 Steps'}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Patient Comment Excerpt */}
                {record && (
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 italic">
                    "{record.patientComment}"
                  </div>
                )}

                {/* 6 Step Analytical Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Step 3: Reasoning */}
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                      Step 3: Analytical Reasoning
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.reasoning}</p>
                  </div>

                  {/* Step 4: Operational Issue */}
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                      Step 4: Operational Bottleneck
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">{item.operationalIssue}</p>
                  </div>

                  {/* Step 5: Risk or Bias Concern */}
                  <div className={`p-3.5 rounded-xl border space-y-1 ${
                    item.riskOrBiasConcern.includes('No immediate')
                      ? 'bg-slate-950/40 border-slate-800/80'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}>
                    <div className="text-[11px] font-mono font-bold uppercase flex items-center gap-1.5 text-rose-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Step 5: Patient Safety / Bias Alert
                    </div>
                    <p className="leading-relaxed">{item.riskOrBiasConcern}</p>
                  </div>

                  {/* Step 6: Recommended Action */}
                  <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                    <div className="text-[11px] font-mono font-bold uppercase text-blue-400 flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      Step 6: Practical Managerial Action
                    </div>
                    <p className="text-blue-100 font-medium leading-relaxed">{item.recommendedAction}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
