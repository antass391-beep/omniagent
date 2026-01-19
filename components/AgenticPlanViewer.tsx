
import React, { useState } from 'react';
import { AgenticPlan } from '../types.ts';
import { Target, ShieldAlert, ShieldCheck, ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, ArrowRight, Zap, Play } from 'lucide-react';

interface AgenticPlanViewerProps {
  plan: AgenticPlan;
}

const AgenticPlanViewer: React.FC<AgenticPlanViewerProps> = ({ plan }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(plan.phases[0]?.id || null);

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'high': return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'medium': return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      default: return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
    }
  };

  return (
    <div className="w-full mt-6 bg-[#0c0c0e] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Strategic Header */}
      <div className="p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-amber-900/10 via-transparent to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl shadow-lg shadow-amber-500/10">
                 <Target size={24} className="text-amber-400" />
              </div>
              <div>
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Agentic Strategy Proposal</h3>
                 <p className="text-lg font-bold text-amber-50 text-opacity-90 mt-1 leading-tight">"{plan.goal}"</p>
              </div>
           </div>
           
           <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getRiskColor(plan.riskAnalysis.level)}`}>
              {plan.riskAnalysis.level === 'low' ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
              <div className="flex flex-col">
                 <span className="text-[9px] font-black uppercase tracking-widest">Risk Assessment</span>
                 <span className="text-xs font-bold uppercase">{plan.riskAnalysis.level} Risk</span>
              </div>
           </div>
        </div>

        <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
           <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap size={12} className="text-yellow-500" /> Executive Insight
           </h4>
           <p className="text-sm text-zinc-300 font-medium leading-relaxed italic">
              "{plan.strategicInsight}"
           </p>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="p-6 md:p-8 bg-black/20">
         <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Execution Phases</h4>
         <div className="space-y-4">
            {plan.phases.map((phase, idx) => (
               <div key={idx} className="border border-white/10 rounded-2xl overflow-hidden bg-[#0c0c0e]">
                  <button 
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-xs text-white border border-white/10 shadow-inner">
                           {idx + 1}
                        </div>
                        <div className="text-left">
                           <h5 className="text-sm font-bold text-white">{phase.name}</h5>
                           <div className="flex items-center gap-2 mt-0.5">
                              {phase.estimatedDuration && (
                                 <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                    <Clock size={10} /> {phase.estimatedDuration}
                                 </span>
                              )}
                           </div>
                        </div>
                     </div>
                     {expandedPhase === phase.id ? <ChevronDown size={16} className="text-zinc-500" /> : <ChevronRight size={16} className="text-zinc-500" />}
                  </button>
                  
                  {expandedPhase === phase.id && (
                     <div className="px-16 pb-6 pt-2 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-zinc-400 leading-relaxed">{phase.description}</p>
                        
                        <div className="space-y-2">
                           {phase.tasks.map((task, tIdx) => (
                              <div key={tIdx} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                 <Circle size={12} className="text-zinc-600 mt-1" />
                                 <span className="text-xs text-zinc-300">{task}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      {/* Safety & Action Footer */}
      <div className="p-6 md:p-8 bg-[#0c0c0e] border-t border-white/5">
         {plan.riskAnalysis.humanOversightRequired && (
            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl flex items-start gap-3">
               <ShieldAlert size={16} className="text-red-500 mt-0.5" />
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Human Oversight Protocol Active</p>
                  <p className="text-xs text-red-200/80 leading-relaxed">
                     Reasoning: {plan.riskAnalysis.reasoning}
                     <br />
                     <span className="font-bold text-red-400">Mitigation: {plan.riskAnalysis.mitigationStrategy}</span>
                  </p>
               </div>
            </div>
         )}

         <div className="flex gap-4">
            <button className="flex-1 py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest transition-all">
               Refine Strategy
            </button>
            <button className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95">
               <Play size={16} fill="currentColor" /> Greenlight Operation
            </button>
         </div>
      </div>
    </div>
  );
};

export default AgenticPlanViewer;
