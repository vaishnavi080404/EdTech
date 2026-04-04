import React from 'react';
import IconBtn from './IconBtn'; // Your styled, reusable button component

const ConfirmationModal = ({ modalData }) => {
  return (
  
    
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-espresso-brown/50 backdrop-blur-sm">
      
     
      <div className="my-10 w-11/12 max-w-md rounded-lg border border-warm-stone/20 bg-soft-terracotta p-6 text-espresso-brown shadow-2xl">
        
        {/* heading */}
        <p className="text-2xl font-bold">
          {modalData.text1}
        </p>
        
        {/* description */}
        <p className="mt-3 text-base text-espresso-brown/80">
          {modalData.text2}
        </p>

       
        <div className="mt-6 flex items-center gap-x-4">
          
        
          <IconBtn
            onClick={modalData.btn1Handler}
            text={modalData.btn1Text} // Using the more descriptive prop name
          />
          
    
          <IconBtn
            outline={true}
            onClick={modalData.btn2Handler}
            text={modalData.btn2Text} // Using the more descriptive prop name
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;