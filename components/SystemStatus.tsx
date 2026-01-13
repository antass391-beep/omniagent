
import React, { useState, useEffect } from 'react';
import { Activity, Shield, Fingerprint, ShieldCheck, Zap, Gauge, Scale, AlertTriangle } from 'lucide-react';

interface SystemStatusProps {
  stabilityOverride?: number;
  entropyLevel?: number; 
  loadOverride?: number; 
}

const SystemStatus: React.FC<SystemStatusProps> = ({ stabilityOverride, entropyLevel = 0.02, loadOverride }) => {
  const [cpu, setCpu] = useState(12);
  const [verityLevel, setVerityLevel] = useState(98.4); 
  const [synthesisRate, setSynthesisRate] = useState(99.98); 
  const [throughput, setThroughput] = useState(78);

  const [syntaxConfidence, setSyntaxConfidence] = useState(99.9);
  const [physicsBalance, setPhysicsBalance] = useState(97.2);
  const [safetyMargin, setSafetyMargin] = useState(1.54);

  useEffect(() => {
    // Throttled updates on mobile to save CPU
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 2000 : 500;

    const interval = setInterval(() => {
      if (loadOverride !== undefined && loadOverride > 0) {
        setCpu(loadOverride);
        setVerityLevel(prev => Math.max(90, prev - (Math.random() * 0.2))); 
        setThroughput(Math.max(40, 100 - loadOverride * 0.5));
        setSyntaxConfidence(prev => Math.min(100, Math.max(98, prev + (Math.random() * 0.4 - 0.2))));
        setPhysicsBalance(prev => Math.min(100, Math.max(95, prev + (Math.random() * 1.2 - 0.6))));
        setSafetyMargin(prev => Math.min(3.0, Math.max(1.2, prev + (Math.random() * 0.1 - 0.05))));
      } else {
        setCpu(prev => Math.min(100, Math.max(5, prev + (Math.random() * 4 - 2))));
        setVerityLevel(prev => Math.min(99.9, Math.max(98, prev + (Math.random() * 0.05)))); 
        setThroughput(prev => Math.min(100, Math.max(70, prev + (Math.random() * 0.8 - 0.3))));
        setSyntaxConfidence(prev => Math.min(99.9, Math.max(99.5, prev + (Math.random() * 0.02 - 0.01))));
        setPhysicsBalance(prev => Math.min(99.5, Math.max(97, prev + (Math.random() * 0.1 - 0.05))));
      }
      setSynthesisRate(prev => Math.min(100, Math.max(99.9, prev + (Math.random() * 0.005 - 0.002))));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [loadOverride]);

  const VerityGauge = ({ value, label, icon: Icon, color, unit = '%' }: { value: number | string, label: string, icon: any, color: string, unit?: string }) => (
    <div className="flex flex-col gap-1.5 flex-1 p-2 md:p-3 bg-[var(--citadel-hover)] border border-[var(--citadel-border)] rounded-2xl transition-all">
      <div className="flex items-center gap-1.5 opacity-40">
        <Icon size={10} className={color} />
        <span className="text-[7px] font-black uppercase tracking-widest text-[var(--citadel-subtext)]">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] md:text-xs font-mono font-black text-[var(--citadel-text)]">{typeof value === 'number' ? value.toFixed(typeof value === 'number' && value < 10 ? 2 : 1) : value}</span>
        <span className={`text-[8px] font-bold ${color} opacity-70 uppercase`}>{unit}</span>
      </div>
    </div>
  );

  const Bar = ({ pct, color, label, subValue, icon: Icon }: { pct: number, color: string, label: string, subValue?: string, icon?: any }) => (
    <div className="group relative">
      <div className="flex justify-between text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-2 px-1 opacity-50 text-[var(--citadel-subtext)]">
        <span className="group-hover:opacity-100 transition-opacity flex items-center gap-2">
           {Icon && <Icon size={8} />} {label}
        </span>
        <span className="font-mono text-[var(--citadel-text)]">{subValue || `${pct.toFixed(1)}%`}</span>
      </div>
      <div className="h-1.5 w-full bg-[var(--citadel-inner-bg)] rounded-full overflow-hidden border border-[var(--citadel-border)] p-[0.5px]">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-in-out rounded-full relative`} 
          style={{ width: `${pct}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 flex flex-col gap-4 md:gap-7 mt-4 group transition-all duration-1000">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-2 opacity-50 text-[var(--citadel-subtext)]">
          <Activity size={14} className={`text-blue-500 ${loadOverride ? 'animate-spin' : 'animate-pulse'}`} /> Core Status
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <VerityGauge value={syntaxConfidence} label="Syntactic" icon={Zap} color="text-blue-500" />
          <VerityGauge value={physicsBalance} label="Physics" icon={Scale} color="text-emerald-500" />
          <VerityGauge value={safetyMargin} label="Safety" icon={AlertTriangle} color="text-amber-500" unit="x" />
        </div>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <Bar pct={verityLevel} color="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" label="Verity" icon={Shield} />
        <Bar pct={cpu} color={loadOverride ? "bg-red-500/80" : "bg-indigo-500/60"} label="Logic Load" />
      </div>

      <div className="hidden md:flex bg-blue-500/[0.02] border border-[var(--citadel-border)] rounded-2xl p-4 flex-col gap-2 shadow-inner">
        <div className="flex items-center justify-between opacity-40">
          <span className="text-[9px] font-black uppercase tracking-widest text-[var(--citadel-subtext)]">Anchor</span>
          <Fingerprint size={10} className="text-[var(--citadel-subtext)]" />
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-4 w-full bg-blue-500/20 border border-[var(--citadel-border)] rounded-[2px] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
