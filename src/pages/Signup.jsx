import React from 'react';
import Template from '../components/core/Auth/Template';

function Signup({ setIsLoggedIn }) {
  return (
    // --- STYLING APPLIED HERE ---
    // Replaced the simple grid with our branded, animated "Aurora" background.
    // This makes the Signup page a perfect match for the Login page.
    <div className="
      relative min-h-screen flex items-center justify-center px-4 
      bg-espresso-brown overflow-hidden
    ">
      {/* The Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

      {/* The Template component now sits on top of the new background */}
      <div className="relative z-10">
        <Template
          title="Join the millions learning to code with StudyNotion for free"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image="https://img.freepik.com/free-photo/young-students-learning-together-group-study_23-2149211067.jpg?ga=GA1.1.689979136.1750934830&semt=ais_hybrid&w=740"
          formType="signup"
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </div>
  );
}

export default Signup;