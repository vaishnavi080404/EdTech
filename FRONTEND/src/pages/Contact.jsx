import React from "react"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"
import { MdOutlineRateReview } from 'react-icons/md'

const Contact = () => {
  return (
    // Applied the new animated background class
    <div className="animated-background text-espresso-brown">

      <div className="relative z-10 mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 lg:flex-row lg:items-center">
        
       
        <div className="lg:w-[40%] opacity-0 animate-fadeInUp-medium" style={{ animationDelay: '0.2s' }}>
          <ContactDetails />
        </div>

        
        <div className="lg:w-[60%] opacity-0 animate-fadeInUp-medium" style={{ animationDelay: '0.4s' }}>
          <ContactForm />
        </div>
      </div>
      
      <div className="relative z-10 mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
         <h1 className="text-center text-4xl font-semibold mt-8 flex items-center gap-x-3 opacity-0 animate-fadeInUp-fast" style={{ animationDelay: '0.6s' }}>
              Reviews from other learners 
              <MdOutlineRateReview className='text-burnt-sienna' />
          </h1>
          <div className="w-full opacity-0 animate-fadeInUp-slow" style={{ animationDelay: '0.8s' }}>
            <ReviewSlider />
          </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact

