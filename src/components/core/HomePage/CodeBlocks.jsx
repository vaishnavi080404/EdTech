import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

// This version uses your new structure and integrates our premium styling.
const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1, // Using your new prop name
    ctabtn2, // Using your new prop name
    codeblock,
    // The backgroundGradient and codeColor props are now handled by our theme for consistency
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

            {/* Section 1: Heading, Subheading, and Buttons */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}

                {/* Sub Heading with our theme's color */}
                <div className="text-soft-terracotta/80 text-base font-medium w-[85%] -mt-3">
                    {subheading}
                </div>

                {/* Button Group */}
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2: Code Animation Block with Gradient Sphere */}
            <div className="relative h-fit w-[100%] lg:w-[470px] shadow-2xl rounded-xl">
                
                {/* The Gradient Sphere Effect */}
                <div className="absolute -top-10 left-10 w-80 h-80 bg-gradient-to-br from-rose-gold via-burnt-sienna to-warm-stone rounded-full opacity-20 blur-3xl animate-sphere-pulse z-0"></div>


                {/* The Glassmorphism Card */}
                <div className="relative z-10 flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 bg-burnt-sienna/5 border border-warm-stone/20 rounded-xl backdrop-blur-md">
                    {/* Line Numbers */}
                    
                   
                    <div className="text-center flex flex-col w-[10%] select-none text-light-gray/50 font-inter font-bold">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>

                    {/* Codes with our theme's accent color */}
                    <div className="w-[90%] flex flex-col gap-2 font-bold font-mono text-blue-300 pr-2">
                        <TypeAnimation
                            sequence={[codeblock, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            style={{
                                whiteSpace: "pre-line",
                                display: "block",
                                fontSize: "16px",
                            }}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;

// import React from 'react'
// import CTAButton from "../HomePage/Button"
// import HighlightText from './HighlightText'
// import {FaArrowRight} from "react-icons/fa"
// import { TypeAnimation } from 'react-type-animation'

// const CodeBlocks = ({
//   position, heading, subheading, ctabutton1, ctabutton2, codeblock, backgroundGradient, codeColor
// }) => {
//   return (
//     <div className={`flex ${position} my-20 justify-between gap-10 `}>
//       <div className='w-[50%] flex flex-col gap-8 '>
//         {heading}
//         <div className='text-gray-600 font-bold '>
//           {subheading}
//         </div>
        
//         <div className='flex gap-7 mt-5 mb-10'>
//           <CTAButton active={ctabutton1.active} linkto={ctabutton1.linkto}>
//             <div className='flex gap-2 items-center'>
//               {ctabutton1.btnText}
//               <FaArrowRight/>

//             </div>

//           </CTAButton>
//           <CTAButton active={ctabutton2.active} linkto={ctabutton2.linkto}>
//                 {ctabutton2.btnText}
//           </CTAButton>

//         </div>


        
//       </div>
//       <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]'>
//       <div className='flex flex-col text-center w-[10%] text-gray-50 font inter font-bold'>
//         <p>1</p>
//         <p>2</p>
//         <p>3</p>
//         <p>4</p>
//         <p>5</p>
//         <p>6</p>
//         <p>7</p>
//         <p>8</p>
//         <p>9</p>
//         <p>10</p>
//       </div>

//       <pre className="w-[90%] flex flex-col gap-2 font-mono whitespace-pre-wrap overflow-x-auto text-white">
//       <code>
//         <TypeAnimation
//           sequence={[codeblock, 2000, '']}
//           speed={70}
//           repeat={Infinity}
//           cursor={true}
//           omitDeletionAnimation={true}
//           style={{
//             whiteSpace: 'pre-line',
//             display: 'block',
//           }}
//         />
//       </code>
//     </pre>

      
//       </div>


      
//     </div>
//   )
// }

// export default CodeBlocks

// import React from 'react'
// import CTAButton from "../HomePage/Button"
// import HighlightText from './HighlightText'
// import {FaArrowRight} from "react-icons/fa"
// import { TypeAnimation } from 'react-type-animation'

// const CodeBlocks = ({ position, heading, subheading, ctabutton1, ctabutton2, codeblock }) => {
//   return (
//     <div className={`flex ${position} my-20 justify-between gap-10 items-center`}>
//       <div className='w-full lg:w-[50%] flex flex-col gap-8'>
//         {heading}
//         {/* Text is now light-gray for the dark theme */}
//         <div className='text-light-gray/80 font-medium text-base'>
//           {subheading}
//         </div>
//         <div className='flex gap-7 mt-7'>
//           <CTAButton active={ctabutton1.active} linkto={ctabutton1.linkto}>
//             <div className='flex gap-2 items-center'>{ctabutton1.btnText}<FaArrowRight/></div>
//           </CTAButton>
//           <CTAButton active={ctabutton2.active} linkto={ctabutton2.linkto}>
//             {ctabutton2.btnText}
//           </CTAButton>
//         </div>
//       </div>
      
//       {/* Code animation block styled for dark theme */}
//       <div className='h-fit flex flex-row text-sm w-full lg:w-[500px] bg-mid-gray/50 border border-light-gray/20 rounded-xl p-4 backdrop-blur-sm shadow-lg'>
//         <div className='text-center flex flex-col w-[10%] select-none text-light-gray/50 font-mono font-bold'>
//           <p>1</p>
//           <p>2</p>
//           <p>3</p>
//           <p>4</p>
//           <p>5</p>
//           <p>6</p>
//           <p>7</p>
//           <p>8</p>
//           <p>9</p>
//           <p>10</p>
//           <p>11</p>
//         </div>

//         {/* Animated Code */}
//         {/* Text color is now the vibrant accent color for a branded feel */}
//          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-burnt-sienna pr-2`}>
//           <TypeAnimation sequence={[codeblock, 2000, '']} repeat={Infinity} cursor={true} omitDeletionAnimation={true} style={{ whiteSpace: 'pre-line', display: 'block' }} />
//         </div>
//       </div>
//     </div>
//   )
// }
// export default CodeBlocks