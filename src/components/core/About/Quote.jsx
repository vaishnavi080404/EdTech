import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // Importing quote icons

const Quote = () => {
  return (
    // Main container with relative positioning for the background shape
    <div className="relative my-20 py-16 px-6 text-center max-w-4xl mx-auto">
      
      {/* Decorative background shape for depth and visual interest */}
      <div className="absolute inset-0 bg-warm-stone/10 rounded-full blur-3xl -z-10"></div>

      {/* Opening Quote Icon */}
      <FaQuoteLeft className="absolute top-0 left-0 text-5xl text-warm-stone/20 transform -translate-x-4 -translate-y-4" />

      <p className="text-2xl sm:text-4xl font-medium italic text-espresso-brown/90 leading-relaxed">
        We are passionate about revolutionizing the way we learn. 
        Our innovative platform <HighlightText text={"combines technology"} />, 
        <span className="text-burnt-sienna font-semibold"> expertise</span>, and community 
        to create an 
        <span className="text-burnt-sienna font-semibold"> unparalleled educational experience</span>.
      </p>

      {/* Closing Quote Icon */}
      <FaQuoteRight className="absolute bottom-0 right-0 text-5xl text-warm-stone/20 transform translate-x-4 translate-y-4" />
      
    </div>
  )
}

export default Quote;

// import React from 'react'
// import HighlightText from '../HomePage/HighlightText'

// const Quote = () => {
//   return (
//     <div className=" text-white py-10 px-6  text-center max-w-4xl mx-auto">
//       <p className="text-xl sm:text-2xl font-medium leading-relaxed">
//         We are passionate about revolutionizing the way we learn.
//         Our innovative platform <HighlightText text={"combines technology"} />
//         <span className="text-blue-400 font-semibold"> expertise</span>, and community
//         to create an
//         <span className="text-blue-400 font-semibold"> unparalleled educational experience</span>.
//       </p>
//     </div>
//   )
// }

// export default Quote
