import React from 'react'
import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[15px] px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg
        ${active 
          // Active button is always the vibrant accent color
          ? "bg-burnt-sienna text-white shadow-burnt-sienna/30 hover:shadow-2xl hover:shadow-burnt-sienna/40 hover:-translate-y-1" 
          // Inactive button adapts: dark on light bg, light on dark bg
          : "bg-warm-stone text-white hover:bg-warm-stone/90"
        }
      `}>
        {children}
      </div>
    </Link>
  )
}
export default Button

// import React from 'react'
// import {Link} from "react-router-dom"

// const Button = ({children,active, linkto}) => {
//   return (
//     <div>

//       <Link to={linkto}>

//       <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
//         ${active ? "bg-yellow-500 text-black":"bg-black" }
//         hover:scale-95
//         `}>
//         {children}
//       </div>


//       </Link>
//     </div>
//   )
// }

// export default Button