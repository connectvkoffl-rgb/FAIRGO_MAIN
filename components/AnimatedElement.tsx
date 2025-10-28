
import React, { useRef, useEffect, useState } from 'react';

type AnimationVariant = 'up' | 'left' | 'right' | 'scale';

interface AnimatedElementProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  variant?: AnimationVariant;
}

const variantMap: Record<AnimationVariant, string> = {
  up: 'animate-fade-in-up',
  left: 'animate-fade-in-left',
  right: 'animate-fade-in-right',
  scale: 'animate-scale-in',
};

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  as: Tag = 'div', 
  children, 
  className = '', 
  delay = 0,
  style = {},
  variant = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } 
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClass = variantMap[variant] || variantMap.up;

  const animationStyle = {
    ...style,
    animationDelay: `${delay}ms`,
  };

  return (
    <Tag
      ref={ref}
      className={`${className} ${isVisible ? `${animationClass} animate-on-visible` : 'opacity-0'}`}
      style={animationStyle}
    >
      {children}
    </Tag>
  );
};