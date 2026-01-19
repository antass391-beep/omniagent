
export enum Sender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system'
}

export interface Collaborator {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'away' | 'focus';
  role: 'viewer' | 'editor' | 'admin';
  lastAction?: string;
  cursorPos?: [number, number, number]; // x, y, z for 3D context
  joinedAt: Date;
}

export interface CollaborationSession {
  id: string;
  activeCollaborators: Collaborator[];
  syncStatus: 'synced' | 'diverged' | 'merging';
  masterNodeId: string;
  version: number;
  lastModified: Date;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  deadline?: string;
  tags: string[];
  progress: number; // 0-100
}

export interface WorkflowState {
  id: string;
  name: string;
  tasks: Task[];
  overallProgress: number;
  status: 'active' | 'paused' | 'completed';
}

export interface GeneratedAsset {
  id: string;
  type: 'image' | 'blueprint' | 'render';
  url: string; // Base64 data URI
  prompt: string;
  style: 'cinematic' | 'photorealistic' | 'blueprint' | 'cgi';
  timestamp: Date;
}

export interface AgenticPlan {
  id: string;
  goal: string;
  strategicInsight: string;
  phases: {
    id: string;
    name: string;
    description: string;
    tasks: string[];
    estimatedDuration?: string;
  }[];
  riskAnalysis: {
    level: 'low' | 'medium' | 'high';
    reasoning: string;
    humanOversightRequired: boolean;
    mitigationStrategy?: string;
  };
  status: 'proposed' | 'approved' | 'rejected' | 'executing';
}

export interface PhysicsReasoning {
  calculations: string;
  verificationFormula?: string; 
  derivedParameters: {
    label: string;
    value: string;
    unit: string;
  }[];
  constraints: string[];
  simulationData?: {
    riskScore?: number;
    safetyFactor?: number;
    failureMode?: string;
    gravity?: [number, number, number];
    timeStep?: number;
    frictionCoeff?: number;
  };
}

export interface EngineeringAnalysis {
  thermalMap?: {
    minTempK: number;
    maxTempK: number;
    gradientSteps: number;
    vertexColors?: number[][]; 
  };
  structuralIntegrity?: {
    stressFactor?: number;
    displacementMax?: string;
    safetyMargin: number;
    shearStressPa?: string;
  };
  manufacturingFeasibility?: {
    process: '3D_PRINT' | 'CNC' | 'CASTING' | 'INJECTION_MOLDING' | 'LPBF_METAL';
    complexityScore: number;
    wasteEstimation: string;
  };
  physicalProperties?: {
    material: string;
    massKg: number;
    centerOfGravity: [number, number, number];
  };
}

export interface RLAgentConfig {
  agentName: string;
  algorithm: 'PPO' | 'SAC' | 'DQN' | 'TD3' | 'AlphaZero' | 'MuZero';
  stateSpace: string[];
  actionSpace: string[];
  rewardFunction: string;
  hyperparameters: {
    learningRate: number;
    discountFactor: number; 
    epsilonDecay: number;
    batchSize: number;
  };
  trainingStatus?: 'untrained' | 'training' | 'converged';
}

export interface RLParams {
  algorithm: 'PPO' | 'SAC' | 'DQN' | 'TD3' | 'AlphaZero';
  learningRate: number;
  discountFactor: number;
  batchSize: number;
  entropyCoefficient: number;
  rewardFunction: string;
}

export interface UniversalAnalysisReport {
  topic: string;
  domain: string;
  confidenceScore: number;
  summary: string;
  keyInsights: string[];
  sources: { title: string; credibility: number }[];
  dataPoints?: { label: string; value: number }[];
  radarMetrics?: { label: string; value: number }[];
}

export interface ReasoningStep {
  type: 'thought' | 'action' | 'observation' | 'conclusion';
  content: string;
  confidence?: number;
}

export interface ReflexionStep {
  thought: string;
  critique: string;
  score: number;
  refinement: string;
}

export interface NeuralGene {
  layerType: string;
  width: number;
  activation: 'relu' | 'gelu' | 'swish' | 'linear';
  dropout: number;
}

export interface EvolutionProposal {
  codename: string;
  versionTarget: string;
  codeChanges: {
    componentName: string;
    filePath: string;
    originalSnippet: string;
    modifiedSnippet: string;
    reasoning: string;
  }[];
  neuroEvolutionData?: {
    generation: number;
    populationSize: number;
    mutationRate: number;
    geneticDiversity: number;
    bestFitness: number;
    architectures: {
      id: string;
      parameters: number;
      fitnessScore: number;
      status: 'active' | 'discarded';
      origin: 'elite' | 'crossover' | 'mutation';
      genome: NeuralGene[];
    }[];
  };
}

