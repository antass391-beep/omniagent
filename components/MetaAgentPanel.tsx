
import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Zap, Activity, Terminal, X, RefreshCw, Trash2, HardDrive } from 'lucide-react';
import { ChatMessage } from '../types.ts';

interface MetaAgentPanelProps {
  messages: ChatMessage[];
  onClose: () => void;
  onOptimize: () => void;
  onClearErrors: () => void;
}

const MetaAgentPanel: React.FC<MetaAgentPanelProps> = ({ messages, onClose, onOptimize, onClearErrors }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [healthScore, setHealthScore] = useState(100);
  const [isScanning, setIsScanning] = useState(false);

  // Analysis derived from props
  const errorCount = messages.filter(m => m.isError).length;
  const messageCount = messages.length;
  // Calculate abstract "memory pressure" based on message count (assuming ~50 msg capacity)
  const memoryUsage = Math.min(100, Math.floor((messageCount / 50) * 100));

  useEffect(() => {
    const checks = [
      "Verifying Neural Link integrity...",
      "Analyzing context window density...",
      "Checking WebGL renderer status...",
      "Ping heartbeat: 12ms",
      "Validating API credentials...",
      "Garbage collection check...",
      "Syncing causal graph nodes..."
    ];

    const interval = setInterval(() => {
      const randomLog = checks[Math.floor(Math.random() * checks.length)];
      setLogs(prev => [randomLog, ...prev].slice(0, 8));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let score = 100;
    if (errorCount > 0) score -= (errorCount * 10);
    if (memoryUsage > 80) score -= 15;
    if (memoryUsage > 50) score -= 5;
    setHealthScore(Math.max(0, score));
  }, [errorCount, memoryUsage]);

  const handleRunDiagnostics = () => {
    setIsScanning(true);
    setLogs(prev => ["INITIATING DEEP SCAN...", ...prev]);
    setTimeout(() => {
      setIsScanning(false);
      setLogs(prev => ["SCAN COMPLETE. System Nominal.", ...prev]);
    }, 2000);
  };

  return (
    <div className="absolute top-20 left-4 md:left-8 w-[320px] bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-left-10 fade-in duration-300 z-40 font-mono">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-900/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-pulse">
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Omni Watchdog</h3>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em]">System Health Monitor</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-zinc-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Health Score */}
        <div className="flex items-center justify-between">
           <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">System Integrity</span>
              <div className={`text-2xl font-black ${healthScore > 80 ? 'text-emerald-400' : (healthScore > 50 ? 'text-amber-400' : 'text-red-400')}`}>
                 {healthScore}%
              </div>
           </div>
           <div className="h-10 w-24 relative bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
              <Activity className="absolute inset-0 m-auto text-zinc-700" size={32} />
              <div className={`absolute bottom-0 left-0 h-full bg-emerald-500/20 transition-all duration-500`} style={{width: `${healthScore}%`}} />
           </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                 <AlertTriangle size={12} className={errorCount > 0 ? "text-red-400" : "text-zinc-500"} />
                 <span className="text-[9px] font-bold text-zinc-400 uppercase">Errors</span>
              </div>
              <span className={`text-lg font-bold ${errorCount > 0 ? "text-red-400" : "text-white"}`}>{errorCount}</span>
           </div>
           <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                 <HardDrive size={12} className={memoryUsage > 80 ? "text-amber-400" : "text-zinc-500"} />
                 <span className="text-[9px] font-bold text-zinc-400 uppercase">Memory</span>
              </div>
              <span className={`text-lg font-bold ${memoryUsage > 80 ? "text-amber-400" : "text-white"}`}>{memoryUsage}%</span>
           </div>
        </div>

        {/* Console Log */}
        <div className="bg-black/50 rounded-xl border border-white/10 p-3 h-32 overflow-hidden flex flex-col-reverse">
           {logs.map((log, i) => (
             <div key={i} className="text-[9px] text-zinc-500 truncate font-medium">
               <span className="text-zinc-700 mr-2">{new Date().toLocaleTimeString().split(' ')[0]}</span>
               <span className="text-emerald-500/70">{`>>`}</span> {log}
             </div>
           ))}
        </div>

        {/* Actions */}
        <div className="space-y-2">
           <button 
             onClick={handleRunDiagnostics}
             disabled={isScanning}
             className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
           >
             <RefreshCw size={12} className={isScanning ? "animate-spin" : ""} /> Run Diagnostics
           </button>
           
           <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={onOptimize}
                className="py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Zap size={12} /> Optimize
              </button>
              <button 
                onClick={onClearErrors}
                disabled={errorCount === 0}
                className="py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Trash2 size={12} /> Clear Logs
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MetaAgentPanel;
