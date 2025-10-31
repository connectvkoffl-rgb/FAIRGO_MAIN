import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <img src="/assets/Fairgo_logo.png" alt="FAIRGO Logo" className="w-auto h-full object-contain" style={{maxHeight: 'calc(100% - 1rem)'}} />
            <span className="text-xs text-gray-400 text-center -mt-1 tracking-wider">
                everywhere you go
            </span>
        </div>
    );
};
