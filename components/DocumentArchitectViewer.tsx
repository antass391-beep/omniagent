
import React from 'react';
/* Added Activity to the imports to fix the missing icon error on line 123 */
import { FileText, Wand2, Image as ImageIcon, ChevronRight, CheckCircle2, AlertCircle, Scissors, PlusSquare, Eraser, Activity } from 'lucide-react';
import { DocumentArchitectData } from '../types';

interface DocumentArchitectViewerProps {
  data: DocumentArchitectData;
}

const DocumentArchitectViewer: React.FC<DocumentArchitectViewerProps> = ({ data }) => {
  const getOpIcon = (type: string) => {
    switch(type) {
      case 'insert_image': return <ImageIcon size={14} />;
      case 'add_section': return <PlusSquare size={14} />;
      case 'remove_content': return <Eraser size={14} />;
      case 'rewrite_style': return <Wand2 size={14} />;
      default: return <Scissors size={14} />;
    }
  };

  return (
    <div className="w-full mt-8 rounded-[2rem] bg-[#0c0c0e]/90 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* Surgical Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-transparent to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white tracking-tight">{data.documentName}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[9px] text-blue-400 uppercase tracking-widest font-black">Augmented Intelligence Output</span>
              <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">v2.1 Master Architect</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Surgery Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
        {/* Change Log Sidebar */}
        <div className="lg:col-span-1 border-r border-white/5 p-6 bg-black/20">
          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Scissors size={12} className="text-zinc-600" /> Transformation Log
          </h4>
          <div className="space-y-3">
            {data.operations?.map((op, idx) => (
              <div key={idx} className="group p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${op.type === 'insert_image' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {getOpIcon(op.type)}
                  </div>
                  <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter truncate">
                    {op.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 leading-tight font-medium line-clamp-2">Target: {op.targetLocation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Surgical Preview Area */}
        <div className="lg:col-span-3 p-8 bg-black/40 overflow-y-auto max-h-[600px] custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Summary Box */}
            <div className="p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl flex items-start gap-4">
               <AlertCircle size={20} className="text-blue-500 shrink-0 mt-1" />
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Executive Assessment</p>
                 <p className="text-sm text-zinc-300 leading-relaxed italic">"{data.summaryOfChanges}"</p>
               </div>
            </div>

            {/* Rendered Operations */}
            <div className="space-y-12">
              {data.operations?.map((op, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 200}ms` }}>
                  <div className="flex items-center gap-3 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-[1px] bg-zinc-800"></div>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Operation {idx + 1} @ {op.targetLocation}</span>
                  </div>

                  {op.type === 'insert_image' && op.generatedImageUrl ? (
                    <div className="relative group rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <p className="text-xs font-bold text-white max-w-md">{op.imageDescription}</p>
                      </div>
                      <img src={op.generatedImageUrl} alt="Visual Asset" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute top-6 right-6 px-3 py-1 bg-purple-600/90 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-[0.2em] shadow-lg">
                        AI Asset Injected
                      </div>
                    </div>
                  ) : op.content ? (
                    <div className="relative p-8 bg-blue-500/[0.03] border-l-2 border-blue-500/50 rounded-r-3xl group">
                      <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 size={14} className="text-blue-400" />
                      </div>
                      <p className="text-base text-zinc-200 leading-[1.7] font-medium selection:bg-blue-500/30">
                        {op.content}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-[#0c0c0e] border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wand2 size={12} className="text-blue-400" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Protocol Sync: 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-emerald-400" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Engine: Master Architect</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            Discard
          </button>
          <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-xl shadow-blue-600/20 active:scale-95">
            Commit Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentArchitectViewer;
