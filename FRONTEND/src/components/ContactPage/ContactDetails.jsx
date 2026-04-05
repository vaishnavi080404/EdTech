import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "mailbySkillNest@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "connaught place 1st Block 1st Cross, Delhi-110001",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div
     
      className="group relative flex flex-col gap-6 rounded-2xl p-6 shadow-2xl transition-all duration-500 [perspective:1000px] overflow-hidden bg-no-repeat bg-center bg-cover w-full lg:max-w-[450px] h-fit"
       style={{
        backgroundImage: `url('https://www.shutterstock.com/image-vector/woman-turns-support-service-customer-600nw-1986378524.jpg')`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-warm-stone/70 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 transition-all duration-500 group-hover:[transform:rotateX(5deg)]">
        {contactDetails.map((ele, i) => {
          let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
          return (
            <div
              
              className={`flex flex-col gap-[2px] p-4 text-sm text-soft-terracotta ${
                i !== contactDetails.length - 1 ? "border-b border-white/10" : ""
              }`}
              key={i}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="bg-burnt-sienna/20 p-3 rounded-full">
                
                  {Icon ? <Icon size={25} className="text-white" /> : null}
                </div>
                <h1 className="text-lg font-semibold text-white">
                  {ele?.heading}
                </h1>
              </div>
              <p className="font-medium mt-2 opacity-80">{ele?.description}</p>
              <p className="font-semibold text-rose-gold">{ele?.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetails;