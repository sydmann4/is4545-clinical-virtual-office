import React from 'react';
import { AgentMetadata, AgentExecutionState, AgentId } from '../../types';
import { AgentAvatar } from './AgentAvatar';
import { 
  Building2, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  DoorClosed,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface OfficeFloorplanProps {
  agents: AgentMetadata[];
  executionStates: Record<AgentId, AgentExecutionState>;
  selectedAgentIds: AgentId[];
  onSelectAgent: (id: AgentId) => void;
  onOpenWorkspace: (id: AgentId) => void;
}

export const OfficeFloorplan: React.FC<OfficeFloorplanProps> = ({
  agents,
  executionStates,
  selectedAgentIds,
  onSelectAgent,
  onOpenWorkspace,
}) => {
  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden">
      {/* Blueprint grid effect background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Info */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              AuraClinic Clinical Virtual Office — Wing A Architectural Layout
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Six specialized AI agent suites surrounding the Central Clinical Coordination Atrium. Click any suite to inspect live agent operations.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Ready / Complete</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Analyzing</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Standby</span>
          </div>
        </div>
      </div>

      {/* Architectural Floorplan 2x3 Grid with Central Corridor */}
      <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const state = executionStates[agent.id] || { status: 'Idle', progress: 0 };
          const isSelected = selectedAgentIds.includes(agent.id);
          const isWorking = state.status === 'Processing';
          const isCompleted = state.status === 'Completed';

          return (
            <div
              key={agent.id}
              onClick={() => onOpenWorkspace(agent.id)}
              className={`group relative rounded-xl border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isWorking
                  ? 'bg-amber-950/20 border-amber-500/70 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                  : isSelected
                  ? 'bg-slate-900/90 border-teal-500/60 shadow-lg'
                  : isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              {/* Room Sign & Doorway */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-teal-400">
                    {agent.roomNumber}
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-teal-300 transition-colors">
                    {agent.roomName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isWorking ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 animate-pulse">
                      <Activity className="w-3 h-3 animate-spin" />
                      ACTIVE
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      DONE
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">IDLE</span>
                  )}
                </div>
              </div>

              {/* Office Interior Representation */}
              <div className="py-4 flex items-center gap-3">
                <AgentAvatar
                  agentId={agent.id}
                  agentName={agent.agentName}
                  status={state.status}
                  size="md"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 truncate">
                    {agent.agentName}
                  </h4>
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {agent.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {agent.shortDescription}
                  </p>
                </div>
              </div>

              {/* Office Desk Bottom Bar */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <DoorClosed className="w-3.5 h-3.5 text-slate-500" />
                  Office Suite #{agent.roomNumber}
                </span>

                <span className="inline-flex items-center gap-1 text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Enter Suite
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Corridor Atrium Banner */}
      <div className="relative z-10 mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Central Clinical Coordination Hub
            </h4>
            <p className="text-xs text-slate-300">
              Shared cross-agent data bus active. All selected agent suites analyze the verified clinical dataset in parallel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
