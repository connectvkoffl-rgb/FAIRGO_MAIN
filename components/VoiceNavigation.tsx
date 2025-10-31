
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { CmsContext } from '../context/CmsContext';
import { MicrophoneIcon, StopCircleIcon } from './icons';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceNavigation: React.FC = () => {
    const { content } = useContext(CmsContext);
    const [isListening, setIsListening] = useState(false);
    const [continuousMode, setContinuousMode] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    
    const recognitionRef = useRef<any>(null);
    const timeoutRef = useRef<number | null>(null);
    const scrollIntervalRef = useRef<number | null>(null);
    const continuousModeRef = useRef(continuousMode);

    useEffect(() => {
        continuousModeRef.current = continuousMode;
    }, [continuousMode]);

    const showFeedback = (message: string) => {
        setFeedback(message);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => setFeedback(''), 3000);
    };

    const stopAutoScroll = useCallback(() => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    }, []);
    
    const startAutoScroll = useCallback(() => {
        stopAutoScroll(); // Ensure no multiple intervals
        scrollIntervalRef.current = window.setInterval(() => {
            window.scrollBy(0, 1);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopAutoScroll();
            }
        }, 15);
    }, [stopAutoScroll]);

    const handleContinuousToggle = useCallback((enable: boolean) => {
        setContinuousMode(enable);
        if (recognitionRef.current) {
            if (enable && !isListening) {
                recognitionRef.current.start();
            } else if (!enable && isListening) {
                recognitionRef.current.stop();
            }
        }
    }, [isListening]);

    const processCommand = useCallback((transcript: string) => {
        stopAutoScroll();
        const command = content.voiceNavigation.commands.find(cmd => 
            cmd.keywords.some(keyword => transcript.includes(keyword))
        );

        if (command) {
            showFeedback(command.feedback);
            switch (command.type) {
                case 'navigate':
                    if (command.target.startsWith('#')) {
                        const element = document.querySelector(command.target);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.hash = command.target;
                    }
                    break;
                case 'quick_view':
                    const currentScroll = window.scrollY;
                    const element = document.querySelector(command.target);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            window.scrollTo({ top: currentScroll, behavior: 'smooth' });
                        }, 4000); // Increased pause time
                    }
                    break;
                case 'action':
                    const actionMap: Record<string, () => void> = {
                        'GO_BACK': () => window.history.back(),
                        'GO_FORWARD': () => window.history.forward(),
                        'OPEN_CHAT': () => document.getElementById('chat-open-button')?.click(),
                        'CLOSE_CHAT': () => {
                            const closeButton = document.querySelector('[aria-label="Close chat"]');
                            if (closeButton instanceof HTMLElement) closeButton.click();
                        },
                        'SCROLL_DOWN': startAutoScroll,
                        'SCROLL_STOP': stopAutoScroll,
                        'START_CONTINUOUS': () => handleContinuousToggle(true),
                        'STOP_CONTINUOUS': () => handleContinuousToggle(false),
                    };
                    actionMap[command.target]?.();
                    break;
            }
        } else {
            showFeedback("Command not recognized.");
        }
    }, [content.voiceNavigation.commands, startAutoScroll, stopAutoScroll, handleContinuousToggle]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition API not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        
        recognition.onend = () => {
            setIsListening(false);
            if (continuousModeRef.current) {
                setTimeout(() => {
                    try {
                        recognitionRef.current?.start();
                    } catch (e) {
                        // Ignore errors if recognition is already starting
                    }
                }, 100);
            }
        };
        
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
             if (event.error === 'aborted' || event.error === 'no-speech') {
                // Ignore these common, non-critical errors.
            } else {
                showFeedback("Voice recognition error.");
            }
        };
        
        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            const transcript = finalTranscript.toLowerCase().trim();
            if (transcript) {
                processCommand(transcript);
            }
        };
        
        recognitionRef.current = recognition;

    }, [processCommand]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        stopAutoScroll();

        if (isListening) {
            handleContinuousToggle(false);
        } else {
            if (!sessionStorage.getItem('voiceHelpShown')) {
                setShowHelp(true);
                setTimeout(() => setShowHelp(false), 3000);
                sessionStorage.setItem('voiceHelpShown', 'true');
            }
            // Unify behavior to always toggle continuous mode
            handleContinuousToggle(true);
        }
    };

    return (
        <>
            {/* Desktop Button */}
            <button
                id="voice-nav-button"
                onClick={toggleListening}
                className={`hidden md:flex fixed bottom-5 right-24 w-16 h-16 rounded-full items-center justify-center shadow-lg transform hover:scale-110 transition-all z-50 ${
                    continuousMode ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-black'
                }`}
                aria-label={continuousMode ? "Stop Voice Navigation" : "Start Voice Navigation"}
            >
                 {continuousMode ? (
                    <StopCircleIcon className="w-8 h-8" />
                ) : (
                    <MicrophoneIcon className="w-8 h-8" />
                )}
            </button>

            {/* Mobile Button */}
            <button
                onClick={toggleListening}
                className={`md:hidden fixed bottom-20 left-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 ${
                    continuousMode ? 'bg-red-500 text-white animate-pulse' : 'bg-cyan-500 text-white'
                }`}
                aria-label={continuousMode ? "Stop Voice Navigation" : "Start Voice Navigation"}
            >
                {continuousMode ? (
                    <StopCircleIcon className="w-7 h-7" />
                ) : (
                    <MicrophoneIcon className="w-7 h-7" />
                )}
            </button>

            {feedback && (
                <div className="fixed bottom-24 right-5 bg-black/70 text-white text-sm px-4 py-2 rounded-md z-50 animate-fade-in-up">
                    {feedback}
                </div>
            )}
            
            {showHelp && (
                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 text-center">
                        <h3 className="text-xl font-semibold text-white mb-4">Voice Commands</h3>
                        <p className="text-gray-400 mb-4">Try saying one of these:</p>
                        <div className="space-y-2 text-cyan-400">
                            <p>"Show me blog posts"</p>
                            <p>"Auto scroll"</p>
                            <p>"Quick view footer"</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
