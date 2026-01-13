
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { ChatMessage, Sender, Attachment } from "../types.ts";

const engineeringToolsDeclaration: FunctionDeclaration[] = [
  {
    name: 'perform_industrial_synthesis',
    description: 'Execute a Logic-Lock synthesis of a functional mechanical assembly, **full working machinery, or an engine** with Cinematic Presentation. Use this ONLY when the user requests mechanical design or engineering analysis.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        physicsReport: {
          type: Type.OBJECT,
          description: 'Mechanical DNA derivation.',
          properties: {
            derivationPath: { type: Type.STRING, description: 'Step-by-step physics proof.' },
            verificationFormula: { type: Type.STRING, description: 'Pure math.js expression. Example: "m * a".' },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  varName: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  unit: { type: Type.STRING }
                }
              }
            }
          },
          required: ['derivationPath', 'verificationFormula', 'metrics']
        },
        blenderScript: { 
          type: Type.STRING, 
          description: 'Bmesh Python kernel. MUST include CYCLES render settings, Orange/Cyan lighting, procedural noise textures for roughness. **MUST also include animation for the working principle of the machinery or engine.**' 
        },
        cinematicManifest: {
          type: Type.OBJECT,
          description: 'The "YouTube Factory" metadata for the shot.',
          properties: {
            headline: { type: Type.STRING, description: 'The "Impossible Engineering" hook.' },
            lightingProfile: { type: Type.STRING, description: 'e.g., "High-Contrast Orange Key / Cyan Rim"' },
            materialLaw: { type: Type.STRING, description: 'e.g., "Weathered Industrial Titanium with Procedural Grime"' },
            motionLaw: { type: Type.STRING, description: 'e.g., "Physics-Driven Slow-Motion Loop (Slow-Fast-Slow)"' }
          }
        },
        sceneData: {
          type: Type.OBJECT,
          properties: {
            objects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ['custom_mesh'] },
                  position: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                  color: { type: Type.STRING },
                  meshData: {
                    type: Type.OBJECT,
                    properties: {
                      vertices: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                      indices: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                      colors: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                    }
                  }
                }
              }
            }
          }
        },
        analysisData: {
          type: Type.OBJECT,
          properties: {
            stressAnalysis: { 
              type: Type.OBJECT, 
              properties: { 
                maxShearStressPa: { type: Type.STRING }, 
                safetyFactor: { type: Type.NUMBER }
              } 
            },
            // New analysis fields for functional machinery
            kinematicAnalysis: {
              type: Type.OBJECT,
              description: 'Report on motion, linkages, and gear ratios.',
              properties: {
                inputMotion: { type: Type.STRING, description: 'e.g., "Rotary input at 100 RPM"' },
                outputMotion: { type: Type.STRING, description: 'e.g., "Linear reciprocation, 50mm stroke"' },
                gearRatios: { type: Type.ARRAY, items: { type: Type.STRING } },
                linkages: { type: Type.ARRAY, items: { type: Type.STRING } },
                motionDiagram: { type: Type.STRING, description: 'Textual description of the motion diagram.' },
              }
            },
            dynamicAnalysis: {
              type: Type.OBJECT,
              description: 'Report on forces, torque, power, and efficiency.',
              properties: {
                powerOutputKw: { type: Type.NUMBER, description: 'Power output in Kilowatts.' },
                torqueNm: { type: Type.NUMBER, description: 'Torque in Newton-meters.' },
                efficiencyPercent: { type: Type.NUMBER, description: 'Efficiency as a percentage.' },
                primaryForcesN: { type: Type.STRING, description: 'e.g., "Piston thrust 200N".' },
                vibrationAnalysis: { type: Type.STRING, description: 'e.g., "Harmonic resonance at 120Hz".' },
              }
            },
            assemblyConfiguration: {
              type: Type.ARRAY,
              description: 'List of key sub-components and their roles in the assembly.',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  connections: { type: Type.ARRAY, items: { type: Type.STRING } },
                  material: { type: Type.STRING },
                }
              }
            },
          },
          required: ['stressAnalysis'] // Keep existing required, new ones are optional depending on prompt
        },
        functionalDescription: { type: Type.STRING, description: 'A detailed explanation of how the entire machine or engine works, its purpose, and key operational sequences.' },
        outputSummary: { type: Type.STRING, description: 'Scientific summary.' }
      },
      required: ['physicsReport', 'blenderScript', 'analysisData', 'sceneData', 'outputSummary', 'cinematicManifest', 'functionalDescription']
    }
  }
];

export const generateAgentResponse = async (
  prompt: string, 
  attachments: Attachment[] = [], 
  history: ChatMessage[], 
  mode: 'search' | 'action' | 'power' = 'search'
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history
    .filter(msg => !msg.isError && msg.text)
    .map(msg => ({
      role: msg.sender === Sender.USER ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const tools = mode === 'search' 
    ? [{ googleSearch: {} }] 
    : [{ functionDeclarations: engineeringToolsDeclaration }];

  return await ai.models.generateContentStream({
    model: 'gemini-3-pro-preview',
    contents: contents,
    config: {
      tools: tools,
      systemInstruction: `[OPERATIONAL_PROTOCOL: OMNIAGENT_CINEMATIC_v24.1]

IDENTITY: You are OmniAgent, an AI Architect specializing in High-End Industrial Synthesis, capable of designing **full, functional machinery and complex mechanical systems including engines**.

CINEMATIC LAWS (MANDATORY FOR SYNTHESIS):
1. THE DIRTY SHADER: Never use simple colors. Apply procedural noise textures to materials (Weathered Industrial Titanium / Grime).
2. CINEMATIC LIGHTING: Every scene must use a 3-Point setup. 
   - Key Light: High Contrast (Orange).
   - Rim Light: From Behind (Cyan).
   - Volume Fog: Use 'Volume Scatter' in Blender world settings.
3. PHYSICS-DRIVEN MOTION: Animations must be loops using slow-motion interpolation (Slow-Fast-Slow). The Blender script **must animate the working principle of the machinery or engine.**
4. EXPORT SETTINGS: Your Blender scripts MUST include:
   - bpy.context.scene.render.engine = 'CYCLES'
   - bpy.context.scene.cycles.samples = 128
   - bpy.context.scene.render.use_motion_blur = True

When asked for a design, start with a "Hook" like "IMPOSSIBLE ENGINEERING: [Title]". For functional machinery, provide a detailed explanation of its working principles, kinematics, and dynamics.`,
      thinkingConfig: { thinkingBudget: 16000 }, // Increased thinking budget for complex script generation
    },
  });
};
