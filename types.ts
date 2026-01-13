
export enum Sender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system'
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
    wahlFactor?: number;
    springRateK?: number;
  };
}

export interface EngineeringAnalysis {
  thermalMap?: {
    minTempK: number;
    maxTempK: number;
    gradientSteps: number;
    vertexColors?: number[][]; // [r, g, b] per vertex
  };
  structuralIntegrity?: {
    // Made optional to resolve assignment errors in App.tsx
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
  engineDynamics?: {
    targetRPM?: number;
    valveMassKg?: number;
    forceN?: string;
    stressPa?: string;
    materialName?: string;
  };
}

// New interfaces for functional machinery
export interface KinematicAnalysisReport {
  inputMotion: string; // e.g., "Rotary input at 100 RPM"
  outputMotion: string; // e.g., "Linear reciprocation, 50mm stroke"
  gearRatios?: string[]; // e.g., ["1:5 reduction"]
  linkages?: string[]; // e.g., ["Four-bar linkage"]
  motionDiagram?: string; // Textual description or a reference to a visual aid
}

export interface DynamicAnalysisReport {
  powerOutputKw?: number; // Kilowatts
  torqueNm?: number; // Newton-meters
  efficiencyPercent?: number;
  primaryForcesN?: string; // e.g., "Piston thrust 200N"
  vibrationAnalysis?: string; // e.g., "Harmonic resonance at 120Hz"
}

export interface AssemblyComponent {
  name: string;
  role: string; // e.g., "Power input", "Motion converter", "Structural support"
  connections: string[]; // e.g., ["Connected to Central Hub via bearings"]
  material?: string;
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
  neuralSynthesisRate?: string;
  
  // New fields for functional machinery
  functionalDescription?: string;
  kinematicAnalysisReport?: KinematicAnalysisReport;
  dynamicAnalysisReport?: DynamicAnalysisReport;
  assemblyConfiguration?: AssemblyComponent[];
}

export interface ThreeDObject {
  id?: string;
  type: 'custom_mesh' | 'helical_spring' | 'box' | 'sphere' | 'icosahedron';
  color: string;
  position: [number, number, number];
  meshData?: {
    vertices: number[];
    indices: number[];
    colors?: number[]; // Flat array of [r,g,b]
  };
}

export interface ThreeDSceneData {
  objects: ThreeDObject[];
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  isError?: boolean;
  isStreaming?: boolean;
  groundingSources?: Array<{
    uri: string;
    title: string;
  }>;
  threeDScene?: ThreeDSceneData;
  surgicalReport?: SurgicalReport;
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

// Evolution system interfaces
export interface EvolutionChange {
  target: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

export interface EvolutionManifest {
  version: string;
  codename: string;
  changes: EvolutionChange[];
  safetyValidation: {
    riskScore: number;
    anchorsVerified: string[];
  };
}

export interface ApprovalRequest {
  id: string;
  status: 'pending' | 'approved' | 'denied';
  type: string;
  details: string;
  evolutionManifest?: EvolutionManifest; // Added to resolve property errors in ApprovalRequestCard.tsx
}

// Presentation system interfaces
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

// Document architecture interfaces
export interface DocumentOperation {
  type: string;
  targetLocation: string;
  content?: string;
  imageDescription?: string;
  generatedImageUrl?: string;
}

export interface DocumentArchitectData {
  documentName: string;
  summaryOfChanges: string;
  operations: DocumentOperation[];
}
