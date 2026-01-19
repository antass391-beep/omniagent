
import React from 'react';
import { Sliders, Activity, Zap, TrendingUp, BrainCircuit, X, Save, RotateCcw, Cpu } from 'lucide-react';
import { RLParams } from '../types.ts';

interface RLConfigPanelProps {
  config: RLParams;
  onChange: (newConfig: RLParams) => void;
  onClose: () => void;
}

const RLConfigPanel: React.FC<RLConfigPanelProps> = ({ config, onChange, onClose }) => {
  const handleChange = (key: keyof RLParams, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="absolute top-20 right-4 md:right-8 w-[350px] bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300 z-40">
      
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-900/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Sliders size={16} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Hyperparameters</h3>
            <p className="text-[9px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Stable Baselines 3 Config</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-zinc-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        
        {/* Algorithm Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={12} /> Algorithm (Policy)
            </label>
            <span className="text-[10px] font-mono text-cyan-400">{config.algorithm || 'PPO'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['PPO', 'SAC', 'TD3'].map((algo) => (
              <button
                key={algo}
                onClick={() => handleChange('algorithm', algo)}
                className={`py-2 rounded-lg text-[9px] font-bold border transition-all ${config.algorithm === algo ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
              >
                {algo}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-zinc-600 leading-tight">
            {config.algorithm === 'PPO' && "Proximal Policy Optimization: Good for general purpose discrete/continuous control."}
            {config.algorithm === 'SAC' && "Soft Actor-Critic: Off-policy, sample efficient, max entropy. Great for robotics."}
            {config.algorithm === 'TD3' && "Twin Delayed DDPG: Ideal for continuous action spaces and reducing overestimation bias."}
          </p>
        </div>

        {/* Learning Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Zap size={12} /> Learning Rate (α)
            </label>
            <span className="text-[10px] font-mono text-cyan-400">{config.learningRate.toFixed(4)}</span>
          </div>
          <input 
            type="range" 
            min="0.0001" 
            max="0.01" 
            step="0.0001" 
            value={config.learningRate} 
            onChange={(e) => handleChange('learningRate', parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-125"
          />
        </div>

        {/* Discount Factor */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={12} /> Discount Factor (γ)
            </label>
            <span className="text-[10px] font-mono text-cyan-400">{config.discountFactor.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.8" 
            max="0.99" 
            step="0.01" 
            value={config.discountFactor} 
            onChange={(e) => handleChange('discountFactor', parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125"
          />
        </div>

        {/* Batch Size */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Activity size={12} /> Batch Size
            </label>
            <span className="text-[10px] font-mono text-cyan-400">{config.batchSize}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[32, 64, 128, 256].map(size => (
              <button
                key={size}
                onClick={() => handleChange('batchSize', size)}
                className={`py-2 rounded-lg text-[9px] font-bold border transition-all ${config.batchSize === size ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Entropy Coeff */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={12} /> Entropy Coeff
            </label>
            <span className="text-[10px] font-mono text-cyan-400">{config.entropyCoefficient.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.0" 
            max="0.5" 
            step="0.01" 
            value={config.entropyCoefficient} 
            onChange={(e) => handleChange('entropyCoefficient', parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125"
          />
        </div>

        {/* Reward Function Editor */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              Reward Function (Python)
           </label>
           <textarea 
             value={config.rewardFunction}
             onChange={(e) => handleChange('rewardFunction', e.target.value)}
             className="w-full h-32 bg-black border border-white/10 rounded-xl p-3 text-[10px] font-mono text-emerald-400/80 focus:border-emerald-500/50 outline-none resize-none placeholder-zinc-700"
             placeholder="def calculate_reward(state, action): ..."
           />
        </div>

      </div>

      <div className="p-4 bg-[#08080a] border-t border-white/5 flex gap-3">
         <button 
           onClick={() => onChange({
             algorithm: 'PPO',
             learningRate: 0.001,
             discountFactor: 0.95,
             batchSize: 64,
             entropyCoefficient: 0.01,
             rewardFunction: ''
           })}
           className="p-3 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-500 transition-all"
           title="Reset to Defaults"
         >
           <RotateCcw size={14} />
         </button>
         <button 
           onClick={onClose} 
           className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
         >
           <Save size={14} /> Apply Config
         </button>
      </div>
    </div>
  );
};

export default RLConfigPanel;
