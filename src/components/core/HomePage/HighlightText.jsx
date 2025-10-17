import React from 'react'

const HighlightText = ({ text }) => {
  return (
    // Changed from text-burnt-sienna to the more elegant text-rose-gold
    <span className='font-bold text-[#FF6B6B]'>
      {" "}
      {text}
      {" "}
    </span>
  )
}

export default HighlightText


// import React from 'react'

// const HighlightText = ({ text }) => {
//   return (
//     <span className='font-bold text-amber-500'>
//       {" "}
//       {text}
//       {" "}
//     </span>
//   )
// }

// export default HighlightText