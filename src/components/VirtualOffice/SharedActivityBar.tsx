import React from 'react';
import { AgentMetadata, AgentExecutionState, AgentId } from '../../types';
import { 
  Play, 
  RotateCcw, 
  CheckSquare, 
  Square, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Database,
  BarChart2,
  SlidersHorizontal
} from 'lucide-react';

interface SharedActivityBarProps {
  agents: AgentMetadata[];
  executionStates: Record<AgentId, AgentExecutionState>;
  selectedAgentIds: AgentId[];
  recordsCount: number;
  datasetName: string;
  isAnyProcessing: boolean;
  onToggleSelectAll: () => void;
  onRunSelected: () => void;
  onResetAll: () => void;
  onOpenDataUpload: () => void;
  onOpenCombinedExecutive: () => void;
}

export const SharedActivityBar: React.FC<SharedActivityBarProps> = ({
  agents,
  executionStates,
  selectedAgentIds,
  recordsCount,
  datasetName,
  isAnyProcessing,
  onToggleSelectAll,
  onRunSelected,
  onResetAll,
  onOpenDataUpload,
  onOpenCombinedExecutive,
}) => {
  // Compute counts
  let idleCount = 0;
  let selectedCount = 0;
  let processingCount = 0;
  let completedCount = 0;
  let errorCount = 0;

  agents.forEach(agent => {
    const st = executionStates[agent.id]?.status || 'Idle';
    if (st === 'Processing') processingCount++;
    else if (st === 'Completed') completedCount++;
    else if (st === 'Error') errorCount++;
    else if (selectedAgentIds.includes(agent.id)) selectedCount++;
    else idleCount++;
  });

  const allSelected = selectedAgentIds.length === agents.length;

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Dataset context & Status tallies */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Dataset button */}
          <button
            onClick={onOpenDataUpload}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 hover:border-teal-500/60 transition-colors text-left"
            title="Inspect or Upload Dataset"
          >
            <Database className="w-4 h-4 text-teal-400" />
            <div>
              <div className="text-xs font-semibold text-white truncate max-w-[200px]">
                {datasetName}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {recordsCount} Patient Records Loaded
              </div>
            </div>
          </button>

          {/* Status Tallies Pill Group */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
            {/* Processing */}
            {processingCount > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse font-bold">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span>{processingCount} Working</span>
              </span>
            )}

            {/* Completed */}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedCount} Done</span>
            </span>

            {/* Selected */}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
              <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
              <span>{selectedAgentIds.length} Selected</span>
            </span>

            {/* Idle */}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{idleCount} Idle</span>
            </span>

            {/* Error */}
            {errorCount > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{errorCount} Error</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Master Multi-Agent Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
          {/* Select / Deselect All */}
          <button
            onClick={onToggleSelectAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
          >
            {allSelected ? (
              <>
                <Square className="w-3.5 h-3.5" />
                <span>Deselect All</span>
              </>
            ) : (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>Select All (6)</span>
              </>
            )}
          </button>

          {/* Reset All */}
          <button
            onClick={onResetAll}
            disabled={isAnyProcessing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 disabled:opacity-50"
            title="Reset Agent States"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Combined Executive Dashboard Quick Link */}
          {completedCount > 0 && (
            <button
              onClick={onOpenCombinedExecutive}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-900/40 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-900/60 transition-all shadow-sm"
            >
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Combined Executive Insights</span>
            </button>
          )}

          {/* Primary Run Button */}
          <button
            onClick={onRunSelected}
            disabled={isAnyProcessing || selectedAgentIds.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]"
          >
            {isAnyProcessing ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>Processing Agents...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run {selectedAgentIds.length > 0 ? `${selectedAgentIds.length} Selected Agents` : 'Selected Agents'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
