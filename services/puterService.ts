// This service handles all interactions with the Puter.js SDK.
declare const puter: any;

let isPuterReady = false;
let authPromise: Promise<boolean> | null = null;

const initializePuter = (): boolean => {
    if (typeof puter !== 'undefined' && puter.ai && puter.auth) {
        isPuterReady = true;
        return true;
    }
    console.warn("Puter.js SDK not found. AI features will be disabled.");
    return false;
};

/**
 * Ensures the user is signed in to Puter.
 * Manages a single sign-in promise to avoid multiple popups.
 * @returns {Promise<boolean>} A promise that resolves to true if the user is signed in.
 */
export const ensureAuthenticated = async (): Promise<boolean> => {
    if (!isPuterReady && !initializePuter()) {
        return false;
    }

    // If an authentication process is already underway, wait for it to complete.
    if (authPromise) {
        return authPromise;
    }
    
    // Start a new authentication process.
    authPromise = (async () => {
        try {
            const signedIn = await puter.auth.isSignedIn();
            if (signedIn) {
                return true;
            }
            // If not signed in, prompt the user.
            await puter.auth.signIn();
            // Verify sign-in was successful.
            return await puter.auth.isSignedIn();
        } catch (error) {
            console.error("Puter authentication failed:", error);
            return false;
        } finally {
            // Reset the promise once it's resolved or rejected.
            authPromise = null;
        }
    })();
    
    return authPromise;
};


/**
 * Generates text using Puter's AI chat model.
 * @param {string} prompt - The prompt to send to the AI.
 * @returns {Promise<string>} The AI-generated text.
 */
export const generateText = async (prompt: string): Promise<string> => {
    const isAuthenticated = await ensureAuthenticated();
    if (!isAuthenticated) {
        throw new Error("Puter authentication is required to use AI features.");
    }

    try {
        const response = await puter.ai.chat(prompt, { model: "gpt-5-nano" });
        if (response && response.choices && response.choices[0] && response.choices[0].message) {
            return response.choices[0].message.content;
        }
        throw new Error("Invalid response structure from Puter AI.");
    } catch (error) {
        console.error("Error generating text with Puter AI:", error);
        throw new Error("Failed to generate text. Please try again.");
    }
};