export interface ApprovalRequest {
  id: string;
  type: 'create_sandbox' | 'run_test' | 'delete_sandbox' | 'system_evolution';
  status: 'pending' | 'approved' | 'denied';
  details: string;
  evolutionManifest?: {
    version: string;
    codename: string;
    safetyValidation: {
      riskScore: number;
      anchorsVerified: string[];
    };
    changes: { target: string; description: string; impact: 'low' | 'medium' | 'high' }[];
  };
}

export interface Slide {
  title: string;
  content: string[];
  theme?: 'modern' | 'glass' | 'accent';
  accentColor?: string;
}

export interface PresentationData {
  title: string;
  slides: Slide[];
}

export interface DocumentArchitectData {
  documentName: string;
  summaryOfChanges: string;
  operations: {
    type: 'insert_image' | 'add_section' | 'remove_content' | 'rewrite_style';
    targetLocation: string;
    content?: string;
    generatedImageUrl?: string;
    imageDescription?: string;
  }[];
}

export interface CognitiveState {
  agenticAutonomy: {
    currentFocus: string;
    goals: { id: string; description: string; status: 'active' | 'complete' | 'pending'; priority: 'strategic' | 'tactical' }[];
  };
  worldModel: {
    predictionHorizon: string;
    simulations: { timeStep: string; scenarioDescription: string; probability: number; riskLevel: number }[];
  };
  neuroSymbolic: {
    neuralConfidence: number;
    symbolicAlignment: number;
    activeRules: { rule: string; status: 'satisfied' | 'violated' | 'partial'; confidence: number }[];
  };
}

export interface MetaCognitionState {
  causalGraph: {
    nodes: { id: string; label: string; type: 'cause' | 'effect' | 'hidden' }[];
    links: { source: string; target: string; strength: number; description: string }[];
  };
  epistemicState: {
    confidence: number;
    knowledgeGaps: { concept: string; uncertaintyLevel: number; reason: string; strategy: string }[];
  };
  neuroplasticity: {
    plasticityIndex: number;
    activeRewiring: { region: string; adaptationType: string; intensity: number }[];
  };
  lifelongLearning: {
    retentionRate: number;
  };
  crossDomain: {
    activeAnalogies: { sourceDomain: string; targetDomain: string; insight: string; mapping: { sourceConcept: string; targetConcept: string }[] }[];
  };
}

export interface PhysicsConstraints {
  maxVelocity: number;
  minMass: number;
  maxMass: number;
  minFriction: number;
  maxFriction: number;
}

export interface SurgicalReport {
  operationId: string;
  status: 'success' | 'failed' | 'simulating';
  duration: string;
  outputSummary: string;
  technicalDetails: string;
  artifactsGenerated: string[];
  engineeringAnalysis?: EngineeringAnalysis;
  blenderScript?: string;
  physicsReasoning?: PhysicsReasoning;
  reflexionTrace?: ReflexionStep[];
  reasoningChain?: ReasoningStep[]; 
  cognitiveState?: CognitiveState;
  metaCognition?: MetaCognitionState; 
  kinematicAnalysisReport?: {
    degreesOfFreedom?: number;
  };
  assemblyConfiguration?: {
    name: string;
    role: string;
  }[];
  rlAgentConfig?: RLAgentConfig;
  workflowUpdate?: WorkflowState;
  generatedAssets?: GeneratedAsset[];
  agenticPlan?: AgenticPlan;
  evolutionProposal?: EvolutionProposal;
  universalAnalysis?: UniversalAnalysisReport;
  collaborationUpdate?: any;
}

export interface ThreeDObject {
  id: string;
  parentId?: string;
  type: string;
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  physics?: {
    mass: number;
    friction: number;
    restitution: number; // bounciness
    isStatic?: boolean;
    velocity?: [number, number, number];
  };
  jointData?: {
    axis: [number, number, number];
    limitMin: number;
    limitMax: number;
    stiffness?: number;
    damping?: number;
  };
}

export interface ThreeDSceneData {
  objects: ThreeDObject[];
  constraints?: Partial<PhysicsConstraints>;
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  isError?: boolean;
  isStreaming?: boolean;
  threeDScene?: ThreeDSceneData;
  surgicalReport?: SurgicalReport;
  collaborationSession?: CollaborationSession;
  groundingMetadata?: any; 
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastUpdated: Date;
}

export interface AgentAction {
  id: string;
  type: string;
  details: string;
  status: 'pending' | 'success' | 'failed' | 'warning';
  timestamp: Date;
}

export interface Attachment {
  name: string;
  mimeType: string;
  data: string;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  category: 'science' | 'humanities' | 'finance' | 'code' | 'general' | 'physics';
  timestamp: Date;
  status: 'active' | 'learning' | 'dormant';
  embeddingStrength: number;
}
