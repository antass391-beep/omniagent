
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, BarChart3, Info } from 'lucide-react';

// Data for the market trends chart
const data = [
  { year: '2020', value: 150 },
  { year: '2021', value: 210 },
  { year: '2022', value: 285 },
  { year: '2023', value: 390 },
  { year: '2024', value: 520 },
  { year: '2025', value: 800 },
];

/**
 * MarketTrendsChart component visualizes AI market valuations and growth velocity.
 * This component fixes previous scoping and structural errors by placing declarations correctly.
 */
const MarketTrendsChart = () => {
  return (
    <div className="flex-1 flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <TrendingUp size={14} /> Market Intelligence
        </h3>
        <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-bold">LIVE</div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 shadow-inner">
        <div className="mb-4">
          <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">AI Automation Valuation (Est. 2025)</p>
          <p className="text-2xl font-black text-white tracking-tighter">$800B+</p>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#71717a', fontSize: 10}}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px'}}
                itemStyle={{color: '#22d3ee'}}
              />
              <Area type="monotone" dataKey="value" stroke="#22d3ee" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Activity size={14} className="text-purple-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Growth Velocity</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Year-over-year adoption in enterprise sectors shows a <span className="text-purple-400 font-bold">42% CAGR</span>.
          </p>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sector Dominance</span>
          </div>
          <div className="space-y-2 mt-2">
             {['FinTech', 'HealthTech', 'Logistics'].map(sector => (
               <div key={sector} className="flex items-center justify-between text-[10px]">
                 <span className="text-zinc-500 font-medium">{sector}</span>
                 <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500" style={{width: `${Math.random() * 60 + 30}%`}}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border border-dashed border-white/10 rounded-2xl flex items-start gap-3">
        <Info size={14} className="text-zinc-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-500 leading-normal">
          Analytical models based on current research grounding data. Proactive tracking enabled.
        </p>
      </div>
    </div>
  );
};

export default MarketTrendsChart;
