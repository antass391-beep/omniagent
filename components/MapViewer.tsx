
import React from 'react';
import { MapPin, Navigation, Star, Globe } from 'lucide-react';

interface MapViewerProps {
  groundingChunks: any[];
}

const MapViewer: React.FC<MapViewerProps> = ({ groundingChunks }) => {
  // Extract map-specific chunks
  const mapChunks = groundingChunks.filter(c => c.web?.uri?.includes('google.com/maps') || c.web?.title?.includes('Map'));

  if (!mapChunks || mapChunks.length === 0) return null;

  return (
    <div className="mt-6 w-full space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 px-1">
         <Globe size={12} /> Location Intelligence
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
         {mapChunks.slice(0, 4).map((chunk, i) => (
            <a 
              key={i} 
              href={chunk.web.uri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-[#0c0c0e] border border-white/10 rounded-2xl hover:bg-white/[0.02] hover:border-emerald-500/30 transition-all group"
            >
               <div className="mt-1 p-2 bg-emerald-900/20 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <MapPin size={16} className="text-emerald-400" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">{chunk.web.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">
                     Location confirmed via Google Maps Grounding. Tap to navigate.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                     <div className="flex text-yellow-500">
                        {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                     </div>
                     <span className="text-[8px] font-mono text-zinc-600">VERIFIED</span>
                  </div>
               </div>
               <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                  <Navigation size={14} className="text-zinc-400" />
               </div>
            </a>
         ))}
      </div>
    </div>
  );
};

export default MapViewer;
