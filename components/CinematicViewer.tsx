
import React from 'react';
import { GeneratedAsset } from '../types.ts';
import { Image as ImageIcon, Download, Share2, Maximize2, Aperture, Film } from 'lucide-react';

interface CinematicViewerProps {
  asset: GeneratedAsset;
}

const CinematicViewer: React.FC<CinematicViewerProps> = ({ asset }) => {
  return (
    <div className="w-full mt-6 rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl relative group animate-in fade-in zoom-in-95 duration-700">
      
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={`data:image/png;base64,${asset.url}`} 
          alt={asset.prompt} 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* HUD Elements */}
        <div className="absolute top-4 left-4 flex gap-2">
           <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
              <Aperture size={12} className="text-cyan-400" />
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">{asset.style} Mode</span>
           </div>
           <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
              <Film size={12} className="text-fuchsia-400" />
              <span className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest">CGI Render</span>
           </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-6 bg-[#0c0c0e] border-t border-white/10 relative">
        <div className="flex justify-between items-start gap-4">
           <div className="flex-1">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <ImageIcon size={14} /> Prompt Visualization
              </h4>
              <p className="text-sm font-medium text-white leading-relaxed line-clamp-2 italic">
                 "{asset.prompt}"
              </p>
           </div>
           <div className="flex gap-2">
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors border border-white/5">
                 <Download size={16} />
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors border border-white/5">
                 <Maximize2 size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicViewer;
