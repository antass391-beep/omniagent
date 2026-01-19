
import React from 'react';
import { Collaborator, CollaborationSession } from '../types.ts';
import { Users, Activity, Lock, Globe, Zap } from 'lucide-react';

interface CollaborativeHeaderProps {
  session: CollaborationSession;
  onSync: () => void;
}

const CollaborativeHeader: React.FC<CollaborativeHeaderProps> = ({ session, onSync }) => {
  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-3xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl">
          <Users size={20} className="text-indigo-400" />
        </div>
        <div>
           <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
             Neural Link Hive-Mind 
             <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[8px]">LIVE</span>
           </h3>
           <div className="flex items-center gap-3 mt-1.5">
              <div className="flex -space-x-2">
                {session.activeCollaborators.map(c => (
                  <div 
                    key={c.id} 
                    className="w-8 h-8 rounded-full border-2 border-[#08080a] flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                    style={{ backgroundColor: c.color }}
                    title={`${c.name} - ${c.status}`}
                  >
                    {c.name.charAt(0)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#08080a] flex items-center justify-center text-[10px] text-zinc-500">
                  +2
                </div>
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-zinc-500" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">Session: {session.id.substring(0,8)}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition-all ${session.syncStatus === 'synced' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-400'}`}>
          <div className={`w-2 h-2 rounded-full ${session.syncStatus === 'synced' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">{session.syncStatus === 'synced' ? 'Mesh Sync OK' : 'Diverged - Merging'}</span>
        </div>
        
        <button 
          onClick={onSync}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 active:scale-95"
        >
          <Zap size={14} /> Snapshot Sync
        </button>
      </div>
    </div>
  );
};

export default CollaborativeHeader;
