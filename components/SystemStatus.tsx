
import React, { useState, useEffect } from 'react';
import { Activity, Shield, Fingerprint, Zap, Gauge, Scale, RefreshCw, BrainCircuit, Dna, Box } from 'lucide-react';

interface SystemStatusProps {
  stabilityOverride?: number;
  entropyLevel?: number; 
  loadOverride?: number;
  agentVersion?: string; 
}

const SystemStatus: React.FC<SystemStatusProps> = ({ stabilityOverride, entropyLevel = 0.02, loadOverride, agentVersion = "v11.2.0" }) => {
  const [cpu, setCpu] = useState(12);
  const [physicsLoad, setPhysicsLoad] = useState(0.8);
  const [verityLevel, setVerityLevel] = useState(99.1); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(100, Math.max(5, prev + (Math.random() * 4 - 2))));
      setPhysicsLoad(prev => Math.min(5.0, Math.max(0.1, prev + (Math.random() * 0.2 - 0.1))));
      setVerityLevel(prev => Math.min(99.9, Math.max(98.5, prev + (Math.random() * 0.05))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const VerityGauge = ({ value, label, icon: Icon, color, unit = '%' }: { value: number | string, label: string, icon: any, color: string, unit?: string }) => (
    <div className="flex flex-col gap-1.5 flex-1 p-3 bg-[var(--citadel-hover)] border border-[var(--citadel-border)] rounded-2xl transition-all">
      <div className="flex items-center gap-1.5 opacity-40">
        <Icon size={10} className={color} />
        <span className="text-[7px] font-black uppercase tracking-widest text-[var(--citadel-subtext)]">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-mono font-black text-[var(--citadel-text)]">{typeof value === 'number' ? value.toFixed(1) : value}</span>
        <span className={`text-[8px] font-bold ${color} opacity-70 uppercase`}>{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-[2.5rem] p-6 flex flex-col gap-6 mt-4 group">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-2 opacity-50 text-[var(--citadel-subtext)]">
          <Activity size={14} className="text-blue-500" /> Core Telemetry
        </h3>
        <span className="text-[8px] font-bold text-purple-400 font-mono px-2 py-0.5 bg-purple-500/10 rounded-full border border-purple-500/20">{agentVersion}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <VerityGauge value={verityLevel} label="Coherence" icon={Shield} color="text-blue-500" />
        <VerityGauge value={physicsLoad} label="Solver" icon={Box} color="text-emerald-500" unit="ms" />
      </div>
      
      <div className="space-y-4">
        <div className="group relative">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] mb-2 px-1 opacity-50 text-[var(--citadel-subtext)]">
            <span className="flex items-center gap-2"><Zap size={8} /> Neural Load</span>
            <span className="font-mono text-[var(--citadel-text)]">{cpu.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--citadel-inner-bg)] rounded-full overflow-hidden border border-[var(--citadel-border)] p-[0.5px]">
            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${cpu}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-blue-500/[0.02] border border-[var(--citadel-border)] rounded-2xl p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between opacity-40">
          <span className="text-[9px] font-black uppercase tracking-widest text-[var(--citadel-subtext)]">Physics Buffer</span>
          <Box size={10} className="text-[var(--citadel-subtext)]" />
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-3 w-full bg-emerald-500/20 border border-[var(--citadel-border)] rounded-[2px] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
