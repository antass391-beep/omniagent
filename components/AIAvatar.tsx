
import React, { useEffect, useState, useMemo } from 'react';

export type AvatarState = 'idle' | 'listening' | 'processing' | 'speaking' | 'thinking' | 'searching' | 'success' | 'error';

interface AIAvatarProps {
  state: AvatarState;
  size?: 'sm' | 'md' | 'lg';
  stability?: number;
  theme?: 'dark' | 'light';
}

const AIAvatar: React.FC<AIAvatarProps> = ({ state, size = 'md', stability = 100, theme = 'dark' }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const avatarTheme = useMemo(() => {
    switch (state) {
      case 'error': return { color: '#ef4444', core: '#991b1b', effect: 'shadow-red-500/20' };
      case 'processing': return { color: '#10b981', core: '#064e3b', effect: 'shadow-emerald-500/30' };
      case 'thinking': return { color: '#fbbf24', core: '#78350f', effect: 'shadow-amber-500/20' };
      case 'speaking': return { color: theme === 'dark' ? '#ffffff' : '#0f172a', core: '#3b82f6', effect: 'shadow-blue-500/40' };
      default: return { color: '#3b82f6', core: '#1e3a8a', effect: 'shadow-blue-500/20' };
    }
  }, [state, theme]);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
  }[size];

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} transition-all duration-700`}>
      {/* Outer Floating Halo */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000 opacity-20"
        style={{ 
          backgroundColor: avatarTheme.color,
          transform: `scale(${1 + Math.sin(pulse / 15) * 0.2})`
        }} 
      />

      {/* Scientific Scan Ring */}
      {state === 'processing' && (
        <div className="absolute inset-[-15px] border-[0.5px] border-emerald-500/30 rounded-full animate-[ping_3s_infinite]" />
      )}

      {/* Core Frame */}
      <div className="absolute inset-0 rounded-full border-[0.5px] border-[var(--citadel-border-bright)] animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border-[0.5px] border-dashed border-[var(--citadel-border)] animate-[spin_20s_linear_infinite_reverse]" />

      {/* SVG Singularity */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <filter id="noyron-glow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Noyron Shell */}
          <path 
            d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z" 
            fill="none" 
            stroke={avatarTheme.color} 
            strokeWidth="1.5"
            className="transition-all duration-700"
            style={{ 
              strokeDasharray: '250',
              strokeDashoffset: state === 'processing' ? (pulse * 3) : '0',
              opacity: state === 'idle' ? 0.3 : 0.9,
              filter: 'url(#noyron-glow)'
            }}
          />

          {/* Internal Geometric Matrix */}
          <g style={{ opacity: state === 'idle' ? 0.1 : 0.4 }}>
             <line x1="20" y1="32.5" x2="80" y2="67.5" stroke={avatarTheme.color} strokeWidth="0.5" />
             <line x1="80" y1="32.5" x2="20" y2="67.5" stroke={avatarTheme.color} strokeWidth="0.5" />
             <line x1="50" y1="15" x2="50" y2="85" stroke={avatarTheme.color} strokeWidth="0.5" />
          </g>

          {/* Central Data Singularity */}
          <circle 
            cx="50" cy="50" 
            r={state === 'speaking' ? (12 + Math.sin(pulse / 5) * 6) : 9} 
            fill={avatarTheme.color} 
            className="transition-all duration-300"
            style={{ 
              opacity: state === 'idle' ? 0.4 : 1,
              filter: `blur(${state === 'speaking' ? '3px' : '0px'})`
            }}
          />
        </svg>
      </div>

      {/* Protocol Badge */}
      <div className="absolute -bottom-2 px-3 py-0.5 bg-[var(--citadel-sidebar)] border border-[var(--citadel-border)] rounded-full shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <div className={`w-1 h-1 rounded-full ${state === 'idle' ? 'bg-zinc-700' : (state === 'processing' ? 'bg-emerald-500 animate-ping' : 'bg-blue-500 animate-pulse')}`} />
          <span className="text-[6px] font-black uppercase tracking-[0.3em] text-[var(--citadel-subtext)]">OmniNoyron_v23</span>
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;
