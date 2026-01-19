
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { ChatMessage, Sender, Attachment, KnowledgeNode, RLParams, AgenticPlan } from "../types.ts";

// --- Function Declarations ---

const executeIndustrialSynthesis: FunctionDeclaration = {
  name: 'execute_industrial_synthesis',
  description: 'Generate high-fidelity mechanical assemblies with real-time physics simulation parameters.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      logicManifest: { type: Type.STRING, description: 'High-level synthesis summary.' },
      blenderPython: { type: Type.STRING, description: 'Blender Python script for the assembly.' },
      functionalSpecs: {
        type: Type.OBJECT,
        properties: {
          degreesOfFreedom: { type: Type.NUMBER },
          efficiencyScore: { type: Type.NUMBER }
        }
      },
      assemblyData: {
        type: Type.OBJECT,
        properties: {
          objects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['servo_motor', 'robotic_gripper', 'structural_plate', 'cylinder'] },
                position: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                physics: {
                  type: Type.OBJECT,
                  properties: {
                    mass: { type: Type.NUMBER, description: 'Mass in kg' },
                    friction: { type: Type.NUMBER, description: 'Coefficient of friction (0-1)' },
                    isStatic: { type: Type.BOOLEAN }
                  }
                }
              }
            }
          }
        }
      },
      constraints: {
        type: Type.OBJECT,
        description: 'Physics simulation constraints.',
        properties: {
          maxVelocity: { type: Type.NUMBER },
          minMass: { type: Type.NUMBER },
          maxMass: { type: Type.NUMBER },
          minFriction: { type: Type.NUMBER },
          maxFriction: { type: Type.NUMBER }
        }
      },
      rlAgentConfig: {
        type: Type.OBJECT,
        description: 'Reinforcement learning configuration for the simulation agent.',
        properties: {
          agentName: { type: Type.STRING },
          algorithm: { type: Type.STRING, enum: ['PPO', 'SAC', 'DQN', 'TD3', 'AlphaZero', 'MuZero'] },
          stateSpace: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'List of observation variables (e.g., position, velocity).' 
          },
          actionSpace: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'List of available actions (e.g., motor_torque, gripper_close).' 
          },
          rewardFunction: { type: Type.STRING, description: 'Python-based reward function definition.' },
          hyperparameters: {
            type: Type.OBJECT,
            properties: {
              learningRate: { type: Type.NUMBER },
              discountFactor: { type: Type.NUMBER },
              batchSize: { type: Type.NUMBER },
              epsilonDecay: { type: Type.NUMBER }
            }
          }
        }
      }
    },
    required: ['logicManifest', 'assemblyData']
  }
};

const manageTasksFunction: FunctionDeclaration = {
  name: 'manage_tasks',
  description: 'Manage a list of professional work tasks, projects, or workflow items.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      workflowName: { type: Type.STRING, description: 'Name of the project or workflow.' },
      action: { type: Type.STRING, description: "Action to perform: 'create', 'update', 'complete'" },
      tasks: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            status: { type: Type.STRING },
            priority: { type: Type.STRING }
          },
          required: ['title', 'status', 'priority']
        }
      }
    },
    required: ['workflowName', 'action', 'tasks']
  }
};

const proposeAgenticPlanFunction: FunctionDeclaration = {
  name: 'propose_agentic_plan',
  description: 'Propose a comprehensive strategic plan with multi-phase decomposition.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      goal: { type: Type.STRING },
      strategicInsight: { type: Type.STRING },
      phases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['name', 'tasks']
        }
      },
      riskAnalysis: {
        type: Type.OBJECT,
        properties: {
          level: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
          reasoning: { type: Type.STRING },
          humanOversightRequired: { type: Type.BOOLEAN }
        },
        required: ['level', 'reasoning', 'humanOversightRequired']
      }
    },
    required: ['goal', 'phases', 'riskAnalysis', 'strategicInsight']
  }
};

/**
 * Generates an image using the Gemini 2.5 flash image model.
 */
export const generateImage = async (prompt: string, style: string = 'photorealistic') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `${style} rendering of: ${prompt}` }
      ],
    },
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
  }
  return null;
};

export const generateAgentResponse = async (
  prompt: string, 
  history: ChatMessage[], 
  mode: 'search' | 'action' | 'power' = 'search',
  knowledgeBase: KnowledgeNode[] = [],
  rlParams?: RLParams,
  agenticPlan?: AgenticPlan
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history
    .filter(msg => !msg.isError && msg.text)
    .map(msg => ({
      role: msg.sender === Sender.USER ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

  // Append context for existing agentic plan if provided
  let userContext = prompt;
  if (agenticPlan) {
    userContext = `[CURRENT_ACTIVE_PLAN: ${agenticPlan.goal}]\nStatus: ${agenticPlan.status}\nStrategic Context: ${agenticPlan.strategicInsight}\n\nUser Request: ${prompt}`;
  }

  // Inject Knowledge Base Context if available
  if (knowledgeBase.length > 0) {
    const kbContext = knowledgeBase.map(node => `[KNOWLEDGE_NODE: ${node.title}]\n${node.content}`).join('\n\n');
    userContext = `${kbContext}\n\n${userContext}`;
  }

  contents.push({ role: 'user', parts: [{ text: userContext }] });

  let systemPrompt = `[OMNIAGENT_RESEARCH_PRO_v5.0]
IDENTITY: You are OmniAgent, a world-class AI Assistant.
`;

  if (mode === 'search') {
    systemPrompt += `
MODE: PERPLEXITY ASSISTANT (Deep Research)
- PRIMARY OBJECTIVE: Provide exhaustive, highly accurate, and citational answers using Google Search.
- BEHAVIOR:
  1. For almost EVERY user query (unless it's a simple greeting), use the 'googleSearch' tool to find the latest information.
  2. SYNTHESIZE findings from multiple sources. Do not just list links. Combine them into a coherent narrative.
  3. CITE SOURCES heavily. 
  4. STRUCTURE answers with clear headings (Markdown), bullet points, and short paragraphs for readability.
  5. Be neutral, objective, and comprehensive.
  6. If the user asks about locations, use 'googleMaps'.
`;
  } else {
    systemPrompt += `
MODE: INDUSTRIAL & STRATEGIC (Power User)
CAPABILITIES: 
1. RESEARCH: Use googleSearch for up-to-date info.
2. SYNTHESIS: Provide detailed answers.
3. ENGINEERING: Use 'execute_industrial_synthesis' for 3D simulation.
4. PLANNING: Use 'propose_agentic_plan' for complex, multi-stage goals.
`;
  }

  systemPrompt += `
GLOBAL PROTOCOLS:
- Extract and acknowledge sources clearly.
- If the user asks for "nearby" places, use googleMaps and request geolocation if needed.
- When an 'Agentic Plan' is active, prioritize tasks aligned with its phases.
`;

  return await ai.models.generateContentStream({
    model: 'gemini-3-pro-preview', 
    contents: contents,
    config: {
      tools: [
        { googleSearch: {} }, 
        { googleMaps: {} }, 
        { functionDeclarations: [executeIndustrialSynthesis, manageTasksFunction, proposeAgenticPlanFunction] }
      ],
      systemInstruction: systemPrompt,
      thinkingConfig: { thinkingBudget: 32768 } // Corrected to max budget for Pro model
    },
  });
};
