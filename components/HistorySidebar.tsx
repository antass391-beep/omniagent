
import React from 'react';
import { MessageSquare, Plus, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { ChatSession } from '../types';

interface HistorySidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onNewChat,
  onDeleteSession
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black text-[var(--citadel-subtext)] uppercase tracking-[0.2em] flex items-center gap-2">
          <Clock size={12} /> Recent Threads
        </h3>
        <button 
          onClick={onNewChat}
          className="p-1.5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all border border-blue-500/20 hover:border-blue-500/40"
          title="New Thread"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        {sessions.length === 0 ? (
          <div className="text-[10px] text-[var(--citadel-subtext)] italic px-4 py-8 border border-dashed border-[var(--citadel-border)] rounded-2xl text-center">
            No history yet...
          </div>
        ) : (
          sessions.map((session) => (
            <div 
              key={session.id}
              className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer
                ${currentSessionId === session.id 
                  ? 'bg-blue-500/10 border-blue-500/30 text-[var(--citadel-text)]' 
                  : 'bg-[var(--citadel-inner-bg)] border-[var(--citadel-border)] text-[var(--citadel-subtext)] hover:bg-[var(--citadel-hover)] hover:border-[var(--citadel-border-bright)]'}`}
              onClick={() => onSelectSession(session.id)}
            >
              <MessageSquare size={14} className={currentSessionId === session.id ? 'text-blue-400' : 'text-[var(--citadel-subtext)]'} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate leading-tight text-[var(--citadel-text)] opacity-90">
                  {session.title || "Untitled Thread"}
                </p>
                <p className="text-[8px] text-[var(--citadel-subtext)] mt-0.5 opacity-60">
                  {new Date(session.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
              {currentSessionId === session.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-blue-500 rounded-r-full"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
