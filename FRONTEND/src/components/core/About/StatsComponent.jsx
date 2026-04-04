
import React from 'react';
import CountUp from 'react-countup'; // 1. Import the new library
import { useInView } from 'react-intersection-observer'; // To trigger animation on scroll

const Stats = [
  { count: 5000, label: 'Active Students', suffix: 'K+' },
  { count: 10, label: 'Mentors', suffix: '+' },
  { count: 200, label: 'Courses', suffix: '+' },
  { count: 50, label: 'Awards', suffix: '+' },
];

const StatsComponent = () => {

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
  
<div>
      <div className="bg-warm-stone/10 w-full" ref={ref}>
     
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="#FFF1F0" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      
      <div className="w-11/12 max-w-maxContent mx-auto px-4 py-1">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-espresso-brown">
          {Stats.map((data, index) => (
            <div
              key={index}
              className="text-center px-6 py-4 transition-transform duration-300 hover:scale-105"
            >
              <h1 className="text-5xl font-bold text-burnt-sienna">
               
                {inView && (
                  <CountUp 
                    start={0} 
                    end={data.count} 
                    duration={2.5} 
                    separator="," 
                    
                    formattingFn={(value) => {
                      if (data.suffix === 'K+') return `${value / 1000}K+`;
                      return `${value}${data.suffix}`;
                    }}
                  />
                )}
              </h1>
              <h2 className="text-lg mt-2 text-espresso-brown/80">{data.label}</h2>
            </div>
          ))}
        </div>
      </div>

     
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="#FFF1F0" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,101L1392,101C1344,101,1248,101,1152,101C1056,101,960,101,864,101C768,101,672,101,576,101C480,101,384,101,288,101C192,101,96,101,48,101L0,101Z"></path>
        </svg>
      </div>
    </div>
</div>
  );
};

export default StatsComponent;
