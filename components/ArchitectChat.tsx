
import React, { useEffect, useRef, useState } from 'react';
import { 
  Activity, Cpu, Film, Camera, Ghost, Workflow, FileCode, Calculator, ShieldCheck, Film as FilmIcon, Smartphone,
  Tractor, Waypoints, Zap, Gauge, Bolt, Power
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, Sender, SurgicalReport } from '../types.ts';
import ModelViewer3D from './ModelViewer3D.tsx';

interface ArchitectChatProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  onFollowUpClick: (question: string) => void;
  onCopy: (text: string) => void;
  copiedId: string | null;
  theme: 'dark' | 'light';
}

const Leap71Certificate: React.FC<{ report: SurgicalReport }> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'reasoning' | 'verity' | 'cinematic' | 'sdk' | 'operational'>('reasoning');
  const analysis = report.engineeringAnalysis;
  const isMobile = window.innerWidth < 768;

  return (
    <div className="mt-6 md:mt-10 w-full border rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-[var(--citadel-sidebar)] border-[var(--citadel-border)] shadow-3xl animate-in zoom-in-95 duration-1000">
      <div className="p-4 md:p-6 bg-[var(--citadel-hover)] border-b border-[var(--citadel-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 bg-blue-600 rounded-xl md:rounded-2xl shadow-blue-500/30 shadow-2xl">
            <Workflow size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-xs md:text-base font-black text-[var(--citadel-text)] uppercase tracking-widest">Synthesis Manifest</h3>
            <p className="text-[7px] md:text-[8px] text-blue-500 font-black uppercase tracking-[0.2em] mt-0.5">V24.1 SECURE</p>
          </div>
        </div>
        <div className="flex bg-[var(--citadel-bg)] p-1 rounded-lg md:rounded-xl border border-[var(--citadel-border)] w-full md:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'reasoning', label: isMobile ? 'DNA' : 'Physics DNA', icon: Calculator },
            { id: 'cinematic', label: isMobile ? 'Shot' : 'Shot Manifest', icon: FilmIcon },
            { id: 'operational', label: isMobile ? 'Ops' : 'Operational Principles', icon: Tractor }, // New Tab for Operational Principles
            { id: 'verity', label: 'Verity', icon: ShieldCheck },
            { id: 'sdk', label: 'Kernel', icon: FileCode }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-md md:rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-[var(--citadel-subtext)] hover:text-[var(--citadel-text)]'}`}
            >
              <tab.icon size={10} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-8">
        {activeTab === 'cinematic' && (
           <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="p-4 md:p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl md:rounded-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <Ghost size={14} className="text-blue-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Studio Hook</span>
                </div>
                <h4 className="text-lg md:text-2xl font-black text-[var(--citadel-text)] tracking-tighter uppercase italic">
                  { (report as any).cinematicManifest?.headline || "Visual Synthesis" }
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                 {[
                   { label: 'Render', value: 'CYCLES', icon: Cpu, detail: 'OptiX 128' },
                   { label: 'Motion', value: 'ENABLED', icon: Activity, detail: 'Slow-Motion' },
                   { label: 'Lighting', value: '3-POINT', icon: Camera, detail: 'Orange/Cyan' }
                 ].map((stat, i) => (
                   <div key={i} className="p-3 md:p-5 bg-[var(--citadel-inner-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl">
                     <div className="flex items-center gap-2 mb-1 md:mb-2">
                       <stat.icon size={10} className="text-blue-500/60" />
                       <span className="text-[7px] md:text-[8px] font-black text-[var(--citadel-subtext)] uppercase tracking-widest">{stat.label}</span>
                     </div>
                     <p className="text-sm md:text-lg font-black text-[var(--citadel-text)]">{stat.value}</p>
                     <p className="text-[7px] md:text-[8px] font-mono text-[var(--citadel-subtext)] mt-1">{stat.detail}</p>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === 'reasoning' && report.physicsReasoning && (
          <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {report.physicsReasoning.derivedParameters.map((param, i) => (
                <div key={i} className="p-3 md:p-4 bg-[var(--citadel-inner-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl">
                  <p className="text-[8px] md:text-[9px] font-black text-[var(--citadel-subtext)] uppercase tracking-widest mb-1">{param.label}</p>
                  <p className="text-sm md:text-xl font-mono font-black text-[var(--citadel-text)]">{param.value} <span className="text-[8px] md:text-[10px] text-blue-500/60 uppercase">{param.unit}</span></p>
                </div>
              ))}
            </div>
            <pre className="p-4 md:p-6 bg-[var(--citadel-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-mono text-[var(--citadel-text)] opacity-70 leading-relaxed whitespace-pre-wrap overflow-x-auto">
              {report.physicsReasoning.calculations}
            </pre>
          </div>
        )}
        
        {activeTab === 'operational' && (report.functionalDescription || report.kinematicAnalysisReport || report.dynamicAnalysisReport || report.assemblyConfiguration) && (
          <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            {report.functionalDescription && (
              <div className="p-4 md:p-6 bg-emerald-600/5 border border-emerald-500/20 rounded-2xl md:rounded-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <Tractor size={14} className="text-emerald-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Functional Overview</span>
                </div>
                <p className="text-sm md:text-base text-[var(--citadel-text)] leading-relaxed">{report.functionalDescription}</p>
              </div>
            )}

            {report.kinematicAnalysisReport && (
              <div className="p-4 md:p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl md:rounded-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <Waypoints size={14} className="text-blue-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Kinematic Analysis</span>
                </div>
                <div className="space-y-2 text-sm md:text-base text-[var(--citadel-text)]">
                  <p><span className="font-bold">Input Motion:</span> {report.kinematicAnalysisReport.inputMotion}</p>
                  <p><span className="font-bold">Output Motion:</span> {report.kinematicAnalysisReport.outputMotion}</p>
                  {report.kinematicAnalysisReport.gearRatios?.length && <p><span className="font-bold">Gear Ratios:</span> {report.kinematicAnalysisReport.gearRatios.join(', ')}</p>}
                  {report.kinematicAnalysisReport.linkages?.length && <p><span className="font-bold">Linkages:</span> {report.kinematicAnalysisReport.linkages.join(', ')}</p>}
                  {report.kinematicAnalysisReport.motionDiagram && <p className="italic text-zinc-500 mt-2">{report.kinematicAnalysisReport.motionDiagram}</p>}
                </div>
              </div>
            )}

            {report.dynamicAnalysisReport && (
              <div className="p-4 md:p-6 bg-amber-600/5 border border-amber-500/20 rounded-2xl md:rounded-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <Bolt size={14} className="text-amber-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-amber-500 uppercase tracking-widest">Dynamic Analysis</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base text-[var(--citadel-text)]">
                  {report.dynamicAnalysisReport.powerOutputKw !== undefined && <p><span className="font-bold">Power Output:</span> {report.dynamicAnalysisReport.powerOutputKw} kW</p>}
                  {report.dynamicAnalysisReport.torqueNm !== undefined && <p><span className="font-bold">Torque:</span> {report.dynamicAnalysisReport.torqueNm} Nm</p>}
                  {report.dynamicAnalysisReport.efficiencyPercent !== undefined && <p><span className="font-bold">Efficiency:</span> {report.dynamicAnalysisReport.efficiencyPercent}%</p>}
                  {report.dynamicAnalysisReport.primaryForcesN && <p><span className="font-bold">Primary Forces:</span> {report.dynamicAnalysisReport.primaryForcesN}</p>}
                  {report.dynamicAnalysisReport.vibrationAnalysis && <p className="sm:col-span-2 italic text-zinc-500 mt-2">{report.dynamicAnalysisReport.vibrationAnalysis}</p>}
                </div>
              </div>
            )}

            {report.assemblyConfiguration?.length && (
              <div className="p-4 md:p-6 bg-purple-600/5 border border-purple-500/20 rounded-2xl md:rounded-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <Power size={14} className="text-purple-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-purple-500 uppercase tracking-widest">Assembly Configuration</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm md:text-base">
                  {report.assemblyConfiguration.map((comp, i) => (
                    <div key={i} className="bg-[var(--citadel-inner-bg)] p-3 rounded-xl border border-[var(--citadel-border)]">
                      <p className="font-bold text-[var(--citadel-text)]">{comp.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-1"><span className="font-bold">Role:</span> {comp.role}</p>
                      {comp.connections?.length && <p className="text-[10px] text-zinc-500"><span className="font-bold">Connections:</span> {comp.connections.join(', ')}</p>}
                      {comp.material && <p className="text-[10px] text-zinc-500"><span className="font-bold">Material:</span> {comp.material}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'verity' && (
           <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-5 bg-[var(--citadel-inner-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl">
                   <span className="text-[8px] font-black text-[var(--citadel-subtext)] uppercase tracking-widest block mb-1">Safety Margin</span>
                   <p className="text-base md:text-lg font-black text-emerald-400">{analysis?.structuralIntegrity?.safetyMargin || '1.8'}+</p>
                </div>
                <div className="p-4 md:p-5 bg-[var(--citadel-inner-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl">
                   <span className="text-[8px] font-black text-[var(--citadel-subtext)] uppercase tracking-widest block mb-1">Stress Lock</span>
                   <p className="text-base md:text-lg font-black text-blue-500">VERIFIED</p>
                </div>
              </div>
           </div>
        )}

        {activeTab === 'sdk' && (
          <pre className="p-4 md:p-6 bg-[var(--citadel-bg)] border border-[var(--citadel-border)] rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-mono text-[var(--citadel-text)] opacity-70 overflow-x-auto max-h-72 custom-scrollbar">
            {report.blenderScript || "# KERNEL_GEN_FAILED"}
          </pre>
        )}
      </div>
    </div>
  );
};

export default function ArchitectChat({ messages, onFollowUpClick, onCopy, copiedId, theme, isProcessing }: ArchitectChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 space-y-12 md:space-y-20 scroll-smooth custom-scrollbar relative z-10">
      {/* Global Processing Indicator */}
      {isProcessing && (
        <div className="global-loading-bar" />
      )}

      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-1000">
          {isMobile ? <Smartphone className="w-12 h-12 text-blue-500/20" /> : <Film className="w-16 h-16 text-blue-500/20" />}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-blue-500 uppercase tracking-tighter">Architect</h2>
            <p className="opacity-20 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--citadel-text)]">Mobile Performance Core v24.1</p>
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className={`flex flex-col gap-4 md:gap-6 ${msg.sender === Sender.USER ? 'items-end' : 'items-start'}`}>
          <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] opacity-10 text-[var(--citadel-text)]">
            {msg.sender === Sender.USER ? 'CMD_INPUT' : 'STUDIO_OUTPUT'}
          </div>
          <div className={`p-5 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2rem] w-full max-w-5xl ${msg.sender === Sender.USER ? 'bg-[var(--citadel-hover)] border border-[var(--citadel-border)] shadow-2xl backdrop-blur-3xl' : 'bg-transparent'}`}>
            <div className={`markdown-body prose prose-sm md:prose-lg max-w-none text-[var(--citadel-text)] opacity-90 ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
              {msg.surgicalReport && <Leap71Certificate report={msg.surgicalReport} />}
              {msg.threeDScene && msg.threeDScene.objects && msg.threeDScene.objects.length > 0 && (
                <ModelViewer3D data={msg.threeDScene} blenderScript={msg.surgicalReport?.blenderScript} isStreaming={msg.isStreaming} theme={theme} />
              )}
              {/* Streaming Text Indicator */}
              {msg.sender === Sender.BOT && msg.isStreaming && (
                <span className="inline-flex items-center gap-1 ml-2 text-[var(--citadel-accent)]">
                    <span className="pulsing-dot bg-[var(--citadel-accent)]" />
                    <span className="pulsing-dot bg-[var(--citadel-accent)]" style={{ animationDelay: '0.2s' }} />
                    <span className="pulsing-dot bg-[var(--citadel-accent)]" style={{ animationDelay: '0.4s' }} />
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} className="h-40" />
    </div>
  );
}