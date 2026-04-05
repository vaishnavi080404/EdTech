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
    <div className='overflow-x-hidden'>

     
      <div className='relative bg-espresso-brown text-soft-terracotta '>
        
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
            ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }} 
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}   
            codeblock={`<!DOCTYPE html>\n<html>\n  <head><title>Example</title></head>\n  <body>\n    <h1><a href="/">Header</a></h1>\n    <nav><a href="/one">One</a></nav>\n  </body>`}
             highlightedLines={[3, 7]}
          />

        <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={<div className='text-4xl font-semibold text-white'>Start your<HighlightText text={"learning journey"}/></div>}
            subheading={"No matter your experience level, we’ve got something for you..."}
            ctabtn1={{ btnText: "Get Started", linkto: "/signup", active: true }} 
            ctabtn2={{ btnText: "Explore", linkto: "/login", active: false }}   
            codeblock={`import React from "react";\nconst App = () => {\n  return (\n    <div>Hello World!</div>\n  )\n}\nexport default App;`}
             highlightedLines={[2, 4]}
          />
          
        </div>

        <ExploreMore />
        
      </div>



      <div className='relative w-full bg-soft-terracotta text-espresso-brown '>
        <div className='h-[250px]'></div>
       
        <div className="absolute -top-1 w-full z-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
           
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#B76E79' }} /> 
                <stop offset="100%" style={{ stopColor: '#D95D39' }} /> 
              </linearGradient>
            </defs>

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

