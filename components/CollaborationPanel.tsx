
import React, { useState } from 'react';
import { CollaborationSession, Collaborator } from '../types.ts';
import { Users, UserPlus, Shield, X, RefreshCcw, RotateCcw, RotateCw, Crown, Eye, Pen, MoreHorizontal, Check, Lock, Unlock } from 'lucide-react';

interface CollaborationPanelProps {
  session: CollaborationSession | null;
  currentUser: Collaborator;
  onInvite: (email: string, role: Collaborator['role']) => void;
  onUpdateRole: (userId: string, newRole: Collaborator['role']) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onClose: () => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
  session, 
  currentUser, 
  onInvite, 
  onUpdateRole, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onClose 
}) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Collaborator['role']>('viewer');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail('');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown size={12} className="text-yellow-400" />;
      case 'editor': return <Pen size={12} className="text-blue-400" />;
      default: return <Eye size={12} className="text-zinc-400" />;
    }
  };

  return (
    <div className="absolute top-20 right-4 md:right-8 w-[380px] bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300 z-40 flex flex-col">
       
       {/* Header */}
       <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-900/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <Users size={16} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Team Sync</h3>
            <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-[0.2em]">Session ID: {session?.id.substring(0,6) || '---'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-zinc-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
         
         {/* History Controls */}
         <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Version Control</span>
            <div className="flex gap-2">
               <button 
                 onClick={onUndo} 
                 disabled={!canUndo}
                 className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                 title="Undo"
               >
                 <RotateCcw size={16} />
               </button>
               <button 
                 onClick={onRedo} 
                 disabled={!canRedo}
                 className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                 title="Redo"
               >
                 <RotateCw size={16} />
               </button>
            </div>
         </div>

         {/* Invite Section */}
         <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
               <UserPlus size={12} /> Invite Collaborator
            </label>
            <form onSubmit={handleInviteSubmit} className="flex gap-2">
               <input 
                 value={inviteEmail}
                 onChange={e => setInviteEmail(e.target.value)}
                 placeholder="colleague@citadel.ai"
                 className="flex-1 bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-zinc-700 focus:border-indigo-500/50 outline-none"
               />
               <button type="submit" className="p-2.5 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                 <Check size={14} />
               </button>
            </form>
         </div>

         {/* Users List */}
         <div className="space-y-3">
            <div className="flex justify-between items-end">
               <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Shield size={12} /> Active Members
               </label>
               <span className="text-[9px] font-mono text-zinc-600">{session?.activeCollaborators.length || 0} Online</span>
            </div>
            
            <div className="space-y-2">
               {session ? session.activeCollaborators.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-white/10 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="relative">
                           <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                              style={{ backgroundColor: user.color }}
                           >
                              {user.name.charAt(0)}
                           </div>
                           <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0c0c0e] ${user.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              {user.name} 
                              {user.id === currentUser.id && <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-400 font-normal">YOU</span>}
                           </p>
                           <p className="text-[9px] text-zinc-500 font-mono capitalize">{user.role}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-2">
                        {user.id !== currentUser.id && (
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <button 
                                 onClick={() => onUpdateRole(user.id, user.role === 'admin' ? 'viewer' : 'admin')}
                                 className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white"
                                 title="Toggle Admin"
                              >
                                 {user.role === 'admin' ? <Unlock size={12} /> : <Lock size={12} />}
                              </button>
                           </div>
                        )}
                        <div className="p-1.5 bg-black/40 rounded-lg border border-white/5">
                           {getRoleIcon(user.role)}
                        </div>
                     </div>
                  </div>
               )) : (
                  <div className="p-4 text-center text-[10px] text-zinc-600 border border-dashed border-white/5 rounded-xl">
                     No session active.
                  </div>
               )}
            </div>
         </div>

      </div>
    </div>
  );
};

export default CollaborationPanel;
