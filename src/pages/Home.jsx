import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import homeVideo from '../assets/home.mp4'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div className='relative w-full'>

      {/* --- Section 1: DARK HERO with Aurora Background --- */}
      <div className='relative bg-espresso-brown text-soft-terracotta '>
        {/* The Aurora Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

        <video
          className="absolute opacity-10 top-[8px] left-0 z-0 w-full  object-cover"
          src={homeVideo} muted loop autoPlay playsInline
        />

        <div className='relative z-10 mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-center'>
          <Link to={"/signup"}>
            <div className='
              group 
              mt-16 p-1 mx-auto rounded-full w-fit
              font-bold text-white 
              transition-all duration-300
              bg-gradient-to-r from-rose-gold to-burnt-sienna
              hover:shadow-lg hover:shadow-burnt-sienna/40
              hover:scale-105
            '>
              <div className='
                flex items-center gap-2 rounded-full px-8 py-[6px]
                bg-espresso-brown 
                transition-all duration-300
                group-hover:bg-transparent
              '>
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>


          <div className='text-center text-4xl font-semibold mt-8'>
            Empower Your Future with <HighlightText text={"Coding Skills"} />
          </div>

          <div className='mt-4 w-[90%] text-center text-soft-terracotta/80'>
            With our coding courses, you can learn at your own pace...
          </div>

          <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
            <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
          </div>

<CodeBlocks
            position={"lg:flex-row"}
            heading={<div className='text-4xl font-semibold text-white'>Unlock your<HighlightText text={"coding potential"}/> with our online courses</div>}
            subheading={"Our courses are designed and taught by industry experts..."}
            ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }} // Changed to ctabtn1
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}   // Changed to ctabtn2
            codeblock={`<!DOCTYPE html>\n<html>\n  <head><title>Example</title></head>\n  <body>\n    <h1><a href="/">Header</a></h1>\n    <nav><a href="/one">One</a></nav>\n  </body>`}
             highlightedLines={[3, 7]}
          />

        <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={<div className='text-4xl font-semibold text-white'>Start your<HighlightText text={"learning journey"}/></div>}
            subheading={"No matter your experience level, we’ve got something for you..."}
            ctabtn1={{ btnText: "Get Started", linkto: "/signup", active: true }} // Changed to ctabtn1
            ctabtn2={{ btnText: "Explore", linkto: "/login", active: false }}   // Changed to ctabtn2
            codeblock={`import React from "react";\nconst App = () => {\n  return (\n    <div>Hello World!</div>\n  )\n}\nexport default App;`}
             highlightedLines={[2, 4]}
          />
          
        </div>

        <ExploreMore />
        
      </div>


 {/* --- Section 2: LIGHT SECTION with Wave Transition --- */}
      <div className='relative w-full bg-soft-terracotta text-espresso-brown '>
        <div className='h-[250px]'></div>
        {/* --- UPDATED: GRADIENT WAVE DIVIDER --- */}
        <div className="absolute -top-1 w-full z-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            {/* 1. Define the gradient inside a <defs> tag */}
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#B76E79' }} /> {/* rose-gold */}
                <stop offset="100%" style={{ stopColor: '#D95D39' }} /> {/* burnt-sienna */}
              </linearGradient>
            </defs>
            {/* 2. Apply the gradient to the path's fill attribute */}
            <path fill="url(#waveGradient)" d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,90.7C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className='relative z-10 mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 py-24'>
          <div className='flex flex-row gap-10 mt-12 items-center'>
            <div className='font-semibold text-4xl w-[45%]'>
              Get the skills you need for a <HighlightText text={"Job in Demand"} />
            </div>
            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-[16px] text-espresso-brown/80'>
                The modern Edtech dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>
      
      {/* --- Section 3: Final Section on Light Background --- */}
      <div className='relative w-full bg-soft-terracotta py-20'>
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8'>
          <InstructorSection />
          <h2 className='text-center text-4xl font-semibold mt-10 text-espresso-brown'>Reviews from other Learners</h2>
          <ReviewSlider />
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default Home;


// const Home = () => {
//   return (
//     <div  className='relative w-full'>

//          <video
//           className="absolute opacity-25 top-0 left-0 z-0 w-screen object-cover " // Full screen background styles
//           src={homeVideo}
//           muted
//           loop
//           autoPlay
//           playsInline
//         >
//         </video>

//       {/* Section 1 - Hero Section */}
//       <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
//       text-white justify-center '>
        
//         <Link to={"/signup"}>
//         <div className='group mt-16 p-1 mx-auto rounded-full bg-gray-900 font-bold text-gray-200
//         transition-all duration-200 hover:scale-95 w-fit shadow-lg '>
//             <div className='flex flex-row items-center gap-2 rounded-full px-8 py-[6px]
//             transition-all duration-200 group-hover:bg-black'>
//                 <p>Become an INSTRUCTOR</p>
//                 <FaArrowRight/>
//             </div>
//         </div>
//         </Link>

//         <div className='text-center text-4xl font-semibold mt-8'>
//             Empower Your Future with
//             <HighlightText text={"Coding Skills"}/>
//         </div>

