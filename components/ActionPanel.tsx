
import React from 'react';
import { Terminal, AppWindow, MousePointer, Image as ImageIcon, StickyNote, Trash2, Video, Mail, Volume2, Command, Globe, Database, ScanEye, Cpu, Presentation, FileText, Monitor, Music, PenLine, Binary } from 'lucide-react';
import { AgentAction } from '../types';

interface ActionPanelProps {
  actions: AgentAction[];
  onClear?: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ actions, onClear }) => {
  const getIcon = (type: AgentAction['type']) => {
    switch (type) {
      case 'pc_file_operation': return <FileText className="w-4 h-4 text-amber-500" />;
      case 'pc_window_manager': return <Monitor className="w-4 h-4 text-indigo-500" />;
      case 'pc_media_control': return <Music className="w-4 h-4 text-rose-500" />;
      case 'generate_presentation': return <Presentation className="w-4 h-4 text-yellow-500" />;
      case 'browser_interact': return <Globe className="w-4 h-4 text-sky-500" />;
      case 'memory_store': 
      case 'memory_retrieve': return <Database className="w-4 h-4 text-indigo-500" />;
      case 'stream_analyze': return <ScanEye className="w-4 h-4 text-fuchsia-500" />;
      case 'iot_control': return <Cpu className="w-4 h-4 text-emerald-500" />;
      case 'generate_image': return <ImageIcon className="w-4 h-4 text-purple-500" />;
      case 'generate_video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'send_email': return <Mail className="w-4 h-4 text-cyan-500" />;
      case 'text_to_speech': return <Volume2 className="w-4 h-4 text-orange-500" />;
      case 'execute_command': return <Command className="w-4 h-4 text-red-500" />;
      case 'open_app': return <AppWindow className="w-4 h-4 text-blue-500" />;
      case 'click': 
      case 'mouse_click': return <MousePointer className="w-4 h-4 text-green-500" />;
      case 'edit': return <PenLine className="w-4 h-4 text-fuchsia-500" />;
      case 'update_scratchpad': return <StickyNote className="w-4 h-4 text-amber-500" />;
      default: return <Terminal className="w-4 h-4 opacity-50" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col h-full overflow-hidden bg-[var(--citadel-card)] border-[var(--citadel-border)]">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-50 text-[var(--citadel-text)]">
          <Terminal size={14} /> Operation Log
        </h3>
        {actions.length > 0 && onClear && (
          <button onClick={onClear} className="p-1.5 hover:bg-[var(--citadel-hover)] rounded-lg opacity-40 hover:opacity-100 transition-all">
            <Trash2 size={12} className="text-red-500" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {actions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 opacity-20 text-[var(--citadel-text)]">
            <Binary size={24} className="mb-2" />
            <span className="text-[8px] font-black uppercase tracking-widest">System Silent</span>
          </div>
        ) : (
          actions.map((action) => (
            <div key={action.id} className="flex items-start gap-3 p-3 bg-[var(--citadel-hover)] rounded-xl border border-[var(--citadel-border)] animate-in fade-in slide-in-from-right-2">
              <div className="mt-1">{getIcon(action.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold opacity-80 capitalize text-[var(--citadel-text)]">{action.type.replace(/_/g, ' ')}</span>
                  <span className="text-[8px] opacity-40 font-mono text-[var(--citadel-subtext)]">{action.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-[10px] opacity-60 font-medium line-clamp-2 text-[var(--citadel-text)]">{action.details}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActionPanel;
