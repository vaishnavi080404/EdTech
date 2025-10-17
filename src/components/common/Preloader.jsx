// src/components/common/Preloader.jsx

import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa'; // Using a rocket icon

const Preloader = ({ onAnimationEnd }) => {
  const [stage, setStage] = useState('wiggle'); // Controls the animation sequence
  const siteName = "EDTECH";

  useEffect(() => {
    // This effect controls the sequence of animations
    const launchTimer = setTimeout(() => {
      setStage('launch');
    }, 1500); // Wiggle for 1.5 seconds

    const textTimer = setTimeout(() => {
      setStage('text');
    }, 1800); // Text appears shortly after launch

    const endTimer = setTimeout(() => {
      setStage('end');
      // Call the onAnimationEnd prop after the full sequence is complete
      setTimeout(onAnimationEnd, 500); // Wait for the fade-out to finish
    }, 3000); // Total duration before fade-out starts

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(textTimer);
      clearTimeout(endTimer);
    };
  }, [onAnimationEnd]);

  return (
    // Main container with a vibrant gradient background
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center 
        bg-gradient-to-br from-[#4A3F35] via-[#212529] to-[#0D5C63]
        transition-opacity duration-500
        ${stage === 'end' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Rocket and Smoke Container */}
      <div className="relative w-48 h-48 mb-8">
        {/* The Rocket */}
        <div
          className={`
            absolute top-0 left-1/2 -translate-x-1/2 text-7xl text-soft-terracotta
            ${stage === 'wiggle' ? 'animate-rocket-wiggle' : ''}
            ${stage === 'launch' || stage === 'text' || stage === 'end' ? 'animate-rocket-launch' : ''}
          `}
          style={{ animationFillMode: 'forwards' }}
        >
          <FaRocket className="transform -rotate-45" />
        </div>
        
        {/* Smoke Clouds - these only appear during launch */}
        {(stage === 'launch' || stage === 'text') && (
          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="w-12 h-12 bg-light-gray rounded-full animate-smoke-puff" style={{ animationDelay: '0s' }}></div>
            <div className="w-16 h-16 bg-light-gray rounded-full animate-smoke-puff" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-12 h-12 bg-light-gray rounded-full animate-smoke-puff" style={{ animationDelay: '0.1s' }}></div>
          </div>
        )}
      </div>

      {/* Site Name Text */}
      <div className="flex" aria-label={siteName}>
        {siteName.split('').map((letter, index) => (
          <span
            key={index}
            className={`
              text-4xl md:text-6xl font-bold text-soft-terracotta
              transition-opacity duration-300
              ${stage === 'text' || stage === 'end' ? 'opacity-100 animate-text-pop-in' : 'opacity-0'}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;