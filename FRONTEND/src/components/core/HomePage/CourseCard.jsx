import React from 'react';

const CourseCard = ({ cardData, setCurrentCard, index, currentCardName }) => {
  const isActive = cardData.heading === currentCardName;



  return (
    <div
      className={`w-[280px] h-[280px] cursor-pointer transition-all duration-300 group ${isActive ? 'relative' : ''}`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      
      {isActive && (
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-burnt-sienna rounded-lg z-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
      )}
      
    
      <div
        className={`
          w-full h-full p-6 flex flex-col justify-between relative z-10 rounded-lg
          transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1
          ${isActive 
            ? 'bg-soft-terracotta text-espresso-brown shadow-2xl' 
            : 'bg-warm-stone text-soft-terracotta hover:bg-rose-gold hover:shadow-xl'
          }
        `}
      >
        
        <div>
          <h3 className={`text-xl font-bold mb-3 pl-2 ${isActive ? 'text-espresso-brown' : 'text-white'}`}>
            {cardData.heading}
          </h3>
          <p className={`text-sm mt-2 line-clamp-3 pl-2 ${isActive ? 'text-espresso-brown/80' : 'text-soft-terracotta/80'}`}>
            {cardData.description}
          </p>
        </div>

      
        <div className={`
          flex items-center justify-between mt-auto pt-4 border-t text-sm font-medium
          ${isActive 
            ? 'border-warm-stone/20 text-burnt-sienna' 
            : 'border-soft-terracotta/20 text-soft-terracotta/70'
          }`}
        >
          <div>{cardData.level}</div>
          <div>{cardData.duration}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

