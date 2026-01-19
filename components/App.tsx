
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Paperclip, Sun, Moon, Send, Menu, X, FlaskConical, Loader2, Zap, Search, Brain, Globe, Users, Sliders
} from 'lucide-react';
import { generateAgentResponse } from './services/geminiService.ts';
import { ChatMessage, Sender, AgentAction, ChatSession, SurgicalReport, ThreeDSceneData, KnowledgeNode, CollaborationSession, RLParams } from './types.ts';
import ActionPanel from './components/ActionPanel.tsx';
import AIAvatar from './components/AIAvatar.tsx';
import SystemStatus from './components/SystemStatus.tsx';
import ArchitectChat from './components/ArchitectChat.tsx';
import HistorySidebar from './components/HistorySidebar.tsx';
import NeuralTrainingDeck from './components/NeuralTrainingDeck.tsx';
import RLConfigPanel from './components/RLConfigPanel.tsx';

export default function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'search' | 'action' | 'power'>('power');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avatarState, setAvatarState] = useState('idle');
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // RSI & Training State
  const [agentVersion, setAgentVersion] = useState("v11.0.0-Polymath-Singularity");
  const [isRebooting, setIsRebooting] = useState(false);
  const [showTrainingDeck, setShowTrainingDeck] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeNode[]>([]);
  
  // RL Config State
  const [showRLConfig, setShowRLConfig] = useState(false);
  const [rlParams, setRlParams] = useState<RLParams>({
    algorithm: 'PPO',
    learningRate: 0.001,
    discountFactor: 0.95,
    batchSize: 64,
    entropyCoefficient: 0.01,
    rewardFunction: ''
  });
  
  // Collaboration State
  const [collabSession, setCollabSession] = useState<CollaborationSession | null>(null);
  
  // Mobile State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addAction = useCallback((type: string, details: string) => {
    setActions(prev => [{ id: Date.now().toString(), type, details, status: 'success' as const, timestamp: new Date() }, ...prev].slice(0, 50));
  }, []);

  const handleAddKnowledge = (content: string, category: KnowledgeNode['category'], title: string) => {
    const newNode: KnowledgeNode = {
      id: Date.now().toString(),
      content,
      category,
      title,
      timestamp: new Date(),
      status: 'active',
      embeddingStrength: 1.0
    };
    setKnowledgeBase(prev => [newNode, ...prev]);
    addAction('memory_store', `Ingested: ${title} [${category}]`);
  };

  const handleRemoveKnowledge = (id: string) => {
    setKnowledgeBase(prev => prev.filter(n => n.id !== id));
  };

  const handleApproveEvolution = (id: string, newVersion: string) => {
    setIsRebooting(true);
    setAvatarState('processing');
    addAction('system_update', `Merging evolution patch ${newVersion}`);
    
    setTimeout(() => {
      setAgentVersion(newVersion);
      setIsRebooting(false);
      setAvatarState('success');
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: Sender.SYSTEM,
        text: `**SYSTEM UPDATE COMPLETE**\n\nCore updated to ${newVersion}. Causal Reasoning & Epistemic Reflexivity Online.`,
        timestamp: new Date()
      }]);
    }, 3000);
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing || isRebooting) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: Sender.USER, text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);
    setAvatarState('thinking');
    addAction('execute_command', `Analyzing: ${input.substring(0, 20)}...`);

    try {
      const responseStream = await generateAgentResponse(
        input, 
        [], 
        messages, 
        mode, 
        knowledgeBase,
        rlParams // Pass user defined config
      );
      const botMsgId = Date.now().toString();
      setMessages(prev => [...prev, { id: botMsgId, sender: Sender.BOT, text: '', timestamp: new Date(), isStreaming: true }]);

      let fullText = '';
      
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m));
          setAvatarState('speaking');
        }

        const part = chunk.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
        
        // Handle Collaboration Orchestration
        if (part?.functionCall?.name === 'orchestrate_collaboration_session') {
           const args = part.functionCall.args as any;
           const newCollab: CollaborationSession = {
             id: collabSession?.id || `COLLAB_${Math.random().toString(36).substr(2,9)}`,
             activeCollaborators: args.sessionUpdate.collaborators || [
               { id: 'c1', name: 'Leila', color: '#ec4899', status: 'active', cursorPos: [1,2,1] },
               { id: 'c2', name: 'Marcus', color: '#3b82f6', status: 'focus', cursorPos: [-1,1,2] }
             ],
             syncStatus: args.sessionUpdate.syncStatus || 'synced',
             masterNodeId: botMsgId
           };
           setCollabSession(newCollab);
           setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, collaborationSession: newCollab } : m));
           addAction('network_sync', `Collaboration: ${args.sessionUpdate.assignedTask}`);
        }

        // Handle Universal Analysis
        if (part?.functionCall?.name === 'perform_universal_analysis') {
           const args = part.functionCall.args as any;
           const report: SurgicalReport = {
             operationId: `UNI_${Date.now()}`,
             status: 'success',
             duration: '1.2s',
             outputSummary: args.summary,
             technicalDetails: `Domain: ${args.domain.toUpperCase()}`,
             artifactsGenerated: [],
             universalAnalysis: args
           };
           setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, surgicalReport: report } : m));
        }

        // Handle Industrial Synthesis
        if (part?.functionCall?.name === 'execute_industrial_synthesis') {
          const args = part.functionCall.args as any;
          const report: SurgicalReport = {
            operationId: `NL_${Date.now()}`,
            status: 'success',
            duration: '0.8s',
            outputSummary: args.logicManifest,
            technicalDetails: 'Kinematic Solver Match Found.',
            artifactsGenerated: ['model.blend'],
            blenderScript: args.blenderPython,
            kinematicAnalysisReport: args.functionalSpecs,
            reflexionTrace: args.reflexionTrace,
            reasoningChain: args.reasoningChain,
            cognitiveState: args.cognitiveState,
            metaCognition: args.metaCognition,
            assemblyConfiguration: args.assemblyData.objects.map((o: any) => ({ name: o.id, role: o.type })),
            rlAgentConfig: args.rlAgentConfig
          };
          const scene: ThreeDSceneData = { objects: args.assemblyData.objects };
          
          setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, surgicalReport: report, threeDScene: scene, collaborationSession: collabSession || undefined } : m));
        }
      }
      
      setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, isStreaming: false } : m));
      setAvatarState('idle');
    } catch (err: any) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: Sender.BOT, text: `Kernel Exception: ${err.message}`, isError: true, timestamp: new Date() }]);
      setAvatarState('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col gap-10 p-8 overflow-y-auto custom-scrollbar relative">
       {/* Theme Toggle */}
       <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all border border-transparent hover:border-white/10"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
       </div>

       <div className="flex flex-col items-center">
          <AIAvatar state={avatarState as any} size="md" theme={theme} />
          <h1 className="text-2xl font-black mt-8 text-blue-500 uppercase tracking-tighter">OmniAgent</h1>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.6em] mt-2">Team Orchestrator Core</p>
        </div>

        <button 
          onClick={() => {
            setShowTrainingDeck(true);
            setIsSidebarOpen(false);
          }}
          className="w-full py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform group"
        >
           <Brain size={16} className="text-purple-400 group-hover:animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest">Train Expert</span>
        </button>

        <div className="flex-1 space-y-10">
          <SystemStatus loadOverride={isProcessing ? 85 : 12} agentVersion={agentVersion} />
          <ActionPanel actions={actions} />
        </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-[var(--citadel-bg)] text-[var(--citadel-text)] font-inter overflow-hidden relative transition-colors duration-500">
      {isRebooting && (
        <div className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
           <Zap size={64} className="text-purple-500 animate-bounce mb-8" />
           <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-purple-500 mb-2">Hive-Mind Evolution</h2>
           <p className="text-xs font-mono text-zinc-500">Optimizing team synchronization protocols...</p>
           <div className="w-64 h-1 bg-zinc-800 mt-8 overflow-hidden rounded-full">
             <div className="h-full bg-purple-500 animate-[loading-bar_1s_ease-in-out_infinite]" />
           </div>
        </div>
      )}

      {showTrainingDeck && (
        <div className="absolute inset-0 z-[60]">
           <NeuralTrainingDeck 
             knowledgeBase={knowledgeBase}
             onAddNode={handleAddKnowledge}
             onRemoveNode={handleRemoveKnowledge}
             onClose={() => setShowTrainingDeck(false)}
           />
        </div>
      )}

      {showRLConfig && (
        <RLConfigPanel 
          config={rlParams}
          onChange={setRlParams}
          onClose={() => setShowRLConfig(false)}
        />
      )}

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-[300px] md:w-[340px] bg-[var(--citadel-sidebar)] border-r border-[var(--citadel-border)] transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      <div className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_40%)] w-full">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--citadel-border)] bg-[var(--citadel-bg)]/90 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
               <Zap size={14} className="text-blue-500" />
             </div>
             <span className="text-xs font-black uppercase tracking-widest text-[var(--citadel-text)]">OmniAgent</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-400 hover:text-[var(--citadel-text)]">
            <Menu size={20} />
          </button>
        </div>

        <ArchitectChat 
          messages={messages} 
          isProcessing={isProcessing} 
          theme={theme}
          onApproveEvolution={handleApproveEvolution}
          onDenyEvolution={() => setAvatarState('idle')}
        />

        <div className="p-4 md:p-12 pt-0 bg-gradient-to-t from-[var(--citadel-bg)] via-[var(--citadel-bg)] to-transparent z-20">
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex gap-2 md:gap-4 mb-4 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'search', icon: Search, label: 'Search' },
                { id: 'power', icon: Users, label: 'Team Orchestration' }
              ].map(m => (
                <button 
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${mode === m.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500 hover:text-[var(--citadel-text)]'}`}
                >
                  <m.icon size={12} /> {m.label}
                </button>
              ))}
              
              <button 
                onClick={() => setShowRLConfig(true)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all bg-white/5 text-zinc-500 hover:text-[var(--citadel-text)] hover:bg-white/10 ${showRLConfig ? 'text-cyan-400 border border-cyan-500/30' : ''}`}
              >
                <Sliders size={12} /> Tune Agent
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4 p-2 bg-[var(--citadel-input)] border border-[var(--citadel-border)] rounded-[2rem] shadow-2xl focus-within:border-blue-500/50 transition-all">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Start a team design session or ask for expert analysis..."
                className="flex-1 bg-transparent border-none outline-none p-3 md:p-4 text-xs md:text-sm font-medium placeholder-zinc-500 text-[var(--citadel-text)] min-w-0"
              />
              <button 
                onClick={handleSend}
                disabled={isProcessing}
                className="p-3 md:p-4 bg-blue-600 rounded-3xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 shrink-0 text-white"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
