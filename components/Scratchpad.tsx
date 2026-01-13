
import React from 'react';
import { StickyNote } from 'lucide-react';

interface ScratchpadProps {
  content: string;
}

const Scratchpad: React.FC<ScratchpadProps> = ({ content }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 h-48 flex flex-col mt-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <StickyNote size={14} /> Agent Memory (Scratchpad)
      </h3>
      <div className="flex-1 bg-black/30 rounded-lg p-3 overflow-y-auto border border-white/5 font-mono text-xs text-amber-100/90 whitespace-pre-wrap">
        {content || "// Memory empty..."}
      </div>
    </div>
  );
};

export default Scratchpad;
