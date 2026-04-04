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
    
    <div className="explore-more-bg w-full pt-16 pb-24 relative z-10 -mt-20">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center">
        
        
        <div className="text-4xl font-semibold text-center text-white">
          Unlock the <HighlightText text={"Power of Code"} />
        </div>
        <p className="text-soft-terracotta/80 text-[16px] mt-3">
          Learn to build anything you can imagine
        </p>

        
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

        
       <div className="w-full relative -mb-[300px] pb-30 "> 
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

