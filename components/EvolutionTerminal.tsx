
import React, { useState, useEffect } from 'react';
import { EvolutionProposal, NeuralGene } from '../types.ts';
import { Terminal, GitCommit, ArrowRight, ShieldCheck, Zap, AlertTriangle, Code, CheckCircle2, Network, GitBranch, Cpu, Activity, Dna, Gauge } from 'lucide-react';
import TypewriterText from './TypewriterText.tsx';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface EvolutionTerminalProps {
  proposal: EvolutionProposal;
  onApprove: () => void;
  onDeny: () => void;
}

const EvolutionTerminal: React.FC<EvolutionTerminalProps> = ({ proposal, onApprove, onDeny }) => {
  const [activeTab, setActiveTab] = useState<'diff' | 'neuro'>('diff');
  const [activeDiff, setActiveDiff] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Matrix-style log simulation
  useEffect(() => {
    const bootSequence = [
      `Initializing Neural Handshake [${proposal.codename}]...`,
      `Target Version: ${proposal.versionTarget}`,
      `Neuroevolution Cycle: GEN-${proposal.neuroEvolutionData?.generation || '0'}`,
      `Calculating Population Fitness...`,
      `Executing Crossover & Mutation...`,
      `Ready for manual override.`
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [proposal]);

  // Mock data for NAS chart
  const fitnessData = proposal.neuroEvolutionData?.architectures
    .filter(a => a.status !== 'discarded')
    .map((arch, i) => ({
      id: arch.id,
      score: arch.fitnessScore * 100,
      params: (arch.parameters / 1000000).toFixed(1) + 'M'
    })) || [];

  const getActivationColor = (act: string) => {
    switch(act) {
      case 'relu': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'gelu': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'swish': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="w-full mt-8 rounded-[2rem] bg-[#050507] border border-white/10 overflow-hidden shadow-2xl relative font-mono animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#08080a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-pulse">
            <Zap size={16} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">RSI_KERNEL_ACCESS</h3>
            <p className="text-[9px] text-purple-400 font-bold uppercase tracking-[0.2em]">{proposal.codename}</p>
          </div>
        </div>
        
        <div className="flex bg-black p-1 rounded-lg border border-white/5">
           <button 
             onClick={() => setActiveTab('diff')} 
             className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'diff' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
           >
             Code Mutation
           </button>
           <button 
             onClick={() => setActiveTab('neuro')} 
             className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'neuro' ? 'bg-purple-900/50 text-purple-200' : 'text-zinc-500'}`}
           >
             Neuroevolution
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
        {/* Sidebar: Logs & Stats */}
        <div className="lg:col-span-1 border-r border-white/10 bg-[#0c0c0e] p-6 flex flex-col">
          <div className="mb-6 p-4 bg-black rounded-xl border border-white/5 h-48 overflow-y-auto custom-scrollbar font-mono text-[10px] text-green-400 space-y-1">
             {logs.map((log, i) => (
               <div key={i} className="flex gap-2">
                 <span className="opacity-50">{`>`}</span>
                 <TypewriterText text={log} speed={10} />
               </div>
             ))}
             <div className="animate-pulse">_</div>
          </div>

          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">
             {activeTab === 'diff' ? 'Code Mutations' : 'Genetic Parameters'}
          </h4>
          
          {activeTab === 'diff' ? (
            <div className="space-y-2 flex-1">
              {proposal.codeChanges.map((change, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDiff(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${activeDiff === idx ? 'bg-purple-500/10 border-purple-500/30 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <Code size={14} className={activeDiff === idx ? 'text-purple-400' : 'text-zinc-600'} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider">{change.componentName}</p>
                      <p className="text-[9px] opacity-60 truncate max-w-[120px]">{change.filePath}</p>
                    </div>
                  </div>
                  {activeDiff === idx && <ArrowRight size={12} className="text-purple-400" />}
                </button>
              ))}
            </div>
          ) : (
             <div className="space-y-4">
               {proposal.neuroEvolutionData && (
                 <>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                        <p className="text-[9px] font-black text-purple-400 uppercase">Generation</p>
                        <p className="text-xl font-mono text-white">GEN-{proposal.neuroEvolutionData.generation}</p>
                     </div>
                     <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                        <p className="text-[9px] font-black text-purple-400 uppercase">Elite Size</p>
                        <p className="text-xl font-mono text-white">{(proposal.neuroEvolutionData.populationSize * 0.1).toFixed(0)}</p>
                     </div>
                   </div>

                   <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <p className="text-[9px] font-black text-zinc-500 uppercase">Mutation Rate</p>
                        <p className="text-[9px] font-mono text-zinc-300">{(proposal.neuroEvolutionData.mutationRate * 100).toFixed(1)}%</p>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 transition-all" style={{width: `${proposal.neuroEvolutionData.mutationRate * 100}%`}}></div>
                      </div>
                   </div>

                   <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <p className="text-[9px] font-black text-zinc-500 uppercase">Genetic Diversity</p>
                        <p className="text-[9px] font-mono text-zinc-300">{(proposal.neuroEvolutionData.geneticDiversity * 100).toFixed(1)}%</p>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all" style={{width: `${proposal.neuroEvolutionData.geneticDiversity * 100}%`}}></div>
                      </div>
                   </div>
                 </>
               )}
             </div>
          )}
        </div>

        {/* Main: Viewer */}
        <div className="lg:col-span-2 bg-[#050507] p-6 flex flex-col">
          {activeTab === 'diff' && proposal.codeChanges[activeDiff] && (
            <>
              <div className="mb-4">
                 <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-2">
                   <GitCommit size={14} className="text-blue-500" />
                   {proposal.codeChanges[activeDiff].reasoning}
                 </h4>
                 <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase rounded">Original</span>
                    <ArrowRight size={12} className="text-zinc-600 mt-0.5" />
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase rounded">Optimized</span>
                 </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-[#0c0c0e] p-4 overflow-x-auto">
                  <pre className="text-[10px] font-mono text-zinc-400 whitespace-pre-wrap">
                    {proposal.codeChanges[activeDiff].originalSnippet}
                  </pre>
                </div>
                <div className="bg-[#0c0c0e] p-4 overflow-x-auto relative">
                  <div className="absolute top-0 right-0 w-1 h-full bg-purple-500/50 blur-[20px] opacity-20 pointer-events-none" />
                  <pre className="text-[10px] font-mono text-purple-300 whitespace-pre-wrap">
                    {proposal.codeChanges[activeDiff].modifiedSnippet}
                  </pre>
                </div>
              </div>
            </>
          )}

          {activeTab === 'neuro' && proposal.neuroEvolutionData && (
             <div className="flex flex-col h-full gap-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-xs font-bold text-white flex items-center gap-2">
                     <Dna size={14} className="text-purple-500" />
                     Population Fitness Landscape
                   </h4>
                   <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase rounded border border-purple-500/20">
                     Top Fitness: {proposal.neuroEvolutionData.bestFitness.toFixed(4)}
                   </span>
                </div>

                {/* Fitness Graph */}
                <div className="h-40 w-full bg-[#0c0c0e] border border-white/5 rounded-2xl p-4 relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={fitnessData}>
                         <defs>
                            <linearGradient id="nasGradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Tooltip 
                            contentStyle={{backgroundColor: '#000', borderColor: '#333'}}
                            itemStyle={{color: '#a855f7', fontSize: '10px'}}
                            labelStyle={{color: '#666', fontSize: '10px'}}
                         />
                         <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={2} fill="url(#nasGradient)" />
                         <YAxis hide />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>

                {/* Genome Visualization */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                   <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 sticky top-0 bg-[#050507] py-2 z-10">
                     Top Candidate Genomes (Elitism Selection)
                   </h4>
                   <div className="space-y-3">
                     {proposal.neuroEvolutionData.architectures.map((arch) => (
                        <div key={arch.id} className={`p-4 rounded-xl border transition-all ${arch.status === 'active' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/[0.02] border-white/5 opacity-60'}`}>
                           <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                 {arch.origin === 'elite' && <Zap size={12} className="text-yellow-400" />}
                                 {arch.origin === 'crossover' && <GitBranch size={12} className="text-blue-400" />}
                                 {arch.origin === 'mutation' && <Activity size={12} className="text-red-400" />}
                                 <span className="text-[10px] font-bold text-white uppercase">{arch.id}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-zinc-500">{(arch.parameters / 1000000).toFixed(1)}M Params</span>
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${arch.status === 'active' ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                  {arch.origin}
                                </span>
                              </div>
                           </div>
                           
                           {/* DNA Sequence Visualization */}
                           <div className="flex gap-1 overflow-x-auto pb-2">
                              {arch.genome?.map((gene, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 group relative">
                                  <div className={`w-10 h-10 rounded border flex items-center justify-center ${getActivationColor(gene.activation)}`}>
                                     <span className="text-[8px] font-black">{gene.layerType.substring(0,3)}</span>
                                  </div>
                                  <div className="w-0.5 h-2 bg-zinc-800 group-last:hidden" />
                                  {/* Hover Detail */}
                                  <div className="absolute bottom-full mb-2 bg-black border border-white/10 p-2 rounded w-24 z-20 hidden group-hover:block">
                                    <p className="text-[8px] text-zinc-400">Width: {gene.width}</p>
                                    <p className="text-[8px] text-zinc-400">Act: {gene.activation}</p>
                                    <p className="text-[8px] text-zinc-400">Drop: {gene.dropout}</p>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     ))}
                   </div>
                </div>
             </div>
          )}

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-emerald-500">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Anchors Verified</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={onDeny}
                className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
              >
                Abort Evolution
              </button>
              <button 
                onClick={onApprove}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Zap size={14} /> Merge & Recompile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionTerminal;
