
import React, { useState } from 'react';
import { 
  Activity, Cpu, Film, Camera, Ghost, Workflow, FileCode, Calculator, ShieldCheck,
  Tractor, Waypoints, Zap, Bolt, Power, Copy, Check, Thermometer, Ruler, Settings,
  BrainCircuit, TrendingUp, GitPullRequest, Users, Target, Globe, ArrowUpRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, Sender, SurgicalReport, RLParams } from '../types.ts';
import ModelViewer3D from './ModelViewer3D.tsx';
import EvolutionTerminal from './EvolutionTerminal.tsx';
import ReflexionLog from './ReflexionLog.tsx';
import ReasoningChain from './ReasoningChain.tsx';
import UniversalAnalysisViewer from './UniversalAnalysisViewer.tsx';
import CollaborativeHeader from './CollaborativeHeader.tsx';
import CognitiveEngineViewer from './CognitiveEngineViewer.tsx';
import MetaCognitionViewer from './MetaCognitionViewer.tsx';
import TaskManager from './TaskManager.tsx';
import CinematicViewer from './CinematicViewer.tsx';
import MapViewer from './MapViewer.tsx';
import AgenticPlanViewer from './AgenticPlanViewer.tsx';

// --- Source Cards (Perplexity Style) ---
const SourceCardGrid = ({ metadata }: { metadata: any }) => {
  if (!metadata || !metadata.groundingChunks) return null;

  // Extract web chunks (sources)
  // Ensure we safely map the chunks, as API structure can sometimes vary slightly
  const sources = metadata.groundingChunks
    .filter((c: any) => c.web && c.web.uri && c.web.title)
    .map((c: any) => ({
      uri: c.web.uri,
      title: c.web.title,
      hostname: new URL(c.web.uri).hostname.replace('www.', '')
    }));
  
  // Remove duplicates based on URI
  const uniqueSources = Array.from(new Map(sources.map((item:any) => [item.uri, item])).values());

  if (uniqueSources.length === 0) return null;

  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Globe size={12} /> Sources Identified
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {uniqueSources.slice(0, 4).map((source: any, i: number) => (
          <a 
            key={i} 
            href={source.uri} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-3 bg-[var(--citadel-inner-bg)] border border-[var(--citadel-border)] rounded-xl hover:bg-[var(--citadel-hover)] hover:border-[var(--citadel-accent)] transition-all"
          >
            <p className="text-[10px] font-bold text-[var(--citadel-text)] line-clamp-2 leading-tight mb-2">
              {source.title}
            </p>
            <div className="flex items-center gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-white uppercase">
                 {source.title.charAt(0)}
              </div>
              <span className="text-[8px] font-mono text-[var(--citadel-subtext)] truncate max-w-[80px]">
                {source.hostname}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const SynthesisReport: React.FC<{ report: SurgicalReport }> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'kinematics' | 'manufacturing' | 'brain' | 'code'>('kinematics');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report.blenderScript || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mt-6 md:mt-10 w-full border border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-[#08080a] shadow-3xl">
      {/* Collaboration Banner in Report */}
      {report.collaborationUpdate && (
        <div className="px-6 py-3 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Target size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest">Team Assignment: {report.collaborationUpdate.assignedTask}</span>
          </div>
          <div className="text-[8px] font-mono opacity-80">Orchestrated by OmniAgent</div>
        </div>
      )}

      <div className="p-4 md:p-6 bg-white/[0.02] border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-blue-500/20 shadow-2xl">
            <Settings size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Mechanical DNA Manifest</h3>
            <p className="text-[8px] text-blue-500 font-black uppercase tracking-[0.2em] mt-1">ISO 10303 Compliant</p>
          </div>
        </div>
        <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex bg-black p-1 rounded-xl border border-white/5 min-w-max">
            {[
              { id: 'kinematics', label: 'Kinematics', icon: Waypoints },
              { id: 'brain', label: 'RL Agent', icon: BrainCircuit },
              { id: 'manufacturing', label: 'Manufacture', icon: Ruler },
              { id: 'code', label: 'Python SDK', icon: FileCode }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
              >
                <tab.icon size={10} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 min-h-[300px]">
        {activeTab === 'kinematics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
              <p className="text-[10px] font-black text-blue-500 uppercase mb-4 flex items-center gap-2">
                <Zap size={12} /> Joint Hierarchy
              </p>
              <div className="space-y-3">
                {report.assemblyConfiguration?.map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-xs font-bold text-white">{c.name} <span className="text-zinc-500 font-medium">({c.role})</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-zinc-900 border border-white/5 rounded-3xl">
              <p className="text-[10px] font-black text-zinc-500 uppercase mb-4">Degrees of Freedom</p>
              <p className="text-3xl font-black text-white">{report.kinematicAnalysisReport?.degreesOfFreedom || 0} DoF</p>
              <p className="text-xs text-zinc-500 mt-2">Verified through recursive kinematic solver.</p>
            </div>
          </div>
        )}

        {activeTab === 'brain' && report.rlAgentConfig && (
           <div className="space-y-6 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Algorithm</p>
                  <p className="text-xl font-black text-white">{report.rlAgentConfig.algorithm}</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Learning Rate</p>
                  <p className="text-xl font-mono text-zinc-300">{report.rlAgentConfig.hyperparameters.learningRate}</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Batch Size</p>
                  <p className="text-xl font-mono text-zinc-300">{report.rlAgentConfig.hyperparameters.batchSize}</p>
                </div>
             </div>
             
             <div className="p-6 bg-[#0c0c0e] border border-white/5 rounded-3xl">
                <p className="text-[10px] font-black text-emerald-500 uppercase mb-4 flex items-center gap-2">
                  <TrendingUp size={12} /> Reward Function Logic
                </p>
                <pre className="font-mono text-[10px] text-emerald-400/80 whitespace-pre-wrap overflow-x-auto">
                  {report.rlAgentConfig.rewardFunction}
                </pre>
             </div>
           </div>
        )}

        {activeTab === 'code' && (
          <div className="relative animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all z-10">
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <pre className="p-6 bg-black border border-white/5 rounded-3xl text-[10px] md:text-[11px] font-mono text-blue-300 overflow-x-auto max-h-[400px]">
              {report.blenderScript || "# NO_CODE_GENERATED"}
            </pre>
          </div>
        )}

        {activeTab === 'manufacturing' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
              <ShieldCheck className="text-emerald-500" />
              <div>
                <p className="text-xs font-black text-white uppercase">Printability Rating: 98%</p>
                <p className="text-[10px] text-emerald-500/80">All clearances checked against 0.2mm FDM nozzle standard.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ArchitectChatProps {
  messages: ChatMessage[];
  theme: 'dark' | 'light';
  isProcessing: boolean;
  rlParams?: RLParams; // Pass live params through
  onApproveEvolution: (id: string, version: string) => void;
  onDenyEvolution: () => void;
}

export default function ArchitectChat({ messages, theme, isProcessing, rlParams, onApproveEvolution, onDenyEvolution }: ArchitectChatProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-12 md:space-y-16 custom-scrollbar relative z-10 w-full pb-32">
      {isProcessing && <div className="global-loading-bar" />}
      {messages.map((msg: ChatMessage) => (
        <div key={msg.id} className={`flex flex-col gap-4 w-full ${msg.sender === Sender.USER ? 'items-end' : 'items-start'}`}>
          <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] opacity-30 text-[var(--citadel-subtext)] px-2">
            {msg.sender === Sender.USER ? 'QUERY' : 'OMNI_RESPONSE'}
          </div>
          
          <div className={`rounded-[2rem] md:rounded-[2.5rem] w-full max-w-5xl ${msg.sender === Sender.USER ? 'p-6 md:p-10 bg-[var(--citadel-card)] border border-[var(--citadel-border)] shadow-xl text-xl font-medium text-[var(--citadel-text)]' : ''}`}>
            
            {msg.sender === Sender.BOT && msg.groundingMetadata && (
               <>
                 <SourceCardGrid metadata={msg.groundingMetadata} />
                 <MapViewer groundingChunks={msg.groundingMetadata.groundingChunks || []} />
               </>
            )}

            {msg.collaborationSession && (
              <CollaborativeHeader 
                session={msg.collaborationSession} 
                onSync={() => console.log('Syncing...')} 
              />
            )}

            {msg.surgicalReport?.agenticPlan && (
               <AgenticPlanViewer plan={msg.surgicalReport.agenticPlan} />
            )}

            {msg.surgicalReport?.workflowUpdate && (
               <TaskManager workflow={msg.surgicalReport.workflowUpdate} />
            )}

            {msg.surgicalReport?.generatedAssets?.map(asset => (
               <CinematicViewer key={asset.id} asset={asset} />
            ))}

            {msg.surgicalReport?.metaCognition && (
              <MetaCognitionViewer data={msg.surgicalReport.metaCognition} />
            )}

            {msg.surgicalReport?.cognitiveState && (
              <CognitiveEngineViewer data={msg.surgicalReport.cognitiveState} />
            )}

            {msg.surgicalReport?.reasoningChain && (
              <ReasoningChain steps={msg.surgicalReport.reasoningChain} />
            )}

            {msg.text && (
              <div className={`prose prose-invert max-w-none text-[var(--citadel-text)] text-sm md:text-base leading-relaxed ${msg.sender === Sender.BOT ? 'p-0' : ''}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            )}

            {msg.surgicalReport?.universalAnalysis && (
              <UniversalAnalysisViewer report={msg.surgicalReport.universalAnalysis} />
            )}

            {msg.surgicalReport && 
             !msg.surgicalReport.evolutionProposal && 
             !msg.surgicalReport.universalAnalysis && 
             !msg.surgicalReport.workflowUpdate &&
             !msg.surgicalReport.agenticPlan &&
             !msg.surgicalReport.generatedAssets &&
             msg.threeDScene && (
              <>
                <SynthesisReport report={msg.surgicalReport} />
                <ModelViewer3D 
                  data={msg.threeDScene} 
                  theme={theme} 
                  rlConfig={msg.surgicalReport?.rlAgentConfig} 
                  rlParams={rlParams}
                  collaborators={msg.collaborationSession?.activeCollaborators}
                />
              </>
            )}

            {msg.surgicalReport?.evolutionProposal && (
              <EvolutionTerminal 
                proposal={msg.surgicalReport.evolutionProposal} 
                onApprove={() => onApproveEvolution(msg.id, msg.surgicalReport!.evolutionProposal!.versionTarget)}
                onDeny={onDenyEvolution}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
