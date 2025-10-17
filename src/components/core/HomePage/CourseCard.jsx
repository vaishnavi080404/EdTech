import React from 'react';

const CourseCard = ({ cardData, setCurrentCard, index, currentCardName }) => {
  const isActive = cardData.heading === currentCardName;



  return (
    <div
      className={`w-[280px] h-[280px] cursor-pointer transition-all duration-300 group ${isActive ? 'relative' : ''}`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      {/* --- RE-INTRODUCED BACKGROUND BOX (ONLY FOR ACTIVE CARD) --- */}
      {isActive && (
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-burnt-sienna rounded-lg z-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
      )}
      
      {/* --- UNIFIED CARD STYLING --- */}
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
        {/* Card Content */}
        <div>
          <h3 className={`text-xl font-bold mb-3 pl-2 ${isActive ? 'text-espresso-brown' : 'text-white'}`}>
            {cardData.heading}
          </h3>
          <p className={`text-sm mt-2 line-clamp-3 pl-2 ${isActive ? 'text-espresso-brown/80' : 'text-soft-terracotta/80'}`}>
            {cardData.description}
          </p>
        </div>

        {/* Card Footer */}
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

//   return isActive ? (
//     <div
//       className="relative w-[280px] h-[280px] cursor-pointer group"
//       onClick={() => setCurrentCard(cardData.heading)}
//     >
//       {/* Yellow background box */}
//       <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400  z-0"></div>

//       {/* Foreground card */}
//       <div className="relative z-10 bg-white p-6 h-full w-full transition duration-300 
//                       group-hover:scale-[1.02] shadow-md flex flex-col justify-between">
//         {/* Heading */}
//         <h3 className="text-xl font-bold text-gray-900 mb-3 pl-2">
//           {cardData.heading}
//         </h3>

//         {/* Description */}
//         <p className="text-sm text-gray-600 mt-2 pl-2">
//           {cardData.description}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 text-sm text-blue-500 font-medium">
//           <div className="flex items-center gap-2">
//             <span className="text-blue-500">&#x2022;</span>
//             {cardData.level}
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-blue-500">&#x2022;</span>
//             {cardData.duration}
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div
//       className="w-[280px] h-[280px] p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer
//                  transition duration-300 hover:shadow-lg hover:scale-102 bg-gray-800 text-gray-200 border border-gray-700"
//       onClick={() => setCurrentCard(cardData.heading)}
//     >
//       {/* Heading */}
//       <h3 className="text-xl font-bold text-gray-50 mb-3 pl-2">{cardData.heading}</h3>

//       {/* Description */}
//       <p className="text-sm mt-2 line-clamp-3 text-gray-400 pl-2">{cardData.description}</p>

//       {/* Footer */}
//       <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700 text-blue-300 text-sm font-medium">
//         <div className="flex items-center gap-2">
//           <span className="text-blue-500">&#x2022;</span>
//           {cardData.level}
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-blue-500">&#x2022;</span>
//           {cardData.duration}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
//  return (
//     <div
//       className={`w-[280px] h-[280px] p-6 flex flex-col justify-between cursor-pointer
//                  transition-all duration-300 group
//                  ${isActive 
//                    ? 'bg-soft-terracotta text-espresso-brown shadow-2xl scale-105' 
//                    : 'bg-mid-gray text-light-gray hover:bg-black hover:shadow-xl'
//                  }`}
//       onClick={() => setCurrentCard(cardData.heading)}
//     >
//       <h3 className={`text-xl font-bold mb-3 pl-2 ${isActive ? 'text-espresso-brown' : 'text-white'}`}>
//         {cardData.heading}
//       </h3>
//       <p className={`text-sm mt-2 line-clamp-3 pl-2 ${isActive ? 'text-espresso-brown/80' : 'text-light-gray/80'}`}>
//         {cardData.description}
//       </p>
//       <div className={`flex items-center justify-between mt-auto pt-4 border-t text-sm font-medium
//                       ${isActive ? 'border-warm-stone/20 text-burnt-sienna' : 'border-light-gray/20 text-light-gray'}`}>
//         <div>{cardData.level}</div>
//         <div>{cardData.duration}</div>
//       </div>
//     </div>
//   );
// };
// export default CourseCard;
