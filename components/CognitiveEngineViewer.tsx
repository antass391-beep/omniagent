
import React, { useState } from 'react';
import { CognitiveState } from '../types.ts';
import { Target, Eye, Scale, Briefcase, ListTodo, Milestone, BrainCircuit, Shield, AlertTriangle, PlayCircle, CheckCircle2, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface CognitiveEngineViewerProps {
  data: CognitiveState;
}

const CognitiveEngineViewer: React.FC<CognitiveEngineViewerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'ceo' | 'world' | 'neuro'>('ceo');

  return (
    <div className="w-full mt-8 rounded-[2rem] bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl animate-pulse">
            <BrainCircuit size={20} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Cognitive Engine</h3>
            <p className="text-[9px] text-cyan-500 font-bold uppercase tracking-[0.2em] mt-1">Multi-Modal Reasoning Core</p>
          </div>
        </div>

        <div className="flex bg-black p-1 rounded-xl border border-white/5">
           {[
             { id: 'ceo', label: 'Agentic CEO', icon: Briefcase },
             { id: 'world', label: 'World Model', icon: Eye },
             { id: 'neuro', label: 'Neurosymbolic', icon: Scale }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
             >
               <tab.icon size={12} /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="p-8 min-h-[300px]">
        
        {/* CEO / Agentic Autonomy View */}
        {activeTab === 'ceo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4">
             <div className="lg:col-span-1 space-y-4">
               <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Current Strategic Focus</p>
                 <p className="text-lg font-bold text-white leading-tight">"{data.agenticAutonomy.currentFocus}"</p>
               </div>
               <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
                 <div className="flex items-center gap-2 mb-2">
                   <Target size={14} className="text-zinc-500" />
                   <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Goal Completion</p>
                 </div>
                 <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-500 transition-all duration-1000" 
                     style={{ width: `${(data.agenticAutonomy.goals.filter(g => g.status === 'complete').length / data.agenticAutonomy.goals.length) * 100}%` }} 
                   />
                 </div>
               </div>
             </div>

             <div className="lg:col-span-2 space-y-3">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <ListTodo size={12} /> Goal Hierarchy
               </p>
               <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                 {data.agenticAutonomy.goals.map((goal) => (
                   <div key={goal.id} className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                     <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${goal.status === 'complete' ? 'bg-emerald-500' : (goal.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700')}`} />
                     <div className="flex-1">
                       <div className="flex justify-between items-start">
                         <p className={`text-xs font-bold ${goal.status === 'complete' ? 'text-zinc-500 line-through' : 'text-white'}`}>{goal.description}</p>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${goal.priority === 'strategic' ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-500'}`}>
                           {goal.priority}
                         </span>
                       </div>
                       <p className="text-[9px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">{goal.status}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* World Model / Intuition View */}
        {activeTab === 'world' && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <Eye size={16} className="text-emerald-400" />
                 <p className="text-sm font-bold text-white">Future State Simulation</p>
               </div>
               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20">
                 Horizon: {data.worldModel.predictionHorizon}
               </span>
             </div>

             <div className="h-48 w-full bg-black/20 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.worldModel.simulations}>
                    <defs>
                      <linearGradient id="probGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="timeStep" hide />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#000', borderColor: '#333'}}
                      itemStyle={{color: '#10b981', fontSize: '10px'}}
                    />
                    <Line type="monotone" dataKey="probability" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#059669'}} />
                    <Line type="monotone" dataKey="riskLevel" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                  <span className="text-[8px] font-black text-emerald-500 uppercase">Success Probability</span>
                  <span className="text-[8px] font-black text-red-500 uppercase">Risk Factor</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {data.worldModel.simulations.slice(0, 4).map((sim, i) => (
                 <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center font-mono text-[10px] text-emerald-500 border border-emerald-500/20">
                      T+{sim.timeStep}
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] text-zinc-300 font-medium">{sim.scenarioDescription}</p>
                       <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${sim.probability * 100}%` }} />
                          </div>
                          <span className="text-[8px] font-mono text-zinc-500">{(sim.probability * 100).toFixed(0)}%</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Neurosymbolic / Logic View */}
        {activeTab === 'neuro' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-right-4">
              <div className="space-y-6">
                 <div className="flex items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl relative">
                    {/* Visual Balance Scale */}
                    <div className="flex items-center gap-8">
                       <div className="text-center">
                          <BrainCircuit size={32} className="text-fuchsia-500 mx-auto mb-2" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Neural Net</p>
                          <p className="text-xl font-bold text-white">{(data.neuroSymbolic.neuralConfidence * 100).toFixed(0)}%</p>
                       </div>
                       <div className="h-16 w-px bg-zinc-800" />
                       <div className="text-center">
                          <Shield size={32} className="text-amber-500 mx-auto mb-2" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Symbolic Logic</p>
                          <p className="text-xl font-bold text-white">{(data.neuroSymbolic.symbolicAlignment * 100).toFixed(0)}%</p>
                       </div>
                    </div>
                    <div className="absolute bottom-4 text-[9px] font-mono text-zinc-600">Hybrid Coherence Score</div>
                 </div>

                 <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Scale size={12} /> Neurosymbolic Consensus
                    </p>
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                       The system has balanced probabilistic intuition with deterministic constraints. 
                       Neural layers suggest high creativity, while symbolic layers enforce safety boundaries.
                    </p>
                 </div>
              </div>

              <div className="flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                 <div className="p-4 border-b border-white/5 bg-black/20">
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Constraint Matrix</h4>
                 </div>
                 <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {data.neuroSymbolic.activeRules.map((rule, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                             {rule.status === 'satisfied' && <CheckCircle2 size={12} className="text-emerald-500" />}
                             {rule.status === 'violated' && <AlertTriangle size={12} className="text-red-500" />}
                             {rule.status === 'partial' && <Activity size={12} className="text-yellow-500" />}
                             <span className="text-[10px] font-medium text-zinc-300">{rule.rule}</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-600">{(rule.confidence * 100).toFixed(0)}%</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default CognitiveEngineViewer;
