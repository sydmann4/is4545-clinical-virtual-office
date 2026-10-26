import React from 'react';
import { AgentMetadata, AgentExecutionState } from '../../types';
import { AgentAvatar } from './AgentAvatar';
import { 
  Play, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';

interface AgentRoomCardProps {
  metadata: AgentMetadata;
  executionState: AgentExecutionState;
  isSelected: boolean;
  onToggleSelect: (id: AgentMetadata['id']) => void;
  onRunSingle: (id: AgentMetadata['id']) => void;
  onOpenWorkspace: (id: AgentMetadata['id']) => void;
  onOpenConfig: (id: AgentMetadata['id']) => void;
}

export const AgentRoomCard: React.FC<AgentRoomCardProps> = ({
  metadata,
  executionState,
  isSelected,
  onToggleSelect,
  onRunSingle,
  onOpenWorkspace,
  onOpenConfig,
}) => {
  const isWorking = executionState.status === 'Processing';
  const isCompleted = executionState.status === 'Completed';
  const isError = executionState.status === 'Error';

  // Status badge config
  const getStatusBadge = () => {
    switch (executionState.status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Processing
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Completed
          </span>
        );
      case 'Selected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Selected
          </span>
        );
      case 'Error':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Idle
          </span>
        );
    }
  };

  return (
    <div
      className={`group relative rounded-2xl bg-slate-900/85 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl ${
        isWorking
          ? 'border-amber-500/60 ring-2 ring-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
          : isSelected
          ? 'border-teal-500/60 ring-1 ring-teal-500/30 bg-slate-900/95'
          : isCompleted
          ? 'border-emerald-500/40 hover:border-emerald-400/60'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top ambient room header bar */}
      <div className="relative px-5 pt-4 pb-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/60">
            ROOM {metadata.roomNumber}
          </span>
          <span className="text-xs font-medium text-slate-300 truncate max-w-[150px]">
            {metadata.roomName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(metadata.id)}
            aria-label={`Select ${metadata.title}`}
            className="w-4 h-4 rounded border-slate-700 text-teal-600 focus:ring-teal-500 focus:ring-offset-slate-900 cursor-pointer accent-teal-500"
          />
        </div>
      </div>

      {/* Main Room Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Avatar + Identity Block */}
        <div className="flex items-start gap-4">
          <div
            onClick={() => onOpenWorkspace(metadata.id)}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95 relative group/avatar"
            title="Click to inspect agent office and results"
          >
            <AgentAvatar
              agentId={metadata.id}
              agentName={metadata.agentName}
              status={executionState.status}
              size="lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <ExternalLink className="w-5 h-5 text-white drop-shadow-md" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => onOpenWorkspace(metadata.id)}
                className="text-base font-bold text-white hover:text-teal-400 cursor-pointer truncate transition-colors"
              >
                {metadata.agentName}
              </h3>
            </div>
            <p className="text-xs font-semibold text-teal-400 truncate mt-0.5">
              {metadata.title}
            </p>
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {metadata.shortDescription}
            </p>
          </div>
        </div>

        {/* Progress or Analytical Status Stream */}
        {isWorking ? (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-amber-300 font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                {executionState.currentStep || 'Analyzing clinical vectors...'}
              </span>
              <span className="font-mono font-bold text-amber-400">
                {executionState.progress}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.max(5, executionState.progress)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            {executionState.latestFindingPreview && (
              <p className="text-[11px] font-mono text-slate-300 truncate bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                &gt; {executionState.latestFindingPreview}
              </p>
            )}
          </div>
        ) : isCompleted ? (
          <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/25 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Analysis Complete
              </span>
              {executionState.completedAt && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {executionState.completedAt}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 line-clamp-2">
              {executionState.latestFindingPreview || 'Full analytical breakdown ready in workspace.'}
            </p>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Est. runtime: ~{metadata.estimatedRunTimeSec}s
            </span>
            <span className="font-mono text-[10px] text-slate-500 uppercase">
              STANDBY
            </span>
          </div>
        )}
      </div>

      {/* Action Footer Controls */}
      <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenConfig(metadata.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Configure Agent Analytical Parameters"
          >
            <Sliders className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenWorkspace(metadata.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Workspace</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {isWorking ? (
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-not-allowed"
            >
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>Working</span>
            </button>
          ) : isCompleted ? (
            <button
              onClick={() => onRunSingle(metadata.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
              title="Re-run analysis on dataset"
            >
              <RotateCw className="w-3.5 h-3.5 text-teal-400" />
              <span>Rerun</span>
            </button>
          ) : (
            <button
              onClick={() => onRunSingle(metadata.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 transition-all shadow-sm hover:shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Activate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
