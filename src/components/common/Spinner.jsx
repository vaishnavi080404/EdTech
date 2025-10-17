// src/components/common/Spinner.jsx

import React from 'react';

const Spinner = () => {
  return (
    // Main container for the spinner, designed to be centered on a full page or within a smaller container
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      
      {/* The Animated SVG Coffee Cup */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M80 50c0-13.8-11.2-25-25-25S30 36.2 30 50v25h50V50z"
          stroke="#4A3F35" // espresso-brown
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M30 65h50v10H30z"
          fill="#4A3F35" // espresso-brown
        />
        <path
          d="M80 55h7c4.4 0 8 3.6 8 8v1c0 4.4-3.6 8-8 8h-7"
          stroke="#4A3F35" // espresso-brown
          strokeWidth="6"
          fill="none"
        />
        {/* Animated Steam Lines */}
        <g stroke="#8D837C" strokeWidth="4" strokeLinecap="round">
          <path d="M40 40 Q 45 30 50 40 T 60 40">
            <animate
              attributeName="d"
              values="M40 40 Q 45 30 50 40 T 60 40; M40 40 Q 45 50 50 40 T 60 40; M40 40 Q 45 30 50 40 T 60 40"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M45 30 Q 50 20 55 30 T 65 30">
            <animate
              attributeName="d"
              values="M45 30 Q 50 20 55 30 T 65 30; M45 30 Q 50 40 55 30 T 65 30; M45 30 Q 50 20 55 30 T 65 30"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
      
      {/* Animated Text */}
      <p className="text-lg font-semibold text-espresso-brown/80 animate-pulse">
        Brewing your content...
      </p>

    </div>
  );
};

export default Spinner;