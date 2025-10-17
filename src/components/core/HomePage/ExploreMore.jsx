import React, { useState } from 'react';
import HighlightText from './HighlightText';
import { HomePageExplore } from "../../../data/HomePageExplore";
import CourseCard from "./CourseCard";
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';

const tabsName = [
  "Free",
  "New to Coding",
  "Skill Paths",
  "Career Paths"
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0]?.courses || []);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0]?.courses[0]?.heading || "");

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0]?.courses || []);
    setCurrentCard(result[0]?.courses[0]?.heading || "");
  };


 return (
    // Use the new class for the subtle background pattern
    <div className="explore-more-bg w-full pt-16 pb-24 relative z-10 -mt-20">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-4xl font-semibold text-center text-white">
          Unlock the <HighlightText text={"Power of Code"} />
        </div>
        <p className="text-soft-terracotta/80 text-[16px] mt-3">
          Learn to build anything you can imagine
        </p>

        {/* Tabs */}
        <div className="mt-5 flex flex-row rounded-full bg-espresso-brown/50 border border-warm-stone/50 mb-10 p-1 shadow-inner">
          {tabsName.map((element) => (
            <div
              key={element}
              className={`text-[16px] flex items-center
              ${currentTab === element 
                ? "bg-warm-stone text-white font-semibold shadow-md" 
                : "text-soft-terracotta"}
              rounded-full transition-all duration-300 cursor-pointer hover:bg-warm-stone/50 px-7 py-2`}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          ))}
        </div>

        {/* Course Cards Grid */}
       <div className="w-full relative -mb-[300px] pb-30 "> {/* Significantly increased negative margin */}
         <div className="flex flex-wrap gap-6 justify-center mt-5">
            {courses.map((element, index) => (
              <CourseCard key={index} cardData={element} setCurrentCard={setCurrentCard} currentCardName={currentCard} />
            ))}
                    <div className="flex flex-row gap-7 mt-1">
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                    Explore Full Catalog
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
                Learn More
            </CTAButton>
        </div>
          </div>
          
        </div>

        


      </div>
    </div>
  );
};

export default ExploreMore;

//   return (
//     <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center text-white relative z-10">

//       {/* Heading */}
//       <div className="text-4xl font-semibold text-center mt-16">
//         Unlock the <HighlightText text={"Power of Code"} />
//       </div>

//       <p className="text-gray-300 text-[16px] mt-3">
//         Learn to build anything you can imagine
//       </p>

//       {/* Tabs */}
//       <div className="mt-5 flex flex-row rounded-full bg-gray-900 border-gray-700 mb-5 px-1 py-1 relative z-20 shadow-inner"> {/* Darker background for tabs */}
//         {tabsName.map((element, index) => (
//           <div
//             key={index}
//             className={`text-[16px] flex flex-row items-center gap-2
//             ${currentTab === element ? "bg-gray-500 text-white font-semibold" : "text-gray-200"}
//             rounded-full transition-all duration-200 cursor-pointer hover:bg-gray-600 hover:text-white px-7 py-2 gap-2`}
//             onClick={() => setMyCards(element)}
//           >
//             {element}
//           </div>
//         ))}
//       </div>

//       {/* Courses - positioned to overlap */}
//         <div className="w-full relative -mb-[200px] pb-30 "> {/* Significantly increased negative margin */}
//         <div className="flex flex-wrap gap-6 justify-center mt-5">
//           {courses.map((element, index) => (
//             <CourseCard
//               key={index}
//               cardData={element}
//               setCurrentCard={setCurrentCard}
//               currentCardName={currentCard} // Pass currentCard to CourseCard
//             />
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ExploreMore;

//  return (
//     <div className="w-full bg-deep-navy py-16 relative z-10">
//       <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center">
//         <div className="text-4xl font-semibold text-center text-white">
//           Unlock the <HighlightText text={"Power of Code"} />
//         </div>
//         <p className="text-light-gray/80 text-[16px] mt-3">
//           Learn to build anything you can imagine
//         </p>

//         <div className="mt-5 flex flex-row rounded-full bg-black/50 border border-mid-gray mb-5 p-1 shadow-inner">
//           {tabsName.map((element) => (
//             <div
//               key={element}
//               className={`text-[16px] flex items-center
//               ${currentTab === element 
//                 ? "bg-mid-gray text-white font-semibold shadow-md" 
//                 : "text-light-gray"}
//               rounded-full transition-all duration-300 cursor-pointer hover:bg-mid-gray/50 px-7 py-2`}
//               onClick={() => setMyCards(element)}
//             >
//               {element}
//             </div>
//           ))}
//         </div>

//         <div className="w-full relative mt-5 pb-24">
//           <div className="flex flex-wrap gap-6 justify-center">
//             {courses.map((element, index) => (
//               <CourseCard key={index} cardData={element} setCurrentCard={setCurrentCard} currentCardName={currentCard} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ExploreMore;
