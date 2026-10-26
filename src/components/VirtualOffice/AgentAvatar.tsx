import React from 'react';
import { AgentId, AgentStatus } from '../../types';

interface AgentAvatarProps {
  agentId: AgentId;
  agentName: string;
  status: AgentStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAnimation?: boolean;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  agentId,
  agentName,
  status,
  size = 'md',
  showAnimation = true,
}) => {
  const isWorking = status === 'Processing';
  const isCompleted = status === 'Completed';

  // Dimension mapping
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-20 h-20 text-sm',
    lg: 'w-28 h-28 text-base',
    xl: 'w-36 h-36 text-lg',
  }[size];

  // Specific avatar visual styles based on agent role
  const getAvatarConfig = () => {
    switch (agentId) {
      case 'feedback-insight':
        return {
          roleColor: '#3b82f6', // Blue
          accentGlow: 'rgba(59, 130, 246, 0.4)',
          bgGradient: 'from-blue-900/90 to-indigo-950',
          headwear: 'headset',
          coat: '#1e3a8a',
          badgeText: 'VOICE',
          initials: 'ML',
          title: 'Dr. Maya Lin, MPH',
        };
      case 'experience-monitoring':
        return {
          roleColor: '#10b981', // Emerald
          accentGlow: 'rgba(16, 185, 129, 0.4)',
          bgGradient: 'from-emerald-900/90 to-teal-950',
          headwear: 'clipboard',
          coat: '#064e3b',
          badgeText: 'EQUITY',
          initials: 'MB',
          title: 'Marcus Bennett, CPXP',
        };
      case 'complaint-triage':
        return {
          roleColor: '#f43f5e', // Rose
          accentGlow: 'rgba(244, 63, 94, 0.45)',
          bgGradient: 'from-rose-950 to-amber-950',
          headwear: 'stethoscope',
          coat: '#881337',
          badgeText: 'TRIAGE',
          initials: 'ES',
          title: 'Dr. Evelyn Sterling, MD',
        };
      case 'decision-support':
        return {
          roleColor: '#8b5cf6', // Violet
          accentGlow: 'rgba(139, 92, 246, 0.4)',
          bgGradient: 'from-purple-950 to-indigo-950',
          headwear: 'glasses',
          coat: '#3b0764',
          badgeText: 'STRATEGY',
          initials: 'AV',
          title: 'Arthur Vance, FACHE',
        };
      case 'healthcare-analytics':
        return {
          roleColor: '#06b6d4', // Cyan
          accentGlow: 'rgba(6, 182, 212, 0.45)',
          bgGradient: 'from-cyan-950 to-blue-950',
          headwear: 'visor',
          coat: '#164e63',
          badgeText: 'ANALYTICS',
          initials: 'AT',
          title: 'Dr. Aris Thorne, PhD',
        };
      case 'billing-dashboard':
        return {
          roleColor: '#f59e0b', // Amber
          accentGlow: 'rgba(245, 158, 11, 0.4)',
          bgGradient: 'from-amber-950 to-yellow-950',
          headwear: 'calculator',
          coat: '#78350f',
          badgeText: 'AUDIT',
          initials: 'ER',
          title: 'Elena Rostova, CPA',
        };
    }
  };

  const config = getAvatarConfig();

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* Outer Glow Halo during active processing */}
      {isWorking && showAnimation && (
        <>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-35"
            style={{ backgroundColor: config.roleColor }}
          />
          <div
            className="absolute -inset-2 rounded-full blur-md opacity-70 animate-pulse"
            style={{ backgroundColor: config.accentGlow }}
          />
          {/* Orbiting data particles */}
          <div className="absolute -inset-3.5 pointer-events-none animate-spin" style={{ animationDuration: '4s' }}>
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-lg"
              style={{ backgroundColor: config.roleColor, boxShadow: `0 0 8px ${config.roleColor}` }}
            />
          </div>
          <div className="absolute -inset-3.5 pointer-events-none animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <span
              className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffffff', boxShadow: `0 0 6px ${config.roleColor}` }}
            />
          </div>
        </>
      )}

      {/* Main Avatar Container */}
      <div
        className={`relative ${sizeClasses} rounded-2xl bg-gradient-to-b ${config.bgGradient} p-1 shadow-xl border transition-all duration-300 flex flex-col items-center justify-between overflow-hidden ${
          isWorking
            ? 'border-white/60 scale-105 shadow-[0_0_25px_rgba(255,255,255,0.2)]'
            : isCompleted
            ? 'border-emerald-500/50'
            : 'border-slate-700/60 hover:border-slate-500/60'
        }`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${config.roleColor} 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Top accessory HUD bar */}
        <div className="relative z-10 w-full flex items-center justify-between px-1.5 pt-1 text-[9px] font-mono tracking-wider font-semibold text-slate-300">
          <span
            className="px-1 py-0.5 rounded text-[8px] uppercase tracking-wider"
            style={{ backgroundColor: `${config.roleColor}33`, color: config.roleColor }}
          >
            {config.badgeText}
          </span>
          <span className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isWorking
                  ? 'bg-amber-400 animate-ping'
                  : isCompleted
                  ? 'bg-emerald-400'
                  : 'bg-slate-500'
              }`}
            />
          </span>
        </div>

        {/* Character Illustration SVG */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full transition-transform duration-300 ${
              isWorking ? 'animate-bounce' : ''
            }`}
            style={{ animationDuration: '2.5s' }}
          >
            <defs>
              <linearGradient id={`grad-${agentId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={config.roleColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Shoulders & Clinical Coat */}
            <path
              d="M 18 95 Q 22 68 50 68 Q 78 68 82 95 Z"
              fill={config.coat}
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Inner shirt / V-neck */}
            <polygon points="42,68 58,68 50,84" fill="#f8fafc" />
            {/* Stethoscope or badge tie */}
            {agentId === 'complaint-triage' && (
              <path
                d="M 38 68 C 38 78 45 82 50 82 C 55 82 62 78 62 68"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
            {agentId === 'feedback-insight' && (
              <circle cx="50" cy="74" r="3" fill="#38bdf8" />
            )}

            {/* Neck */}
            <rect x="44" y="52" width="12" height="18" rx="3" fill="#fed7aa" />

            {/* Head */}
            <ellipse cx="50" cy="42" rx="20" ry="22" fill="#fed7aa" />

            {/* Hair / Headwear */}
            {agentId === 'feedback-insight' && (
              <>
                <path d="M 28 42 Q 30 22 50 20 Q 70 22 72 42 Q 62 26 50 26 Q 38 26 28 42 Z" fill="#334155" />
                {/* Telehealth Headset */}
                <path d="M 28 42 A 22 22 0 0 1 72 42" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                <rect x="25" y="38" width="5" height="10" rx="2" fill="#38bdf8" />
                <rect x="70" y="38" width="5" height="10" rx="2" fill="#38bdf8" />
                <path d="M 28 46 Q 32 58 44 56" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="44" cy="56" r="2" fill="#38bdf8" />
              </>
            )}

            {agentId === 'experience-monitoring' && (
              <>
                <path d="M 28 38 Q 32 18 50 18 Q 68 18 72 38 Q 60 22 50 22 Q 40 22 28 38 Z" fill="#1e293b" />
                {/* Clipboard in hand representation */}
                <rect x="68" y="70" width="16" height="22" rx="2" fill="#0f766e" stroke="#5eead4" strokeWidth="1" />
                <line x1="72" y1="76" x2="80" y2="76" stroke="#ccfbf1" strokeWidth="1.5" />
                <line x1="72" y1="80" x2="80" y2="80" stroke="#ccfbf1" strokeWidth="1.5" />
              </>
            )}

            {agentId === 'complaint-triage' && (
              <>
                <path d="M 27 42 Q 31 20 50 20 Q 69 20 73 42 Q 60 25 50 25 Q 39 25 27 42 Z" fill="#475569" />
                {/* Emergency Red Pager / Alert light */}
                <circle cx="50" cy="18" r="4" fill="#f43f5e" className={isWorking ? "animate-ping" : ""} />
              </>
            )}

            {agentId === 'decision-support' && (
              <>
                <path d="M 28 38 Q 32 19 50 19 Q 68 19 72 38 Q 60 24 50 24 Q 40 24 28 38 Z" fill="#64748b" />
                {/* Executive Glasses */}
                <rect x="36" y="38" width="11" height="8" rx="2" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                <rect x="53" y="38" width="11" height="8" rx="2" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                <line x1="47" y1="42" x2="53" y2="42" stroke="#c084fc" strokeWidth="1.5" />
              </>
            )}

            {agentId === 'healthcare-analytics' && (
              <>
                <path d="M 28 40 Q 32 20 50 20 Q 68 20 72 40 Q 60 24 50 24 Q 40 24 28 40 Z" fill="#0f172a" />
                {/* High-tech Holographic Data Visor */}
                <path d="M 33 37 Q 50 35 67 37 L 67 44 Q 50 48 33 44 Z" fill="rgba(6, 182, 212, 0.75)" stroke="#67e8f9" strokeWidth="1.2" />
                <circle cx="50" cy="41" r="2" fill="#ffffff" />
              </>
            )}

            {agentId === 'billing-dashboard' && (
              <>
                <path d="M 28 42 Q 32 21 50 21 Q 68 21 72 42 Q 62 27 50 27 Q 38 27 28 42 Z" fill="#713f12" />
                {/* Audit magnifying glass or ledger pin */}
                <circle cx="68" cy="74" r="6" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <line x1="72" y1="78" x2="78" y2="84" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </>
            )}

            {/* Eyes */}
            <circle cx="43" cy="42" r="2.2" fill="#0f172a" />
            <circle cx="57" cy="42" r="2.2" fill="#0f172a" />
            {/* Friendly mouth */}
            <path d="M 45 49 Q 50 53 55 49" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Working Animation Ticker or Status label */}
        <div className="relative z-10 w-full pb-1 px-1">
          {isWorking ? (
            <div className="flex items-center justify-center gap-1 bg-slate-900/90 rounded px-1.5 py-0.5 border border-amber-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[9px] font-mono font-bold text-amber-300 uppercase tracking-wider animate-pulse">
                Analyzing
              </span>
            </div>
          ) : isCompleted ? (
            <div className="flex items-center justify-center gap-1 bg-slate-900/90 rounded px-1.5 py-0.5 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-mono font-medium text-emerald-300 uppercase tracking-wider">
                Ready
              </span>
            </div>
          ) : (
            <div className="text-center text-[9px] font-mono text-slate-400 truncate">
              {config.initials}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
