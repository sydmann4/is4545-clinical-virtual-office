import React from 'react';
import { ActiveScreen, AgentId } from '../types';
import { 
  Building2, 
  Database, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Activity,
  HeartPulse,
  Scale
} from 'lucide-react';

interface NavbarProps {
  activeScreen: ActiveScreen;
  activeAgentId: AgentId | null;
  recordsCount: number;
  isAnyProcessing: boolean;
  completedAgentsCount: number;
  pendingReviewCount: number;
  onNavigate: (screen: ActiveScreen, agentId?: AgentId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  activeAgentId,
  recordsCount,
  isAnyProcessing,
  completedAgentsCount,
  pendingReviewCount,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Clinical Brand */}
          <div 
            onClick={() => onNavigate('virtual-office')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-md group-hover:shadow-teal-500/25 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  AuraClinic
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
                  PORTAL
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider -mt-0.5">
                Clinical Virtual-Office AI
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => onNavigate('virtual-office')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                activeScreen === 'virtual-office'
                  ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Virtual Office</span>
            </button>

            <button
              onClick={() => onNavigate('data-upload')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                activeScreen === 'data-upload'
                  ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Data Hub</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-700">
                {recordsCount}
              </span>
            </button>

            <button
              onClick={() => onNavigate('results-dashboard', activeAgentId || 'feedback-insight')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                activeScreen === 'results-dashboard'
                  ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Agent Workspaces</span>
              {completedAgentsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {completedAgentsCount}/6
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('combined-executive')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                activeScreen === 'combined-executive'
                  ? 'bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Combined Executive</span>
              {pendingReviewCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40 animate-pulse">
                  {pendingReviewCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Status Pill */}
          <div className="flex items-center gap-2">
            {isAnyProcessing ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold animate-pulse">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Multi-Agent Processing</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="hidden sm:inline">Virtual Office Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
