import React, { useState } from 'react';
import { AgentMetadata, AgentId } from '../types';
import { 
  X, 
  Sliders, 
  Play, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldAlert, 
  Layers,
  Sparkles
} from 'lucide-react';
import { AgentAvatar } from './VirtualOffice/AgentAvatar';

interface AgentConfigModalProps {
  metadata: AgentMetadata;
  isOpen: boolean;
  onClose: () => void;
  onRunSingle: (id: AgentId) => void;
}

export const AgentConfigModal: React.FC<AgentConfigModalProps> = ({
  metadata,
  isOpen,
  onClose,
  onRunSingle,
}) => {
  const [analysisDepth, setAnalysisDepth] = useState<'Standard' | 'Deep Audit'>('Deep Audit');
  const [sensitivityThreshold, setSensitivityThreshold] = useState<'Standard' | 'High Sensitivity'>('High Sensitivity');
  const [humanReviewGate, setHumanReviewGate] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <AgentAvatar
              agentId={metadata.id}
              agentName={metadata.agentName}
              status="Idle"
              size="sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-400">
                  ROOM {metadata.roomNumber}
                </span>
                <span className="text-xs text-slate-400">• {metadata.agentName}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {metadata.title} Configuration
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Functions Overview */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
          <div className="font-mono font-bold text-slate-400 uppercase text-[10px]">
            Primary Functional Mandate
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            {metadata.fullTasksDescription}
          </p>
        </div>

        {/* Config Options */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">
              Analytical Scope & Reasoning Depth
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Standard', 'Deep Audit'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAnalysisDepth(mode)}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    analysisDepth === mode
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-medium text-white">{mode}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {mode === 'Deep Audit' ? 'Deconstructs all steps with rationale' : 'Fast summary generation'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">
              Risk & Bias Sensitivity Calibration
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Standard', 'High Sensitivity'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSensitivityThreshold(mode)}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    sensitivityThreshold === mode
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-medium text-white">{mode}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {mode === 'High Sensitivity' ? 'Proactively flags equity & near-miss safety risks' : 'High-threshold triggers only'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Mandatory Human Review Gate</span>
              <span className="text-[11px] text-slate-400">
                Route high-risk findings to clinical sign-off queue before taking action
              </span>
            </div>
            <input
              type="checkbox"
              checked={humanReviewGate}
              onChange={(e) => setHumanReviewGate(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-teal-600 focus:ring-teal-500 accent-teal-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onRunSingle(metadata.id);
            }}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Apply & Run Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
};
