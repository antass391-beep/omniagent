
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Paperclip, Sun, Moon, Send, Menu, X, FlaskConical, Loader2
} from 'lucide-react';
import { generateAgentResponse } from './services/geminiService.ts';
import { ChatMessage, Sender, AgentAction, ChatSession, SurgicalReport, ThreeDSceneData } from './types.ts';
import ActionPanel from './components/ActionPanel.tsx';
import AIAvatar from './components/AIAvatar.tsx';
import SystemStatus from './components/SystemStatus.tsx';
import ArchitectChat from './components/ArchitectChat.tsx';
import HistorySidebar from './components/HistorySidebar.tsx';

export default function App() {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avatarState, setAvatarState] = useState('idle');
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [neuralStability, setNeuralStability] = useState(100);
  const [showKernelBoot, setShowKernelBoot] = useState(true);
  const [streamVolume, setStreamVolume] = useState(0); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => 
    (localStorage.getItem('omni_theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('omni_theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setShowKernelBoot(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addAction = useCallback((type: string, details: string, status: 'success' | 'failed' | 'warning' | 'pending' = 'success') => {
    setActions(prev => [{ id: Date.now().toString(), type, details, status, timestamp: new Date() }, ...prev].slice(0, 50));
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    addAction('execute_command', `Noyron Interface Mode: ${theme === 'dark' ? 'Light' : 'Dark'}.`);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    setSessions(prev => [{ id: newId, title: "Noyron Session", messages: [], lastUpdated: new Date() }, ...prev]);
    setCurrentSessionId(newId);
    setMessages([]);
    setSidebarOpen(false);
    addAction('execute_command', 'Computational Kernel Ready.');
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) { 
      setCurrentSessionId(id); 
      setMessages(session.messages); 
      setSidebarOpen(false);
    }
  };

  const performCall = async (disableTools: boolean, currentPrompt: string, currentChatHistory: ChatMessage[]) => {
    if (!currentPrompt && currentChatHistory.length === 0) return;
    
    setIsProcessing(true);
    setAvatarState('thinking'); 
    const botMsgId = Date.now().toString();
    
    setMessages(prev => [...prev, { id: botMsgId, sender: Sender.BOT, text: '', timestamp: new Date(), isStreaming: true }]);

    let fullText: string = ''; 
    let surgicalReport: SurgicalReport | undefined;
    let threeDScene: ThreeDSceneData | undefined;
    let groundingSources: any[] = [];

    try {
      const responseStream = await generateAgentResponse(currentPrompt, [], currentChatHistory, 'action');

      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          setStreamVolume(prev => Math.min(100, fullText.length % 100)); 
          setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m));
          setAvatarState('speaking'); // Avatar speaks while streaming text
        }

        const candidate = chunk.candidates?.[0];
        if (candidate?.groundingMetadata?.groundingChunks) {
          groundingSources = candidate.groundingMetadata.groundingChunks
            .filter((c: any) => c.web)
            .map((c: any) => ({ uri: c.web.uri, title: c.web.title }));
        }

        if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.functionCall && part.functionCall.name === 'perform_industrial_synthesis') {
              setAvatarState('processing'); // Avatar processes during tool calls
              const args = part.functionCall.args as any;
              
              if (args.sceneData?.objects) {
                threeDScene = {
                  objects: args.sceneData.objects.map((obj: any) => ({
                    ...obj,
                    position: obj.position || [0, 0, 0],
                    color: obj.color || '#3b82f6'
                  }))
                };
              }

              surgicalReport = {
                operationId: `NL_${Date.now()}`,
                status: 'success',
                duration: '1.4s',
                outputSummary: args.outputSummary || `Simulation Complete.`,
                technicalDetails: `Logic-Lock Synthesis Successful.`,
                artifactsGenerated: [`kernel_output.leap71`],
                blenderScript: args.blenderScript,
                physicsReasoning: {
                  calculations: args.physicsReport.derivationPath,
                  verificationFormula: args.physicsReport.verificationFormula,
                  derivedParameters: args.physicsReport.metrics.map((m: any) => ({
                    label: m.label,
                    varName: m.varName,
                    value: m.value.toString(),
                    unit: m.unit
                  })),
                  constraints: ["Valve Float Prevention", "Resonance Damping"],
                  simulationData: {
                    safetyFactor: args.analysisData.stressAnalysis.safetyFactor,
                    wahlFactor: 1.12 
                  }
                },
                engineeringAnalysis: {
                  engineDynamics: {
                    stressPa: args.analysisData.stressAnalysis.maxShearStressPa,
                    materialName: "Inconel 718"
                  },
                  structuralIntegrity: {
                    safetyMargin: args.analysisData.stressAnalysis.safetyFactor,
                    shearStressPa: args.analysisData.stressAnalysis.maxShearStressPa
                  }
                },
                // New functional machinery fields
                functionalDescription: args.functionalDescription,
                kinematicAnalysisReport: args.analysisData.kinematicAnalysis,
                dynamicAnalysisReport: args.analysisData.dynamicAnalysis,
                assemblyConfiguration: args.analysisData.assemblyConfiguration,

                neuralSynthesisRate: 'Industrial CEM v23.6'
              };

              setMessages(prev => prev.map(m => m.id === botMsgId ? { 
                ...m, 
                threeDScene: threeDScene || m.threeDScene, 
                surgicalReport: surgicalReport || m.surgicalReport 
              } : m));
              addAction('iot_control', 'Physical Geometry Synthesis Triggered.');
            }
          }
        }
      }

      setStreamVolume(0);
      setMessages(prev => prev.map(m => m.id === botMsgId ? { 
        ...m, text: fullText, isStreaming: false,
        surgicalReport: surgicalReport || m.surgicalReport,
        threeDScene: threeDScene || m.threeDScene,
        groundingSources
      } : m));

      setAvatarState('idle');
    } catch (err: any) { 
      setAvatarState('error');
      setStreamVolume(0);
      setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: `Kernel Exception: ${err.message}`, isError: true, isStreaming: false } : m));
    } finally { 
      setIsProcessing(false); 
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isProcessing) return; // Prevent sending if processing
    setInput('');
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: Sender.USER, text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]); 
    await performCall(false, textToSend, [...messages, userMsg]);
  };

  return (
    <div className={`flex h-screen w-full transition-all duration-1000 font-inter relative overflow-hidden bg-[var(--citadel-bg)] text-[var(--citadel-text)]`}>
      {showKernelBoot && (
        <div className="fixed inset-0 z-[200] bg-[#050507] flex flex-col items-center justify-center animate-out fade-out duration-1000 fill-mode-both delay-2000">
          <FlaskConical className="text-blue-500 w-12 h-12 mb-6 animate-pulse" />
          <p className="text-[11px] font-mono font-black text-blue-500 uppercase tracking-[1em] animate-pulse text-center">INIT_OMNINOYRON_v24.1</p>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:static w-[320px] flex flex-col p-6 gap-6 border-r shrink-0 transition-transform duration-500 shadow-2xl bg-[var(--citadel-sidebar)] border-[var(--citadel-border)]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="relative flex flex-col items-center py-4 border-b border-[var(--citadel-border)]">
          <div className="absolute top-0 right-0 flex gap-2">
            <button onClick={toggleTheme} className="p-2 hover:bg-[var(--citadel-hover)] rounded-lg text-[var(--citadel-accent)] opacity-60 hover:opacity-100 transition-all">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-[var(--citadel-hover)] rounded-lg opacity-60">
              <X size={14} />
            </button>
          </div>
          <AIAvatar state={avatarState as any} size="md" stability={neuralStability} theme={theme} />
          <h1 className="font-black text-2xl mt-6 tracking-tight text-[var(--citadel-accent)] uppercase">OmniAgent</h1>
          <p className="text-[7px] opacity-30 uppercase tracking-[0.5em] font-black mt-2 text-[var(--citadel-text)]">Studio CEM Core</p>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
          <HistorySidebar sessions={sessions} currentSessionId={currentSessionId} onSelectSession={handleSelectSession} onNewChat={handleNewChat} onDeleteSession={() => {}} />
          <SystemStatus loadOverride={streamVolume} />
          <div className="hidden lg:block">
            <ActionPanel actions={actions} onClear={() => setActions([])} />
          </div>
        </div>
      </div>

      {/* Main Experience */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_bottom_right,_var(--citadel-accent)_0%,_transparent_25%)] opacity-[0.99]">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--citadel-border)] bg-[var(--citadel-bg)]/80 backdrop-blur-md z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-[var(--citadel-hover)] rounded-lg">
            <Menu size={20} className="text-blue-500" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${avatarState === 'idle' ? 'bg-zinc-700' : 'bg-blue-500 animate-pulse'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">OmniNoyron</span>
          </div>
          <button onClick={handleNewChat} className="p-2 hover:bg-[var(--citadel-hover)] rounded-lg text-blue-500">
            <Send size={18} className="rotate-45" />
          </button>
        </div>

        <ArchitectChat 
          messages={messages} 
          isProcessing={isProcessing} 
          onFollowUpClick={handleSend} 
          onCopy={(text) => navigator.clipboard.writeText(text)} 
          copiedId={null}
          theme={theme}
        />
        
        {/* Command Node */}
        <div className="px-4 md:px-12 pb-6 md:pb-8 pt-0 sticky bottom-0 z-40 bg-gradient-to-t from-[var(--citadel-bg)] via-[var(--citadel-bg)]/95 to-transparent">
          <div className="max-w-2xl mx-auto flex flex-col gap-2">
            <div className="hidden md:flex items-center justify-between px-6 opacity-30">
              <span className="text-[7px] font-black uppercase tracking-[0.4em]">Logic-Lock: ACTIVE</span>
              <div className="flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[7px] font-mono uppercase tracking-widest">Secure Kernel</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-1.5 bg-[var(--citadel-card)] backdrop-blur-3xl border border-[var(--citadel-border)] rounded-2xl md:rounded-3xl shadow-[var(--citadel-shadow)] ring-1 ring-[var(--citadel-border)] focus-within:ring-blue-500/40 transition-all duration-500">
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="p-3 text-[var(--citadel-subtext)] hover:text-blue-400 rounded-xl transition-all shrink-0"
                disabled={isProcessing} // Disable file input during processing
              >
                <Paperclip size={18} />
              </button>
              
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) { e.preventDefault(); handleSend(); } }}
                placeholder={"Command synthesis..."}
                rows={1}
                className="flex-1 bg-transparent border-none outline-none py-3 px-1 text-[15px] font-medium resize-none placeholder:text-[var(--citadel-subtext)] text-[var(--citadel-text)] custom-scrollbar max-h-32"
                disabled={isProcessing} // Disable input during processing
              />

              <button 
                onClick={() => handleSend()} 
                className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-white shadow-xl shadow-blue-600/20 transition-all shrink-0 ${isProcessing ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95'}`}
                disabled={isProcessing} // Disable send button during processing
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" />
    </div>
  );
}