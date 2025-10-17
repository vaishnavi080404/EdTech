import React from 'react';
import IconBtn from './IconBtn'; // Your styled, reusable button component

const ConfirmationModal = ({ modalData }) => {
  return (
    // --- STYLED BACKDROP ---
    // Uses a branded color and a backdrop blur for a modern "glassmorphism" effect
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-espresso-brown/50 backdrop-blur-sm">
      
      {/* --- STYLED MODAL CARD --- */}
      {/* Styled with on-brand colors, border, and shadow to make it pop */}
      <div className="my-10 w-11/12 max-w-md rounded-lg border border-warm-stone/20 bg-soft-terracotta p-6 text-espresso-brown shadow-2xl">
        
        {/* Heading */}
        <p className="text-2xl font-bold">
          {modalData.text1}
        </p>
        
        {/* Description */}
        <p className="mt-3 text-base text-espresso-brown/80">
          {modalData.text2}
        </p>

        {/* --- STYLED ACTION BUTTONS --- */}
        <div className="mt-6 flex items-center gap-x-4">
          
          {/* Primary Action Button (e.g., "Delete", "Logout") */}
          {/* Uses the primary IconBtn style for emphasis */}
          <IconBtn
            onClick={modalData.btn1Handler}
            text={modalData.btn1Text} // Using the more descriptive prop name
          />
          
          {/* Secondary Action Button (e.g., "Cancel") */}
          {/* Uses the secondary outline IconBtn style */}
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