
// A fallback AI service in case the primary one (Puter.js) is unavailable.
// This could be a direct API call to another provider or a simpler, less powerful model.

const MOCK_RESPONSES: Record<string, string> = {
    "tagline": "AI-Powered Automation for Modern Business.",
    "description": "This service provides cutting-edge AI solutions to enhance efficiency and drive growth.",
    "copyright": `© ${new Date().getFullYear()} FAIRGO. All rights reserved.`,
    "default": "This is AI-generated content based on your request."
};

/**
 * A fallback text generation function.
 * @param {string} prompt - The prompt to generate text for.
 * @returns {Promise<string>} The generated text.
 */
export const generateTextFallback = async (prompt: string): Promise<string> => {
    console.warn("Using fallback AI service.");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple keyword matching for mock responses
    for (const key in MOCK_RESPONSES) {
        if (prompt.toLowerCase().includes(key)) {
            return MOCK_RESPONSES[key];
        }
    }

    return MOCK_RESPONSES['default'];
};
