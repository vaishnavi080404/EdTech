import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";


const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1, 
    ctabtn2, 
    codeblock,
    
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

            
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}

                
                <div className="text-soft-terracotta/80 text-base font-medium w-[85%] -mt-3">
                    {subheading}
                </div>

                
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

            
            <div className="relative h-fit w-[100%] lg:w-[470px] shadow-2xl rounded-xl">
                
                
                <div className="absolute -top-10 left-10 w-80 h-80 bg-gradient-to-br from-rose-gold via-burnt-sienna to-warm-stone rounded-full opacity-20 blur-3xl animate-sphere-pulse z-0"></div>


                
                <div className="relative z-10 flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 bg-burnt-sienna/5 border border-warm-stone/20 rounded-xl backdrop-blur-md">
                  
                    
                   
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