//         <div className='mt-4  w-[90%] text-center text-gray-300'> {/* Added text-gray-300 for consistency */}
//             With our coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes and personalized feedback from instructor
//         </div>

//         <div className='flex flex-row gap-7 mt-8'>
//             <CTAButton active={true} linkto={"/signup"}>
//                 Learn More
//             </CTAButton>

//             <CTAButton active={false} linkto={"/login"}>
//                 Book a Demo
//             </CTAButton>

//         </div>

          

//         {/* Code Block 1 */}
//         <div>
//             <CodeBlocks
//             position={"lg:flex-row"}
//             heading={
//                 <div className='text-4xl font-semibold'>
//                     Unlock your
//                     <HighlightText text={"coding potential"}/>
//                     with our online courses
//                 </div>
//             }
//             subheading={
//                 "Our courses are designed and taught by industry experts who have years of experience in coding "
//             }
//             ctabutton1={
//                 {
//                     btnText:"Try it yourself",
//                     linkto:"/signup",
//                     active:true,
//                 }
//             }
//             ctabutton2={
//                 {
//                     btnText:"Learn more",
//                     linkto:"/login",
//                     active:false,
//                 }
//             }
//    codeblock={`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Instructor Button</title>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
// </head>`}
//         codeColor="text-yellow-400"
//       />
//         </div>

//         {/* Code Block 2 */}
//         <div>
//             <CodeBlocks
//             position={"lg:flex-row-reverse"}
//             heading={
//                 <div className='text-4xl font-semibold'>
//                     Start your
//                     <HighlightText text={"learning journey"}/> {/* Changed text here for differentiation */}
//                     with us
//                 </div>
//             }
//             subheading={
//                 "No matter your experience level, we’ve got something for you. Start now and grow your career." // Changed subheading
//             }
//             ctabutton1={
//                 {
//                     btnText:"Get Started", // Changed button text
//                     linkto:"/signup",
//                     active:true,
//                 }
//             }
//             ctabutton2={
//                 {
//                     btnText:"Explore", // Changed button text
//                     linkto:"/login",
//                     active:false,
//                 }
//             }
//    codeblock={`console.log("Hello World!");
// const user = { name: "John Doe", age: 30 };
// function greet(person) {
//   return \`Hello, \${person.name}!\`;
// }`} 
//         codeColor="text-white"
//       />
//         </div>

//       </div>

//       {/* Explore More Section - Placed before the gray background section */}
//       <ExploreMore/>

//       {/* Section 2 - Gray Background with Homepage BG and CTA */}
//       <div className='bg-gray-50 text-shadow-black'> {/* text-shadow-black might need custom CSS or a utility class if it's not Tailwind default */}
//         <div className='homepage_bg h-[380px] w-full bg-no-repeat pt-24'> {/* Increased height and added padding-top to ensure overlap works and content doesn't get hidden */}
            

//             <div className='w-11/12 max-w-maxContent flex  flex-col items-center justify-between   gap-5 mx-auto'>
//             {/* Removed the empty h-[150px] div, as padding-top on homepage_bg handles spacing */}

//             <div className='flex flex-row gap-7 text-white mt-25'> {/* Added mt-12 to push buttons down */}
//                 <CTAButton active={true} linkto={"/signup"} >
//                     <div className='flex gap-2 items-center'>
//                         Explore full Catalog
//                         <FaArrowRight/>
//                     </div>

//                 </CTAButton>

//                 <CTAButton active={false} linkto={"/signup"} >
//                     <div className='flex gap-2 items-center'>
//                         Learn more

//                     </div>

//                 </CTAButton>
//             </div>

//             </div>
//         </div>

//         <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 pb-16'> {/* Added pb-16 for bottom spacing */}

//         <div className='flex flex-row gap-5 mb-10 mt-[95px] '> {/* This margin-top needs to be carefully adjusted to account for cards above */}

//             <div className='font-semibold text-4xl w-[45%]' >
//                 Get the skills you need for a
//                 <HighlightText text={"Job that is in Demand"}/>

//             </div>

//             <div className='flex flex-col gap-10 w-[40%] items-start'>
//                 <div className='text-[16px] text-gray-700'> {/* Added text-gray-700 for better contrast on light background */}
//                     The modern Edtech dictates its own terms. Today, to be a competitive
//                     specialist requires more than professional skills
//                 </div>
//                 <CTAButton active={true} linkto={"/signup"}>
//                 Learn more

//                 </CTAButton>

//             </div>

//         </div>
//         <TimeLineSection/>

//         <LearningLanguageSection/>


//         </div>

//       </div>

//       {/* Section 3 - Instructor Section and Reviews */}
//       <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8
//       bg-red-950 text-white py-12'> {/* Changed bg-red-950 to bg-gray-900 for a more cohesive dark theme */}
//         <InstructorSection/>

//         <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other Learners</h2>
//         <ReviewSlider/>

//       </div>

//       <Footer/>

//     </div>
//   )
// }

// export default Home;
