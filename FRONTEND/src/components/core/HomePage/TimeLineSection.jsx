
import React from 'react';
import { SlBadge } from "react-icons/sl";
import { FaUserShield, FaHandsHelping, FaLightbulb } from "react-icons/fa";
import timeline from '../../../assets/timeline.png';
import { useInView } from 'react-intersection-observer'; 


const timeLine = [
 {
    Logo: SlBadge,
    heading: "Leadership",
    description: "Fully committed to success company",
    color: "text-red-500",
  },
  {
    Logo: FaUserShield,
    heading: "Responsibility",
    description: "Takes ownership of tasks and outcomes",
    color: "text-blue-500",
  },
  {
    Logo: FaHandsHelping,
    heading: "Flexibility",
    description: "Adapts to changing circumstances with ease",
    color: "text-green-500",
  },
  {
    Logo: FaLightbulb,
    heading: "Solve the Problem",
    description: "Innovative thinker with practical solutions",
    color: "text-yellow-500",
  },
];

const TimeLineSection = () => {
  
  const { ref, inView } = useInView({
    threshold: 0.2, 
    triggerOnce: true, 
  });

  return (

    <div ref={ref}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        
       
        <div className="lg:w-[45%] flex flex-col gap-14 relative">
          
          <div className="absolute left-[28px] top-0 h-full w-0.5 border-l-2 border-dotted border-warm-stone z-0"></div>

          {timeLine.map((element, index) => {
            const IconComponent = element.Logo;
            const isEven = index % 2 === 0;

            return (

              <div 
                className={`
                  flex flex-row gap-6 items-center group relative z-10 
                  transition-all duration-500
                  ${inView ? 'opacity-100' : 'opacity-0'}
                  ${inView ? (isEven ? 'animate-fadeIn-left' : 'animate-fadeIn-right') : ''}
                `}
                
                style={{ transitionDelay: `${index * 200}ms` }}
                key={index}
              >
               
                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-soft-terracotta shadow-lg border-2 border-white 
                              transition-all duration-300 group-hover:scale-110">
                  <IconComponent className={`text-2xl ${element.color}`} />
                </div>

               
                <div className="transition-all duration-300 group-hover:translate-x-2">
                  <h2 className="font-semibold text-[18px] text-espresso-brown">{element.heading}</h2>
                  <p className="text-base text-espresso-brown/80">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>

       
        <div className={`
          relative shadow-lg lg:w-[55%]
          transition-all duration-500
          ${inView ? 'opacity-100' : 'opacity-0'}
          ${inView ? 'animate-fadeIn-right' : ''}
        `}
        style={{ transitionDelay: '800ms' }}
        >
          <img 
            src={timeline}
            alt='timelineimage'
            className='shadow-2xl shadow-burnt-sienna/20 object-cover h-fit rounded-lg'
          />
          <div className='absolute bg-rose-950 flex flex-col lg:flex-row text-white uppercase py-7
                          left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-2xl hover:scale-110 transition-all duration-300'>
            <div className='flex flex-row gap-5 items-center border-r border-warm-stone px-8'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-burnt-sienna text-sm font-medium leading-tight'>Years of <br/> Experience</p>
            </div>
            <div className='flex flex-row gap-5 items-center px-8'>
              <p className='text-3xl font-bold'>250</p>
              <p className='text-burnt-sienna text-sm font-medium leading-tight'>Types of <br/> Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;

