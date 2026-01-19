
import React from 'react';
import { ShieldAlert, CheckCircle, XCircle, Terminal, Box, Play, Trash2, Zap, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { ApprovalRequest } from '../types.ts';

interface ApprovalRequestCardProps {
  request: ApprovalRequest;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

const ApprovalRequestCard: React.FC<ApprovalRequestCardProps> = ({ request, onApprove, onDeny }) => {
  if (request.status !== 'pending') return null;

  const getIcon = () => {
    switch(request.type) {
      case 'create_sandbox': return <Box className="text-blue-400" size={18} />;
      case 'run_test': return <Play className="text-yellow-400" size={18} />;
      case 'delete_sandbox': return <Trash2 className="text-red-400" size={18} />;
      case 'system_evolution': return <Zap className="text-purple-400" size={18} />;
      default: return <Terminal className="text-zinc-400" size={18} />;
    }
  };

  const getTitle = () => {
    switch(request.type) {
      case 'create_sandbox': return 'Initialize Sandbox Environment';
      case 'run_test': return 'Execute Test Program';
      case 'delete_sandbox': return 'Terminate Sandbox Environment';
      case 'system_evolution': return `Proposing Evolution ${request.evolutionManifest?.version || ''}`;
      default: return 'System Request';
    }
  };

  return (
    <div className="mt-6 mb-4 max-w-md w-full animate-in slide-in-from-left-4 fade-in duration-500">
      <div className={`bg-[#0c0c0e] border rounded-2xl overflow-hidden shadow-2xl ${request.type === 'system_evolution' ? 'border-purple-500/50 shadow-purple-500/20' : 'border-red-500/30 shadow-red-500/10'}`}>
        {/* Header */}
        <div className={`${request.type === 'system_evolution' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-red-500/10 border-red-500/20'} border-b p-4 flex items-center gap-3`}>
          <div className={`p-2 rounded-lg animate-pulse ${request.type === 'system_evolution' ? 'bg-purple-500/20' : 'bg-red-500/20'}`}>
            {request.type === 'system_evolution' ? <Zap className="text-purple-400" size={20} /> : <ShieldAlert className="text-red-400" size={20} />}
          </div>
          <div>
            <h3 className={`text-xs font-black uppercase tracking-widest ${request.type === 'system_evolution' ? 'text-purple-400' : 'text-red-400'}`}>
              {request.type === 'system_evolution' ? 'Autonomous RSI Evolution' : 'Security Protocol'}
            </h3>
            <p className="text-[10px] text-zinc-500 font-medium">User Authorization Required</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">{getTitle()}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{request.details}</p>
            </div>
          </div>

          {request.evolutionManifest && (
            <div className="space-y-4">
              {/* Safety Validation Section */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Safety Verified</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500/60">Risk Score: {request.evolutionManifest.safetyValidation.riskScore}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {request.evolutionManifest.safetyValidation.anchorsVerified.map((anchor, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-500/10 rounded text-[8px] font-black text-emerald-500 uppercase">
                      {anchor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Changes List */}
              <div className="space-y-3 bg-black/40 border border-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Neural Diff</span>
                  <span className="text-[8px] font-mono text-zinc-600">ID: {request.evolutionManifest.codename}</span>
                </div>
                {request.evolutionManifest.changes.map((change, i) => (
                  <div key={i} className="flex gap-3 items-start p-2 bg-white/[0.02] rounded-lg border border-white/5">
                    <div className={`w-1 h-8 rounded-full shrink-0 ${change.impact === 'high' ? 'bg-red-500' : change.impact === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">{change.target}</p>
                      <p className="text-[10px] text-zinc-500 line-clamp-2">{change.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {request.evolutionManifest && request.evolutionManifest.safetyValidation.riskScore > 0.4 && (
            <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
               <AlertTriangle size={14} className="text-orange-400" />
               <span className="text-[9px] font-bold text-orange-400 uppercase tracking-tighter">Warning: Evolution complexity exceeds safe threshold</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
          <button onClick={() => onDeny(request.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider transition-all">
            <XCircle size={14} /> Deny
          </button>
          <button onClick={() => onApprove(request.id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 ${request.type === 'system_evolution' ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/20' : 'bg-red-600 hover:bg-red-500 shadow-red-600/20'}`}>
            <CheckCircle size={14} /> Commit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalRequestCard;
