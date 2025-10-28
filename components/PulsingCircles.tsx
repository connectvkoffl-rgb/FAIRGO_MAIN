
import React from 'react';

export const PulsingCircles: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none">
            <div className="relative w-1 h-1">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
                        style={{
                            animation: `pulse-ring 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite`,
                            animationDelay: `${i * 1}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
