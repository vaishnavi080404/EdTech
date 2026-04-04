import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaRobot } from 'react-icons/fa'; 
import CTAButton from '../components/core/HomePage/Button'; 

const Error = () => {
  return (

    <div className='flex items-center justify-center min-h-screen bg-soft-terracotta text-espresso-brown text-center px-4 overflow-hidden'>
      <div className="relative w-full max-w-lg">
        
        
        <div className="absolute -top-16 -left-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <FaRobot className="text-warm-stone/30 text-8xl transform -rotate-12 animate-float" />
        </div>
        <div className="absolute -bottom-12 -right-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <FaCog className="text-warm-stone/30 text-7xl animate-spin-slow" />
        </div>
        <div className="absolute top-24 -right-20 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <FaCog className="text-warm-stone/20 text-4xl animate-spin-slow" style={{ animationDuration: '15s' }} />
        </div>

        <div className="relative z-10">
          <h1 className="text-7xl md:text-9xl font-black text-warm-stone/50 opacity-0 animate-fadeInUp">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Oops! Page Not Found
          </h2>
          
          <p className="text-espresso-brown/80 mt-4 max-w-sm mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            It seems the page you're looking for has taken a little detour into the digital cosmos. Don't worry, we can get you back on track.
          </p>
          
          <div className="mt-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <CTAButton active={true} linkto={"/"}>
              Go Back Home
            </CTAButton>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Error;