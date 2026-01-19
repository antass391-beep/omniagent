
import React, { useState } from 'react';
import { BrainCircuit, MessageSquareQuote, CheckCircle2, ChevronDown, ChevronRight, AlertCircle, ArrowRight } from 'lucide-react';
import { ReflexionStep } from '../types.ts';

interface ReflexionLogProps {
  trace: ReflexionStep[];
}

const ReflexionLog: React.FC<ReflexionLogProps> = ({ trace }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!trace || trace.length === 0) return null;

  return (
    <div className="w-full mt-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        title="Analyze Interaction: View detailed cognitive trace, self-correction, and reasoning steps."
        className="w-full flex items-center justify-between p-4 bg-orange-500/5 border border-orange-500/20 hover:bg-orange-500/10 rounded-2xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:scale-110 transition-transform">
            <BrainCircuit size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest">Cognitive Reflexion Audit</h4>
            <p className="text-[10px] text-zinc-500 font-medium">
              {trace.length} Self-Correction Cycles Executed
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronDown size={14} className="text-orange-500" /> : <ChevronRight size={14} className="text-zinc-600" />}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-3 p-2">
          {trace.map((step, idx) => (
            <div key={idx} className="relative p-5 bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden">
               {/* Connector Line */}
               {idx < trace.length - 1 && (
                 <div className="absolute left-[2.25rem] top-[3.5rem] bottom-[-1.5rem] w-px bg-gradient-to-b from-orange-500/30 to-transparent z-0" />
               )}

               <div className="flex flex-col gap-4 relative z-10">
                 {/* 1. Initial Thought */}
                 <div className="flex gap-4 items-start">
                   <div className="mt-1 p-1.5 bg-zinc-800 rounded-full border border-white/5">
                     <MessageSquareQuote size={12} className="text-zinc-400" />
                   </div>
                   <div className="flex-1">
                     <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Initial Hypothesis</p>
                     <p className="text-xs text-zinc-300 font-mono leading-relaxed opacity-60 line-through decoration-red-500/50">{step.thought}</p>
                   </div>
                 </div>

                 {/* 2. Critique */}
                 <div className="flex gap-4 items-start">
                   <div className="mt-1 p-1.5 bg-red-900/20 rounded-full border border-red-500/30">
                     <AlertCircle size={12} className="text-red-500" />
                   </div>
                   <div className="flex-1 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                     <div className="flex justify-between items-center mb-1">
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Self-Critique</p>
                        <span className="text-[8px] font-mono text-red-400 opacity-70">Confidence: {(step.score * 100).toFixed(0)}%</span>
                     </div>
                     <p className="text-xs text-red-200 leading-relaxed font-medium">{step.critique}</p>
                   </div>
                 </div>

                 {/* 3. Refinement */}
                 <div className="flex gap-4 items-start">
                   <div className="mt-1 p-1.5 bg-emerald-900/20 rounded-full border border-emerald-500/30">
                     <CheckCircle2 size={12} className="text-emerald-500" />
                   </div>
                   <div className="flex-1">
                     <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Optimized Output</p>
                     <p className="text-xs text-white leading-relaxed font-bold">{step.refinement}</p>
                   </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReflexionLog;
