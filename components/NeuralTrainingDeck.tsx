
import React, { useState, useRef } from 'react';
import { Database, Upload, Brain, Network, FileCode, Trash2, Zap, Cpu, Globe, BookOpen, Landmark, FlaskConical, X, Layers, Plus } from 'lucide-react';
import { KnowledgeNode } from '../types.ts';

interface NeuralTrainingDeckProps {
  knowledgeBase: KnowledgeNode[];
  onAddNode: (content: string, category: KnowledgeNode['category'], title: string) => void;
  onRemoveNode: (id: string) => void;
  onClose: () => void;
}

const NeuralTrainingDeck: React.FC<NeuralTrainingDeckProps> = ({ knowledgeBase, onAddNode, onRemoveNode, onClose }) => {
  const [inputContent, setInputContent] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeNode['category']>('general');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionProgress, setIngestionProgress] = useState(0);

  const handleMassIngest = () => {
    if (!inputContent.trim() || !inputTitle.trim()) return;
    
    setIsIngesting(true);
    setIngestionProgress(0);

    // Simulate Chunking and Vectorization Process
    const totalChunks = 5;
    let currentChunk = 0;

    const interval = setInterval(() => {
      currentChunk++;
      setIngestionProgress((currentChunk / totalChunks) * 100);

      if (currentChunk >= totalChunks) {
        clearInterval(interval);
        setTimeout(() => {
           onAddNode(inputContent, category, inputTitle);
           setInputContent('');
           setInputTitle('');
           setIsIngesting(false);
           setIngestionProgress(0);
        }, 500);
      }
    }, 600);
  };

  const categories: { id: KnowledgeNode['category'], label: string, icon: any }[] = [
    { id: 'science', label: 'Science', icon: FlaskConical },
    { id: 'finance', label: 'Finance', icon: Landmark },
    { id: 'code', label: 'Code', icon: FileCode },
    { id: 'humanities', label: 'Humanities', icon: BookOpen },
    { id: 'physics', label: 'Physics', icon: Zap },
    { id: 'general', label: 'General', icon: Globe },
  ];

  return (
    <div className="absolute inset-0 bg-black/95 md:bg-black/90 backdrop-blur-xl z-50 p-4 md:p-12 flex flex-col animate-in fade-in duration-300 overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[60]"
      >
        <X size={24} />
      </button>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 md:mt-0">
          <div>
             <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
               <Brain className="text-purple-500" size={32} /> Neural Knowledge Ingestion
             </h2>
             <p className="text-xs font-mono text-zinc-500 mt-2 max-w-2xl leading-relaxed">
               Directly inject large datasets into the agent's context window. The system will vectorise, chunk, and embed this information to enhance its reasoning capabilities in specific domains.
             </p>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="px-5 py-3 bg-purple-900/20 border border-purple-500/30 rounded-2xl flex items-center gap-3">
               <Database size={16} className="text-purple-400" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Nodes</span>
                  <span className="text-xl font-bold text-white leading-none">{knowledgeBase.length}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 min-h-0">
          
          {/* Ingestion Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             <div className="p-1 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent">
               <div className="p-6 bg-[#0c0c0e] rounded-[1.4rem] flex-1 flex flex-col h-full relative overflow-hidden">
                  
                  {isIngesting && (
                    <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                       <div className="w-64 space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-purple-400">
                             <span>Vectorizing Data</span>
                             <span>{ingestionProgress.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${ingestionProgress}%` }} />
                          </div>
                          <div className="font-mono text-[9px] text-zinc-500 text-center animate-pulse">
                             Chunking tokens... Embedding semantic weights...
                          </div>
                       </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                       <Layers size={12} /> Target Domain
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map(c => (
                        <button 
                          key={c.id}
                          onClick={() => setCategory(c.id)}
                          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${category === c.id ? 'bg-purple-600/20 text-purple-300 border-purple-500/50' : 'bg-white/5 text-zinc-500 border-transparent hover:bg-white/10'}`}
                        >
                          <c.icon size={14} />
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Dataset Identifier</label>
                    <input 
                      value={inputTitle}
                      onChange={e => setInputTitle(e.target.value)}
                      placeholder="e.g., Q4_Financial_Results_Raw.txt"
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-700 focus:border-purple-500/50 outline-none transition-colors font-mono"
                    />
                  </div>

                  <div className="flex-1 mb-6 min-h-[200px] flex flex-col">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 flex items-center justify-between">
                       <span>Raw Data Input</span>
                       <span className="text-[8px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Supports Markdown/JSON/Text</span>
                    </label>
                    <textarea 
                      value={inputContent}
                      onChange={e => setInputContent(e.target.value)}
                      placeholder="// Paste large volumes of text here to train the agent..."
                      className="flex-1 w-full bg-black border border-white/10 rounded-xl p-4 text-[10px] text-purple-200/80 font-mono placeholder-zinc-800 focus:border-purple-500/50 outline-none transition-colors resize-none custom-scrollbar leading-relaxed"
                    />
                  </div>

                  <button 
                    onClick={handleMassIngest}
                    disabled={isIngesting || !inputContent}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Upload size={14} className="group-hover:-translate-y-1 transition-transform" /> Ingest & Train Model
                  </button>
               </div>
             </div>
          </div>

          {/* Visualization & List */}
          <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden min-h-[400px]">
             
             {/* Dynamic Vector Space Viz */}
             <div className="h-56 bg-[#0c0c0e] border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.15),transparent_60%)]" />
                
                {/* Simulated Neural Nodes */}
                <div className="absolute inset-0">
                  {knowledgeBase.slice(0, 15).map((node, i) => {
                     const top = Math.random() * 80 + 10;
                     const left = Math.random() * 80 + 10;
                     return (
                        <div 
                           key={node.id}
                           className="absolute flex items-center gap-2 animate-in zoom-in duration-1000"
                           style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${i * 100}ms` }}
                        >
                           <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                           <div className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent transform rotate-45" />
                        </div>
                     );
                  })}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="relative">
                      <Network size={80} className="text-purple-500/10" />
                      <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full" />
                   </div>
                </div>

                <div className="absolute bottom-4 right-6 text-right">
                   <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Vector Space Density</p>
                   <p className="text-2xl font-mono text-white/20">{(knowledgeBase.length * 0.042).toFixed(4)}</p>
                </div>
             </div>

             {/* Node List */}
             <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-6 overflow-hidden flex flex-col min-h-[300px]">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <Database size={12} /> Embedded Knowledge Blocks
                   </h3>
                   <span className="text-[9px] font-mono text-zinc-600">LRU Cache Active</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                   {knowledgeBase.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-3 min-h-[200px] border-2 border-dashed border-white/5 rounded-2xl">
                       <div className="p-4 bg-white/5 rounded-full">
                          <BookOpen size={24} className="opacity-40" />
                       </div>
                       <p className="text-xs font-mono">Agent Knowledge Base Empty.</p>
                       <p className="text-[10px] text-zinc-700">Upload data to begin training.</p>
                     </div>
                   ) : (
                     knowledgeBase.map(node => (
                       <div key={node.id} className="group p-4 bg-[#0c0c0e] border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all flex items-start gap-4">
                          <div className={`p-2.5 rounded-xl shrink-0 border border-white/5 ${node.category === 'finance' ? 'bg-emerald-500/10 text-emerald-400' : (node.category === 'code' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400')}`}>
                             {node.category === 'finance' ? <Landmark size={16} /> : (node.category === 'code' ? <FileCode size={16} /> : <BookOpen size={16} />)}
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                <h4 className="text-xs font-bold text-white truncate max-w-[200px]">{node.title}</h4>
                                <span className="text-[8px] font-mono text-zinc-500">{node.timestamp.toLocaleTimeString()}</span>
                             </div>
                             <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2 font-mono leading-relaxed opacity-80">
                               {node.content}
                             </p>
                             <div className="flex items-center gap-3 mt-3">
                                <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[98%]" />
                                </div>
                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider">Vector ID: {node.id.substring(node.id.length - 6)}</span>
                             </div>
                          </div>
                          <button 
                            onClick={() => onRemoveNode(node.id)}
                            className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                       </div>
                     ))
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NeuralTrainingDeck;
