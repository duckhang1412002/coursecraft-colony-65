
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
  once?: boolean;
}

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  duration = 500,
  className,
  once = true,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // Set initial styles based on direction
  const getInitialStyles = () => {
    const baseStyles = { opacity: 0, transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out` };
    const translateValue = '20px';
    
    switch (direction) {
      case 'up': return { ...baseStyles, transform: `translateY(${translateValue})` };
      case 'down': return { ...baseStyles, transform: `translateY(-${translateValue})` };
      case 'left': return { ...baseStyles, transform: `translateX(${translateValue})` };
      case 'right': return { ...baseStyles, transform: `translateX(-${translateValue})` };
      default: return baseStyles;
    }
  };

  // Set visible styles
  const getVisibleStyles = () => ({
    opacity: 1,
    transform: 'translate(0)',
    transitionDelay: `${delay}ms`,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      });
    });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once]);

  return (
    <div
      ref={domRef}
      className={cn("transition-all", className)}
      style={isVisible ? { ...getInitialStyles(), ...getVisibleStyles() } : getInitialStyles()}
    >
      {children}
    </div>
  );
};

export default FadeIn;
