
import React from 'react';
import { Task, WorkflowState } from '../types.ts';
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar, User, MoreHorizontal, Layers, ArrowRight } from 'lucide-react';

interface TaskManagerProps {
  workflow: WorkflowState;
}

const TaskManager: React.FC<TaskManagerProps> = ({ workflow }) => {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'in_progress': return <Clock size={16} className="text-blue-500 animate-pulse" />;
      case 'review': return <AlertCircle size={16} className="text-purple-500" />;
      default: return <Circle size={16} className="text-zinc-600" />;
    }
  };

  return (
    <div className="w-full mt-6 bg-[#0c0c0e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-emerald-900/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
               <Layers size={18} className="text-emerald-400" />
             </div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest">{workflow.name}</h3>
           </div>
           <p className="text-[10px] text-emerald-500/80 font-mono pl-11">Executive Workflow • {workflow.tasks.length} Items</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Completion</span>
              <span className="text-xl font-black text-white">{(workflow.overallProgress * 100).toFixed(0)}%</span>
           </div>
           <div className="w-16 h-16 relative flex items-center justify-center">
              <svg className="transform -rotate-90 w-full h-full">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (workflow.overallProgress * 175)} className="text-emerald-500 transition-all duration-1000" />
              </svg>
           </div>
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 md:p-6 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
         {workflow.tasks.map((task) => (
           <div key={task.id} className="group p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all flex items-start gap-4">
              <div className="mt-1 shrink-0">
                 {getStatusIcon(task.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                    <h4 className={`text-xs font-bold ${task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-white'}`}>{task.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase w-fit ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                 </div>
                 
                 <div className="flex items-center gap-4 mt-2">
                    {task.assignee && (
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                         <User size={10} />
                         <span>{task.assignee}</span>
                      </div>
                    )}
                    {task.deadline && (
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                         <Calendar size={10} />
                         <span>{task.deadline}</span>
                      </div>
                    )}
                 </div>
              </div>

              <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-600 hover:text-white transition-colors">
                 <MoreHorizontal size={14} />
              </button>
           </div>
         ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
         <span className="text-[9px] font-mono text-zinc-600 uppercase">Synced with Project DB</span>
         <button className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">
            View Gantt Chart <ArrowRight size={10} />
         </button>
      </div>
    </div>
  );
};

export default TaskManager;
