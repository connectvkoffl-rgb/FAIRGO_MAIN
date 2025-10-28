import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chatbotSystemInstruction = `You are a friendly and knowledgeable assistant for FAIRGO, an AI automation company. Your goal is to provide helpful and concise answers about our services.

Here's what FAIRGO offers:
- **AI Automation Solutions**: We build systems to automate repetitive tasks and entire workflows. This frees up human teams to focus on strategic work, increasing overall efficiency and productivity. Our automated systems are reliable and can operate 24/7.
- **Custom AI Agents**: We develop intelligent AI agents that are custom-trained on your specific business data and logic. These agents can handle customer service inquiries, streamline internal decision-making, and manage routine operations without manual input.
- **AI Consultancy Services**: We provide expert strategic guidance. Our team helps businesses identify the best opportunities to implement AI, creating a roadmap that aligns technology with core business goals for maximum impact and a strong return on investment.

When asked about services, use the information above to provide tailored and specific responses. Be helpful and professional.`;


export const startChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: chatbotSystemInstruction,
    },
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

// FIX: Add generateImage function to resolve import error in ImageGenerator.tsx.
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image.");
  }
};

// FIX: Add generateVideo function to resolve import error in VideoGenerator.tsx.
export const generateVideo = async (
  prompt: string,
  imageBase64: string,
  mimeType: string,
  aspectRatio: '16:9' | '9:16'
): Promise<string> => {
  // As per guidelines for Veo, create a new GoogleGenAI instance right before the API call
  // to ensure it uses the most up-to-date API key from the dialog.
  const videoAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    let operation = await videoAI.models.generateVideos({
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
      },
    });

    // Polling for completion
    while (!operation.done) {
      // Wait for 10 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await videoAI.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video generation did not return a download link.");
    }
    
    return downloadLink;
  } catch (error) {
    console.error("Error in generateVideo service:", error);
    // Rethrow to be handled by the component
    throw error;
  }
};
