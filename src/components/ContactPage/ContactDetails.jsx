import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "mailbystudynotion@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "connaught place 1st Block 1st Cross, Delhi-110001",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

// const ContactDetails = () => {
//   return (
//     <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
//       {contactDetails.map((ele, i) => {
//         let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
//         return (
//           <div
//             className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
//             key={i}
//           >
//             <div className="flex flex-row items-center gap-3">
//               <Icon size={25} />
//               <h1 className="text-lg font-semibold text-richblack-5">
//                 {ele?.heading}
//               </h1>
//             </div>
//             <p className="font-medium">{ele?.description}</p>
//             <p className="font-semibold">{ele?.details}</p>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default ContactDetails



const ContactDetails = () => {
  return (
    // 1. Added relative positioning to act as a container for the overlay
    // 2. Added overflow-hidden to keep the image within the rounded corners
    // 3. Applied the background image using the imported variable
    <div
      className="group relative flex flex-col gap-6 rounded-2xl p-6 shadow-2xl transition-all duration-500 [perspective:1000px] overflow-hidden bg-no-repeat bg-center w-[500px] h-[500px]"
       style={{
        backgroundImage: `url('https://www.shutterstock.com/image-vector/woman-turns-support-service-customer-600nw-1986378524.jpg')`,
      }}
    >
      
      {/* 4. This is the semi-transparent overlay. It sits between the background and the content. */}
      {/* The /80 adds 80% opacity to the warm-stone color. backdrop-blur adds a frosted glass effect. */}
      <div className="absolute inset-0 bg-warm-stone/60 backdrop-blur-sm z-0"></div>

      {/* 5. Added relative and z-10 to ensure all content sits on TOP of the overlay */}
      <div className="relative z-10 transition-all duration-500 group-hover:[transform:rotateX(5deg)]">
        {contactDetails.map((ele, i) => {
          let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
          return (
            <div
              className="flex flex-col gap-[2px] p-3 text-sm text-soft-terracotta"
              key={i}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="bg-burnt-sienna/20 p-3 rounded-full">
                  <Icon size={25} className="text-white" />
                </div>
                <h1 className="text-lg font-semibold text-white">
                  {ele?.heading}
                </h1>
              </div>
              <p className="font-medium mt-2">{ele?.description}</p>
              <p className="font-semibold">{ele?.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetails;