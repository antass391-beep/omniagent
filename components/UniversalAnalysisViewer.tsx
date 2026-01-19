
import React from 'react';
import { UniversalAnalysisReport } from '../types.ts';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area
} from 'recharts';
import { Globe, Lightbulb, PieChart, TrendingUp, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface UniversalAnalysisViewerProps {
  report: UniversalAnalysisReport;
}

const UniversalAnalysisViewer: React.FC<UniversalAnalysisViewerProps> = ({ report }) => {
  return (
    <div className="mt-8 w-full border border-white/10 rounded-[2rem] overflow-hidden bg-[#0c0c0e] shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Globe size={20} className="text-white" />
          </div>
          <div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest">{report.topic}</h3>
             <div className="flex items-center gap-2 mt-1">
               <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-[0.2em]">{report.domain} Analysis</span>
               <div className="w-1 h-1 bg-zinc-600 rounded-full" />
               <span className="text-[9px] text-zinc-500 font-mono">Conf: {(report.confidenceScore * 100).toFixed(0)}%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-px bg-white/5">
        
        {/* Left Column: Summary & Insights */}
        <div className="bg-[#0c0c0e] p-6 lg:p-8 flex flex-col gap-8">
           <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <BookOpen size={12} /> Executive Summary
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                {report.summary}
              </p>
           </div>

           <div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lightbulb size={12} className="text-yellow-500" /> Key Insights
              </h4>
              <div className="space-y-3">
                 {report.keyInsights.map((insight, i) => (
                   <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <p className="text-xs text-indigo-100/80 leading-snug">{insight}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Sources */}
           <div className="mt-auto">
             <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Verified Sources</h4>
             <div className="flex flex-wrap gap-2">
               {report.sources.map((source, i) => (
                 <div key={i} className="px-3 py-1 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                   <span className="text-[9px] text-zinc-400 font-bold">{source.title}</span>
                   <div className={`w-1.5 h-1.5 rounded-full ${source.credibility > 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="bg-[#0c0c0e] p-6 lg:p-8 flex flex-col gap-6">
           
           {/* Chart 1: Quantitative Data */}
           {report.dataPoints && report.dataPoints.length > 0 && (
             <div className="flex-1 min-h-[250px] bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                <h4 className="absolute top-4 left-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest z-10">
                   {report.domain === 'finance' ? 'Market Trend' : 'Data Visualization'}
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={report.dataPoints}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '10px'}}
                        itemStyle={{color: '#818cf8'}}
                      />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
                      <XAxis dataKey="label" hide />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
           )}

           {/* Chart 2: Radar / Qualitative */}
           {report.radarMetrics && report.radarMetrics.length > 0 && (
             <div className="h-[250px] bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                <h4 className="absolute top-4 left-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest z-10">
                   Multi-Axis Evaluation
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={report.radarMetrics}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="label" tick={{ fill: '#71717a', fontSize: 10 }} />
                      <Radar name="Metrics" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '10px'}}
                        itemStyle={{color: '#34d399'}}
                      />
                   </RadarChart>
                </ResponsiveContainer>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default UniversalAnalysisViewer;
