import React from 'react';

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) => {


  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
     
      className={`
        flex items-center justify-center gap-x-2 px-5 py-2 rounded-md font-semibold 
        transition-all duration-200
        
       
        ${outline 
          ? "border-2 border-warm-stone bg-transparent text-espresso-brown hover:bg-warm-stone hover:text-white" 
          : "bg-burnt-sienna text-white shadow-md shadow-burnt-sienna/30 hover:bg-burnt-sienna/90 hover:-translate-y-0.5"
        }
        
        /* --- Custom and Disabled Classes --- */
        ${customClasses}
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;