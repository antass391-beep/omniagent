
import React, { useState } from 'react';
import { Brain, Lightbulb, Eye, CheckCircle2, ChevronDown, ChevronRight, GitBranch, ArrowRight } from 'lucide-react';
import { ReasoningStep } from '../types.ts';

interface ReasoningChainProps {
  steps: ReasoningStep[];
}

const ReasoningChain: React.FC<ReasoningChainProps> = ({ steps }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  const getIcon = (type: ReasoningStep['type']) => {
    switch (type) {
      case 'thought': return <Brain size={14} className="text-purple-400" />;
      case 'action': return <GitBranch size={14} className="text-blue-400" />;
      case 'observation': return <Eye size={14} className="text-amber-400" />;
      case 'conclusion': return <CheckCircle2 size={14} className="text-emerald-400" />;
    }
  };

  const getColor = (type: ReasoningStep['type']) => {
    switch (type) {
      case 'thought': return 'border-purple-500/30 bg-purple-500/5 text-purple-200';
      case 'action': return 'border-blue-500/30 bg-blue-500/5 text-blue-200';
      case 'observation': return 'border-amber-500/30 bg-amber-500/5 text-amber-200';
      case 'conclusion': return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200';
    }
  };

  return (
    <div className="w-full mt-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 rounded-2xl transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:scale-110 transition-transform">
            <Lightbulb size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-purple-500 uppercase tracking-widest">Emergent Reasoning Chain</h4>
            <p className="text-[10px] text-zinc-500 font-medium">
              {steps.length} Cognitive Nodes Processed (CoT)
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronDown size={14} className="text-purple-500" /> : <ChevronRight size={14} className="text-zinc-600" />}
      </button>

      {isExpanded && (
        <div className="mt-4 pl-4 border-l border-white/10 space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className={`relative p-3 rounded-xl border ${getColor(step.type)}`}>
               <div className="flex items-start gap-3">
                  <div className="mt-0.5 opacity-80">{getIcon(step.type)}</div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-70">{step.type}</span>
                        {step.confidence && (
                           <span className="text-[8px] font-mono opacity-50">{(step.confidence * 100).toFixed(0)}% Conf</span>
                        )}
                     </div>
                     <p className="text-[11px] leading-relaxed font-medium">{step.content}</p>
                  </div>
               </div>
               {idx < steps.length - 1 && (
                 <div className="absolute left-[-17px] top-[50%] flex flex-col items-center">
                   <div className="w-2 h-2 rounded-full bg-white/10"></div>
                 </div>
               )}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[9px] text-zinc-600 uppercase tracking-widest pl-2">
             <ArrowRight size={10} />
             <span>Reasoning Terminated</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReasoningChain;
