
import React, { useState } from 'react';
import { MetaCognitionState } from '../types.ts';
import { GitMerge, HelpCircle, RefreshCw, Spline, ArrowRight, Brain, AlertTriangle, Lightbulb, Share2, Layers, Network, Activity } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface MetaCognitionViewerProps {
  data: MetaCognitionState;
}

const MetaCognitionViewer: React.FC<MetaCognitionViewerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'causal' | 'epistemic' | 'neuro' | 'cross'>('causal');

  return (
    <div className="w-full mt-8 rounded-[2rem] bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-fuchsia-900/10 via-transparent to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl animate-pulse">
            <Brain size={20} className="text-fuchsia-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Meta-Cognition</h3>
            <p className="text-[9px] text-fuchsia-500 font-bold uppercase tracking-[0.2em] mt-1">Deep Self-Reflexion Layer</p>
          </div>
        </div>

        <div className="flex bg-black p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
           {[
             { id: 'causal', label: 'Causal Graph', icon: GitMerge },
             { id: 'epistemic', label: 'Knowledge Gaps', icon: HelpCircle },
             { id: 'neuro', label: 'Neuroplasticity', icon: RefreshCw },
             { id: 'cross', label: 'Cross-Domain', icon: Spline }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
             >
               <tab.icon size={12} /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="p-8 min-h-[350px]">
        
        {/* Causal Reasoning View */}
        {activeTab === 'causal' && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-4">
             <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Share2 size={12} /> Causal Inference Chains
                </p>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[9px] text-zinc-500">Cause</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-zinc-500">Effect</span>
                   </div>
                </div>
             </div>

             <div className="relative h-64 w-full bg-black/20 rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
                
                {/* Simplified Graph Visualization Logic */}
                <div className="flex items-center gap-4 flex-wrap justify-center max-w-2xl">
                   {data.causalGraph.nodes.map((node, i) => (
                      <React.Fragment key={node.id}>
                         <div className={`relative p-3 rounded-xl border flex flex-col items-center gap-1 z-10 ${
                            node.type === 'cause' ? 'bg-blue-500/10 border-blue-500/30' : 
                            node.type === 'effect' ? 'bg-emerald-500/10 border-emerald-500/30' : 
                            'bg-zinc-800/50 border-white/10'
                         }`}>
                            <span className={`text-[8px] font-black uppercase ${
                               node.type === 'cause' ? 'text-blue-400' : 
                               node.type === 'effect' ? 'text-emerald-400' : 'text-zinc-400'
                            }`}>{node.type}</span>
                            <span className="text-[10px] font-bold text-white text-center max-w-[100px] leading-tight">{node.label}</span>
                         </div>
                         {i < data.causalGraph.nodes.length - 1 && (
                            <div className="flex flex-col items-center gap-1 opacity-50">
                               <span className="text-[8px] font-mono text-zinc-500">{(data.causalGraph.links[i]?.strength * 100).toFixed(0)}%</span>
                               <ArrowRight size={14} className="text-zinc-600" />
                            </div>
                         )}
                      </React.Fragment>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.causalGraph.links.map((link, i) => (
                   <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
                      <div className="p-1.5 bg-zinc-800 rounded-lg">
                         <Network size={12} className="text-zinc-400" />
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">
                         <span className="text-white font-bold">{link.description}</span>
                      </p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* Epistemic Reflexivity View */}
        {activeTab === 'epistemic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4">
             <div className="space-y-6">
                <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl relative overflow-hidden">
                   <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         <AlertTriangle size={12} /> Epistemic Confidence
                      </h4>
                      <div className="flex items-end gap-2 mb-2">
                         <span className="text-4xl font-black text-white">{(data.epistemicState.confidence * 100).toFixed(1)}%</span>
                         <span className="text-xs text-amber-500/80 font-bold mb-1.5">Certainty</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500" style={{ width: `${data.epistemicState.confidence * 100}%` }} />
                      </div>
                   </div>
                   <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                      <HelpCircle size={120} className="text-amber-500" />
                   </div>
                </div>

                <div className="space-y-3">
                   <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Identified Knowledge Gaps</p>
                   {data.epistemicState.knowledgeGaps.map((gap, i) => (
                      <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                         <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-white">{gap.concept}</span>
                            <span className="text-[8px] font-mono text-red-400">Uncertainty: {(gap.uncertaintyLevel * 100).toFixed(0)}%</span>
                         </div>
                         <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-zinc-800 rounded text-[8px] text-zinc-400 font-bold uppercase">{gap.reason}</span>
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[8px] font-bold uppercase flex items-center gap-1">
                               <RefreshCw size={8} /> Strategy: {gap.strategy}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-black/20 rounded-2xl border border-white/5 p-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                   <div className="inline-block p-4 bg-zinc-900 rounded-full border border-white/10">
                      <Layers size={32} className="text-zinc-600" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white">Epistemic Boundary</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                         The agent is aware that its knowledge of <span className="text-white">Material Fatigue</span> is incomplete due to missing real-world sensor data.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Neuroplasticity View */}
        {activeTab === 'neuro' && (
           <div className="flex flex-col gap-6 animate-in slide-in-from-right-4">
              <div className="flex justify-between items-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                       <RefreshCw size={20} className="text-emerald-400" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Plasticity Index</p>
                       <p className="text-xl font-black text-white">{data.neuroplasticity.plasticityIndex.toFixed(3)}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Lifelong Retention</p>
                    <p className="text-xl font-black text-white">{(data.lifelongLearning.retentionRate * 100).toFixed(1)}%</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                       <Activity size={12} /> Active Rewiring Events
                    </h4>
                    <div className="space-y-2">
                       {data.neuroplasticity.activeRewiring.map((event, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                             <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${event.adaptationType === 'potentiation' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                <div>
                                   <p className="text-[10px] font-bold text-white uppercase">{event.region}</p>
                                   <p className="text-[9px] text-zinc-500">{event.adaptationType.replace('_', ' ')}</p>
                                </div>
                             </div>
                             <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-fuchsia-500" style={{ width: `${event.intensity * 100}%` }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <Brain size={48} className="text-fuchsia-500/50 mb-4 animate-pulse" />
                    <h4 className="text-xs font-bold text-white mb-2">On-the-Fly Rewiring Active</h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed max-w-[250px]">
                       Neural pathways are being restructured in real-time to accommodate new logic constraints from the "CEO" module.
                    </p>
                 </div>
              </div>
           </div>
        )}

        {/* Cross-Domain View */}
        {activeTab === 'cross' && (
           <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-right-4">
              {data.crossDomain.activeAnalogies.map((analogy, i) => (
                 <div key={i} className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                       <Spline size={64} className="text-indigo-500" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col gap-6">
                       <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase rounded-full border border-indigo-500/30">
                             {analogy.sourceDomain}
                          </span>
                          <ArrowRight size={14} className="text-indigo-500" />
                          <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-[9px] font-bold uppercase rounded-full border border-fuchsia-500/30">
                             {analogy.targetDomain}
                          </span>
                       </div>

                       <div>
                          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                             <Lightbulb size={14} className="text-yellow-400" /> Insight Transfer
                          </h4>
                          <p className="text-xs text-indigo-100/90 leading-relaxed font-medium">
                             "{analogy.insight}"
                          </p>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {analogy.mapping.map((map, j) => (
                             <div key={j} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                                <div>
                                   <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-0.5">Source</p>
                                   <p className="text-[10px] font-bold text-white">{map.sourceConcept}</p>
                                </div>
                                <div className="h-8 w-px bg-white/10 mx-2" />
                                <div className="text-right">
                                   <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-0.5">Target</p>
                                   <p className="text-[10px] font-bold text-fuchsia-400">{map.targetConcept}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        )}

      </div>
    </div>
  );
};

export default MetaCognitionViewer;
