// FIX: Add webkitAudioContext to the global Window interface to support older Safari versions and resolve TypeScript errors.
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { CmsContext } from '../context/CmsContext';
import { CloseIcon, MicrophoneIcon, PhoneIcon } from './icons';
import { Logo } from './Logo';

// Audio Encoding/Decoding functions as per Gemini documentation
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
}

interface TranscriptItem {
    id: number;
    speaker: 'user' | 'agent';
    text: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const { content } = useContext(CmsContext);
    const [status, setStatus] = useState<'idle' | 'initializing' | 'listening' | 'speaking' | 'ended'>('idle');
    const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef(0);

    const cleanup = useCallback(() => {
        sessionPromiseRef.current?.then(session => session.close());
        sessionPromiseRef.current = null;
        
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;

        scriptProcessorRef.current?.disconnect();
        scriptProcessorRef.current = null;

        inputAudioContextRef.current?.close();
        outputAudioContextRef.current?.close();
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;

        sourcesRef.current.forEach(source => source.stop());
        sourcesRef.current.clear();
        nextStartTimeRef.current = 0;

        setStatus('idle');
        setTranscript([]);
    }, []);

    const handleClose = () => {
        cleanup();
        onClose();
    };

    const startConversation = async () => {
        if (status !== 'idle') return;

        setStatus('initializing');
        setTranscript([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const bookingAgent = content.chatbot.agents.find(a => a.name.toLowerCase().includes("booking")) || content.chatbot.agents[0];
            
            inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

            mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setStatus('listening');
                        const source = inputAudioContextRef.current!.createMediaStreamSource(mediaStreamRef.current!);
                        scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle transcriptions
                        if (message.serverContent?.inputTranscription) {
                            const text = message.serverContent.inputTranscription.text;
                            setTranscript(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.speaker === 'user' && !message.serverContent.turnComplete) {
                                    const newTranscript = [...prev];
                                    newTranscript[newTranscript.length - 1] = { ...last, text: last.text + text };
                                    return newTranscript;
                                }
                                return [...prev, { id: Date.now() + Math.random(), speaker: 'user', text }];
                            });
                        }
                        if (message.serverContent?.outputTranscription) {
                            const text = message.serverContent.outputTranscription.text;
                            setTranscript(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.speaker === 'agent' && !message.serverContent.turnComplete) {
                                    const newTranscript = [...prev];
                                    newTranscript[newTranscript.length - 1] = { ...last, text: last.text + text };
                                    return newTranscript;
                                }
                                return [...prev, { id: Date.now() + Math.random(), speaker: 'agent', text }];
                            });
                        }

                        // Handle audio playback
                        const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64EncodedAudioString) {
                            setStatus('speaking');
                            const outputAudioContext = outputAudioContextRef.current!;
                            nextStartTimeRef.current = Math.max(
                                nextStartTimeRef.current,
                                outputAudioContext.currentTime,
                            );
                            const audioBuffer = await decodeAudioData(
                                decode(base64EncodedAudioString),
                                outputAudioContext,
                                24000,
                                1,
                            );
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContext.destination);
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                                if (sourcesRef.current.size === 0) {
                                    setStatus('listening');
                                }
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        const interrupted = message.serverContent?.interrupted;
                        if (interrupted) {
                            for (const source of sourcesRef.current.values()) {
                                source.stop();
                                sourcesRef.current.delete(source);
                            }
                            nextStartTimeRef.current = 0;
                            setStatus('listening');
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live session error:', e);
                        setStatus('ended');
                    },
                    onclose: (e: CloseEvent) => {
                        setStatus('ended');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    outputAudioTranscription: {}, // Enable transcription for model output
                    inputAudioTranscription: {},  // Enable transcription for user input
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                    },
                    systemInstruction: bookingAgent?.systemInstruction,
                },
            });
        } catch (error) {
            console.error("Failed to start conversation:", error);
            setStatus('ended');
        }
    };
    
    useEffect(() => {
        if (!isOpen) {
            cleanup();
        }
    }, [isOpen, cleanup]);
    
    const getStatusText = () => {
        switch(status) {
            case 'idle': return 'Click below to start a conversation with our AI agent.';
            case 'initializing': return 'Initializing session... Please wait.';
            case 'listening': return 'Listening...';
            case 'speaking': return 'Agent is speaking...';
            case 'ended': return 'Conversation ended. Thank you!';
            default: return '';
        }
    };
    
    const isConversationActive = status === 'listening' || status === 'speaking';
    
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl h-[80vh] max-h-[700px] bg-gray-900 border border-gray-700 rounded-lg shadow-xl flex flex-col">
                        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-white">Book a Call with our Voice AI</h3>
                            <button onClick={handleClose} className="text-gray-400 hover:text-white">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col p-6 overflow-hidden">
                             <div className="flex-shrink-0 text-center mb-6">
                                <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                    <div className={`absolute inset-0 rounded-full bg-cyan-500/10 transition-all duration-500 ${isConversationActive ? 'scale-100' : 'scale-0'}`} />
                                    {status === 'speaking' && <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />}
                                    <Logo className={`h-16 transition-opacity duration-300 ${isConversationActive ? 'opacity-100' : 'opacity-60'}`} />
                                </div>
                                <p className="text-gray-400 h-5">{getStatusText()}</p>
                            </div>
                            <div className="flex-1 p-4 bg-black/30 rounded-lg border border-gray-800 overflow-y-auto">
                               {transcript.length === 0 && (
                                    <p className="text-center text-gray-500">Live transcript will appear here...</p>
                                )}
                                <div className="space-y-3">
                                {transcript.map(item => (
                                    <div key={item.id} className={`flex ${item.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${item.speaker === 'user' ? 'bg-cyan-600/50 text-white' : 'bg-gray-700/50 text-gray-300'}`}>
                                            {item.text}
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0 p-4 border-t border-gray-700 text-center">
                            {status === 'idle' && (
                                <button onClick={startConversation} className="flex items-center gap-2 mx-auto bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                                    <PhoneIcon className="w-5 h-5" />
                                    Start Voice Conversation
                                </button>
                            )}
                             {isConversationActive && (
                                <button onClick={handleClose} className="flex items-center gap-2 mx-auto bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-500 transition-colors">
                                    <PhoneIcon className="w-5 h-5" />
                                    End Conversation
                                </button>
                            )}
                             {status === 'ended' && (
                                 <button onClick={handleClose} className="flex items-center gap-2 mx-auto bg-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-500 transition-colors">
                                    <CloseIcon className="w-5 h-5" />
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};