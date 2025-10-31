
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';
import { ChatAgent, KnowledgeItem } from '../types';

// For most services, a single client instance is fine.
const getClient = (): GoogleGenAI => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set.");
    }
    return new GoogleGenAI({ apiKey });
};

// For video generation, create a new client each time to ensure the latest key is used.
const getNewVideoClient = (): GoogleGenAI => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set.");
    }
    return new GoogleGenAI({ apiKey });
};


export const generateImage = async (prompt: string): Promise<string> => {
    const ai = getClient();
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error('Image generation failed or returned no images.');
};

export const generateVideo = async (prompt: string, imageBase64: string, mimeType: string, aspectRatio: '16:9' | '9:16'): Promise<string> => {
    // Create a new client instance each time to ensure it uses the most up-to-date API key
    const ai = getNewVideoClient();
    
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: imageBase64,
            mimeType: mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio,
        }
    });

    // Poll for completion
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation completed, but no download link was found.");
    }

    return downloadLink;
};

// Chatbot specific logic
let chatInstance: Chat | null = null;
let currentAgentId: string | null = null;

export const generateChatResponse = async (
    message: string, 
    agent: ChatAgent, 
    knowledgeBase: KnowledgeItem[],
    history: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<GenerateContentResponse> => {
    
    const ai = getClient();
    
    if (!chatInstance || currentAgentId !== agent.id) {
        // Create a knowledge base text string
        const knowledgeContent = agent.knowledgeIds
            .map(id => knowledgeBase.find(kb => kb.id === id)?.content)
            .filter(Boolean)
            .join('\n\n---\n\n');

        const systemInstruction = `${agent.systemInstruction}\n\n## KNOWLEDGE BASE:\n${knowledgeContent}`;
        
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: systemInstruction,
                temperature: agent.temperature,
                maxOutputTokens: agent.maxOutputTokens,
            },
        });
        currentAgentId = agent.id;
    }

    const response = await chatInstance.sendMessage({ message });
    return response;
};
